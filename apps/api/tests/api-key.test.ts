import { describe, expect, it } from "vitest";
import { apiKey, request } from "./helpers";

describe("API key gateway", () => {
  it("requires the header for every API route and rejects query keys", async () => {
    for (const path of [
      "/api/health",
      "/api/config",
      "/api/auth/sign-in/email",
      "/api/v1/files",
    ]) {
      expect((await request(path, {}, {}, null)).status).toBe(401);
      expect((await request(path, {}, {}, "wrong-key")).status).toBe(401);
      expect(
        (await request(`${path}?apiKey=${apiKey}`, {}, {}, null)).status,
      ).toBe(401);
    }
  });

  it("accepts every key in API_KEYS so a key can be rotated with an overlap", async () => {
    const overrides = {
      API_KEY: undefined,
      API_KEYS: "next-key, previous-key",
    };
    expect(
      (await request("/api/health", {}, overrides, "next-key")).status,
    ).toBe(200);
    expect(
      (await request("/api/health", {}, overrides, "previous-key")).status,
    ).toBe(200);
    expect((await request("/api/health", {}, overrides, apiKey)).status).toBe(
      401,
    );
    expect(
      (
        await request(
          "/api/health",
          {},
          { API_KEY: undefined, API_KEYS: " , " },
        )
      ).status,
    ).toBe(503);
  });

  it("allows the gateway key but still requires user authorization privately", async () => {
    expect((await request("/api/health")).status).toBe(200);
    expect((await request("/api/v1/files")).status).toBe(401);
  });

  it("lets Telescope skip the key locally but still requires a session", async () => {
    const dashboard = await request("/api/telescope", {}, {}, null);
    expect(dashboard.status).toBe(401);
    const body = (await dashboard.json()) as { error: { code: string } };
    expect(body.error.code).toBe("UNAUTHORIZED");
    const production = {
      ENVIRONMENT: "production" as const,
      BETTER_AUTH_URL: "https://example.test",
    };
    expect((await request("/api/telescope", {}, production, null)).status).toBe(
      401,
    );
    expect(
      (await request("/api/telescope/x", {}, production, null)).status,
    ).toBe(401);
  });

  it("allows only tokenized browser auth navigations without the gateway key", async () => {
    const verification = await request(
      "/api/auth/verify-email?token=invalid",
      {},
      {},
      null,
    );
    const callback = await request(
      "/api/auth/callback/google?code=invalid",
      {},
      {},
      null,
    );
    expect(await verification.text()).not.toContain("INVALID_API_KEY");
    expect(await callback.text()).not.toContain("INVALID_API_KEY");
    expect((await request("/api/auth/get-session", {}, {}, null)).status).toBe(
      401,
    );
    expect(
      (await request("/api/v1/files", { method: "POST" }, {}, null)).status,
    ).toBe(401);
  });
});
