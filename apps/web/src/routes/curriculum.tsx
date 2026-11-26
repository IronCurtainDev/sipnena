import { PastPapersCatalogScreen } from "@/features/past-papers/catalog-screen";
import { PastPaperViewerScreen } from "@/features/past-papers/viewer-screen";
import { TermTestsScreen } from "@/features/term-tests/screen";
import { NotesAndMaterialsScreen } from "@/features/notes/screen";
import { LiveAndScheduleScreen } from "@/features/live-schedule/screen";
import { DoubtsAndQaScreen } from "@/features/doubts/screen";

export function PastPapersPage() {
  return <PastPapersCatalogScreen />;
}

export function PastPaperDetailPage() {
  return <PastPaperViewerScreen />;
}

export function TermTestsPage() {
  return <TermTestsScreen />;
}

export function NotesPage() {
  return <NotesAndMaterialsScreen />;
}

export function CourseMaterialsPage() {
  return <NotesAndMaterialsScreen courseScoped />;
}

export function LiveClassesPage() {
  return <LiveAndScheduleScreen defaultTab="live" />;
}

export function SchedulePage() {
  return <LiveAndScheduleScreen defaultTab="timetable" />;
}

export function DoubtsPage() {
  return <DoubtsAndQaScreen />;
}

export function CourseQaPage() {
  return <DoubtsAndQaScreen courseScoped />;
}
