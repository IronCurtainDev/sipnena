import { PERMISSION_NAMES, type Role } from "@repo/contracts";
import { asc, eq, inArray } from "drizzle-orm";
import { createDb } from "../../db/client";
import { role, rolePermission } from "../../db/schema/access";
import { AppError } from "../../lib/errors";

type RoleRow = typeof role.$inferSelect;
type RoleInput = { description: string; permissions: readonly string[] };

const catalogOrder = (permissions: string[]) =>
  PERMISSION_NAMES.filter((permission) => permissions.includes(permission));

function toRole(row: RoleRow, permissions: string[]): Role {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    system: row.isSystem,
    permissions: catalogOrder(permissions),
    createdAt: row.createdAt,
  };
}

// Roles are admin-defined configuration, a short list read in full.
export async function listRoles(d1: D1Database) {
  const rows = await createDb(d1)
    .select({ role, permission: rolePermission.permission })
    .from(role)
    .leftJoin(rolePermission, eq(rolePermission.roleId, role.id))
    .orderBy(asc(role.name));
  const grouped = new Map<string, { row: RoleRow; permissions: string[] }>();
  for (const { role: row, permission } of rows) {
    const entry = grouped.get(row.id) ?? { row, permissions: [] };
    if (permission) entry.permissions.push(permission);
    grouped.set(row.id, entry);
  }
  return [...grouped.values()].map(({ row, permissions }) =>
    toRole(row, permissions),
  );
}

export async function findRole(d1: D1Database, id: string) {
  const roles = await createDb(d1)
    .select({ role, permission: rolePermission.permission })
    .from(role)
    .leftJoin(rolePermission, eq(rolePermission.roleId, role.id))
    .where(eq(role.id, id));
  const first = roles[0];
  if (!first) throw new AppError("ROLE_NOT_FOUND", "Role not found", 404);
  return toRole(
    first.role,
    roles.flatMap((row) => (row.permission ? [row.permission] : [])),
  );
}

export async function permissionsForRoleNames(d1: D1Database, names: string[]) {
  if (!names.length) return new Set<string>();
  const rows = await createDb(d1)
    .select({ permission: rolePermission.permission })
    .from(role)
    .innerJoin(rolePermission, eq(rolePermission.roleId, role.id))
    .where(inArray(role.name, names));
  return new Set(rows.map((row) => row.permission));
}

export async function insertRole(
  d1: D1Database,
  input: RoleInput & { name: string },
) {
  const db = createDb(d1);
  const [existing] = await db
    .select({ id: role.id })
    .from(role)
    .where(eq(role.name, input.name));
  if (existing)
    throw new AppError("ROLE_NAME_TAKEN", "A role with this name exists", 409);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const insertRoleRow = db.insert(role).values({
    id,
    name: input.name,
    description: input.description,
    createdAt: now,
    updatedAt: now,
  });
  await (input.permissions.length
    ? db.batch([
        insertRoleRow,
        db
          .insert(rolePermission)
          .values(
            input.permissions.map((permission) => ({ roleId: id, permission })),
          ),
      ])
    : insertRoleRow);
  return id;
}

// One D1 batch, so the permission list is never left half replaced.
export async function updateRole(
  d1: D1Database,
  id: string,
  input: Partial<RoleInput>,
) {
  const db = createDb(d1);
  const touch = db
    .update(role)
    .set({
      updatedAt: new Date().toISOString(),
      ...(input.description === undefined
        ? {}
        : { description: input.description }),
    })
    .where(eq(role.id, id));
  if (!input.permissions) {
    await touch;
    return;
  }
  const clear = db.delete(rolePermission).where(eq(rolePermission.roleId, id));
  const rows = input.permissions.map((permission) => ({
    roleId: id,
    permission,
  }));
  await (rows.length
    ? db.batch([touch, clear, db.insert(rolePermission).values(rows)])
    : db.batch([touch, clear]));
}

export async function deleteRole(d1: D1Database, id: string) {
  const db = createDb(d1);
  await db.batch([
    db.delete(rolePermission).where(eq(rolePermission.roleId, id)),
    db.delete(role).where(eq(role.id, id)),
  ]);
}

// user.role is Better Auth's comma-separated list, so this cannot use an
// index. Deleting a role is rare, and LIMIT 1 stops at the first holder.
export async function roleInUse(d1: D1Database, name: string) {
  const row = await d1
    .prepare(
      "SELECT 1 FROM user WHERE ',' || replace(coalesce(role, ''), ' ', '') || ',' LIKE '%,' || ? || ',%' LIMIT 1",
    )
    .bind(name)
    .first();
  return row !== null;
}
