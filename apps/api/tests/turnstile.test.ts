import { afterEach, describe, expect, it, vi } from "vitest";
import { Hono } from "hono";
import { turnstileMiddleware } from "../src/middleware/turnstile.middleware";
import { errorMiddleware } from "../src/middleware/error.middleware";
import type { Bindings } from "../src/types/bindings";
import type { AppEnv } from "../src/types/context";

function createTestApp(env: Partial<Bindings> = {}) {
  const app = new Hono<AppEnv>();
  app.use("*", async (c, next) => {
    c.set("requestId", "test-request-id");
    await next();
  });
  app.onError(errorMiddleware);
  app.use("/protected", turnstileMiddleware);
  app.post("/protected", (c) => c.json({ ok: true }));
  return {
    fetch: (path: string, headers: Record<string, string> = {}) =>
      app.request(
        `http://localhost${path}`,
        { method: "POST", headers },
        env as Bindings,
      ),
  };
}

describe("turnstile middleware", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips verification in development when the secret is unset", async () => {
    const app = createTestApp({ ENVIRONMENT: "development" });
    const res = await app.fetch("/protected");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("fails closed when the secret is unset outside development", async () => {
    const app = createTestApp({ ENVIRONMENT: "production" });
    const res = await app.fetch("/protected");
    expect(res.status).toBe(503);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("BOT_VERIFICATION_FAILED");
  });

  it("fails with 400 when the secret is configured but the token is missing", async () => {
    const app = createTestApp({
      ENVIRONMENT: "production",
      TURNSTILE_SECRET_KEY: "0x4AAAAAAtest-secret-key",
    });
    const res = await app.fetch("/protected");
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("BOT_VERIFICATION_FAILED");
  });

  it("fails with 403 when siteverify returns success: false", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      Response.json({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    );

    const app = createTestApp({
      ENVIRONMENT: "production",
      TURNSTILE_SECRET_KEY: "0x4AAAAAAtest-secret-key",
    });
    const res = await app.fetch("/protected", {
      "cf-turnstile-response": "invalid-token",
    });
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("BOT_VERIFICATION_FAILED");
  });

  it("succeeds when siteverify returns success: true", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      Response.json({ success: true }),
    );

    const app = createTestApp({
      ENVIRONMENT: "production",
      TURNSTILE_SECRET_KEY: "0x4AAAAAAtest-secret-key",
    });
    const res = await app.fetch("/protected", {
      "cf-turnstile-response": "valid-token",
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
