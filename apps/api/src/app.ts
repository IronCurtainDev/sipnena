import { swaggerUI } from "@hono/swagger-ui";
import { createMiddleware } from "hono/factory";
import { createTelescope, memoryStorage } from "hono-telescope";
import { authRateLimit, authHandler } from "./auth/handler";
import { ensureDevelopmentAdmin, getAuth } from "./auth/auth";
import { syncAuthRoles } from "./auth/access-control";
import { boundedBody } from "./middleware/body-limit.middleware";
import { apiKeyMiddleware } from "./middleware/api-key.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { requestIdMiddleware } from "./middleware/request-id.middleware";
import { securityMiddleware } from "./middleware/security.middleware";
import {
  authMiddleware,
  permissionOrDevelopment,
  requirePermission,
} from "./middleware/auth.middleware";
import { idempotencyMiddleware } from "./middleware/idempotency.middleware";
import { accessRoutes } from "./modules/access/access.routes";
import { adminTargetGuard } from "./modules/access/admin-target.guard";
import { roleAssignmentGuard } from "./modules/access/role-assignment.guard";
import { adminAuthAudit } from "./modules/admin/admin.audit";
import { adminRoutes } from "./modules/admin/admin.routes";
import { filesRoutes } from "./modules/files/files.routes";
import { systemRoutes } from "./modules/system/system.routes";
import { createRouter } from "./openapi/router";
import { mergeAuthOpenApi } from "./openapi/merge";
import { assertValidEnv } from "./env";
import { AppError } from "./lib/errors";
import type { AppEnv } from "./types/context";

// Bump the minor version for additive /api/v1 changes and record them in API_CHANGELOG.md.
const OPENAPI_VERSION = "1.4.0";

const telescope = createTelescope({
  enabled: true,
  storage: memoryStorage({ maxEntries: 500 }),
  dashboardPath: "/api/telescope",
  ignorePaths: ["/api/telescope", "/api/docs", "/api/openapi.json"],
  capture: { requestBody: false, responseBody: false, maxBodySize: 32768 },
  redact: {
    headers: ["authorization", "cookie", "set-cookie", "x-api-key"],
    bodyKeys: ["password", "token", "secret", "authorization"],
  },
});
const telescopeMiddleware = telescope.middleware();
const apiDocsGuard = permissionOrDevelopment("api-docs:view");
const telescopeGuard = requirePermission("api-docs:view");
// Telescope stores requests in per-isolate memory, which is incomplete and
// wasteful on deployed Workers; it is a local debugging tool only.
const developmentOnly = createMiddleware<AppEnv>(async (c, next) => {
  if (c.env.ENVIRONMENT !== "development")
    throw new AppError("NOT_FOUND", "API route was not found", 404);
  await next();
});

export function createApp() {
  const app = createRouter();
  app.use("*", (c, next) =>
    c.env.ENVIRONMENT === "development"
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- hono-telescope types its middleware for Context<any>.
        telescopeMiddleware(c, next)
      : next(),
  );
  app.use("*", requestIdMiddleware, securityMiddleware);
  // Health stays a pure liveness probe; everything else needs valid configuration.
  app.use("/api/*", async (c, next) => {
    if (c.req.path !== "/api/health") assertValidEnv(c.env);
    await next();
  });
  app.use("/api", apiKeyMiddleware);
  app.use("/api/*", apiKeyMiddleware);
  app.use("*", async (c, next) => {
    await next();
    if (!c.res.headers.has("Cache-Control"))
      c.header("Cache-Control", "no-store");
  });
  app.use("/api/openapi.json", async (c, next) => {
    await next();
    const application = await c.res
      .clone()
      .json<Parameters<typeof mergeAuthOpenApi>[0]>();
    const authentication = await (
      getAuth(c.env).api as unknown as {
        generateOpenAPISchema: () => Promise<
          Parameters<typeof mergeAuthOpenApi>[1]
        >;
      }
    ).generateOpenAPISchema();
    c.res = Response.json(mergeAuthOpenApi(application, authentication));
  });
  app.onError(errorMiddleware);
  app.notFound((c) =>
    c.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "API route was not found",
          requestId: c.get("requestId"),
        },
      },
      404,
    ),
  );

  app.openAPIRegistry.registerComponent("securitySchemes", "cookieAuth", {
    type: "apiKey",
    in: "cookie",
    name: "__Secure-better-auth.session_token",
    description:
      "Browser session cookie. Local HTTP uses better-auth.session_token.",
  });
  app.openAPIRegistry.registerComponent("securitySchemes", "apiKeyAuth", {
    type: "apiKey",
    in: "header",
    name: "x-api-key",
    description:
      "Public abuse-control key required for /api requests (not authorization). Mobile clients should also send x-client-version.",
  });
  app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    description:
      "Signed session token from the set-auth-token response header.",
  });

  const routes = app
    .route("/api", systemRoutes)
    .use("/api/docs", apiDocsGuard)
    .use("/api/openapi.json", apiDocsGuard)
    .use("/api/auth/open-api/generate-schema", apiDocsGuard)
    .get(
      "/api/docs",
      swaggerUI({
        title: "MVP application API",
        url: "/api/openapi.json",
        persistAuthorization: true,
      }),
    )
    .use("/api/telescope", developmentOnly, telescopeGuard)
    .use("/api/telescope/*", developmentOnly, telescopeGuard)
    .route("/api/telescope", telescope.dashboard())
    // Reject abusive/oversized auth requests before middleware clones or
    // parses their bodies.
    .use("/api/auth/*", authRateLimit, boundedBody(64 * 1024))
    .use("/api/auth/admin/*", authMiddleware)
    .use("/api/auth/admin/*", adminTargetGuard)
    // Better Auth uses user:ban for both operations. Keep application roles
    // atomic by enforcing the exact action before its generic plugin check.
    .use("/api/auth/admin/ban-user", requirePermission("user:ban"))
    .use("/api/auth/admin/unban-user", requirePermission("user:unban"))
    .use("/api/auth/admin/set-role", roleAssignmentGuard)
    .use("/api/auth/admin/create-user", roleAssignmentGuard)
    .use("/api/auth/admin/update-user", roleAssignmentGuard)
    // Better Auth checks each admin endpoint against these D1-backed roles.
    .use("/api/auth/admin/*", async (c, next) => {
      await syncAuthRoles(c.env);
      await next();
    })
    .use("/api/auth/admin/*", adminAuthAudit)
    .post("/api/dev/bootstrap-admin", developmentOnly, async (c) => {
      await ensureDevelopmentAdmin(c.env, true);
      return c.body(null, 204);
    })
    .on(["GET", "POST"], "/api/auth/*", authHandler)
    .use("/api/v1/*", idempotencyMiddleware)
    .route("/api/v1/access", accessRoutes)
    .route("/api/v1/admin", adminRoutes)
    .route("/api/v1/files", filesRoutes);

  app.doc31("/api/openapi.json", {
    openapi: "3.1.0",
    info: { title: "MVP application API", version: OPENAPI_VERSION },
    servers: [{ url: "/" }],
  });
  return routes;
}

export const app = createApp();
export type AppType = typeof app;
