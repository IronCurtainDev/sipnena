import { GlobalSearchScreen } from "@/features/search/screen";
import { ProgressAndMistakesScreen } from "@/features/progress/screen";
import { ExamPrepHubScreen } from "@/features/student-hubs/exam-prep-screen";
import { LiveAndAskHubScreen } from "@/features/student-hubs/live-ask-screen";
import { SavedBookmarksScreen } from "@/features/saved/screen";
import { DownloadsScreen } from "@/features/downloads/screen";
import { NotificationsScreen } from "@/features/notifications/screen";
import { HelpAndSupportScreen } from "@/features/help-legal/help-screen";
import { LegalDocumentScreen } from "@/features/help-legal/legal-screen";
import { StudentAssignmentsScreen } from "@/features/student-hubs/assignments-screen";

export function SearchPage() {
  return <GlobalSearchScreen />;
}

export function ExamPrepHubPage() {
  return <ExamPrepHubScreen />;
}

export function LiveAskHubPage() {
  return <LiveAndAskHubScreen />;
}

export function ProgressPage() {
  return <ProgressAndMistakesScreen defaultTab="overview" />;
}

export function QuizHistoryPage() {
  return <ProgressAndMistakesScreen defaultTab="history" />;
}

export function SavedPage() {
  return <SavedBookmarksScreen />;
}

export function DownloadsPage() {
  return <DownloadsScreen />;
}

export function NotificationsPage() {
  return <NotificationsScreen />;
}

export function HelpPage() {
  return <HelpAndSupportScreen />;
}

export function TermsPage() {
  return <LegalDocumentScreen kind="terms" />;
}

export function PrivacyPage() {
  return <LegalDocumentScreen kind="privacy" />;
}

export function RefundPolicyPage() {
  return <LegalDocumentScreen kind="refund" />;
}

export function StudentAssignmentsPage() {
  return <StudentAssignmentsScreen />;
}
