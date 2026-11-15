import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { spawnPnpmSync } from "./pnpm-process.mjs";

// Safe, coordinated Hono upgrade script for the monorepo.
// Enforces supply-chain safety (min release age), atomic catalog updates,
// security audits, and full test/OpenAPI verification with auto-rollback.

const MIN_RELEASE_AGE_HOURS = 24;
const COMPANION_PACKAGES = [
  "@hono/zod-openapi",
  "@hono/swagger-ui",
  "hono-telescope",
];

const args = process.argv.slice(2);
const isCheckOnly = args.includes("--check");
const isForce = args.includes("--force");
const isDryRun = args.includes("--dry-run");
const explicitVersion = args.find((a) => !a.startsWith("-"));

function run(command, cmdArgs, options = {}) {
  const spawnOptions = {
    encoding: "utf8",
    stdio: options.silent ? "pipe" : "inherit",
    ...options,
  };
  const result =
    command === "pnpm"
      ? spawnPnpmSync(cmdArgs, spawnOptions)
      : spawnSync(command, cmdArgs, spawnOptions);
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

async function fetchPackageInfo(packageName) {
  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    const view = run("npm", ["view", packageName, "--json"], { silent: true });
    if (!view.ok)
      throw new Error(`Failed to query npm registry for ${packageName}`);
    return JSON.parse(view.stdout);
  }
}

const workspaceFile = "pnpm-workspace.yaml";
const workspaceYaml = await readFile(workspaceFile, "utf8");
const currentMatch = workspaceYaml.match(
  /catalog:\s*\n(?:.*\n)*?\s*hono:\s*([^\s\n]+)/,
);
if (!currentMatch) {
  throw new Error("Could not find hono in catalog in pnpm-workspace.yaml");
}
const currentVersion = currentMatch[1].replace(/^[~^]/, "");

console.log(`Current Hono version in catalog: ${currentVersion}`);
const honoData = await fetchPackageInfo("hono");
const latestVersion = honoData["dist-tags"]?.latest;
const targetVersion = explicitVersion || latestVersion;

if (!honoData.versions?.[targetVersion]) {
  throw new Error(
    `Target Hono version ${targetVersion} does not exist on npm.`,
  );
}

const publishTime = honoData.time?.[targetVersion];
const releaseDate = publishTime ? new Date(publishTime) : null;
const ageHours = releaseDate
  ? (Date.now() - releaseDate.getTime()) / (1000 * 60 * 60)
  : Infinity;

console.log(`Target Hono version: ${targetVersion}`);
if (releaseDate) {
  console.log(
    `Released: ${releaseDate.toISOString()} (${Math.floor(ageHours)}h ago)`,
  );
}

if (isCheckOnly) {
  const upToDate = currentVersion === targetVersion;
  if (upToDate) {
    console.log("Hono is already up to date.");
  } else {
    console.log(`Upgrade available: ${currentVersion} -> ${targetVersion}`);
    if (ageHours < MIN_RELEASE_AGE_HOURS) {
      console.log(
        `Note: Release is <${MIN_RELEASE_AGE_HOURS}h old. Upgrading will require --force.`,
      );
    }
  }

  console.log("\nCompanion packages in Hono ecosystem:");
  for (const pkg of COMPANION_PACKAGES) {
    const pkgMatch = workspaceYaml.match(
      new RegExp(`(?:^|\\n)\\s*["']?${pkg}["']?:\\s*([^\\s\\n]+)`),
    );
    const inCatalog = pkgMatch ? pkgMatch[1] : "(not in catalog)";
    try {
      const data = await fetchPackageInfo(pkg);
      const latest = data["dist-tags"]?.latest ?? "unknown";
      console.log(`  - ${pkg}: current ${inCatalog}, latest ${latest}`);
    } catch {
      console.log(`  - ${pkg}: current ${inCatalog}`);
    }
  }
  process.exit(0);
}

if (currentVersion === targetVersion && !isForce) {
  console.log(
    `Hono is already at version ${targetVersion}. Use --force to reinstall/re-verify.`,
  );
  process.exit(0);
}

if (ageHours < MIN_RELEASE_AGE_HOURS && !isForce) {
  console.error(
    `Security alert: Hono ${targetVersion} was released ${Math.floor(ageHours)} hours ago (<${MIN_RELEASE_AGE_HOURS}h).\n` +
      "To protect against supply-chain compromises of new releases, wait 24h or pass --force after verifying the release.",
  );
  process.exit(1);
}

if (isDryRun) {
  console.log(
    `[Dry run] Would update catalog hono: ${currentVersion} -> ${targetVersion} and verify.`,
  );
  process.exit(0);
}

const backupWorkspace = workspaceYaml;
const backupLockfile = await readFile("pnpm-lock.yaml", "utf8").catch(
  () => null,
);

async function rollback(reason) {
  console.error(`\nUpgrade failed: ${reason}`);
  console.log("Rolling back pnpm-workspace.yaml and lockfile...");
  await writeFile(workspaceFile, backupWorkspace);
  if (backupLockfile) await writeFile("pnpm-lock.yaml", backupLockfile);
  run("pnpm", ["install"]);
  console.log("Rollback completed.");
  process.exit(1);
}

console.log(`\nUpdating ${workspaceFile} catalog to hono ${targetVersion}...`);
const updatedYaml = workspaceYaml.replace(
  /(catalog:\s*\n(?:.*\n)*?\s*hono:\s*)([^\s\n]+)/,
  `$1${targetVersion}`,
);
await writeFile(workspaceFile, updatedYaml);

console.log("Running pnpm install...");
const install = run("pnpm", ["install"]);
if (!install.ok) await rollback("pnpm install failed");

console.log("\nRunning security audit (pnpm security:audit)...");
const audit = run("pnpm", ["security:audit"]);
if (!audit.ok)
  await rollback("Security audit detected high or critical vulnerabilities");

console.log("\nRunning file line limits check (pnpm check:lines)...");
const lines = run("pnpm", ["check:lines"]);
if (!lines.ok) await rollback("Line length check failed");

console.log("\nRunning schema check (pnpm check:schema)...");
const schema = run("pnpm", ["check:schema"]);
if (!schema.ok) await rollback("Database/Auth schema check failed");

console.log("\nRunning repo lint & typecheck (pnpm lint:repo)...");
const lint = run("pnpm", ["lint:repo"]);
if (!lint.ok) await rollback("Lint / repository typecheck failed");

console.log(
  "\nRunning workspace builds & tests (turbo run typecheck lint test build)...",
);
const test = run("pnpm", [
  "exec",
  "turbo",
  "run",
  "typecheck",
  "lint",
  "test",
  "build",
]);
if (!test.ok) await rollback("Workspace build or tests failed");

console.log("\nChecking OpenAPI contract drift (pnpm openapi:check)...");
const openapi = run("pnpm", ["openapi:check"]);
if (!openapi.ok) {
  console.warn(
    "\nOpenAPI schemas have changed under Hono " + targetVersion + ".",
  );
  console.warn(
    "Run `pnpm openapi:generate` to inspect and review contract changes.",
  );
  console.warn(
    "Remember: Keep /api/v1 additive and flag mobile-facing changes for both developers' review.",
  );
}

console.log(
  `\nSuccessfully upgraded Hono: ${currentVersion} -> ${targetVersion}`,
);
console.log("All security audits, typechecks, and tests passed cleanly.");
