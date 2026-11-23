import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
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

// Route layouts and screens load on demand to keep the initial shell small.
const AuthLayout = lazyRouteComponent(
  () => import("./components/layout/auth-layout"),
  "AuthLayout",
);
const AppLayout = lazyRouteComponent(
  () => import("./components/layout/app-layout"),
  "AppLayout",
);
const HomePage = lazyRouteComponent(() => import("./routes"), "HomePage");
const LoginPage = lazyRouteComponent(
  () => import("./routes/login"),
  "LoginPage",
);
const SignupPage = lazyRouteComponent(
  () => import("./routes/login"),
  "SignupPage",
);
const VerifyEmailPage = lazyRouteComponent(
  () => import("./routes/verify-email"),
  "VerifyEmailPage",
);
const ForgotPasswordPage = lazyRouteComponent(
  () => import("./routes/password"),
  "ForgotPasswordPage",
);
const ResetPasswordPage = lazyRouteComponent(
  () => import("./routes/password"),
  "ResetPasswordPage",
);
const AccountPage = lazyRouteComponent(
  () => import("./routes/account"),
  "AccountPage",
);
const FilesPage = lazyRouteComponent(
  () => import("./routes/files"),
  "FilesPage",
);
const AdminPage = lazyRouteComponent(
  () => import("./routes/admin"),
  "AdminPage",
);
const OrganizationsPage = lazyRouteComponent(
  () => import("./routes/organizations"),
  "OrganizationsPage",
);
const OrganizationPage = lazyRouteComponent(
  () => import("./routes/organization"),
  "OrganizationPage",
);
const AcceptInvitationPage = lazyRouteComponent(
  () => import("./routes/accept-invitation"),
  "AcceptInvitationPage",
);
const WelcomeLanguagePage = lazyRouteComponent(
  () => import("./routes/welcome-language"),
  "WelcomeLanguagePage",
);
const CreateAccountPage = lazyRouteComponent(
  () => import("./routes/create-account"),
  "CreateAccountPage",
);
const PreparingCoursesPage = lazyRouteComponent(
  () => import("./routes/preparing-courses"),
  "PreparingCoursesPage",
);
const PickSubjectsPage = lazyRouteComponent(
  () => import("./routes/pick-subjects"),
  "PickSubjectsPage",
);

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

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const welcomeLanguageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/welcome-language",
  component: WelcomeLanguagePage,
});

const createAccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create-account",
  component: CreateAccountPage,
});

const pickSubjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pick-subjects",
  component: PickSubjectsPage,
});

const preparingCoursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/preparing-courses",
  component: PreparingCoursesPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
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
