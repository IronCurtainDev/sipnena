import { z } from "zod";

export const healthResponseSchema = z
  .object({
    ok: z.literal(true),
    version: z.string().meta({ description: "Application API major version" }),
    deploymentId: z.string().nullable().meta({
      description: "Cloudflare Worker version ID of this deployment, if known",
    }),
    requestId: z.string(),
  })
  .meta({ id: "HealthResponse" });

export const configResponseSchema = z
  .object({
    googleEnabled: z.boolean(),
    organizationsEnabled: z.boolean(),
    apiVersion: z.string(),
    minSupportedMobileVersion: z.string().nullable().meta({
      description:
        "Oldest mobile app version (major.minor.patch) the API still supports; older apps should require an update",
    }),
  })
  .meta({ id: "ConfigResponse" });

export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type ConfigResponse = z.infer<typeof configResponseSchema>;
