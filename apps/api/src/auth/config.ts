import { AppError } from "../lib/errors";
import type { Bindings } from "../types/bindings";

export function getCapabilities(env: Bindings) {
  return {
    googleEnabled: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
    organizationsEnabled: env.ENABLE_ORGANIZATIONS !== "false",
  };
}

function developmentOrigins(baseURL: string) {
  const url = new URL(baseURL);
  if (url.protocol !== "http:") return [baseURL];
  const hosts =
    url.hostname === "localhost" || url.hostname === "127.0.0.1"
      ? ["localhost", "127.0.0.1"]
      : [url.hostname];
  return hosts.map((host) => {
    url.hostname = host;
    return url.origin;
  });
}

type AuthSettings = ReturnType<typeof computeAuthSettings>;
const settingsCache = new WeakMap<Bindings, AuthSettings>();

export function authSettings(env: Bindings): AuthSettings {
  let settings = settingsCache.get(env);
  if (!settings) {
    settings = computeAuthSettings(env);
    settingsCache.set(env, settings);
  }
  return settings;
}

function computeAuthSettings(env: Bindings) {
  if (
    !env.DB ||
    !env.BETTER_AUTH_URL ||
    !env.BETTER_AUTH_SECRET ||
    env.BETTER_AUTH_SECRET.length < 32
  ) {
    throw new AppError(
      "AUTH_NOT_CONFIGURED",
      "Authentication is not configured",
      503,
    );
  }
  let url: URL;
  try {
    url = new URL(env.BETTER_AUTH_URL);
  } catch {
    throw new AppError(
      "AUTH_NOT_CONFIGURED",
      "Authentication URL is invalid",
      503,
    );
  }
  if (
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new AppError(
      "AUTH_NOT_CONFIGURED",
      "Authentication URL must be an origin",
      503,
    );
  }
  const baseURL = url.origin;
  const development = env.ENVIRONMENT === "development";
  if (
    !["http:", "https:"].includes(url.protocol) ||
    (!development &&
      (!baseURL.startsWith("https://") || env.EMAIL_MODE !== "resend"))
  ) {
    throw new AppError(
      "AUTH_NOT_CONFIGURED",
      "Production authentication configuration is invalid",
      503,
    );
  }
  if (Boolean(env.GOOGLE_CLIENT_ID) !== Boolean(env.GOOGLE_CLIENT_SECRET)) {
    throw new AppError(
      "AUTH_NOT_CONFIGURED",
      "Google credentials must be configured together",
      503,
    );
  }
  if (env.EMAIL_MODE !== "preview" && env.EMAIL_MODE !== "resend") {
    throw new AppError(
      "EMAIL_NOT_CONFIGURED",
      "Choose an explicit email delivery mode",
      503,
    );
  }
  if (!development && (!env.RESEND_API_KEY || !env.EMAIL_FROM)) {
    throw new AppError(
      "EMAIL_NOT_CONFIGURED",
      "Email delivery is not configured",
      503,
    );
  }
  const trustedOrigins = development ? developmentOrigins(baseURL) : [baseURL];
  return { baseURL, development, trustedOrigins, ...getCapabilities(env) };
}
