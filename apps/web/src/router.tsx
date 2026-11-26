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
import {
  AcceptInvitationPage,
  AccountPage,
  AdminPage,
  AppLayout,
  AuthLayout,
  CourseDetailPage,
  CoursesPage,
  CreateAccountPage,
  FilesPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrganizationPage,
  OrganizationsPage,
  PickSubjectsPage,
  PreparingCoursesPage,
  ResetPasswordPage,
  SignupPage,
  SipNenaHomePage,
  VerifyEmailPage,
  VideoLessonPage,
  QuizPage,
  QuizResultPage,
  CourseCompletedPage,
  SipNenaProfilePage,
  CheckoutPage,
  EnrollPage,
  LandingPage,
  WelcomeLanguagePage,
} from "./route-components";

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

// Signed-out screens: sign in, sign up, email verification, password reset.
const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

// Signed-in screens share the sidebar shell and the session check.
const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: requireSession,
  component: AppLayout,
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
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect:
      typeof search.redirect === "string"
        ? safeRedirect(search.redirect)
        : undefined,
  }),
});

const homeRoute = publicPage("/", HomePage);
const welcomeLanguageRoute = publicPage(
  "/welcome-language",
  WelcomeLanguagePage,
);
const createAccountRoute = publicPage("/create-account", CreateAccountPage);
const pickSubjectsRoute = publicPage("/pick-subjects", PickSubjectsPage);
const preparingCoursesRoute = publicPage(
  "/preparing-courses",
  PreparingCoursesPage,
);
const forgotPasswordRoute = publicPage("/forgot-password", ForgotPasswordPage);
const resetPasswordRoute = publicPage("/reset-password", ResetPasswordPage);
const sipnenaHomeRoute = publicPage("/home", SipNenaHomePage);
const coursesRoute = publicPage("/courses", CoursesPage);
const courseRoute = publicPage("/course", CourseDetailPage);
const courseIdRoute = publicPage("/courses/$courseId", CourseDetailPage);
const videoLessonRoute = publicPage("/lesson", VideoLessonPage);
const quizRoute = publicPage("/quiz", QuizPage);
const quizResultRoute = publicPage("/quiz-result", QuizResultPage);
const courseCompletedRoute = publicPage(
  "/course-completed",
  CourseCompletedPage,
);
const meRoute = publicPage("/me", SipNenaProfilePage);
const profileRoute = publicPage("/profile", SipNenaProfilePage);
const checkoutRoute = publicPage("/checkout", CheckoutPage);
const enrollRoute = publicPage("/enroll", EnrollPage);
const landingRoute = publicPage("/landing", LandingPage);
const courseLessonRoute = publicPage(
  "/courses/$courseId/lesson",
  VideoLessonPage,
);

const routeTree = rootRoute.addChildren([
  homeRoute,
  sipnenaHomeRoute,
  coursesRoute,
  courseRoute,
  courseIdRoute,
  videoLessonRoute,
  quizRoute,
  quizResultRoute,
  courseCompletedRoute,
  meRoute,
  profileRoute,
  checkoutRoute,
  enrollRoute,
  landingRoute,
  courseLessonRoute,
  welcomeLanguageRoute,
  createAccountRoute,
  pickSubjectsRoute,
  loginRoute,
  preparingCoursesRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  authLayout.addChildren([
    authPage("/signup", SignupPage),
    authPage("/verify-email", VerifyEmailPage),
  ]),
  appLayout.addChildren([
    appPage("/account", AccountPage),
    appPage("/files", FilesPage),
    appPage("/admin", AdminPage),
    appPage("/organizations", OrganizationsPage, { organizations: true }),
    appPage("/organizations/$organizationId", OrganizationPage, {
      organizations: true,
    }),
    appPage("/accept-invitation/$invitationId", AcceptInvitationPage, {
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
