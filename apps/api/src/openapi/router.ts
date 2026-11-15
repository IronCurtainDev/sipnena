import { OpenAPIHono } from "@hono/zod-openapi";
import { errorResponseSchema } from "@repo/contracts";
import { AppError } from "../lib/errors";
import type { AppEnv } from "../types/context";

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    defaultHook: (result) => {
      if (!result.success) {
        const issues = result.error.issues.slice(0, 20).map((issue) => ({
          path: issue.path.map(String).join("."),
          message: issue.message,
        }));
        const message = issues[0]?.message ?? "Invalid request";
        throw new AppError("VALIDATION_ERROR", message, 400, issues);
      }
    },
  });
}

const error = {
  description: "The request could not be completed",
  content: { "application/json": { schema: errorResponseSchema } },
};

export const errorResponses = {
  400: error,
  401: error,
  403: error,
  404: error,
  409: error,
  413: error,
  415: error,
  429: error,
  500: error,
  503: error,
};

export const privateSecurity: Array<Record<string, string[]>> = [
  { apiKeyAuth: [], cookieAuth: [] },
  { apiKeyAuth: [], bearerAuth: [] },
];

export const publicSecurity: Array<Record<string, string[]>> = [
  { apiKeyAuth: [] },
];
