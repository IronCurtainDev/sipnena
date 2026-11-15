import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// Role names are the values Better Auth stores in user.role, so they are
// never renamed. Permission names come from @repo/contracts.
export const role = sqliteTable("role", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull().default(""),
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const rolePermission = sqliteTable(
  "role_permission",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    permission: text("permission").notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permission] })],
);

// Serializes the rare access-removing mutation of a super-admin. D1 cannot
// make its precondition check atomic with Better Auth's later user mutation,
// so a short lease closes the cross-request race without new infrastructure.
export const superAdminMutationLock = sqliteTable("super_admin_mutation_lock", {
  name: text("name").primaryKey(),
  ownerId: text("owner_id").notNull(),
  expiresAt: integer("expires_at").notNull(),
});
