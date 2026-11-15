import { z } from "zod";
import { paginationMetaSchema } from "../common/pagination";
import { fileSchema } from "./schemas";

export const filesListResponseSchema = z
  .object({
    data: z.array(fileSchema),
    meta: paginationMetaSchema,
  })
  .meta({ id: "FilesListResponse" });

export const fileResponseSchema = z
  .object({ data: fileSchema })
  .meta({ id: "FileResponse" });

export type FilesListResponse = z.infer<typeof filesListResponseSchema>;
export type FileResponse = z.infer<typeof fileResponseSchema>;
