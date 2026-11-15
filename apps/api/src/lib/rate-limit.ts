import { AppError } from "./errors";
import type { Bindings, RateLimiter } from "../types/bindings";

export async function enforceRateLimit(
  binding: RateLimiter | undefined,
  key: string,
  env: Bindings,
) {
  if (!binding) {
    if (env.ENVIRONMENT === "development") return;
    throw new AppError(
      "RATE_LIMIT_UNAVAILABLE",
      "Request protection is not configured",
      503,
    );
  }
  const result = await binding.limit({ key });
  if (!result.success) {
    throw new AppError(
      "RATE_LIMITED",
      "Too many requests. Try again in a minute",
      429,
    );
  }
}

export function clientIp(request: Request, env: Bindings) {
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) return ip;
  if (env.ENVIRONMENT === "development") return "local";
  throw new AppError(
    "CLIENT_IP_UNAVAILABLE",
    "Request protection is not available",
    503,
  );
}
