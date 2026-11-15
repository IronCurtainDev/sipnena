import { z } from "zod";

// Codes are append-only: never rename or repurpose one that has shipped.
export const ERROR_CODES = [
  "API_KEY_NOT_CONFIGURED",
  "AUTH_NOT_CONFIGURED",
  "CLIENT_IP_UNAVAILABLE",
  "EMAIL_DELIVERY_FAILED",
  "EMAIL_NOT_CONFIGURED",
  "EMAIL_NOT_VERIFIED",
  "EMPTY_UPLOAD",
  "FILE_CONTENT_NOT_FOUND",
  "FILE_CONTENT_INVALID",
  "FILE_NOT_FOUND",
  "FORBIDDEN",
  "HTTP_ERROR",
  "INTERNAL_SERVER_ERROR",
  "INVALID_API_KEY",
  "INVALID_CURSOR",
  "INVALID_FILE_NAME",
  "INVALID_ORIGIN",
  "NOT_FOUND",
  "PAYLOAD_TOO_LARGE",
  "RATE_LIMITED",
  "RATE_LIMIT_UNAVAILABLE",
  "STORAGE_NOT_CONFIGURED",
  "STORAGE_QUOTA_EXCEEDED",
  "UNAUTHORIZED",
  "UNSUPPORTED_FILE_TYPE",
  "UPLOAD_TOO_LARGE",
  "VALIDATION_ERROR",
  "CONFIGURATION_INVALID",
  "ROLE_NOT_FOUND",
  "ROLE_NAME_TAKEN",
  "ROLE_IN_USE",
  "ROLE_PROTECTED",
  "INVALID_IDEMPOTENCY_KEY",
  "IDEMPOTENCY_CONFLICT",
  "BOT_VERIFICATION_FAILED",
  "ACCOUNT_CLEANUP_INCOMPLETE",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export const validationIssueSchema = z
  .object({
    path: z.string(),
    message: z.string(),
  })
  .meta({ id: "ValidationIssue" });

export const errorResponseSchema = z
  .object({
    error: z.object({
      // Kept as a string so older clients tolerate codes added later.
      code: z.string().meta({
        description: `Stable machine-readable code. Known values: ${ERROR_CODES.join(", ")}. Treat unknown codes as a generic failure.`,
      }),
      message: z.string(),
      requestId: z.string(),
      issues: z.array(validationIssueSchema).optional(),
    }),
  })
  .meta({ id: "ErrorResponse" });

export type ValidationIssue = z.infer<typeof validationIssueSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
