import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppError } from "../lib/errors";
import { describeError, logEvent } from "../lib/log";
import type { AppEnv } from "../types/context";

export const errorMiddleware: ErrorHandler<AppEnv> = (error, c) => {
  const requestId = c.get("requestId");
  if (error instanceof AppError) {
    if (error.status === 429) c.header("Retry-After", "60");
    if (error.status >= 500)
      logEvent("error", "request_misconfigured", {
        requestId,
        code: error.code,
        method: c.req.method,
        route: c.req.routePath,
        status: error.status,
      });
    return c.json(
      {
        error: {
          code: error.code,
          message: error.message,
          requestId,
          ...(error.issues ? { issues: error.issues } : {}),
        },
      },
      error.status,
    );
  }
  if (error instanceof HTTPException) {
    return c.json(
      { error: { code: "HTTP_ERROR", message: error.message, requestId } },
      error.status,
    );
  }
  // routePath is the matched pattern, so tokens inside paths are never logged.
  logEvent("error", "request_failed", {
    requestId,
    method: c.req.method,
    route: c.req.routePath,
    status: 500,
    ...describeError(error),
  });
  return c.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected server error",
        requestId,
      },
    },
    500,
  );
};
