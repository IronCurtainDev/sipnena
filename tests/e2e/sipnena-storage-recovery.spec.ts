import { expect, test } from "@playwright/test";

test("all primary routes recover cleanly from legacy & malformed localStorage state", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    localStorage.setItem(
      "sipnena_prototype_state_v1",
      JSON.stringify({
        doubts: null,
        bankSlips: null,
        readNotificationIds: null,
        teacherLiveSessions: [
          {
            id: "ls-bad",
            day: "Monday",
            time: "5 PM",
            subject: "Science",
            grade: 8,
            topic: "Light",
            mediumLabel: "si",
            channel: "Zoom Live",
            meetingUrl: "",
            materialsReady: true,
            streamKey: "k",
          },
        ],
      }),
    );
    localStorage.setItem(
      "sipnena_state_v2",
      JSON.stringify({
        version: 2,
        courses: [
          {
            id: "proto-1",
            title: "Old String Title",
            subject: "Science",
            grade: 8,
            medium: "si",
            term: 2,
            isFree: true,
            status: "published",
          },
        ],
        units: [
          {
            id: "u-1",
            courseId: "proto-1",
            title: "Unit 1",
            order: 0,
            status: "published",
          },
        ],
        lessons: [
          {
            id: "tl-1",
            courseId: "proto-1",
            unitId: "u-1",
            order: 0,
            kind: "video",
            title: "Old Lesson",
            status: "published",
          },
        ],
        quizzes: [
          {
            id: "tq-1",
            title: "Old Quiz",
            subject: "Science",
            grade: 8,
            courseId: "proto-1",
            status: "published",
          },
        ],
        questions: [
          {
            id: "q-1",
            prompt: "Q?",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
          },
        ],
        classes: [{ id: "cls-1", name: "8A" }],
        students: [{ id: "kasun", name: "Kasun" }],
        progress: [
          {
            studentId: "kasun",
            courseId: "proto-1",
            completedLessonIds: ["tl-1"],
            lastActiveAt: "2026-11-01T00:00:00Z",
          },
        ],
      }),
    );
    localStorage.setItem("sipnena_syllabus_v1", JSON.stringify([{ grade: 8 }]));
  });

  const routes = [
    "/home",
    "/courses",
    "/course",
    "/lesson",
    "/quiz",
    "/quiz-result",
    "/me",
    "/teacher",
    "/teacher/courses",
    "/teacher/courses/proto-1",
    "/teacher/quizzes",
    "/teacher/students",
    "/teacher/classes",
    "/parent",
    "/admin/syllabus",
  ];
  for (const r of routes) {
    await page.goto(r);
    await expect(
      page.getByText(/Something went wrong/i),
      `Unexpected error boundary on ${r}`,
    ).toHaveCount(0);
    await expect(page.locator("main:visible").first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("onboarding continue chain and primary student navigation render without console errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/welcome-language");
  await page.locator("main:visible button:visible").last().click();
  await expect(page).toHaveURL(/\/select-grade$/);

  await page.locator("main:visible button:visible").last().click();
  await expect(page).toHaveURL(/\/select-medium$/);

  await page.locator("main:visible button:visible").last().click();
  await expect(page).toHaveURL(/\/pick-subjects$/);

  await page.locator("main:visible button:visible").last().click();
  await expect(page).toHaveURL(/\/preparing-courses$/);

  await page.goto("/home");
  await page.getByRole("button", { name: /දිගටම|Continue|தொடர/i }).click();
  await expect(page).toHaveURL(/\/courses\/[^/]+\/lesson/);

  await page.goto("/courses");
  await page.locator("main:visible article button:visible").nth(1).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.locator("a:visible, button:visible").last().click();
  await expect(page).toHaveURL(/\/courses\/[^/]+/);

  expect(errors).toEqual([]);
});

test("wide desktop portals fill available horizontal width without empty side gutters", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  for (const route of [
    "/teacher",
    "/parent",
    "/admin",
    "/home",
    "/courses",
    "/quiz-result",
  ]) {
    await page.goto(route);
    await expect(page.locator("main:visible").first()).toBeVisible();
    const box = await page.evaluate(() => {
      const aside = Array.from(document.querySelectorAll("aside")).find(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.left <= 4;
        },
      );
      const main = Array.from(document.querySelectorAll("main")).find(
        (el) => el.getBoundingClientRect().width > 0,
      );
      if (!aside || !main) return null;
      const aRect = aside.getBoundingClientRect();
      const mRect = main.getBoundingClientRect();
      return {
        asideRight: Math.round(aRect.right),
        mainLeft: Math.round(mRect.left),
        mainRight: Math.round(mRect.right),
        viewportWidth: window.innerWidth,
      };
    });
    expect(box, `Missing aside/main on ${route}`).not.toBeNull();
    expect(
      Math.abs(box!.mainLeft - box!.asideRight),
      `Left blank gutter on ${route}`,
    ).toBeLessThanOrEqual(2);
    expect(
      Math.abs(box!.viewportWidth - box!.mainRight),
      `Right blank gutter on ${route}`,
    ).toBeLessThanOrEqual(2);
  }
});
