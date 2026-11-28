import { expect, test } from "@playwright/test";

test("SipNena renders full Sinhala and Tamil UI without English bleed", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  const siChecks: Array<[string, string, string]> = [
    ["/past-papers", "පසුගිය ප්‍රශ්න පත්‍ර", "Open Paper Viewer"],
    ["/term-tests", "පළාත් සහ ප්‍රමුඛ පාසල් වාර විභාග", "Term Test Packs"],
    ["/notes", "පාඩම් ටියුට්, කෙටි සටහන්", "Categorized Revision Library"],
    ["/live", "දැන් සජීවීව", "LIVE NOW"],
    ["/doubts", "ගැටළුවක් අසන්න", "Ask a Doubt"],
    ["/billing", "සක්‍රිය මාසික පන්ති කාඩ්පත්", "Active Monthly Class Cards"],
    ["/payment-status", "තහවුරු කිරීමට නියමිතයි", "Pending Verification"],
    ["/parent", "දෙමාපිය / භාරකරු පාලක පුවරුව", "Weekly Watch Time"],
    ["/teacher", "ගුරු මැදිරිය", "Active Students"],
    ["/admin/payments", "බැංකු රිසිට්පත් පෝලිම", "Open Demo Verification Desk"],
    [
      "/admin/syllabus",
      "ශ්‍රී ලංකා ජාතික විෂය නිර්දේශ පද්ධතිය",
      "Curriculum Tree",
    ],
    ["/search", "මෑත සෙවුම්", "Recent Searches"],
    ["/progress", "වැරදි පිළිතුරු බැංකුව", "Syllabus Completion"],
    ["/saved", "පුනරීක්ෂණ සුරැකි දෑ", "Revision Bookmarks"],
    ["/downloads", "නොබැඳි ගබඩාව", "Offline Storage"],
    ["/notifications", "දැනුම්දීම් මධ්‍යස්ථානය", "Mark all as read"],
    ["/help", "නිතර අසන ප්‍රශ්න", "Frequently Asked Questions"],
  ];

  await page.goto("/select-grade");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "ශ්‍රේණිය",
  );
  for (const [route, expectedSi, forbiddenEn] of siChecks) {
    await page.goto(route);
    await expect(page.getByText(expectedSi).first()).toBeVisible();
    await expect(page.getByText(forbiddenEn, { exact: true })).toHaveCount(0);
  }

  await page.goto("/past-papers");
  await page.getByRole("button", { name: "தமிழ் (த)" }).click();

  const taChecks: Array<[string, string, string]> = [
    ["/past-papers", "கடந்த வினாத்தாள்கள்", "Open Paper Viewer"],
    ["/term-tests", "மாகாண மற்றும் முன்னணி பாடசாலைத் தவணை", "Term Test Packs"],
    ["/notes", "வகைப்படுத்தப்பட்ட மீள்பார்வை நூலகம்", "Preview PDF"],
    ["/live", "இப்போது நேரலை", "LIVE NOW"],
    ["/doubts", "கேள்வி கேட்கவும்", "Ask a Doubt"],
    ["/billing", "செயலில் உள்ள மாதாந்த வகுப்பு அட்டைகள்", "Apply Voucher"],
    ["/payment-status", "சரிபார்ப்பு நிலுவையில்", "Pending Verification"],
    ["/parent", "வாராந்த கற்றல் நேரம்", "Weekly Watch Time"],
    ["/teacher", "ஆசிரியர் ஸ்டுடியோ", "MCQ Quiz Builder"],
    ["/admin/payments", "வங்கி ரசீது அங்கீகார வரிசை", "Approve & Unlock"],
    ["/admin/syllabus", "இலங்கை தேசியப் பாடத்திட்டக் கிளை", "Curriculum Tree"],
    ["/search", "சமீபத்திய தேடல்கள்", "Recent Searches"],
    ["/progress", "தவறுகள் வங்கி", "Mistake Bank (3)"],
    ["/saved", "மீள்பார்வை சேமிப்புகள்", "Revision Bookmarks"],
    ["/downloads", "ஆஃப்லைன் சேமிப்பகம்", "Offline Storage"],
    ["/notifications", "அறிவிப்புகள் மையம்", "Mark all as read"],
    ["/help", "அடிக்கடி கேட்கப்படும் கேள்விகள்", "Frequently Asked Questions"],
  ];

  for (const [route, expectedTa, forbiddenEn] of taChecks) {
    await page.goto(route);
    await expect(page.getByText(expectedTa).first()).toBeVisible();
    await expect(page.getByText(forbiddenEn, { exact: true })).toHaveCount(0);
  }

  expect(errors).toEqual([]);
});

