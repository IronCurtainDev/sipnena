import { createRoute } from "@hono/zod-openapi";
import { configResponseSchema, healthResponseSchema } from "@repo/contracts";
import { getCapabilities } from "../../auth/config";
import { createRouter, publicSecurity } from "../../openapi/router";

// Application API major version; bump only alongside a new /api/vN prefix.
export const API_VERSION = "1";

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  operationId: "getHealth",
  tags: ["Public"],
  security: publicSecurity,
  responses: {
    200: {
      description: "Worker is responding; does not query storage",
      content: { "application/json": { schema: healthResponseSchema } },
    },
  },
});

const configRoute = createRoute({
  method: "get",
  path: "/config",
  operationId: "getConfiguration",
  tags: ["Public"],
  security: publicSecurity,
  responses: {
    200: {
      description: "Enabled optional features and client compatibility",
      content: { "application/json": { schema: configResponseSchema } },
    },
  },
});

export const systemRoutes = createRouter()
  .openapi(healthRoute, (c) =>
    c.json(
      {
        ok: true as const,
        version: API_VERSION,
        deploymentId: c.env.CF_VERSION_METADATA?.id ?? null,
        requestId: c.get("requestId"),
      },
      200,
    ),
  )
  .openapi(configRoute, (c) =>
    c.json(
      {
        ...getCapabilities(c.env),
        apiVersion: API_VERSION,
        minSupportedMobileVersion: c.env.MIN_MOBILE_VERSION ?? null,
      },
      200,
    ),
  );
