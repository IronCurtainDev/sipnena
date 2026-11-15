import { randomInt } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const TEMPLATE_NAME = "react-hono-template";
const TEMPLATE_DOMAIN = "example.com";
const usage =
  "Usage: node tools/init-project.mjs <project-name> [domain]\n" +
  "  project-name  lowercase letters, digits, and hyphens, e.g. acme-notes\n" +
  "  domain        optional apex domain replacing example.com, e.g. acme.dev";

const [name, domain] = process.argv.slice(2);
if (!name || !/^[a-z][a-z0-9-]{1,38}[a-z0-9]$/.test(name)) {
  console.error(usage);
  process.exit(1);
}
if (domain && !/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/.test(domain)) {
  console.error(`"${domain}" is not a valid domain.\n\n${usage}`);
  process.exit(1);
}

const wranglerPath = "apps/api/wrangler.jsonc";
const wrangler = await readFile(wranglerPath, "utf8");
if (!wrangler.includes(`"${TEMPLATE_NAME}`)) {
  console.error(
    `${wranglerPath} no longer uses the template name; this project is already initialized.`,
  );
  process.exit(1);
}

// Rate-limit namespace IDs are shared across a Cloudflare account, so each
// project takes its own random block: production x01-x03, develop x11-x13.
const block = randomInt(10, 900) * 100;
const namespaceIds = { 1: block, 2: block + 10 };
let updated = wrangler
  .replaceAll(TEMPLATE_NAME, name)
  .replace(
    /"namespace_id": "([12])00(\d)"/g,
    (_, env, slot) => `"namespace_id": "${namespaceIds[env] + Number(slot)}"`,
  );
if (domain) updated = updated.replaceAll(TEMPLATE_DOMAIN, domain);
await writeFile(wranglerPath, updated);

const rootPackage = JSON.parse(await readFile("package.json", "utf8"));
rootPackage.name = name;
await writeFile("package.json", `${JSON.stringify(rootPackage, null, 2)}\n`);

console.log(`Renamed the Worker, D1 databases, and R2 buckets to ${name}.`);
console.log(
  `Rate-limit namespaces: production ${block + 1}-${block + 3}, develop ${block + 11}-${block + 13}.`,
);
if (!domain)
  console.log("Hostnames still use example.com; pass a domain or edit them.");
console.log(`
Next steps (see docs/setup.md):
  pnpm --filter @repo/api exec wrangler d1 create ${name}
  pnpm --filter @repo/api exec wrangler r2 bucket create ${name}-files
  pnpm --filter @repo/api exec wrangler d1 create ${name}-develop
  pnpm --filter @repo/api exec wrangler r2 bucket create ${name}-develop-files
Then put each returned database_id in ${wranglerPath}.`);
