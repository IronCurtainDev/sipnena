import { MAX_USER_FILES, MAX_USER_STORAGE_BYTES } from "@repo/contracts";
import { AppError } from "../../lib/errors";
import { validateUpload } from "../../lib/limits";
import { logEvent } from "../../lib/log";
import { fileDownloadResponse, requireStorage } from "../../lib/storage";
import type { Bindings } from "../../types/bindings";
import {
  deleteFileRecord,
  deleteFileRecords,
  findFile,
  insertFile,
  listUserFileKeys,
  publicFile,
  userStorageUsage,
} from "./files.queries";

// D1 allows at most 100 bound parameters per statement.
const USER_DELETE_BATCH = 50;
const MAX_USER_DELETE_BATCHES = 10;

export async function uploadFile(
  env: Bindings,
  userId: string,
  file: File,
  requestId: string,
) {
  await validateUpload(file);
  const usage = await userStorageUsage(env.DB, userId);
  if (
    usage.count >= MAX_USER_FILES ||
    usage.bytes + file.size > MAX_USER_STORAGE_BYTES
  ) {
    throw new AppError(
      "STORAGE_QUOTA_EXCEEDED",
      "Delete files before uploading another one",
      409,
    );
  }
  const bucket = requireStorage(env);
  const id = crypto.randomUUID();
  const record = {
    id,
    userId,
    name: file.name.trim(),
    contentType: file.type,
    size: file.size,
    createdAt: new Date().toISOString(),
    objectKey: `users/${userId}/${id}`,
  };
  await bucket.put(record.objectKey, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
    // Private recovery hints for reconciling an R2 object when its D1 write
    // was interrupted. Never put email, names, credentials, or tokens here.
    customMetadata: {
      metadataVersion: "1",
      uploadId: id,
      ownerUserId: userId,
      uploadedByUserId: userId,
    },
  });
  try {
    await insertFile(env.DB, record);
  } catch (error) {
    try {
      await bucket.delete(record.objectKey);
    } catch {
      logEvent("error", "orphan_file_cleanup_failed", {
        requestId,
        objectKey: record.objectKey,
      });
    }
    throw error;
  }
  return { data: publicFile(record) };
}

export async function downloadFile(env: Bindings, userId: string, id: string) {
  const bucket = requireStorage(env);
  const file = await findFile(env.DB, userId, id);
  const object = await bucket.get(file.objectKey);
  if (!object)
    throw new AppError(
      "FILE_CONTENT_NOT_FOUND",
      "File content was not found",
      404,
    );
  return fileDownloadResponse(object, file);
}

export async function deleteFile(env: Bindings, userId: string, id: string) {
  const bucket = requireStorage(env);
  const file = await findFile(env.DB, userId, id);
  // R2 deletion is idempotent; if D1 fails, retrying this operation is safe.
  await bucket.delete(file.objectKey);
  await deleteFileRecord(env.DB, userId, id);
}

// Objects are removed before their rows, so a failed run leaves rows that a
// retried account deletion finds again instead of unreachable R2 objects.
export async function deleteAllFilesForUser(env: Bindings, userId: string) {
  for (let batch = 0; batch < MAX_USER_DELETE_BATCHES; batch += 1) {
    const rows = await listUserFileKeys(env.DB, userId, USER_DELETE_BATCH);
    if (!rows.length) return;
    await requireStorage(env).delete(rows.map((row) => row.objectKey));
    await deleteFileRecords(
      env.DB,
      rows.map((row) => row.id),
    );
  }
  if ((await listUserFileKeys(env.DB, userId, 1)).length) {
    throw new AppError(
      "ACCOUNT_CLEANUP_INCOMPLETE",
      "Account file cleanup is incomplete; retry account deletion",
      503,
    );
  }
}
