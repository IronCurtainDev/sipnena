export type RateLimiter = {
  limit(input: { key: string }): Promise<{ success: boolean }>;
};

export type Bindings = {
  DB: D1Database;
  FILES: R2Bucket;
  AUTH_RATE_LIMITER?: RateLimiter;
  EMAIL_RATE_LIMITER?: RateLimiter;
  UPLOAD_RATE_LIMITER?: RateLimiter;
  CF_VERSION_METADATA?: WorkerVersionMetadata;
  ENVIRONMENT?: "development" | "staging" | "production";
  API_KEY?: string;
  /** Comma-separated accepted keys, so a key can be rotated with an overlap. */
  API_KEYS?: string;
  MIN_MOBILE_VERSION?: string;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  BETTER_AUTH_URL?: string;
  BETTER_AUTH_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_MOBILE_CLIENT_IDS?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  EMAIL_MODE?: "preview" | "resend";
  ENABLE_ORGANIZATIONS?: "true" | "false";
  TURNSTILE_SECRET_KEY?: string;
};
