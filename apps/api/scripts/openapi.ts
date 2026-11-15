import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createApp } from "../src/app";
import { auth } from "../src/auth/cli";
import { mergeAuthOpenApi, normalizeAuthOpenApi } from "../src/openapi/merge";
import type { OpenApiDocument } from "../src/openapi/merge";

// Only build-time configuration is used; no credentials, network, or database queries.
const application = await (
  await createApp().request(
    "http://localhost/api/openapi.json",
    {
      headers: { "x-api-key": "schema-generation-only-api-key" },
    },
    {
      DB: {} as D1Database,
      FILES: {} as R2Bucket,
      ENVIRONMENT: "development",
      API_KEY: "schema-generation-only-api-key",
      BETTER_AUTH_URL: "http://localhost:5173",
      BETTER_AUTH_SECRET: "schema-generation-only-not-a-runtime-secret",
      EMAIL_MODE: "preview",
      ENABLE_ORGANIZATIONS: "true",
    },
  )
).json();
const authentication = await (
  auth.api as typeof auth.api & {
    generateOpenAPISchema: () => Promise<{ servers?: Array<{ url: string }> }>;
  }
).generateOpenAPISchema();
// A relative server keeps the exported contract usable across local/staging/production.
authentication.servers = [{ url: "/api/auth" }];
const normalizedAuthentication = normalizeAuthOpenApi(authentication);
const merged = mergeAuthOpenApi(
  application as OpenApiDocument,
  normalizedAuthentication,
);

function sort(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sort);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, sort(item)]),
    );
  }
  return value;
}

const directory = fileURLToPath(
  new URL("../../../docs/openapi/", import.meta.url).href,
);
const check = process.argv.includes("--check");
if (!check) await mkdir(directory, { recursive: true });
for (const [name, schema] of Object.entries({
  app: merged,
  auth: normalizedAuthentication,
})) {
  const path = `${directory}${name}.json`;
  const expected = `${JSON.stringify(sort(schema), null, 2)}\n`;
  if (check) {
    const actual = await readFile(path, "utf8").catch(() => "");
    if (actual !== expected) {
      throw new Error(
        `${name} OpenAPI is stale. Run pnpm openapi:generate and commit the result.`,
      );
    }
  } else {
    await writeFile(path, expected);
  }
}
console.log(
  check
    ? "OpenAPI documents are current."
    : "Generated application and authentication OpenAPI documents.",
);
