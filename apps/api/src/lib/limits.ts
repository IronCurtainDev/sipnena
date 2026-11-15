import {
  FILE_CONTENT_TYPES,
  FILE_EXTENSIONS,
  MAX_FILE_BYTES,
} from "@repo/contracts";
import { AppError } from "./errors";

export const MAX_MULTIPART_BYTES = MAX_FILE_BYTES + 64 * 1024;

const startsWith = (value: Uint8Array, prefix: number[]) =>
  prefix.every((byte, index) => value[index] === byte);

function hasExpectedSignature(type: string, bytes: Uint8Array) {
  if (type === "image/jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]);
  if (type === "image/png")
    return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (type === "application/pdf")
    return startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  return (
    type === "image/webp" &&
    startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    startsWith(bytes.slice(8), [0x57, 0x45, 0x42, 0x50])
  );
}

export async function validateUpload(file: File) {
  if (file.size === 0)
    throw new AppError("EMPTY_UPLOAD", "Choose a non-empty file");
  if (file.size > MAX_FILE_BYTES) {
    throw new AppError(
      "UPLOAD_TOO_LARGE",
      "Files must be 5 MiB or smaller",
      413,
    );
  }
  if (!FILE_CONTENT_TYPES.some((type) => type === file.type)) {
    throw new AppError(
      "UNSUPPORTED_FILE_TYPE",
      "Choose a JPEG, PNG, WebP, or PDF file",
      415,
    );
  }
  const name = file.name.trim();
  const extensions = FILE_EXTENSIONS[file.type as keyof typeof FILE_EXTENSIONS];
  if (!extensions.some((extension) => name.toLowerCase().endsWith(extension))) {
    throw new AppError(
      "FILE_CONTENT_INVALID",
      "The filename extension does not match the selected file type",
      415,
    );
  }
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (!hasExpectedSignature(file.type, bytes)) {
    throw new AppError(
      "FILE_CONTENT_INVALID",
      "The file content does not match its declared type",
      415,
    );
  }
  const hasControlCharacters = [...name].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
  if (
    !name ||
    name.length > 200 ||
    name.includes("/") ||
    name.includes("\\") ||
    hasControlCharacters
  ) {
    throw new AppError(
      "INVALID_FILE_NAME",
      "Use a filename of 1–200 characters without path separators",
    );
  }
}
