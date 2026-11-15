import { describe, expect, it, vi } from "vitest";
import { ApiError, createApiClient, requestSignal } from "./client";

describe("application HTTP client", () => {
  it("sends browser cookies and preserves the successful response", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json({ ok: true }));
    const client = createApiClient({
      baseUrl: "https://app.example",
      fetch: fetcher,
    });

    const response = await client.api.health.$get();

    expect(await response.json()).toEqual({ ok: true });
    expect(fetcher).toHaveBeenCalledWith(
      "https://app.example/api/health",
      expect.objectContaining({
        credentials: "include",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("reports application errors and invokes session cleanup on 401", async () => {
    const onUnauthorized = vi.fn();
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json(
        {
          error: { code: "UNAUTHORIZED", message: "Sign in to continue" },
        },
        { status: 401 },
      ),
    );
    const client = createApiClient({
      baseUrl: "https://app.example",
      fetch: fetcher,
      onUnauthorized,
    });

    await expect(client.api.v1.files.$get({ query: {} })).rejects.toMatchObject(
      {
        name: "ApiError",
        status: 401,
        code: "UNAUTHORIZED",
        message: "Sign in to continue",
      },
    );
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it("does not treat a rejected API key as a signed-out session", async () => {
    const onUnauthorized = vi.fn();
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json(
        {
          error: {
            code: "INVALID_API_KEY",
            message: "A valid API key is required",
          },
        },
        { status: 401 },
      ),
    );
    const client = createApiClient({
      baseUrl: "https://app.example",
      fetch: fetcher,
      onUnauthorized,
    });

    await expect(client.api.config.$get()).rejects.toMatchObject({
      status: 401,
      code: "INVALID_API_KEY",
    });
    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it("handles non-JSON gateway failures without losing the HTTP status", async () => {
    const onUnauthorized = vi.fn();
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response("Upstream unavailable", { status: 503 }));
    const client = createApiClient({
      baseUrl: "https://app.example",
      fetch: fetcher,
      onUnauthorized,
    });

    await expect(client.api.health.$get()).rejects.toEqual(
      new ApiError("Request failed (503)", 503),
    );
    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it("preserves network failures and successful empty delete responses", async () => {
    const failure = new TypeError("Failed to fetch");
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(failure)
      .mockResolvedValueOnce(new Response(null, { status: 204 }));
    const client = createApiClient({
      baseUrl: "https://app.example",
      fetch: fetcher,
    });

    await expect(client.api.health.$get()).rejects.toBe(failure);
    expect(
      (await client.api.v1.files[":id"].$delete({ param: { id: "file-id" } }))
        .status,
    ).toBe(204);
  });

  it("turns request deadlines into a stable client error", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new DOMException("Timed out", "TimeoutError"));
    const client = createApiClient({
      baseUrl: "https://app.example",
      fetch: fetcher,
    });

    await expect(client.api.health.$get()).rejects.toEqual(
      new ApiError(
        "The request timed out. Please try again.",
        408,
        "REQUEST_TIMEOUT",
      ),
    );
  });

  it("combines caller cancellation with the request deadline", () => {
    const caller = new AbortController();
    const combined = requestSignal(caller.signal, 60_000);
    expect(combined).not.toBe(caller.signal);
    expect(combined.aborted).toBe(false);
    caller.abort();
    expect(combined.aborted).toBe(true);
  });
});
