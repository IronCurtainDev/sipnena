import { apiKeyHeaders } from "./key";

export const REQUEST_TIMEOUT_MS = 15_000;

export const requestSignal = (
  signal?: AbortSignal | null,
  timeoutMs = REQUEST_TIMEOUT_MS,
) => {
  const deadline = AbortSignal.timeout(timeoutMs);
  return signal ? AbortSignal.any([signal, deadline]) : deadline;
};

export const isTimeoutError = (error: unknown) =>
  error instanceof Error && error.name === "TimeoutError";

// Reads both the application error envelope and Better Auth's { message }.
async function parseError(response: Response) {
  const fallback = `Request failed with ${response.status}`;
  const body = (await response.json().catch(() => null)) as {
    error?: { message?: string };
    message?: string;
  } | null;
  return body?.error?.message ?? body?.message ?? fallback;
}

export async function request<T>(path: string, init?: RequestInit) {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: "include",
      ...init,
      signal: requestSignal(init?.signal),
      headers: {
        ...apiKeyHeaders,
        ...(init?.body ? { "content-type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch (error) {
    if (isTimeoutError(error))
      throw new Error("The request timed out. Please try again.", {
        cause: error,
      });
    throw error;
  }
  if (!response.ok) throw new Error(await parseError(response));
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
