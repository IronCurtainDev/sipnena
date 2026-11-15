import { z } from "zod";
import { AppError } from "./lib/errors";
import { logEvent } from "./lib/log";
import type { Bindings } from "./types/bindings";

// Wrangler vars and .dev.vars use "" for "unset".
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    schema.optional(),
  );

// Formats only; secret presence and cross-field auth rules live in authSettings.
const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "staging", "production"]),
  BETTER_AUTH_URL: optional(z.url()),
  EMAIL_MODE: optional(z.enum(["preview", "resend"])),
  ENABLE_ORGANIZATIONS: optional(z.enum(["true", "false"])),
  MIN_MOBILE_VERSION: optional(
    z.string().regex(/^\d+\.\d+\.\d+$/, "Use major.minor.patch"),
  ),
  GOOGLE_MOBILE_CLIENT_IDS: optional(
    z
      .string()
      .regex(/^[\w.-]+(,\s*[\w.-]+)*$/, "Use comma-separated client IDs"),
  ),
  TURNSTILE_SECRET_KEY: optional(z.string().min(1)),
});

const validated = new WeakSet<Bindings>();

export function assertValidEnv(env: Bindings) {
  if (validated.has(env)) return;
  const result = envSchema.safeParse(env);
  if (!result.success) {
    // Variable names only; values may be secrets.
    const invalid = [
      ...new Set(result.error.issues.map((issue) => issue.path.join("."))),
    ];
    logEvent("error", "configuration_invalid", { invalid });
    throw new AppError(
      "CONFIGURATION_INVALID",
      "The server configuration is invalid",
      503,
    );
  }
  validated.add(env);
}
