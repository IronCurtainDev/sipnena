import { createMiddleware } from "hono/factory";
import { verifyTurnstileToken } from "../lib/turnstile";
import type { AppEnv } from "../types/context";

// Opt in on a specific route. Reads cf-turnstile-response or x-turnstile-token.
export const turnstileMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const token =
    c.req.header("cf-turnstile-response") ?? c.req.header("x-turnstile-token");
  await verifyTurnstileToken(c.env, token, c.req.header("cf-connecting-ip"));
  await next();
});
