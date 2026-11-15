import type { Permission } from "@repo/contracts";
import { createMiddleware } from "hono/factory";
import { permissionsFor } from "../auth/access-control";
import { ensureDevelopmentAdmin, getAuth } from "../auth/auth";
import { authSettings } from "../auth/config";
import { AppError } from "../lib/errors";
import type { AppEnv, Session } from "../types/context";

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  await ensureDevelopmentAdmin(c.env);
  const auth = getAuth(c.env);
  const headers = new Headers(c.req.raw.headers);
  // Never fall back to a cookie when a native client supplied a bearer token.
  if (headers.has("authorization")) headers.delete("cookie");
  const session = await auth.api.getSession({ headers });
  if (!session) throw new AppError("UNAUTHORIZED", "Sign in to continue", 401);
  c.set("session", session);
  c.header("Cache-Control", "private, no-store");
  await next();
});

export function sessionRole(session: AppEnv["Variables"]["session"]) {
  return "role" in session.user ? session.user.role : null;
}

const permissionGuard = (required: Permission[], mode: "every" | "some") =>
  createMiddleware<AppEnv>(async (c, next) => {
    const check = async () => {
      const granted = await permissionsFor(c.env, sessionRole(c.var.session));
      if (!required[mode]((permission) => granted.includes(permission))) {
        throw new AppError(
          "FORBIDDEN",
          "You do not have permission to do this",
          403,
        );
      }
      await next();
    };
    // Reuse a session loaded by router-level middleware.
    if ((c.var.session as Session | undefined) !== undefined) await check();
    else await authMiddleware(c, check);
  });

// Roles and the permissions they grant are stored in D1.
export const requirePermission = (...required: Permission[]) =>
  permissionGuard(required, "every");

export const requireAnyPermission = (...required: Permission[]) =>
  permissionGuard(required, "some");

export const permissionOrDevelopment = (permission: Permission) => {
  const guard = requirePermission(permission);
  return createMiddleware<AppEnv>(async (c, next) => {
    if (c.env.ENVIRONMENT === "development") {
      await next();
      return;
    }
    await guard(c, next);
  });
};

export const mutationGuard = createMiddleware<AppEnv>(async (c, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(c.req.method)) return next();
  // Local email delivery is optional. Deployed environments always require a
  // verified address before an authenticated user may mutate state.
  if (
    c.env.ENVIRONMENT !== "development" &&
    !c.get("session").user.emailVerified
  ) {
    throw new AppError(
      "EMAIL_NOT_VERIFIED",
      "Verify your email before making changes",
      403,
    );
  }
  // Native clients authenticate with a signed bearer token and do not use cookies.
  if (!/^Bearer /i.test(c.req.header("authorization") ?? "")) {
    const origin = c.req.header("origin");
    const trustedOrigins = authSettings(c.env).trustedOrigins;
    if (!origin || !trustedOrigins.includes(origin)) {
      throw new AppError(
        "INVALID_ORIGIN",
        "Request origin is not allowed",
        403,
      );
    }
  }
  await next();
});
