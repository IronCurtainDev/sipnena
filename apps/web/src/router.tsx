import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  type ParsedLocation,
  type RouteComponent,
} from "@tanstack/react-router";
import { AppShell } from "./components/layout/app-shell";
import {
  FullScreen,
  NotFoundPage,
  PagePending,
  RouteErrorPage,
} from "./components/layout/status-pages";
import { OrganizationGate } from "./features/organizations/organization-gate";
import { authClient } from "./lib/auth/client";
import { safeRedirect } from "./lib/auth/redirect";
import * as Pages from "./route-components";

// Runs before rendering, so signed-out visitors never see protected screens.
async function requireSession({ location }: { location: ParsedLocation }) {
  const { data, error } = await authClient.getSession();
  if (error) throw new Error(error.message ?? "Unable to check your session.");
  if (!data)
    throw redirect({
      to: "/login",
      search: { redirect: safeRedirect(location.href) },
      replace: true,
    });
}

const rootRoute = createRootRoute({
  component: AppShell,
  notFoundComponent: () => (
    <FullScreen>
      <NotFoundPage />
    </FullScreen>
  ),
  errorComponent: () => (
    <FullScreen>
      <RouteErrorPage />
    </FullScreen>
  ),
});

const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: Pages.AuthLayout,
});

const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: requireSession,
  component: Pages.AppLayout,
});

function authPage<const Path extends string>(
  path: Path,
  Component: RouteComponent,
) {
  return createRoute({
    getParentRoute: () => authLayout,
    path,
    component: Component,
  });
}

function publicPage<const Path extends string>(
  path: Path,
  Component: RouteComponent,
) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: Component,
  });
}

function appPage<const Path extends string>(
  path: Path,
  Component: RouteComponent,
  options: { organizations?: boolean } = {},
) {
  return createRoute({
    getParentRoute: () => appLayout,
    path,
    wrapInSuspense: true,
    component: options.organizations
      ? () => (
          <OrganizationGate>
            <Component />
          </OrganizationGate>
        )
      : Component,
  });
}

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Pages.LoginPage,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect:
      typeof search.redirect === "string"
        ? safeRedirect(search.redirect)
        : undefined,
  }),
});

const routeTree = rootRoute.addChildren([
  publicPage("/", Pages.HomePage),
  publicPage("/landing", Pages.LandingPage),
  publicPage("/welcome-language", Pages.WelcomeLanguagePage),
  publicPage("/select-grade", Pages.SelectGradePage),
  publicPage("/select-medium", Pages.SelectMediumPage),
  publicPage("/create-account", Pages.CreateAccountPage),
  publicPage("/pick-subjects", Pages.PickSubjectsPage),
  publicPage("/preparing-courses", Pages.PreparingCoursesPage),
  publicPage("/forgot-password", Pages.ForgotPasswordPage),
  publicPage("/reset-password", Pages.ResetPasswordPage),
  publicPage("/home", Pages.SipNenaHomePage),
  publicPage("/courses", Pages.CoursesPage),
  publicPage("/course", Pages.CourseDetailPage),
  publicPage("/courses/$courseId", Pages.CourseDetailPage),
  publicPage("/courses/$courseId/lesson", Pages.VideoLessonPage),
  publicPage("/courses/$courseId/materials", Pages.CourseMaterialsPage),
  publicPage("/courses/$courseId/qa", Pages.CourseQaPage),
  publicPage("/lesson", Pages.VideoLessonPage),
  publicPage("/quiz", Pages.QuizPage),
  publicPage("/quiz-result", Pages.QuizResultPage),
  publicPage("/course-completed", Pages.CourseCompletedPage),
  publicPage("/me", Pages.SipNenaProfilePage),
  publicPage("/profile", Pages.SipNenaProfilePage),
  publicPage("/checkout", Pages.CheckoutPage),
  publicPage("/enroll", Pages.EnrollPage),
  publicPage("/payment-status", Pages.PaymentStatusPage),
  publicPage("/billing", Pages.BillingPage),
  publicPage("/past-papers", Pages.PastPapersPage),
  publicPage("/past-papers/$paperId", Pages.PastPaperDetailPage),
  publicPage("/term-tests", Pages.TermTestsPage),
  publicPage("/notes", Pages.NotesPage),
  publicPage("/live", Pages.LiveClassesPage),
  publicPage("/schedule", Pages.SchedulePage),
  publicPage("/doubts", Pages.DoubtsPage),
  publicPage("/parent", Pages.ParentDashboardPage),
  publicPage("/parent/child/$studentId", Pages.ParentChildPage),
  publicPage("/teacher", Pages.TeacherHomePage),
  publicPage("/teacher/courses", Pages.TeacherCoursesPage),
  publicPage("/teacher/quizzes", Pages.TeacherQuizzesPage),
  publicPage("/teacher/doubts", Pages.TeacherDoubtsPage),
  publicPage("/admin/payments", Pages.AdminPaymentsPage),
  publicPage("/admin/syllabus", Pages.AdminSyllabusPage),
  publicPage("/search", Pages.SearchPage),
  publicPage("/progress", Pages.ProgressPage),
  publicPage("/quiz-history", Pages.QuizHistoryPage),
  publicPage("/saved", Pages.SavedPage),
  publicPage("/downloads", Pages.DownloadsPage),
  publicPage("/notifications", Pages.NotificationsPage),
  publicPage("/help", Pages.HelpPage),
  publicPage("/terms", Pages.TermsPage),
  publicPage("/privacy", Pages.PrivacyPage),
  publicPage("/refund-policy", Pages.RefundPolicyPage),
  loginRoute,
  authLayout.addChildren([
    authPage("/signup", Pages.SignupPage),
    authPage("/verify-email", Pages.VerifyEmailPage),
  ]),
  appLayout.addChildren([
    appPage("/account", Pages.AccountPage),
    appPage("/files", Pages.FilesPage),
    appPage("/admin", Pages.AdminPage),
    appPage("/organizations", Pages.OrganizationsPage, { organizations: true }),
    appPage("/organizations/$organizationId", Pages.OrganizationPage, {
      organizations: true,
    }),
    appPage("/accept-invitation/$invitationId", Pages.AcceptInvitationPage, {
      organizations: true,
    }),
  ]),
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: PagePending,
  defaultErrorComponent: RouteErrorPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
