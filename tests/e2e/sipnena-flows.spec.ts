import { expect, test, type Page } from "@playwright/test";

async function auditLayout(
  page: Page,
  route: string,
  expectedLang?: "si" | "ta" | "en",
) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");

  if (expectedLang) {
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBe(expectedLang);
  }

  const metrics = await page.evaluate(() => {
    const overflow =
      document.documentElement.scrollWidth > window.innerWidth + 1;
    const tinyTexts: string[] = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (!node.textContent?.trim()) continue;
      const el = node.parentElement;
      if (!el || el instanceof SVGElement) continue;
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const size = Number.parseFloat(style.fontSize);
      if (size > 0 && size < 11.9) {
        tinyTexts.push(
          `${el.tagName}:${size}px:${node.textContent.trim().slice(0, 24)}`,
        );
      }
    }

    const mobileNav = document.querySelector('nav[aria-label*="mobile" i]');
    let mobileNavSingleRow = true;
    let mobileNavMinHeight = 48;
    if (mobileNav && window.innerWidth < 640) {
      const links = Array.from(mobileNav.querySelectorAll("a, button"));
      const tops = links.map((el) => el.getBoundingClientRect().top);
      if (tops.length > 1) {
        mobileNavSingleRow = Math.max(...tops) - Math.min(...tops) <= 4;
      }
      if (links.length > 0) {
        mobileNavMinHeight = Math.min(
          ...links.map((el) => el.getBoundingClientRect().height),
        );
      }
    }

    return { overflow, tinyTexts, mobileNavSingleRow, mobileNavMinHeight };
  });

  expect(metrics.overflow, `Horizontal overflow on ${route}`).toBe(false);
  expect(metrics.tinyTexts, `Text <12px on ${route}`).toEqual([]);
  expect(metrics.mobileNavSingleRow, `Wrapped bottom nav on ${route}`).toBe(
    true,
  );
  expect(
    metrics.mobileNavMinHeight,
    `Small bottom nav target on ${route}`,
  ).toBeGreaterThanOrEqual(44);
}

