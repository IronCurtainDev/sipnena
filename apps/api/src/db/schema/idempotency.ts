import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// One row per caller and Idempotency-Key. The request hash rejects reuse of
// that key for a different route or body.
export const idempotencyKeys = sqliteTable(
  "idempotency_keys",
  {
    key: text("key").notNull(),
    userId: text("user_id").notNull(),
    route: text("route").notNull(),
    requestHash: text("request_hash").notNull(),
    status: text("status", { enum: ["pending", "completed"] }).notNull(),
    statusCode: integer("status_code"),
    responseHeaders: text("response_headers"),
    responseBody: text("response_body"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.key, table.userId] }),
    index("idempotency_keys_expires_at_idx").on(table.expiresAt),
  ],
);
