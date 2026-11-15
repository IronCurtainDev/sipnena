import { describe, expect, it, vi } from "vitest";
import { bindings, request } from "./helpers";

const webClientId = "web-client.apps.googleusercontent.com";
const mobileClientId = "mobile-client.apps.googleusercontent.com";
const googleBindings = {
  GOOGLE_CLIENT_ID: webClientId,
  GOOGLE_CLIENT_SECRET: "test-google-client-secret",
  GOOGLE_MOBILE_CLIENT_IDS: mobileClientId,
};

function base64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function encodeJson(value: unknown) {
  return base64Url(new TextEncoder().encode(JSON.stringify(value)));
}

async function googleTokens() {
  const keys = (await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  )) as CryptoKeyPair;
  const publicKey = await crypto.subtle.exportKey("jwk", keys.publicKey);
  const kid = "test-google-key";
  const fetch = vi
    .spyOn(globalThis, "fetch")
    .mockImplementation(async (input) => {
      const url = input instanceof Request ? input.url : String(input);
      if (url !== "https://www.googleapis.com/oauth2/v3/certs") {
        throw new Error(`Unexpected Google test network request: ${url}`);
      }
      return Response.json({
        keys: [{ ...publicKey, kid, alg: "RS256", use: "sig" }],
      });
    });
  async function issue(claims: Record<string, unknown> = {}) {
    const now = Math.floor(Date.now() / 1000);
    const payload = encodeJson({
      iss: "https://accounts.google.com",
      aud: mobileClientId,
      sub: "google-user-123",
      email: "google-user@example.com",
      email_verified: true,
      name: "Google User",
      iat: now,
      exp: now + 3600,
      nonce: "native-sign-in-nonce",
      ...claims,
    });
    const unsigned = `${encodeJson({ alg: "RS256", typ: "JWT", kid })}.${payload}`;
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      keys.privateKey,
      new TextEncoder().encode(unsigned),
    );
    return `${unsigned}.${base64Url(new Uint8Array(signature))}`;
  }
  return { issue, fetch };
}

function signInGoogle(token: string, nonce = "native-sign-in-nonce") {
  return request(
    "/api/auth/sign-in/social",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ provider: "google", idToken: { token, nonce } }),
    },
    googleBindings,
  );
}

describe("native Google ID-token exchange", () => {
  it("verifies Google's signature and mobile audience, then returns a usable signed session token", async () => {
    const { issue, fetch } = await googleTokens();
    const response = await signInGoogle(await issue());
    expect(response.status, await response.clone().text()).toBe(200);
    const result = (await response.json()) as {
      user: { id: string; email: string; emailVerified: boolean };
    };
    expect(result.user).toMatchObject({
      email: "google-user@example.com",
      emailVerified: true,
    });
    const token = response.headers.get("set-auth-token");
    expect(token).toBeTruthy();
    const session = await request(
      "/api/auth/get-session",
      {
        headers: { authorization: `Bearer ${token}` },
      },
      googleBindings,
    );
    expect(session.status).toBe(200);
    expect(await session.json()).toMatchObject({
      user: { id: result.user.id },
    });
    const accounts = await bindings.DB.prepare(
      "SELECT provider_id, account_id FROM account WHERE provider_id = 'google'",
    ).all();
    expect(accounts.results).toEqual([
      { provider_id: "google", account_id: "google-user-123" },
    ]);
    expect(fetch).toHaveBeenCalled();
  });

  it("rejects another client's audience, a tampered signature, expired tokens, and nonce mismatch", async () => {
    const { issue } = await googleTokens();
    const valid = await issue();
    const pieces = valid.split(".");
    pieces[2] = `${pieces[2]![0] === "A" ? "B" : "A"}${pieces[2]!.slice(1)}`;
    const invalidTokens = [
      await issue({ aud: "untrusted-client.apps.googleusercontent.com" }),
      pieces.join("."),
      await issue({ exp: Math.floor(Date.now() / 1000) - 60 }),
      await issue({ nonce: "another-sign-in-attempt" }),
    ];
    for (const token of invalidTokens) {
      const response = await signInGoogle(token);
      expect(response.status, await response.clone().text()).toBe(401);
      expect(response.headers.get("set-auth-token")).toBeNull();
    }
    expect(
      (
        await bindings.DB.prepare(
          "SELECT id FROM user WHERE email <> 'admin@email.com'",
        ).all()
      ).results,
    ).toEqual([]);
    expect(
      (await bindings.DB.prepare("SELECT id FROM session").all()).results,
    ).toEqual([]);
  });
});
