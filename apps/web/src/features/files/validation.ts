import {
  FILE_CONTENT_TYPES,
  FILE_EXTENSIONS,
  MAX_FILE_BYTES,
} from "@repo/contracts";
import { formatBytes } from "@/lib/format";

export const acceptedFileTypes = FILE_CONTENT_TYPES.join(",");
export const uploadHint = `JPEG, PNG, WebP or PDF. Up to ${formatBytes(MAX_FILE_BYTES)} per file.`;

// Mirrors the server rules so people see problems before uploading; the API stays authoritative.
export function uploadProblem(file: Pick<File, "name" | "size" | "type">) {
  if (file.size > MAX_FILE_BYTES)
    return `Choose a file no larger than ${formatBytes(MAX_FILE_BYTES)}.`;
  if (!file.size) return "Choose a file that is not empty.";
  if (!FILE_CONTENT_TYPES.some((contentType) => contentType === file.type))
    return "Choose a JPEG, PNG, WebP, or PDF file.";
  const extensions = FILE_EXTENSIONS[file.type as keyof typeof FILE_EXTENSIONS];
  if (
    !extensions.some((extension) => file.name.toLowerCase().endsWith(extension))
  )
    return "The filename extension does not match the selected file type.";
  return null;
}
