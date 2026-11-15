import { applyD1Migrations, reset, type D1Migration } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { beforeEach, afterEach, vi } from "vitest";

const bindings = env as { DB: D1Database; TEST_MIGRATIONS: D1Migration[] };
beforeEach(async () => {
  await reset();
  await applyD1Migrations(bindings.DB, bindings.TEST_MIGRATIONS);
});
afterEach(() => vi.restoreAllMocks());
