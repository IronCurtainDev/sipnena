import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { extname, join, sep } from "node:path";

// apps/mobile is owned by the Flutter developer; check it explicitly with
// `node tools/check-lines.mjs apps/mobile/lib apps/mobile/test`.
const defaultRoots = ["apps/api", "apps/web", "packages", "tools", "tests"];
const ignored = new Set([
  "node_modules",
  ".git",
  ".turbo",
  ".wrangler",
  ".dart_tool",
  "dist",
  "build",
  "coverage",
  "gen",
  "migrations",
  "test-results",
  "playwright-report",
  ".playwright-cli",
]);
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".dart"]);
let failures = 0;

async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await check(path);
    } else if (extensions.has(extname(path))) {
      if (/\.(generated|gen|g|freezed)\./.test(path) || path.endsWith(".d.ts"))
        continue;
      const content = await readFile(path, "utf8");
      const lines = content
        ? content.split("\n").length - Number(content.endsWith("\n"))
        : 0;
      const normalized = path.split(sep).join("/");
      const isPage =
        /apps\/web\/src\/routes\/.*\.tsx$/.test(normalized) ||
        /apps\/mobile\/.*(?:_screen|_page)\.dart$/.test(normalized);
      const limit = isPage ? 200 : 300;
      if (lines > limit) {
        console.error(
          `${normalized}: ${lines} lines (maximum ${limit}). Split by responsibility.`,
        );
        failures++;
      }
    }
  }
}

const roots = process.argv.slice(2);
for (const root of roots.length ? roots : defaultRoots) {
  if (existsSync(root)) await check(root);
}
if (failures) process.exitCode = 1;
else
  console.log("All handwritten source files meet the page/source line limits.");
