import { z } from "zod";

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_USER_FILES = 500;
export const MAX_USER_STORAGE_BYTES = 250 * 1024 * 1024;
export const FILE_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export const FILE_EXTENSIONS = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/pdf": [".pdf"],
} as const satisfies Record<
  (typeof FILE_CONTENT_TYPES)[number],
  readonly string[]
>;

export const fileSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1).max(200),
    contentType: z.enum(FILE_CONTENT_TYPES),
    size: z.number().int().positive().max(MAX_FILE_BYTES),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: "File" });

export type FileRecord = z.infer<typeof fileSchema>;
