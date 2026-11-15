import { AppError } from "../lib/errors";
import { describeError, logEvent } from "../lib/log";
import { currentRequestId } from "../lib/request-context";
import type { Bindings } from "../types/bindings";

type Email = { to: string; subject: string; text: string };

const EMAIL_TIMEOUT_MS = 10_000;

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function sendEmail(env: Bindings, message: Email) {
  if (env.ENVIRONMENT === "development" && env.EMAIL_MODE === "preview") {
    console.info(JSON.stringify({ event: "email_preview", ...message }));
    return;
  }
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    throw new AppError(
      "EMAIL_NOT_CONFIGURED",
      "Email delivery is not configured",
      503,
    );
  }
  const body = JSON.stringify({ from: env.EMAIL_FROM, ...message });
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      // Each message embeds a fresh token, so identical bodies are retries.
      "Idempotency-Key": await sha256Hex(body),
    },
    body,
    signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
  }).catch((error: unknown) => {
    logEvent("error", "email_delivery_failed", {
      requestId: currentRequestId(),
      ...describeError(error),
    });
    return null;
  });
  if (!response?.ok) {
    if (response)
      logEvent("error", "email_delivery_failed", {
        requestId: currentRequestId(),
        status: response.status,
      });
    throw new AppError(
      "EMAIL_DELIVERY_FAILED",
      "Unable to send email. Please try again",
      503,
    );
  }
}
