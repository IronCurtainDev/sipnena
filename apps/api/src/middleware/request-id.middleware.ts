import { createMiddleware } from "hono/factory";
import { logEvent } from "../lib/log";
import { requestContext } from "../lib/request-context";
import type { AppEnv } from "../types/context";

export const requestIdMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const suppliedId = c.req.header("x-request-id");
  const requestId =
    suppliedId && /^[a-zA-Z0-9._:-]{1,64}$/.test(suppliedId)
      ? suppliedId
      : crypto.randomUUID();
  c.set("requestId", requestId);
  const started = Date.now();
  await requestContext.run({ requestId }, next);
  c.header("x-request-id", requestId);
  // routePath is the matched pattern (for example /api/auth/*), never the raw
  // path, so one-use tokens in callback URLs are not recorded.
  if (c.env.ENVIRONMENT !== "development")
    logEvent("info", "request", {
      requestId,
      method: c.req.method,
      route: c.req.routePath,
      status: c.res.status,
      durationMs: Date.now() - started,
      clientVersion: c.req.header("x-client-version")?.slice(0, 32),
    });
});
