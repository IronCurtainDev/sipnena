import { AppError } from "./errors";
import type { Bindings } from "../types/bindings";

// Both the personal files service and the admin files service need these.
// Keeping them here avoids duplicating R2 error handling and the RFC 5987
// Content-Disposition encoder across two feature modules.

export function requireStorage(env: Bindings) {
  if (!env.FILES)
    throw new AppError(
      "STORAGE_NOT_CONFIGURED",
      "File storage is not configured",
      503,
    );
  return env.FILES;
}

// RFC 5987 encoding for the filename* parameter in Content-Disposition.
// Encodes the full Unicode filename so browsers save it with the correct name.
function encodeFilename(name: string) {
  return encodeURIComponent(name).replace(
    /['()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

export function fileDownloadResponse(
  object: R2ObjectBody,
  file: { name: string; contentType: string },
) {
  return new Response(object.body, {
    headers: {
      "Content-Type": file.contentType,
      "Content-Length": String(object.size),
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeFilename(file.name)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
