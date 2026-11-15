import type { AdminFile, PaginationRequest } from "@repo/contracts";
import { desc, eq, sql } from "drizzle-orm";
import { createDb } from "../../db/client";
import { user } from "../../db/schema/auth.generated";
import { files } from "../../db/schema/files";
import { decodeCursor, encodeCursor } from "../../lib/cursor";
import { AppError } from "../../lib/errors";

export async function listAdminFiles(d1: D1Database, input: PaginationRequest) {
  const cursor = input.cursor ? decodeCursor(input.cursor) : null;
  const rows = await createDb(d1)
    .select({
      id: files.id,
      name: files.name,
      contentType: files.contentType,
      size: files.size,
      objectKey: files.objectKey,
      createdAt: files.createdAt,
      ownerId: user.id,
      ownerEmail: user.email,
      ownerName: user.name,
    })
    .from(files)
    .innerJoin(user, eq(files.userId, user.id))
    .where(
      cursor
        ? sql`(${files.createdAt}, ${files.id}) < (${cursor[0]}, ${cursor[1]})`
        : undefined,
    )
    .orderBy(desc(files.createdAt), desc(files.id))
    .limit(input.limit + 1);
  const page = rows.slice(0, input.limit);
  const last = page.at(-1);
  return {
    meta: {
      nextCursor: rows.length > input.limit && last ? encodeCursor(last) : null,
    },
    data: page.map((file) => ({
      id: file.id,
      name: file.name,
      contentType: file.contentType as AdminFile["contentType"],
      size: file.size,
      createdAt: file.createdAt,
      ownerId: file.ownerId,
      ownerEmail: file.ownerEmail,
      ownerName: file.ownerName,
    })),
  };
}

export async function findAdminFile(d1: D1Database, id: string) {
  const [file] = await createDb(d1)
    .select({
      id: files.id,
      name: files.name,
      contentType: files.contentType,
      size: files.size,
      objectKey: files.objectKey,
      ownerId: user.id,
      ownerEmail: user.email,
      ownerName: user.name,
    })
    .from(files)
    .innerJoin(user, eq(files.userId, user.id))
    .where(eq(files.id, id))
    .limit(1);
  if (!file) throw new AppError("FILE_NOT_FOUND", "File was not found", 404);
  return file;
}

export function deleteAdminFileRecord(d1: D1Database, id: string) {
  return createDb(d1).delete(files).where(eq(files.id, id));
}
