import { readFile } from "node:fs/promises";
import { expect, type Page } from "@playwright/test";

export const password = "Browser-test-password-42!";
const origin = "http://127.0.0.1:4173";
const apiHeaders = { "x-api-key": "dev-demo-api-key" };

export async function emailLink(email: string, subject: string) {
  let link = "";
  await expect
    .poll(async () => {
      const lines = (await readFile(".wrangler/e2e/mailbox.jsonl", "utf8"))
        .split("\n")
        .filter(Boolean);
      const message = lines
        .map(
          (line) =>
            JSON.parse(line) as { to: string; subject: string; text: string },
        )
        .filter((mail) => mail.to === email && mail.subject.includes(subject))
        .at(-1);
      link = message?.text.match(/https?:\/\/\S+/)?.[0] ?? "";
      return Boolean(link);
    })
    .toBe(true);
  return link;
}

export async function account(page: Page) {
  const email = `browser-${crypto.randomUUID()}@example.com`;
  const signup = await page.request.post("/api/auth/sign-up/email", {
    headers: { origin, ...apiHeaders },
    data: {
      email,
      name: "Browser User",
      password,
      callbackURL: `${origin}/verify-email`,
    },
  });
  expect(signup.ok(), await signup.text()).toBe(true);
  await page.request.get(await emailLink(email, "Verify"));
  const login = await page.request.post("/api/auth/sign-in/email", {
    headers: { origin, ...apiHeaders },
    data: { email, password },
  });
  expect(login.ok(), await login.text()).toBe(true);
  return email;
}
