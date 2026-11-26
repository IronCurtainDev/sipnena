import { lazyRouteComponent } from "@tanstack/react-router";

export * from "./sipnena-route-components";

export const AuthLayout = lazyRouteComponent(
  () => import("./components/layout/auth-layout"),
  "AuthLayout",
);

export const AppLayout = lazyRouteComponent(
  () => import("./components/layout/app-layout"),
  "AppLayout",
);

export const HomePage = lazyRouteComponent(
  () => import("./routes"),
  "HomePage",
);

export const LoginPage = lazyRouteComponent(
  () => import("./routes/login"),
  "LoginPage",
);

export const SignupPage = lazyRouteComponent(
  () => import("./routes/login"),
  "SignupPage",
);

export const VerifyEmailPage = lazyRouteComponent(
  () => import("./routes/verify-email"),
  "VerifyEmailPage",
);

export const ForgotPasswordPage = lazyRouteComponent(
  () => import("./routes/password"),
  "ForgotPasswordPage",
);

export const ResetPasswordPage = lazyRouteComponent(
  () => import("./routes/password"),
  "ResetPasswordPage",
);

export const AccountPage = lazyRouteComponent(
  () => import("./routes/account"),
  "AccountPage",
);

export const FilesPage = lazyRouteComponent(
  () => import("./routes/files"),
  "FilesPage",
);

export const AdminPage = lazyRouteComponent(
  () => import("./routes/admin"),
  "AdminPage",
);

export const OrganizationsPage = lazyRouteComponent(
  () => import("./routes/organizations"),
  "OrganizationsPage",
);

export const OrganizationPage = lazyRouteComponent(
  () => import("./routes/organization"),
  "OrganizationPage",
);

export const AcceptInvitationPage = lazyRouteComponent(
  () => import("./routes/accept-invitation"),
  "AcceptInvitationPage",
);

export const WelcomeLanguagePage = lazyRouteComponent(
  () => import("./routes/welcome-language"),
  "WelcomeLanguagePage",
);

export const SelectGradePage = lazyRouteComponent(
  () => import("./routes/onboarding-steps"),
  "SelectGradePage",
);

export const SelectMediumPage = lazyRouteComponent(
  () => import("./routes/onboarding-steps"),
  "SelectMediumPage",
);

export const CreateAccountPage = lazyRouteComponent(
  () => import("./routes/create-account"),
  "CreateAccountPage",
);

export const PreparingCoursesPage = lazyRouteComponent(
  () => import("./routes/preparing-courses"),
  "PreparingCoursesPage",
);

export const PickSubjectsPage = lazyRouteComponent(
  () => import("./routes/pick-subjects"),
  "PickSubjectsPage",
);

export const SipNenaHomePage = lazyRouteComponent(
  () => import("./routes/home"),
  "SipNenaHomePage",
);

export const CoursesPage = lazyRouteComponent(
  () => import("./routes/courses"),
  "CoursesPage",
);

export const CourseDetailPage = lazyRouteComponent(
  () => import("./routes/course"),
  "CourseDetailPage",
);

export const VideoLessonPage = lazyRouteComponent(
  () => import("./routes/lesson"),
  "VideoLessonPage",
);

export const QuizPage = lazyRouteComponent(
  () => import("./routes/quiz"),
  "QuizPage",
);

export const QuizResultPage = lazyRouteComponent(
  () => import("./routes/quiz-result"),
  "QuizResultPage",
);

export const CourseCompletedPage = lazyRouteComponent(
  () => import("./routes/course-completed"),
  "CourseCompletedPage",
);

export const SipNenaProfilePage = lazyRouteComponent(
  () => import("./routes/me"),
  "SipNenaProfilePage",
);

export const CheckoutPage = lazyRouteComponent(
  () => import("./routes/checkout"),
  "CheckoutPage",
);

export const EnrollPage = lazyRouteComponent(
  () => import("./routes/enroll"),
  "EnrollPage",
);

export const LandingPage = lazyRouteComponent(
  () => import("./routes/landing"),
  "LandingPage",
);
