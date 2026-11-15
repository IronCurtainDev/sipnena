import { AppError } from "./errors";
import type { Bindings } from "../types/bindings";

type TurnstileEnv = Pick<Bindings, "ENVIRONMENT" | "TURNSTILE_SECRET_KEY">;

// Development without a secret skips the challenge so local work needs no
// Cloudflare widget. Every other environment fails closed until the secret is set.
export async function verifyTurnstileToken(
  env: TurnstileEnv,
  token: string | undefined,
  remoteIp?: string,
) {
  if (!env.TURNSTILE_SECRET_KEY) {
    if (env.ENVIRONMENT === "development") return;
    throw new AppError(
      "BOT_VERIFICATION_FAILED",
      "Bot verification is not configured",
      503,
    );
  }

  if (!token) {
    throw new AppError(
      "BOT_VERIFICATION_FAILED",
      "Turnstile verification token is required",
      400,
    );
  }

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  if (remoteIp) formData.append("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData },
    );
  } catch {
    throw new AppError(
      "BOT_VERIFICATION_FAILED",
      "Failed to communicate with bot verification challenge service",
      503,
    );
  }

  if (!response.ok) {
    throw new AppError(
      "BOT_VERIFICATION_FAILED",
      "Bot challenge service rejected the verification request",
      503,
    );
  }

  const outcome = await response.json<{ success: boolean }>();
  if (!outcome.success) {
    throw new AppError(
      "BOT_VERIFICATION_FAILED",
      "Bot challenge verification failed",
      403,
    );
  }
}
