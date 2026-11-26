import { expect, test } from "@playwright/test";

test("SipNena Grade 6-11 onboarding, O/L baskets, and curriculum flows", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  // 1. Grade & Medium onboarding (verify Sinhala default, switch to English, pick Grade 11 O/L)
  await page.goto("/select-grade");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "ශ්‍රේණිය",
  );
  await page.getByRole("button", { name: "English (En)" }).click();
  await page.getByTestId("grade-card-11").click();
  await page.getByRole("button", { name: /Continue to Medium/i }).click();
  await expect(page).toHaveURL(/\/select-medium/);

  await page.getByTestId("medium-card-en").click();
  await page.getByRole("button", { name: /Pick Subjects/i }).click();
  await expect(page).toHaveURL(/\/pick-subjects/);
  await expect(page.getByText(/Compulsory Core Subjects/i)).toBeVisible();
  await expect(page.getByText(/Category I \(Basket 1\)/i)).toBeVisible();

  // 2. Past Papers filter & Paper Viewer auto-grade + Official Marking Scheme
  await page.goto("/past-papers");
  await expect(
    page.getByRole("heading", { name: /Past Papers & Marking Schemes/i }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: /Open Paper Viewer/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/past-papers\//);
  await page.getByRole("button", { name: /\(2\) Concave lens/i }).click();
  await page.getByRole("button", { name: /Submit & Auto-Grade MCQs/i }).click();
  await expect(page.getByText(/Score Summary/i)).toBeVisible();
  await page
    .getByRole("button", { name: /Show Official Marking Scheme/i })
    .first()
    .click();
  await expect(
    page.getByText(/Official Marking Scheme Points/i).first(),
  ).toBeVisible();

  // 3. Term Tests, Tutes/Notes Preview, Live Schedule & Doubts
  await page.goto("/term-tests");
  await expect(
    page.getByRole("heading", { level: 1, name: /Term Test Packs/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Term 1" }).click();
  await expect(
    page.locator("article").getByText(/Royal College, Colombo/i),
  ).toBeVisible();

  await page.goto("/notes");
  await page
    .getByRole("button", { name: /Preview PDF/i })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: /Close preview/i }).click();

  await page.goto("/courses/sci-g8-full/materials");
  await expect(
    page.getByRole("heading", { level: 1, name: /Course Materials/i }),
  ).toBeVisible();

  await page.goto("/live");
  await expect(page.getByText(/LIVE NOW/i).first()).toBeVisible();
  await page.goto("/schedule");
  await expect(
    page.getByRole("heading", { level: 1, name: /Weekly Class Timetable/i }),
  ).toBeVisible();

  await page.goto("/doubts");
  await page.getByRole("button", { name: /Ask a Doubt/i }).click();
  await page
    .getByPlaceholder(/Explain where you got stuck/i)
    .fill("Why is focal length half the radius of curvature?");
  await page.getByRole("button", { name: /Submit Doubt/i }).click();
  await expect(
    page.getByText(/Why is focal length half the radius of curvature\?/i),
  ).toBeVisible();

  await page.goto("/courses/sci-g8-full/qa");
  await expect(
    page.getByRole("heading", { level: 1, name: /Course Q&A/i }),
  ).toBeVisible();

  expect(errors).toEqual([]);
});

test("SipNena checkout bank slip, admin approval, parent/teacher portals & utilities", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  // 1. Checkout Bank Deposit tab -> Payment Status -> Admin Approval -> Status reflects Approved
  await page.goto("/checkout");
  await page.getByRole("button", { name: "English (En)" }).click();
  await expect(
    page.getByRole("tab", { name: /Bank Deposit \/ Slip Upload/i }),
  ).toBeVisible();
  await expect(page.getByText("0089412755")).toBeVisible();
  await page
    .getByRole("button", { name: /Submit Bank Slip for Verification/i })
    .click();
  await expect(page.getByText(/checking your payment/i).first()).toBeVisible();

  await page.goto("/payment-status");
  await expect(
    page.getByRole("heading", { name: /Pending Verification/i }),
  ).toBeVisible();

  // Switch role via Prototype Role Switcher to Admin
  await page.getByTestId("role-switch-admin").first().click();
  await expect(page).toHaveURL(/\/admin\/payments/);
  await page
    .getByRole("button", { name: /^Approve$/i })
    .first()
    .click();
  await page.goto("/payment-status");
  await expect(
    page.getByRole("heading", { name: /Approved — Class Card Activated!/i }),
  ).toBeVisible();

  // 2. Billing, Parent, Teacher, Admin Syllabus, and Utility screens
  await page.goto("/billing");
  await page
    .getByPlaceholder(/Enter scholarship or promo code/i)
    .fill("SIPNENA25");
  await page.getByRole("button", { name: /Apply Voucher/i }).click();
  await expect(page.getByText(/25% Term 2 Study Discount/i)).toBeVisible();

  await page.goto("/parent");
  await expect(
    page.getByRole("heading", { name: /Kasun Perera/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Nethmi \(G11\)/i }).click();
  await expect(page).toHaveURL(/\/parent\/child\/nethmi/);

  await page.goto("/teacher");
  await expect(
    page.getByRole("heading", { name: /Teacher \/ Tutor Studio/i }),
  ).toBeVisible();
  await page.goto("/teacher/courses");
  await expect(
    page.getByRole("heading", { name: /Create New Lesson/i }),
  ).toBeVisible();
  await page.goto("/teacher/quizzes");
  await expect(
    page.getByRole("heading", { name: /Build New MCQ Question/i }),
  ).toBeVisible();
  await page.goto("/teacher/doubts");
  await expect(
    page.getByRole("heading", { name: /Student Doubts Queue/i }),
  ).toBeVisible();

  await page.goto("/admin/syllabus");
  await expect(
    page.getByRole("heading", { name: /National Syllabus Curriculum Tree/i }),
  ).toBeVisible();

  await page.goto("/search");
  await page.getByRole("button", { name: "Alokaya (ආලෝකය)" }).click();
  await expect(page.getByText(/Showing .* results/i)).toBeVisible();

  await page.goto("/progress");
  await page.getByRole("button", { name: /Mistake Bank/i }).click();
  await page.getByRole("button", { name: /Retry Wrong Questions/i }).click();
  await expect(
    page.getByRole("button", { name: /Check Retry Answers/i }),
  ).toBeVisible();

  await page.goto("/quiz-history");
  await expect(
    page.getByRole("heading", { name: /Quiz History & Score Trends/i }),
  ).toBeVisible();

  await page.goto("/saved");
  await page.goto("/downloads");
  await page.goto("/notifications");
  await page.getByRole("button", { name: /Mark all as read/i }).click();
  await page.goto("/help");
  await page.goto("/terms");
  await page.goto("/privacy");
  await page.goto("/refund-policy");

  // 3. Mobile responsiveness sanity check (no horizontal overflow)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/past-papers");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});
