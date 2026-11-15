import { expect, test } from "@playwright/test";
import { account } from "./helpers";

const headers = {
  origin: "http://127.0.0.1:4173",
  "x-api-key": "dev-demo-api-key",
};

test("an admin creates a role and assigns it to a user", async ({
  browser,
  page,
}) => {
  const memberContext = await browser.newContext();
  const memberPage = await memberContext.newPage();
  const memberEmail = await account(memberPage);
  await page.request.post("/api/dev/bootstrap-admin", { headers });
  const login = await page.request.post("/api/auth/sign-in/email", {
    headers,
    data: {
      email: "admin@example.test",
      password: "test-admin-password-123",
    },
  });
  expect(login.ok(), await login.text()).toBe(true);

  const roleName = `auditor-${crypto.randomUUID().slice(0, 8)}`;
  await page.goto("/admin");
  await page.getByRole("tab", { name: "Roles" }).click();
  await page.getByRole("button", { name: "New role" }).click();
  const roleDialog = page.getByRole("dialog");
  await roleDialog.getByLabel("Role name").fill(roleName);
  await roleDialog
    .getByRole("checkbox", { name: /View the user list/ })
    .check();
  await roleDialog
    .getByRole("checkbox", { name: /View every user's files/ })
    .check();
  await roleDialog.getByRole("button", { name: "Create role" }).click();
  await expect(page.getByText(`Role “${roleName}” created.`)).toBeVisible();

  await page.getByRole("tab", { name: "Users" }).click();
  await page
    .getByRole("button", { name: `Actions for ${memberEmail}` })
    .click();
  await page.getByRole("menuitem", { name: "Change roles…" }).click();
  const rolesDialog = page.getByRole("dialog");
  await rolesDialog
    .getByRole("checkbox", { name: new RegExp(`^${roleName}`) })
    .check();
  await rolesDialog.getByRole("button", { name: "Save roles" }).click();
  await expect(page.getByText("Roles updated.")).toBeVisible();

  await memberPage.goto("/admin");
  await expect(
    memberPage.getByRole("heading", { name: "Admin dashboard" }),
  ).toBeVisible();
  await expect(memberPage.getByRole("tab", { name: "Users" })).toBeVisible();
  await expect(memberPage.getByRole("tab", { name: "Files" })).toBeVisible();
  await expect(memberPage.getByRole("tab", { name: "Roles" })).toHaveCount(0);
  await expect(memberPage.getByText(memberEmail).first()).toBeVisible();
  await expect(
    memberPage.getByRole("button", { name: "Add user" }),
  ).toHaveCount(0);
  await expect(
    memberPage.getByRole("button", { name: /^Actions for / }),
  ).toHaveCount(0);
  await memberContext.close();
});
