import { randomBytes } from "node:crypto";
import { mkdir, readFile, rm, writeFile, appendFile } from "node:fs/promises";
import { resolve } from "node:path";
import { stripVTControlCharacters } from "node:util";
import ts from "typescript";
import { spawnPnpm, spawnPnpmSync } from "./pnpm-process.mjs";

// An isolated local Worker; never touches a developer's local or remote database.
const directory = resolve(".wrangler/e2e");
await rm(directory, { recursive: true, force: true });
await mkdir(directory, { recursive: true });
const { config, error } = ts.parseConfigFileTextToJson(
  "wrangler.jsonc",
  await readFile("apps/api/wrangler.jsonc", "utf8"),
);
if (error) throw new Error("Invalid Wrangler configuration");
config.name = "mvp-browser-tests";
// wrangler dev rewrites Host and Origin to the first route, which would make
// every browser request look like it came from the production hostname.
delete config.routes;
delete config.env;
config.main = resolve("apps/api/src/index.ts");
config.assets.directory = resolve("apps/web/dist");
config.d1_databases[0].migrations_dir = resolve("apps/api/drizzle/migrations");
config.d1_databases[0].database_id = "00000000-0000-4000-8000-000000000001";
config.vars = {
  ENVIRONMENT: "development",
  API_KEY: "dev-demo-api-key",
  ADMIN_EMAIL: "admin@example.test",
  ADMIN_PASSWORD: "test-admin-password-123",
  BETTER_AUTH_URL: "http://127.0.0.1:4173",
  BETTER_AUTH_SECRET: randomBytes(32).toString("hex"),
  EMAIL_MODE: "preview",
  ENABLE_ORGANIZATIONS: "true",
};
// Isolate workflow tests from per-minute abuse-control tests in the API suite.
for (const limiter of config.ratelimits) limiter.simple.limit = 1000;
const configPath = `${directory}/wrangler.json`;
const mailbox = `${directory}/mailbox.jsonl`;
await writeFile(configPath, JSON.stringify(config), { mode: 0o600 });
await writeFile(mailbox, "", { mode: 0o600 });
const baseArgs = ["--filter", "@repo/api", "exec", "wrangler"];
const localArgs = [
  "--config",
  configPath,
  "--persist-to",
  `${directory}/state`,
];
const migration = spawnPnpmSync(
  [...baseArgs, "d1", "migrations", "apply", "DB", "--local", ...localArgs],
  {
    stdio: "inherit",
    env: { ...process.env, NO_COLOR: "1" },
  },
);
if (migration.status !== 0) process.exit(migration.status ?? 1);
const worker = spawnPnpm(
  [
    ...baseArgs,
    "dev",
    "--local",
    "--ip",
    "127.0.0.1",
    "--port",
    "4173",
    ...localArgs,
  ],
  {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NO_COLOR: "1" },
  },
);

let pending = "";
let writes = Promise.resolve();
worker.stdout.on("data", (chunk) => {
  pending += stripVTControlCharacters(chunk.toString());
  let newline;
  while ((newline = pending.indexOf("\n")) >= 0) {
    const line = pending.slice(0, newline);
    pending = pending.slice(newline + 1);
    const jsonStart = line.indexOf('{"event":"email_preview"');
    if (jsonStart >= 0) {
      const message = line.slice(jsonStart);
      writes = writes.then(() => appendFile(mailbox, `${message}\n`));
    } else {
      // Callback paths can contain a one-use reset token; don't echo request logs.
      if (
        !line.includes("/api/auth/") &&
        !line.includes("BETTER_AUTH_SECRET")
      ) {
        process.stdout.write(`${line}\n`);
      }
    }
  }
});
worker.stderr.on("data", (chunk) => process.stderr.write(chunk));
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => worker.kill(signal));
}
worker.on("exit", (code) => {
  process.exitCode = code ?? 0;
});
