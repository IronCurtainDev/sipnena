import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { spawnPnpmSync } from "./pnpm-process.mjs";

const example = await readFile("apps/api/.dev.vars.example", "utf8");
try {
  await writeFile(
    "apps/api/.dev.vars",
    example.replace("__GENERATE_SECRET__", randomBytes(32).toString("hex")),
    { flag: "wx", mode: 0o600 },
  );
  console.log(
    "Created local configuration with a unique authentication secret.",
  );
} catch (error) {
  if (error.code !== "EEXIST") throw error;
  console.log("Keeping your existing local configuration.");
}

const migration = spawnPnpmSync(["--filter", "@repo/api", "db:migrate:local"], {
  stdio: "inherit",
});
if (migration.status !== 0) process.exit(migration.status ?? 1);
console.log("Local database ready. Start the apps with pnpm dev.");
