import type { FileRecord, PaginationRequest } from "@repo/contracts";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { createDb } from "../../db/client";
import { files } from "../../db/schema/files";
import { decodeCursor, encodeCursor } from "../../lib/cursor";
import { AppError } from "../../lib/errors";

export function publicFile(file: typeof files.$inferSelect): FileRecord {
  return {
    id: file.id,
    name: file.name,
    contentType: file.contentType as FileRecord["contentType"],
    size: file.size,
    createdAt: file.createdAt,
  };
}

export async function listFiles(
  d1: D1Database,
  userId: string,
  input: PaginationRequest,
) {
  const cursor = input.cursor ? decodeCursor(input.cursor) : null;
  // A tuple comparison seeks directly into the composite index on later pages.
  const pageFilter = cursor
    ? sql`(${files.createdAt}, ${files.id}) < (${cursor[0]}, ${cursor[1]})`
    : undefined;
  const rows = await createDb(d1)
    .select()
    .from(files)
    .where(and(eq(files.userId, userId), pageFilter))
    .orderBy(desc(files.createdAt), desc(files.id))
    .limit(input.limit + 1);
  const data = rows.slice(0, input.limit).map(publicFile);
  const last = data.at(-1);
  return {
    data,
    meta: {
      nextCursor: rows.length > input.limit && last ? encodeCursor(last) : null,
    },
  };
}

export async function findFile(d1: D1Database, userId: string, id: string) {
  const [file] = await createDb(d1)
    .select()
    .from(files)
    .where(and(eq(files.userId, userId), eq(files.id, id)))
    .limit(1);
  if (!file) throw new AppError("FILE_NOT_FOUND", "File was not found", 404);
  return file;
}

export function insertFile(d1: D1Database, file: typeof files.$inferInsert) {
  return createDb(d1).insert(files).values(file);
}

export async function userStorageUsage(d1: D1Database, userId: string) {
  const [usage] = await createDb(d1)
    .select({
      count: sql<number>`count(*)`,
      bytes: sql<number>`coalesce(sum(${files.size}), 0)`,
    })
    .from(files)
    .where(eq(files.userId, userId));
  return {
    count: Number(usage?.count ?? 0),
    bytes: Number(usage?.bytes ?? 0),
  };
}

export function listUserFileKeys(
  d1: D1Database,
  userId: string,
  limit: number,
) {
  return createDb(d1)
    .select({ id: files.id, objectKey: files.objectKey })
    .from(files)
    .where(eq(files.userId, userId))
    .limit(limit);
}

export function deleteFileRecords(d1: D1Database, ids: string[]) {
  return createDb(d1).delete(files).where(inArray(files.id, ids));
}

export function deleteFileRecord(d1: D1Database, userId: string, id: string) {
  return createDb(d1)
    .delete(files)
    .where(and(eq(files.userId, userId), eq(files.id, id)));
}
