import { hc } from "hono/client";
import type { AppType } from "@repo/api";

export type ApiClientOptions = {
  baseUrl: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
  onUnauthorized?: () => void;
  timeoutMs?: number;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function requestSignal(
  signal: AbortSignal | null | undefined,
  timeoutMs: number,
) {
  const deadline = AbortSignal.timeout(timeoutMs);
  return signal ? AbortSignal.any([signal, deadline]) : deadline;
}

export function createApiClient({
  baseUrl,
  fetch: fetcher = globalThis.fetch,
  headers,
  onUnauthorized,
  timeoutMs = 15_000,
}: ApiClientOptions) {
  const request: typeof globalThis.fetch = async (input, init) => {
    let response: Response;
    try {
      response = await fetcher(input, {
        credentials: "include",
        ...init,
        signal: requestSignal(init?.signal, timeoutMs),
      });
    } catch (error) {
      if (error instanceof Error && error.name === "TimeoutError") {
        throw new ApiError(
          "The request timed out. Please try again.",
          408,
          "REQUEST_TIMEOUT",
        );
      }
      throw error;
    }
    if (!response.ok) {
      const body = (await response
        .clone()
        .json()
        .catch(() => null)) as {
        error?: { message?: string; code?: string };
      } | null;
      // A rejected API key is a build/configuration fault, not an expired
      // session; redirecting to sign-in would loop on the same rejection.
      if (response.status === 401 && body?.error?.code !== "INVALID_API_KEY")
        onUnauthorized?.();
      throw new ApiError(
        body?.error?.message ?? `Request failed (${response.status})`,
        response.status,
        body?.error?.code,
      );
    }
    return response;
  };
  return hc<AppType>(baseUrl, {
    fetch: request,
    headers,
  });
}

export type ApiClient = ReturnType<typeof createApiClient>;
