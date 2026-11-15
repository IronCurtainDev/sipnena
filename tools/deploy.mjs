import { appendFile, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import ts from "typescript";
import { spawnPnpmSync } from "./pnpm-process.mjs";

const { config, error } = ts.parseConfigFileTextToJson(
  "wrangler.jsonc",
  await readFile("apps/api/wrangler.jsonc", "utf8"),
);
if (error) throw new Error("Invalid Wrangler configuration");

const environment = process.argv[2];
const production = environment === "production";
const allowedName =
  environment === "develop" || /^dev-[a-z0-9-]+$/.test(environment ?? "");
if (!production && !(allowedName && config.env?.[environment])) {
  const known = ["production", ...Object.keys(config.env ?? {})].join(", ");
  throw new Error(
    `Usage: node tools/deploy.mjs <environment>. Known environments: ${known}. Non-production names must be develop or dev-<name> and exist under env in apps/api/wrangler.jsonc; add a personal environment as described in docs/setup.md.`,
  );
}
if (environment === "develop" && !process.env.CI) {
  throw new Error(
    "The shared develop environment deploys only from the Deploy staging GitHub Actions workflow. Use your own dev-<name> environment locally.",
  );
}
if (production && !process.env.CI) {
  throw new Error(
    "Production deploys only from the Deploy GitHub Actions workflow, which runs the full checks and records the recovery point. Use your own dev-<name> environment locally.",
  );
}

const target = production ? config : config.env[environment];
const envArgs = production ? [] : ["--env", environment];
const vars = target.vars ?? {};
const problems = [];
const exampleHost = (host) =>
  /(^|\.)(example\.(com|net|org)|localhost)$/.test(host) ||
  host.endsWith(".example") ||
  host.includes("replace-with");

let origin;
try {
  origin = new URL(vars.BETTER_AUTH_URL);
} catch {
  problems.push("BETTER_AUTH_URL must be an absolute HTTPS origin");
}
if (origin) {
  if (origin.protocol !== "https:")
    problems.push("BETTER_AUTH_URL must use https");
  if (origin.origin !== vars.BETTER_AUTH_URL.replace(/\/$/, ""))
    problems.push("BETTER_AUTH_URL must be an origin without a path");
  if (exampleHost(origin.hostname))
    problems.push(
      `BETTER_AUTH_URL still uses placeholder host ${origin.hostname}`,
    );
  if (!production && origin.hostname.endsWith("workers.dev"))
    problems.push(
      "non-production environments need their own custom domain, not workers.dev",
    );

  const routeHosts = (target.routes ?? []).map(
    (route) =>
      (typeof route === "string" ? route : route.pattern).split("/")[0],
  );
  if (!production && routeHosts.length === 0)
    problems.push(
      "environment must define its own routes; otherwise it inherits the production route",
    );
  if (routeHosts.length && !routeHosts.includes(origin.hostname))
    problems.push(
      `BETTER_AUTH_URL host ${origin.hostname} does not match routes (${routeHosts.join(", ")})`,
    );
}
for (const db of target.d1_databases ?? []) {
  if (!/^[a-f0-9-]{36}$/i.test(db.database_id))
    problems.push(`D1 database_id for ${db.database_name} is a placeholder`);
}
if (!target.d1_databases?.length) problems.push("missing d1_databases");
if (!vars.EMAIL_FROM || /@example\.(com|net|org)/i.test(vars.EMAIL_FROM))
  problems.push("EMAIL_FROM must use a verified sending domain");
if (vars.EMAIL_MODE !== "resend") problems.push("EMAIL_MODE must be resend");
const expectedEnvironment = production ? "production" : "staging";
if (vars.ENVIRONMENT !== expectedEnvironment)
  problems.push(`ENVIRONMENT must be ${expectedEnvironment}`);
if (vars.MIN_MOBILE_VERSION && !/^\d+\.\d+\.\d+$/.test(vars.MIN_MOBILE_VERSION))
  problems.push("MIN_MOBILE_VERSION must use major.minor.patch");
const webApiKey = process.env.VITE_API_KEY;
if (!webApiKey || webApiKey === "dev-demo-api-key")
  problems.push(
    "set VITE_API_KEY to one of this environment's API_KEYS values; the web bundle is rebuilt with it",
  );

if (problems.length) {
  throw new Error(
    `Fix the ${environment} configuration in apps/api/wrangler.jsonc before deploying (see docs/setup.md):\n- ${problems.join("\n- ")}`,
  );
}

const secrets = spawnPnpmSync(
  [
    "--filter",
    "@repo/api",
    "exec",
    "wrangler",
    "secret",
    "list",
    ...envArgs,
    "--format",
    "json",
  ],
  { encoding: "utf8" },
);
if (secrets.status !== 0) {
  throw new Error(
    `Unable to check ${environment} secret names. Authenticate Wrangler and create API_KEY, BETTER_AUTH_SECRET and RESEND_API_KEY with wrangler secret put before deploying. See docs/setup.md.`,
  );
}
const names = new Set(JSON.parse(secrets.stdout).map((secret) => secret.name));
const missing = ["BETTER_AUTH_SECRET", "RESEND_API_KEY"].filter(
  (name) => !names.has(name),
);
if (!names.has("API_KEY") && !names.has("API_KEYS")) missing.push("API_KEYS");
if (missing.length)
  throw new Error(
    `Missing ${environment} Cloudflare secrets: ${missing.join(", ")}. Use wrangler secret put before deploying.`,
  );
const googleId = Boolean(
  vars.GOOGLE_CLIENT_ID || names.has("GOOGLE_CLIENT_ID"),
);
const googleSecret = names.has("GOOGLE_CLIENT_SECRET");
if (googleId !== googleSecret)
  throw new Error(
    "Configure GOOGLE_CLIENT_ID and the GOOGLE_CLIENT_SECRET secret together before deploying.",
  );

function wrangler(args, options = { stdio: "inherit" }) {
  return spawnPnpmSync(
    ["--filter", "@repo/api", "exec", "wrangler", ...args],
    options,
  );
}
function run(args) {
  const result = wrangler(args);
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Browser tests run against a demo-key build; deployed assets need the real key.
const webBuild = spawnPnpmSync(["--filter", "@repo/web", "build"], {
  stdio: "inherit",
  env: { ...process.env, VITE_API_KEY: webApiKey },
});
if (webBuild.status !== 0) process.exit(webBuild.status ?? 1);

// Record a recovery point before schema changes; restoring it is in docs/operations.md.
const bookmark = wrangler(
  ["d1", "time-travel", "info", "DB", "--json", ...envArgs],
  {
    encoding: "utf8",
  },
);
let recoveryPoint;
try {
  recoveryPoint = JSON.parse(
    bookmark.stdout.slice(bookmark.stdout.indexOf("{")),
  ).bookmark;
} catch {
  recoveryPoint = undefined;
}
if (bookmark.status !== 0 || !recoveryPoint) {
  throw new Error(
    `Unable to record a D1 Time Travel bookmark for ${environment}; refusing to migrate without a recovery point.`,
  );
}
console.log(`D1 recovery bookmark before migrations: ${recoveryPoint}`);
if (process.env.GITHUB_STEP_SUMMARY)
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    `D1 recovery bookmark for ${environment}: \`${recoveryPoint}\`\n`,
  );

const commit =
  spawnSync("git", ["rev-parse", "--short=12", "HEAD"], {
    encoding: "utf8",
  }).stdout?.trim() || "unknown";
run(["d1", "migrations", "apply", "DB", "--remote", ...envArgs]);
run(["deploy", ...envArgs, "--tag", commit, "--message", `Deploy ${commit}`]);

// Fails the workflow when the deployed origin, assets, or public key are broken.
const smokeFailures = [];
for (const [path, check] of [
  ["/api/health", (response) => response.ok],
  ["/api/config", (response) => response.ok],
  [
    "/",
    (response) =>
      response.ok &&
      response.headers.get("content-type")?.includes("text/html"),
  ],
]) {
  let passed = false;
  for (let attempt = 0; attempt < 5 && !passed; attempt++) {
    if (attempt) await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(new URL(path, vars.BETTER_AUTH_URL), {
      headers: { "x-api-key": webApiKey },
    }).catch(() => null);
    passed = Boolean(response && check(response));
  }
  if (!passed) smokeFailures.push(path);
}
if (smokeFailures.length) {
  throw new Error(
    `Deployed ${environment}, but smoke checks failed for ${smokeFailures.join(", ")}. Roll back with \`wrangler rollback\` (see docs/operations.md); D1 bookmark ${recoveryPoint}.`,
  );
}
console.log(`Deployed ${commit} to ${environment}; smoke checks passed.`);
