import { env } from "cloudflare:workers";
import { expect, vi } from "vitest";
import { createApp } from "../src/app";
import type { Bindings } from "../src/types/bindings";

export const origin = "http://localhost:5173";
export const apiKey = "test-api-key";
export const bindings = env as unknown as Bindings;
const allow = { limit: async () => ({ success: true }) };

export function request(
  path: string,
  init: RequestInit = {},
  overrides: Partial<Bindings> = {},
  key: string | null = apiKey,
) {
  const requestInit =
    key === null
      ? init
      : { ...init, headers: { ...init.headers, "x-api-key": key } };
  return createApp().request(`${origin}${path}`, requestInit, {
    ...bindings,
    AUTH_RATE_LIMITER: allow,
    EMAIL_RATE_LIMITER: allow,
    UPLOAD_RATE_LIMITER: allow,
    ...overrides,
  });
}

export function authRequest(path: string, body: object, token?: string) {
  return request(`/api/auth${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

export type Mail = { to: string; subject: string; text: string };
export function mockEmail() {
  const messages: Mail[] = [];
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    if (url !== "https://api.resend.com/emails") {
      throw new Error(`Unexpected network request: ${url}`);
    }
    if (typeof init?.body !== "string") throw new Error("Expected a JSON body");
    messages.push(JSON.parse(init.body) as Mail);
    return Response.json({ id: crypto.randomUUID() });
  });
  return messages;
}

export function emailLink(mail: Mail) {
  const url = mail.text.match(/https?:\/\/\S+/)?.[0];
  if (!url) throw new Error("Expected an email link");
  return new URL(url);
}

export const password = "Correct-horse-battery-42!";
export async function signUp(
  messages: Mail[],
  email = `${crypto.randomUUID()}@example.com`,
) {
  const response = await authRequest("/sign-up/email", {
    name: "Test User",
    email,
    password,
    callbackURL: `${origin}/verify-email`,
  });
  expect(response.status, await response.clone().text()).toBe(200);
  const user = ((await response.json()) as { user: { id: string } }).user;
  const mail = messages.filter((message) => message.to === email).at(-1);
  expect(mail).toBeDefined();
  const link = emailLink(mail!);
  const verification = await request(`${link.pathname}${link.search}`);
  expect([200, 302]).toContain(verification.status);
  const login = await authRequest("/sign-in/email", { email, password });
  expect(login.status, await login.clone().text()).toBe(200);
  const token = login.headers.get("set-auth-token");
  expect(token).toBeTruthy();
  const cookie = login.headers.get("set-cookie")?.split(";")[0] ?? "";
  return { email, id: user.id, token: token!, cookie };
}

export const ADMIN_EMAIL = "admin@example.test";
export const ADMIN_PASSWORD = "test-admin-password-123";

export async function loginAdmin() {
  await request("/api/dev/bootstrap-admin", { method: "POST" });
  const response = await authRequest("/sign-in/email", {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });
  expect(response.status, await response.clone().text()).toBe(200);
  return response.headers.get("set-auth-token")!;
}

export function upload(
  token: string,
  name = "report.pdf",
  content = "%PDF-1.7\nReport",
  overrides: Partial<Bindings> = {},
) {
  const body = new FormData();
  body.append("file", new File([content], name, { type: "application/pdf" }));
  return request(
    "/api/v1/files",
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body,
    },
    overrides,
  );
}