test("SipNena Grade 6-11 onboarding, O/L baskets, and curriculum flows", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/select-grade");
  await page.getByRole("button", { name: "English (En)" }).click();
  await page.getByTestId("grade-card-11").click();
  await page.getByRole("button", { name: /Continue to Medium/i }).click();
  await expect(page).toHaveURL(/\/select-medium/);

  await page.getByTestId("medium-card-en").click();
  await page.getByRole("button", { name: /Pick Subjects/i }).click();
  await expect(page).toHaveURL(/\/pick-subjects/);
  await expect(page.getByText(/Compulsory Core Subjects/i)).toBeVisible();
  await expect(page.getByText(/Category I \(Basket 1\)/i)).toBeVisible();

  await page.goto("/past-papers");
  await expect(
    page.getByRole("heading", { name: /Past papers for your grade/i }),
  ).toBeVisible();
  await page.getByTestId("past-paper-grade-11").click();
  await page
    .getByRole("link", { name: /Start practice/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/past-papers\//);
  await page.getByRole("button", { name: /\(2\) Concave lens/i }).click();
  await page.getByRole("button", { name: /Check my answers/i }).click();
  await expect(page.getByText(/Your score/i)).toBeVisible();
  await page.goto("/past-papers");
  await page.getByTestId("past-paper-grade-11").click();
  await page.getByRole("link", { name: /Start practice/i }).nth(1).click();
  await expect(page).toHaveURL(/\/past-papers\//);
  await page
    .getByRole("button", { name: /Show marking points/i })
    .first()
    .click();
  await expect(page.getByText(/Marking points/i).first()).toBeVisible();

  await page.goto("/term-tests");
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

  await page.goto("/courses");
  await expect(page.locator("main:visible").first()).toBeVisible();

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

  expect(errors).toEqual([]);
});

test("SipNena checkout bank slip, admin approval, parent/teacher portals & utilities", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

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

  await page.goto("/payment-status?demo=1");
  await expect(
    page.getByRole("heading", { name: /Pending Verification/i }),
  ).toBeVisible();

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

  await page.goto("/billing");
  await page
    .getByPlaceholder(/Enter scholarship or promo code/i)
    .fill("SIPNENA25");
  await page.getByRole("button", { name: /Apply Voucher/i }).click();
  await expect(page.getByText(/25% Term 2 Study Discount/i)).toBeVisible();

  await page.goto("/parent");
  await expect(
    page.getByText(/Parent \/ Guardian Portal/i).first(),
  ).toBeVisible();
  await expect(page.getByText(/Mrs\. Priyani Perera/i).first()).toBeVisible();
  await expect(page.getByText(/Kasun Perera/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /^Past Papers$/i })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: /Nethmi \(G11\)/i }).click();
  await expect(page).toHaveURL(/\/parent\/child\/nethmi/);

  await page.goto("/teacher");
  await expect(
    page.getByText(/Teacher \/ Tutor Studio/i).first(),
  ).toBeVisible();
  await expect(
    page.getByText(/Ms\. Menaka Jayawardena/i).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /NIE Syllabus Manager/i }),
  ).toHaveCount(0);
  await page.goto("/teacher/schedule");
  await expect(page.getByTestId("teacher-live-sessions")).toBeVisible();
  await expect(page.getByTestId("teacher-new-live-session")).toBeVisible();
  await page.goto("/teacher/courses");
  await expect(
    page.getByRole("heading", {
      name: /My Courses|මගේ පාඨමාලා|என் பாடநெறிகள்/i,
    }),
  ).toBeVisible();
  await expect(page.getByTestId("teacher-new-course")).toBeVisible();
  await expect(page.getByTestId("teacher-course-list")).toBeVisible();
  await page.getByRole("button", { name: "English (En)" }).first().click();
  await page.getByTestId("teacher-new-course").click();
  await page.getByRole("dialog").getByRole("button", { name: "Next" }).click();
  await page
    .getByRole("dialog")
    .getByRole("textbox")
    .first()
    .fill("Prototype Builder Course");
  await page.getByRole("dialog").getByRole("button", { name: "Next" }).click();
  await page.getByTestId("confirm-create-course").click();
  await expect(page).toHaveURL(/\/teacher\/courses\/.+/);
  await expect(page.getByTestId("teacher-course-builder-topbar")).toBeVisible();
  await expect(page.getByTestId("teacher-curriculum-rail")).toBeVisible();
  await page.goto("/teacher/quizzes");
  await expect(page).toHaveURL(/\/teacher\/quizzes\/?$/);
  await expect(page.getByTestId("teacher-quiz-list")).toBeVisible();
  await page.goto("/teacher/doubts");
  await expect(
    page.getByRole("heading", { name: /Student Doubts Queue/i }),
  ).toBeVisible();

  await page.goto("/admin/payments");
  await expect(page.getByText(/Admin Operations Desk/i).first()).toBeVisible();
  await expect(page.getByText(/Kamal Jayasinghe/i).first()).toBeVisible();
  await page.goto("/admin/syllabus");
  await expect(
    page.getByRole("heading", { name: /National Syllabus Curriculum Tree/i }),
  ).toBeVisible();

  await page.goto("/");
  await expect(page.getByTestId("landing-portal-parent")).toBeVisible();
  await expect(page.getByTestId("landing-portal-teacher")).toBeVisible();
  await expect(page.getByTestId("landing-portal-admin")).toBeVisible();

  await page.goto("/search");
  await page.getByRole("button", { name: "Light & Mirrors" }).click();
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

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/past-papers");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});
