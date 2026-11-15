import type { PaginationRequest } from "@repo/contracts";
import { AppError } from "../../lib/errors";
import { fileDownloadResponse, requireStorage } from "../../lib/storage";
import type { Bindings } from "../../types/bindings";
import { recordAdminAction } from "./admin.audit";
import {
  deleteAdminFileRecord,
  findAdminFile,
  listAdminFiles,
} from "./admin.queries";

export function listFilesForAdmin(env: Bindings, input: PaginationRequest) {
  return listAdminFiles(env.DB, input);
}

export async function downloadFileForAdmin(
  env: Bindings,
  id: string,
  actorUserId: string,
) {
  const bucket = requireStorage(env);
  const file = await findAdminFile(env.DB, id);
  const object = await bucket.get(file.objectKey);
  if (!object)
    throw new AppError(
      "FILE_CONTENT_NOT_FOUND",
      "File content was not found",
      404,
    );
  await recordAdminAction(env, {
    actorUserId,
    action: "download-file",
    targetType: "file",
    targetId: id,
  });
  return fileDownloadResponse(object, file);
}

export async function deleteFileForAdmin(
  env: Bindings,
  id: string,
  actorUserId: string,
) {
  const bucket = requireStorage(env);
  const file = await findAdminFile(env.DB, id);
  await bucket.delete(file.objectKey);
  await deleteAdminFileRecord(env.DB, id);
  await recordAdminAction(env, {
    actorUserId,
    action: "delete-file",
    targetType: "file",
    targetId: id,
  });
}
