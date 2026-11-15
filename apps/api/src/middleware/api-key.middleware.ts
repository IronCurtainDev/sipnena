import { createMiddleware } from "hono/factory";
import { AppError } from "../lib/errors";
import type { Bindings } from "../types/bindings";
import type { AppEnv } from "../types/context";

export const API_KEY_HEADER = "x-api-key";

function isPublicAuthNavigation(request: Request) {
  if (request.method !== "GET") return false;
  const path = new URL(request.url).pathname;
  return (
    path === "/api/auth/verify-email" || path.startsWith("/api/auth/callback/")
  );
}

export const apiKeyMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  // These browser-facing tools require the api-docs:view permission in production.
  // They cannot attach a custom header while Swagger UI is loading its document.
  const documentationPath = [
    "/api/docs",
    "/api/openapi.json",
    "/api/auth/open-api/generate-schema",
  ].includes(new URL(c.req.url).pathname);
  if (documentationPath) return next();
  // Telescope's dashboard loads its own data without the header. The route
  // is not served outside development and still requires a signed-in session.
  const telescopePath = /^\/api\/telescope(\/|$)/.test(
    new URL(c.req.url).pathname,
  );
  if (telescopePath && c.env.ENVIRONMENT === "development") return next();
  // Top-level email verification and OAuth navigations cannot attach a
  // custom header. Better Auth still validates their one-use token or state.
  if (isPublicAuthNavigation(c.req.raw)) return next();
  const accepted = acceptedApiKeys(c.env);
  if (!accepted.length) {
    throw new AppError(
      "API_KEY_NOT_CONFIGURED",
      "API key is not configured",
      503,
    );
  }
  if (!accepted.includes(c.req.header(API_KEY_HEADER) ?? "")) {
    throw new AppError("INVALID_API_KEY", "A valid API key is required", 401);
  }
  await next();
});

// Installed mobile builds keep their key until users update, so rotation adds
// the new key to API_KEYS and removes the old one only after old builds expire.
export function acceptedApiKeys(env: Pick<Bindings, "API_KEY" | "API_KEYS">) {
  return [env.API_KEY, ...(env.API_KEYS ?? "").split(",")]
    .map((key) => key?.trim() ?? "")
    .filter(Boolean);
}
