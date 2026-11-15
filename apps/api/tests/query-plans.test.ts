import { expect, it, vi } from "vitest";
import { permissionsForRoleNames } from "../src/modules/access/access.queries";
import { listFiles } from "../src/modules/files/files.queries";
import { bindings } from "./helpers";

it("indexes provider identities used during Google sign-in", async () => {
  const plan = await bindings.DB.prepare(
    "EXPLAIN QUERY PLAN SELECT * FROM account WHERE provider_id = ? AND account_id = ? LIMIT 2",
  )
    .bind("google", "google-user")
    .all<{ detail: string }>();
  expect(plan.results.map((row) => row.detail).join(" ")).toContain(
    "USING INDEX account_provider_account_idx",
  );
});

it("looks up permissions by role name on every guarded request", async () => {
  const prepare = vi.spyOn(bindings.DB, "prepare");
  await permissionsForRoleNames(bindings.DB, ["user", "support"]);
  const query = prepare.mock.calls[0]?.[0];
  expect(query).toBeTruthy();
  prepare.mockRestore();
  const plan = await bindings.DB.prepare(`EXPLAIN QUERY PLAN ${query}`)
    .bind("user", "support")
    .all<{ detail: string }>();
  const details = plan.results.map((row) => row.detail).join(" ");
  expect(details).not.toMatch(/SCAN (role|role_permission)\b/);
});

it("seeks directly to the file cursor instead of scanning earlier pages", async () => {
  const prepare = vi.spyOn(bindings.DB, "prepare");
  const createdAt = "2026-01-01T00:00:00.000Z";
  const id = "00000000-0000-4000-8000-000000000001";
  await listFiles(bindings.DB, "user", {
    limit: 20,
    cursor: btoa(JSON.stringify([createdAt, id])),
  });
  const query = prepare.mock.calls[0]?.[0];
  expect(query).toBeTruthy();
  prepare.mockRestore();
  const plan = await bindings.DB.prepare(`EXPLAIN QUERY PLAN ${query}`)
    .bind("user", createdAt, id, 21)
    .all<{ detail: string }>();
  const details = plan.results.map((row) => row.detail).join(" ");
  expect(details).toContain("USING INDEX files_user_created_id_idx");
  expect(details).toContain("(created_at,id)<(?,?)");
});
