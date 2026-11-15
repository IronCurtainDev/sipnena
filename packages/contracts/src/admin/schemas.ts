import { z } from "zod";
import { paginationMetaSchema } from "../common/pagination";
import { fileSchema } from "../files/schemas";

export const adminFileSchema = fileSchema
  .extend({
    ownerId: z.string(),
    ownerEmail: z.email(),
    ownerName: z.string(),
  })
  .meta({ id: "AdminFile" });

export const adminFilesListResponseSchema = z
  .object({
    data: z.array(adminFileSchema),
    meta: paginationMetaSchema,
  })
  .meta({ id: "AdminFilesListResponse" });

export type AdminFile = z.infer<typeof adminFileSchema>;
