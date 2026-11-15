import type { ErrorCode, ValidationIssue } from "@repo/contracts";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly status: ContentfulStatusCode = 400,
    public readonly issues?: ValidationIssue[],
  ) {
    super(message);
  }
}