test("P0 & P3 nav gating, language sync, Admin Hub, Signup hygiene, and layout audit", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.goto("/signup");
  await expect(page.getByTestId("sipnena-signup-form")).toBeVisible();
  expect(await page.locator("html").getAttribute("lang")).toBe("si");
  await page.getByRole("button", { name: "தமிழ் (த)" }).first().click();
  expect(await page.locator("html").getAttribute("lang")).toBe("ta");
  await page.getByRole("button", { name: "English (En)" }).first().click();
  expect(await page.locator("html").getAttribute("lang")).toBe("en");
  const signupText = await page.locator("body").innerText();
  expect(signupText).not.toMatch(/API key|team owner/i);

  await page.goto("/admin");
  await expect(
    page.getByRole("main").locator('a[href="/admin/payments"]'),
  ).toBeVisible();
  await expect(
    page.getByRole("main").locator('a[href="/admin/syllabus"]'),
  ).toBeVisible();

  await page.goto("/home");
  await expect(page.getByTestId("role-switch-student")).toHaveCount(0);
  await expect(
    page.locator("aside a[href='/exam-prep']:visible").first(),
  ).toBeVisible();
  await expect(
    page.locator("aside a[href='/live-ask']:visible").first(),
  ).toBeVisible();

  await page.goto("/home?demo=1");
  await expect(
    page.locator('[data-testid="role-switch-teacher"]:visible').first(),
  ).toBeVisible();

  await page.goto("/exam-prep");
  await expect(
    page.getByRole("main").locator('a[href="/past-papers"]'),
  ).toBeVisible();
  await page.goto("/live-ask");
  await expect(
    page.getByRole("main").locator('a[href="/doubts"]'),
  ).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  for (const r of [
    "/home",
    "/courses",
    "/exam-prep",
    "/live-ask",
    "/me",
    "/teacher/courses",
    "/teacher/quizzes",
    "/admin",
  ]) {
    await auditLayout(page, r, "en");
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  for (const r of [
    "/home",
    "/courses",
    "/teacher/courses",
    "/teacher/quizzes",
    "/parent",
    "/admin",
  ]) {
    await auditLayout(page, r, "en");
  }

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("P1 Teacher 3-step course creation, preview, publish, student player, and P2 grading", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("/teacher/courses");
  await page.getByRole("button", { name: "English (En)" }).first().click();

  await page.getByTestId("teacher-new-course").click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByTestId("confirm-create-course")).toHaveCount(0);

  await page.getByTestId("teacher-new-course").click();
  await page.getByRole("dialog").getByRole("button", { name: "Next" }).click();
  await page
    .getByRole("dialog")
    .getByRole("textbox")
    .first()
    .fill("Playwright Sound Waves");
  await page.getByRole("dialog").getByRole("button", { name: "Next" }).click();
  await expect(page.getByTestId("confirm-create-course")).toBeVisible();
  await page.getByTestId("confirm-create-course").click();

  await expect(page).toHaveURL(/\/teacher\/courses\/.+/);
  const builderUrl = page.url();
  await expect(page.getByTestId("teacher-curriculum-rail")).toBeVisible();
  await expect(page.getByTestId("builder-save-indicator")).toBeVisible();
  await expect(page.getByLabel("Course status")).toHaveValue("draft");

  await page.getByTestId("teacher-course-preview").click();
  await expect(page.getByTestId("preview-banner")).toContainText(/Preview/i);

  await page.goto("/courses");
  await expect(page.getByText("Playwright Sound Waves")).toHaveCount(0);

  await page.goto(builderUrl);
  await page.getByLabel("Course status").selectOption("published");
  await page.goto("/courses");
  await expect(
    page
      .locator("button:visible", { hasText: "Playwright Sound Waves" })
      .first(),
  ).toBeVisible();

  const courseId = new URL(builderUrl).pathname.split("/").pop()!;
  await page.goto(`/courses/${courseId}/lesson`);
  const qualityBtn = page.getByRole("button", { name: /Video quality/i });
  const initialQ = await qualityBtn.innerText();
  await qualityBtn.click();
  expect(await qualityBtn.innerText()).not.toBe(initialQ);
  await page.getByRole("button", { name: "Audio + slides mode" }).click();
  await expect(page.getByText("Audio + Slides Mode")).toBeVisible();

  await page.goto("/teacher/assignments");
  await page.getByRole("button", { name: "English (En)" }).first().click();
  await expect(page.getByRole("button", { name: /^Marking/i })).toBeVisible();

  await page.goto("/teacher/students");
  await expect(page.locator("table").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("P2 Multi-question Quiz Builder, Analytics, Bank & P3 Rewards Leaderboard", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("/teacher/quizzes");
  await page.getByRole("button", { name: "English (En)" }).first().click();
  await expect(page).toHaveURL(/\/teacher\/quizzes/);
  await expect(page.getByTestId("teacher-quiz-list")).toBeVisible();

  await page
    .getByRole("button", { name: /Analytics/i })
    .first()
    .click();
  await expect(page.getByTestId("quiz-analytics-panel")).toBeVisible();
  await page.getByRole("button", { name: /Back to quizzes/i }).click();
  await expect(page.getByTestId("teacher-quiz-list")).toBeVisible();

  await page
    .getByTestId("teacher-quiz-list")
    .locator("article")
    .first()
    .getByRole("button")
    .first()
    .click();
  await expect(page.getByTestId("teacher-quiz-edit")).toBeVisible();
  await page.getByRole("button", { name: "Duplicate" }).first().click();
  await expect(page.getByText("Q2.")).toBeVisible();
  await page.getByTestId("teacher-quiz-save-btn").click();
  await expect(page.getByTestId("teacher-quiz-edit")).toHaveCount(0);

  await page.getByRole("button", { name: /Question Bank/i }).click();
  await expect(page.locator("main ul li").first()).toBeVisible();

  await page.goto("/me");
  await expect(
    page.getByRole("main").locator('a[href="/saved"]'),
  ).toBeVisible();
  await expect(
    page.getByRole("main").locator('a[href="/notes"]'),
  ).toBeVisible();
  await page.getByRole("button", { name: /Join class leaderboard/i }).click();
  await expect(
    page.getByRole("button", { name: /Leave class leaderboard/i }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
