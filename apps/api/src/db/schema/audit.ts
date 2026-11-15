import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

// No foreign keys: audit history must outlive the users and files it names.
export const adminAudit = sqliteTable(
  "admin_audit",
  {
    id: text("id").primaryKey(),
    actorUserId: text("actor_user_id").notNull(),
    action: text("action").notNull(),
    targetType: text("target_type").notNull(),
    targetId: text("target_id"),
    requestId: text("request_id"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [index("admin_audit_created_idx").on(table.createdAt)],
);
