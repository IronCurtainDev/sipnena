import { BillingScreen } from "@/features/billing/billing-screen";
import { PaymentStatusScreen } from "@/features/billing/payment-status-screen";
import { ParentDashboardScreen } from "@/features/parent/screen";
import { TeacherStudioHomeScreen } from "@/features/teacher/home-screen";
import { TeacherCoursesScreen } from "@/features/teacher/courses-screen";
import { TeacherQuizzesScreen } from "@/features/teacher/quizzes-screen";
import { TeacherDoubtsScreen } from "@/features/teacher/doubts-screen";
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
  return <TeacherCoursesScreen />;
}

export function TeacherQuizzesPage() {
  return <TeacherQuizzesScreen />;
}

export function TeacherDoubtsPage() {
  return <TeacherDoubtsScreen />;
}

export function AdminPaymentsPage() {
  return <AdminPaymentsScreen />;
}

export function AdminSyllabusPage() {
  return <AdminSyllabusScreen />;
}
