import { cp, mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnPnpmSync } from "./pnpm-process.mjs";

// Fails when the Drizzle schema, generated Better Auth schema, and checked-in
// migrations disagree. Never touches a database or the working tree.
const api = resolve("apps/api");
const scratch = await mkdtemp(join(tmpdir(), "schema-check-"));
const problems = [];

// Compares table.column names; column order and reviewed defaults may differ
// from the generator without changing the database contract.
function columns(source) {
  const found = new Set();
  for (const block of source.split(/sqliteTable\(/).slice(1)) {
    const table = block.match(/^\s*"(\w+)"/)?.[1];
    for (const [, column] of block.matchAll(/^\s*\w+:\s*\w+\(\s*"(\w+)"/gm))
      found.add(`${table}.${column}`);
  }
  return found;
}

function exec(command, args) {
  const result = spawnPnpmSync(["exec", command, ...args], {
    cwd: api,
    encoding: "utf8",
  });
  return {
    ok: result.status === 0,
    output: result.error?.message ?? `${result.stdout}${result.stderr}`,
  };
}

try {
  const check = exec("drizzle-kit", ["check"]);
  if (!check.ok) problems.push(`drizzle-kit check failed:\n${check.output}`);

  const migrations = join(scratch, "migrations");
  await cp(join(api, "drizzle/migrations"), migrations, { recursive: true });
  const before = (await readdir(migrations)).length;
  const generate = exec("drizzle-kit", [
    "generate",
    "--dialect",
    "sqlite",
    "--schema",
    "./src/db/schema/index.ts",
    "--out",
    migrations,
  ]);
  if (!generate.ok)
    problems.push(`drizzle-kit generate failed:\n${generate.output}`);
  else if ((await readdir(migrations)).length !== before)
    problems.push(
      "src/db/schema has changes without a migration. Run `pnpm --filter @repo/api db:generate`, review the SQL, and commit it.",
    );

  const authOutput = join(scratch, "auth.generated.ts");
  const auth = exec("auth", [
    "generate",
    "--config",
    "src/auth/cli.ts",
    "--adapter",
    "drizzle",
    "--dialect",
    "sqlite",
    "--output",
    authOutput,
    "--yes",
  ]);
  if (!auth.ok)
    problems.push(`Better Auth schema generation failed:\n${auth.output}`);
  else {
    const [expected, actual] = await Promise.all([
      readFile(authOutput, "utf8").then(columns),
      readFile(join(api, "src/db/schema/auth.generated.ts"), "utf8").then(
        columns,
      ),
    ]);
    if (!expected.size)
      problems.push(
        "Could not read columns from the generated Better Auth schema.",
      );
    const missing = [...expected].filter((column) => !actual.has(column));
    const extra = [...actual].filter((column) => !expected.has(column));
    if (missing.length || extra.length)
      problems.push(
        `src/db/schema/auth.generated.ts does not match the current Better Auth configuration (missing: ${missing.join(", ") || "none"}; unexpected: ${extra.join(", ") || "none"}). Run \`pnpm --filter @repo/api auth:generate\`, then generate and review a migration.`,
      );
  }
} finally {
  await rm(scratch, { recursive: true, force: true });
}

if (problems.length) {
  console.error(problems.join("\n\n"));
  process.exitCode = 1;
} else {
  console.log("Database schema, Better Auth schema, and migrations agree.");
}
