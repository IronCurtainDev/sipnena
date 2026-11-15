import { expect, test } from "@playwright/test";
import { account, emailLink, password } from "./helpers";

test("register, verify, sign in, update profile, and sign out", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const email = `signup-${crypto.randomUUID()}@example.com`;
  await page.goto("/signup");
  await expect(
    page.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("First User");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page
    .getByRole("button", { name: "Create account", exact: true })
    .click();
  await expect(page).toHaveURL(/\/verify-email/);
  await page.goto(await emailLink(email, "Verify"));
  await page.goto("/login");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your account" }),
  ).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("Updated User");
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByText("Your profile has been updated.")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "Updated User",
  );
  const session = (await page.context().cookies()).find((cookie) =>
    cookie.name.endsWith("session_token"),
  );
  expect(session?.httpOnly).toBe(true);
  await page.getByRole("button", { name: "Open user menu" }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login/);
  await page.goto("/account");
  await expect(
    page.getByRole("heading", { name: "Welcome back" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("private files work from a direct SPA route", async ({ page }) => {
  await account(page);
  await page.goto("/files");
  await expect(page.getByRole("heading", { name: "Your files" })).toBeVisible();
  await expect(page.getByText("No files yet.", { exact: false })).toBeVisible();
  await page.getByLabel("File", { exact: true }).setInputFiles({
    name: "browser.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.7\nBrowser test"),
  });
  await page.getByRole("button", { name: "Upload file", exact: true }).click();
  await expect(page.getByText("Your file has been uploaded.")).toBeVisible();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download browser.pdf" }).click();
  expect((await downloadEvent).suggestedFilename()).toBe("browser.pdf");
  await page.reload();
  await expect(page.getByText("browser.pdf", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Delete browser.pdf" }).click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete file" })
    .click();
  await expect(page.getByText("No files yet.", { exact: false })).toBeVisible();
});

test("optional organizations create a real owner membership", async ({
  page,
}) => {
  const email = await account(page);
  await page.goto("/organizations");
  await page.getByRole("button", { name: "New organization" }).click();
  await page.getByLabel("Organization name").fill("Browser Team");
  await page
    .getByLabel("Organization slug")
    .fill(`team-${crypto.randomUUID()}`);
  await page
    .getByRole("button", { name: "Create organization", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Browser Team" }),
  ).toBeVisible();
  await expect(
    page.getByRole("main").getByText(email, { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /invite/i })).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Browser Team" }),
  ).toBeVisible();
});

test("small screens, protected navigation, and generated CSS", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/files");
  await expect(
    page.getByRole("heading", { name: "Welcome back" }),
  ).toBeVisible();
  const layout = await page.evaluate(() => {
    const label = document.createElement("span");
    label.className = "sr-only";
    document.body.append(label);
    const result = {
      scrollWidth: document.documentElement.scrollWidth,
      width: window.innerWidth,
      headingSize: parseFloat(
        getComputedStyle(document.querySelector("h1")!).fontSize,
      ),
      hiddenLabel: getComputedStyle(label).position,
    };
    label.remove();
    return result;
  });
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
  expect(layout.headingSize).toBeGreaterThanOrEqual(26);
  expect(layout.hiddenLabel).toBe("absolute");
  const response = await page.request.get("/api/missing", {
    headers: { "x-api-key": "dev-demo-api-key" },
  });
  expect(response.status()).toBe(404);
  expect(response.headers()["content-type"]).toContain("application/json");
});
