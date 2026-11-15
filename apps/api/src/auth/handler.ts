import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { clientIp, enforceRateLimit } from "../lib/rate-limit";
import type { AppEnv } from "../types/context";
import { getAuth } from "./auth";

const emailPaths = [
  "/sign-up/email",
  "/sign-in/email",
  "/request-password-reset",
  "/send-verification-email",
  "/organization/invite-member",
];

const internalAuthError = JSON.stringify({
  code: "INTERNAL_SERVER_ERROR",
  message: "Unexpected authentication error",
});

function sanitizeAuthServerError(response: Response) {
  if (response.status < 500) return response;
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.delete("Content-Length");
  return new Response(internalAuthError, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const authRateLimit = createMiddleware<AppEnv>(async (c, next) => {
  if (c.req.method === "POST") {
    const ip = clientIp(c.req.raw, c.env);
    await enforceRateLimit(c.env.AUTH_RATE_LIMITER, `auth:${ip}`, c.env);
    if (emailPaths.some((path) => c.req.path.endsWith(path))) {
      await enforceRateLimit(c.env.EMAIL_RATE_LIMITER, `email:${ip}`, c.env);
    }
  }
  await next();
});

export async function authHandler(c: Context<AppEnv>) {
  const response = await getAuth(c.env).handler(c.req.raw);
  c.res = sanitizeAuthServerError(response);
  c.header("Cache-Control", "private, no-store");
  return c.res;
}
