import { applyD1Migrations, reset, type D1Migration } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { expect, it } from "vitest";
import { listRoles, roleInUse } from "../src/modules/access/access.queries";
import { listFiles } from "../src/modules/files/files.queries";
import { bindings } from "./helpers";

const migrations = (env as unknown as { TEST_MIGRATIONS: D1Migration[] })
  .TEST_MIGRATIONS;

// Deployed databases already hold data when the newest migration runs, and the
// previous Worker keeps serving until the new one is live.
it("applies the atomic permission migration over existing data", async () => {
  await reset();
  const atomicPermissionsMigration = migrations.findIndex((migration) =>
    migration.name.includes("atomic_role_permissions"),
  );
  expect(atomicPermissionsMigration).toBeGreaterThan(0);
  await applyD1Migrations(
    bindings.DB,
    migrations.slice(0, atomicPermissionsMigration),
  );
  const userId = crypto.randomUUID();
  const fileId = crypto.randomUUID();
  const createdAt = "2026-01-01T00:00:00.000Z";
  await bindings.DB.batch([
    bindings.DB.prepare(
      "INSERT INTO user (id, name, email, email_verified, created_at, updated_at) VALUES (?, 'Existing', 'existing@example.com', 1, 0, 0)",
    ).bind(userId),
    bindings.DB.prepare(
      "INSERT INTO files (id, user_id, name, content_type, size, object_key, created_at) VALUES (?, ?, 'old.pdf', 'application/pdf', 10, ?, ?)",
    ).bind(fileId, userId, `users/${userId}/${fileId}`, createdAt),
    bindings.DB.prepare(
      "INSERT INTO role_permission (role_id, permission) VALUES ('00000000-0000-4000-8000-00000000a003', 'role:manage')",
    ),
    bindings.DB.prepare(
      "INSERT INTO role_permission (role_id, permission) VALUES ('00000000-0000-4000-8000-00000000a003', 'user:ban')",
    ),
  ]);

  await applyD1Migrations(bindings.DB, migrations);

  const listed = await listFiles(bindings.DB, userId, { limit: 20 });
  expect(listed.data).toEqual([
    expect.objectContaining({ id: fileId, name: "old.pdf", createdAt }),
  ]);
  const user = await bindings.DB.prepare("SELECT email FROM user WHERE id = ?")
    .bind(userId)
    .first<{ email: string }>();
  expect(user?.email).toBe("existing@example.com");
  const migratedPermissions = (
    await bindings.DB.prepare(
      "SELECT permission FROM role_permission WHERE role_id = '00000000-0000-4000-8000-00000000a003'",
    ).all<{ permission: string }>()
  ).results.map((row) => row.permission);
  expect(migratedPermissions).toEqual(
    expect.arrayContaining([
      "role:create",
      "role:update",
      "role:delete",
      "user:unban",
    ]),
  );
  // Retained for one release so an old Worker remains usable during rollout
  // and rollback. New code filters it from responses and authorization.
  expect(migratedPermissions).toContain("role:manage");
});

it("seeds the built-in roles over existing users", async () => {
  await reset();
  const rolesMigration = migrations.findIndex((m) => m.name.includes("roles"));
  await applyD1Migrations(bindings.DB, migrations.slice(0, rolesMigration));
  const adminId = crypto.randomUUID();
  await bindings.DB.prepare(
    "INSERT INTO user (id, name, email, email_verified, role, created_at, updated_at) VALUES (?, 'Admin', 'old-admin@example.com', 1, 'admin', 0, 0)",
  )
    .bind(adminId)
    .run();

  await applyD1Migrations(bindings.DB, migrations);

  const roles = await listRoles(bindings.DB);
  expect(roles.map(({ name, system }) => ({ name, system }))).toEqual([
    { name: "admin", system: true },
    { name: "support", system: false },
    { name: "user", system: true },
  ]);
  expect(roles.find((role) => role.name === "support")?.permissions).toEqual([
    "user:list",
    "user:get",
    "session:list",
    "file:list-any",
    "file:download-any",
  ]);
  expect(await roleInUse(bindings.DB, "admin")).toBe(true);
});
