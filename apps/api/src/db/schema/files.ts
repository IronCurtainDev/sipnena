import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth.generated";

export const files = sqliteTable(
  "files",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    contentType: text("content_type").notNull(),
    size: integer("size").notNull(),
    objectKey: text("object_key").notNull().unique(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("files_user_created_id_idx").on(
      table.userId,
      table.createdAt,
      table.id,
    ),
  ],
);
