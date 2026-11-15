import { createAuth } from "./auth";

// Schema generation needs configuration, but never connects to this binding.
export const auth = createAuth({
  DB: {} as D1Database,
  FILES: {} as R2Bucket,
  ENVIRONMENT: "development",
  BETTER_AUTH_URL: "http://localhost:5173",
  BETTER_AUTH_SECRET: "schema-generation-only-not-a-runtime-secret",
  EMAIL_MODE: "preview",
  ENABLE_ORGANIZATIONS: "true",
});
