import { describe, expect, it, vi } from "vitest";
import {
  authRequest,
  bindings,
  emailLink,
  mockEmail,
  origin,
  password,
  request,
  signUp,
} from "./helpers";

describe("authentication in the Worker runtime", () => {
  it("verifies email, supports signed bearer and browser cookies, and revokes sessions", async () => {
    const messages = mockEmail();
    const user = await signUp(messages);
    const credentials: HeadersInit[] = [
      { authorization: `Bearer ${user.token}` },
      { cookie: user.cookie },
    ];
    for (const headers of credentials) {
      const response = await request("/api/v1/files", { headers });
      expect(response.status).toBe(200);
    }
    const invalid = await request("/api/v1/files", {
      headers: { authorization: "Bearer forged-token" },
    });
    expect(invalid.status).toBe(401);
    const signOut = await authRequest("/sign-out", {}, user.token);
    expect(signOut.status).toBe(200);
    expect(signOut.headers.get("x-request-id")).toBeTruthy();
    expect(signOut.headers.get("cache-control")).toBe("private, no-store");
    const revoked = await request("/api/v1/files", {
      headers: { authorization: `Bearer ${user.token}` },
    });
    expect(revoked.status).toBe(401);
  });

  it("requires verification and never accepts an incorrect password", async () => {
    mockEmail();
    const email = "unverified@example.com";
    expect(
      (await authRequest("/sign-up/email", { name: "New", email, password }))
        .status,
    ).toBe(200);
    expect(
      (await authRequest("/sign-in/email", { email, password })).status,
    ).toBe(403);
    expect(
      (
        await authRequest("/sign-in/email", {
          email,
          password: "incorrect-password",
        })
      ).status,
    ).toBe(401);
  });

  it("resets passwords using one-use email links and invalidates old sessions", async () => {
    const messages = mockEmail();
    const user = await signUp(messages);
    const reset = await authRequest("/request-password-reset", {
      email: user.email,
      redirectTo: `${origin}/reset-password`,
    });
    expect(reset.status).toBe(200);
    const mail = messages
      .filter((message) => message.subject === "Reset your password")
      .at(-1)!;
    const link = emailLink(mail);
    const redirect = await request(`${link.pathname}${link.search}`);
    const token = new URL(redirect.headers.get("location")!).searchParams.get(
      "token",
    );
    expect(token).toBeTruthy();
    const newPassword = "Updated-safe-password-2026!";
    expect(
      (await authRequest("/reset-password", { token, newPassword })).status,
    ).toBe(200);
    expect(
      (await authRequest("/reset-password", { token, newPassword })).status,
    ).not.toBe(200);
    expect(
      (await authRequest("/sign-in/email", { email: user.email, password }))
        .status,
    ).toBe(401);
    expect(
      (
        await authRequest("/sign-in/email", {
          email: user.email,
          password: newPassword,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await request("/api/v1/files", {
          headers: { authorization: `Bearer ${user.token}` },
        })
      ).status,
    ).toBe(401);
  });

  it("rejects cookie mutations from other origins, including an invalid bearer with a valid cookie", async () => {
    const user = await signUp(mockEmail());
    for (const authorization of [null, "Bearer forged-token"]) {
      const response = await request("/api/v1/files/nonexistent", {
        method: "DELETE",
        headers: new Headers({
          cookie: user.cookie,
          origin: "https://evil.example",
          ...(authorization ? { authorization } : {}),
        }),
      });
      expect([401, 403]).toContain(response.status);
    }
  });

  it("allows unverified local development but requires verification when deployed", async () => {
    const user = await signUp(mockEmail());
    await bindings.DB.prepare("UPDATE user SET email_verified = 0 WHERE id = ?")
      .bind(user.id)
      .run();
    const options = {
      method: "DELETE",
      headers: { authorization: `Bearer ${user.token}` },
    };
    const missingFile = "00000000-0000-4000-8000-000000000000";
    expect(
      (await request(`/api/v1/files/${missingFile}`, options)).status,
    ).toBe(404);
    const deployed = await request(`/api/v1/files/${missingFile}`, options, {
      ENVIRONMENT: "production",
      BETTER_AUTH_URL: "https://example.test",
    });
    expect(deployed.status).toBe(403);
    expect(
      ((await deployed.json()) as { error: { code: string } }).error.code,
    ).toBe("EMAIL_NOT_VERIFIED");
  });

  it("fails closed with production preview mode or missing production rate-limit bindings", async () => {
    const response = await request(
      "/api/auth/get-session",
      {},
      {
        ENVIRONMENT: "production",
        EMAIL_MODE: "preview",
        BETTER_AUTH_URL: "https://app.example.com",
      },
    );
    expect(response.status).toBe(503);
    const limited = await request(
      "/api/auth/sign-in/email",
      {
        method: "POST",
        headers: { "cf-connecting-ip": "192.0.2.10" },
      },
      { ...bindings, ENVIRONMENT: "production", AUTH_RATE_LIMITER: undefined },
    );
    expect(limited.status).toBe(503);
  });

  it("throttles authentication before sending emails or hashing a password", async () => {
    const send = vi.spyOn(globalThis, "fetch");
    const response = await request(
      "/api/auth/sign-up/email",
      {
        method: "POST",
        headers: { "content-type": "application/json", origin },
        body: JSON.stringify({
          name: "Limited",
          email: "limited@example.com",
          password,
        }),
      },
      { AUTH_RATE_LIMITER: { limit: async () => ({ success: false }) } },
    );
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });
});
