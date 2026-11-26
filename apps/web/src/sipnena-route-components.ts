import { lazyRouteComponent } from "@tanstack/react-router";

export const PastPapersPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "PastPapersPage",
);

export const PastPaperDetailPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "PastPaperDetailPage",
);

export const TermTestsPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "TermTestsPage",
);

export const NotesPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "NotesPage",
);

export const CourseMaterialsPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "CourseMaterialsPage",
);

export const LiveClassesPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "LiveClassesPage",
);

export const SchedulePage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "SchedulePage",
);

export const DoubtsPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "DoubtsPage",
);

export const CourseQaPage = lazyRouteComponent(
  () => import("./routes/curriculum"),
  "CourseQaPage",
);

export const PaymentStatusPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "PaymentStatusPage",
);

export const BillingPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "BillingPage",
);

export const ParentDashboardPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "ParentDashboardPage",
);

export const ParentChildPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "ParentChildPage",
);

export const TeacherHomePage = lazyRouteComponent(
  () => import("./routes/portals"),
  "TeacherHomePage",
);

export const TeacherCoursesPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "TeacherCoursesPage",
);

export const TeacherCourseBuilderPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "TeacherCourseBuilderPage",
);

export const TeacherDoubtsPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "TeacherDoubtsPage",
);

export const TeacherSchedulePage = lazyRouteComponent(
  () => import("./routes/portals"),
  "TeacherSchedulePage",
);

export const AdminPaymentsPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "AdminPaymentsPage",
);

export const AdminSyllabusPage = lazyRouteComponent(
  () => import("./routes/portals"),
  "AdminSyllabusPage",
);

export const SearchPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "SearchPage",
);

export const ProgressPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "ProgressPage",
);

export const QuizHistoryPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "QuizHistoryPage",
);

export const SavedPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "SavedPage",
);

export const DownloadsPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "DownloadsPage",
);

export const NotificationsPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "NotificationsPage",
);

export const HelpPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "HelpPage",
);

export const TermsPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "TermsPage",
);

export const PrivacyPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "PrivacyPage",
);

export const RefundPolicyPage = lazyRouteComponent(
  () => import("./routes/utilities"),
  "RefundPolicyPage",
);
