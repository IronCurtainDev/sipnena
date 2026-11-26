import { BillingScreen } from "@/features/billing/billing-screen";
import { PaymentStatusScreen } from "@/features/billing/payment-status-screen";
import { ParentDashboardScreen } from "@/features/parent/screen";
import { TeacherStudioHomeScreen } from "@/features/teacher/home-screen";
import { TeacherCoursesLibraryScreen } from "@/features/teacher/courses-library-screen";
import { TeacherCourseBuilderScreen } from "@/features/teacher/course-builder-screen";
import { TeacherDoubtsScreen } from "@/features/teacher/doubts-screen";
import { TeacherScheduleScreen } from "@/features/teacher/schedule-screen";
import { AdminPaymentsScreen } from "@/features/admin-ops/payments-screen";
import { AdminSyllabusScreen } from "@/features/admin-ops/syllabus-screen";

export function PaymentStatusPage() {
  return <PaymentStatusScreen />;
}

export function BillingPage() {
  return <BillingScreen />;
}

export function ParentDashboardPage() {
  return <ParentDashboardScreen />;
}

export function ParentChildPage() {
  return <ParentDashboardScreen />;
}

export function TeacherHomePage() {
  return <TeacherStudioHomeScreen />;
}

export function TeacherCoursesPage() {
  return <TeacherCoursesLibraryScreen />;
}

export function TeacherCourseBuilderPage() {
  return <TeacherCourseBuilderScreen />;
}

export function TeacherDoubtsPage() {
  return <TeacherDoubtsScreen />;
}

export function TeacherSchedulePage() {
  return <TeacherScheduleScreen />;
}

export function AdminPaymentsPage() {
  return <AdminPaymentsScreen />;
}

export function AdminSyllabusPage() {
  return <AdminSyllabusScreen />;
}
