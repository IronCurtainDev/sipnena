import {
  getLatestSubmission,
  type AssignmentSubmission,
  type CourseStoreState,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { AssignCopy } from "./assignment-copy";
import { AssignmentDashboard } from "./assignment-dashboard";
import { AssignmentSubmissionCard } from "./assignment-submission-card";

interface AssignmentMarkingPanelProps {
  lang: AppLanguage;
  t: AssignCopy;
  store: CourseStoreState;
  publishedCount: number;
  pendingCount: number;
  gradedCount: number;
  avgScore: number;
  statusFilter: "all" | "pending" | "graded";
  onFilterChange: (next: "all" | "pending" | "graded") => void;
  lessonFilter: string | null;
  onClearLessonFilter: () => void;
  visibleSubmissions: AssignmentSubmission[];
  onSaved: () => void;
}

export function AssignmentMarkingPanel({
  lang,
  t,
  store,
  publishedCount,
  pendingCount,
  gradedCount,
  avgScore,
  statusFilter,
  onFilterChange,
  lessonFilter,
  onClearLessonFilter,
  visibleSubmissions,
  onSaved,
}: AssignmentMarkingPanelProps) {
  return (
    <>
      <AssignmentDashboard
        lang={lang}
        t={t}
        publishedCount={publishedCount}
        pendingCount={pendingCount}
        gradedCount={gradedCount}
        avgScore={avgScore}
        totalSubmissions={visibleSubmissions.length}
        statusFilter={statusFilter}
        onFilterChange={onFilterChange}
      />

      {lessonFilter ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            {store.lessons.find((l) => l.id === lessonFilter)?.title.en ??
              lessonFilter}
          </span>
          <button
            type="button"
            onClick={onClearLessonFilter}
            className="min-h-9 rounded-xl border border-[var(--sn-border)] px-3 text-xs font-bold"
          >
            {lang === "si"
              ? "පෙරහන ඉවත් කරන්න"
              : lang === "ta"
                ? "வடிகட்டியை அகற்று"
                : "Clear assignment filter"}
          </button>
        </div>
      ) : null}

      {visibleSubmissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center text-base text-[var(--sn-text-muted)]">
          {t.empty}
        </div>
      ) : (
        <div className="space-y-4">
          {visibleSubmissions.map((sub) => {
            const lesson = store.lessons.find((l) => l.id === sub.lessonId)!;
            const course = store.courses.find((c) => c.id === lesson.courseId)!;
            const stu = store.students.find((s) => s.id === sub.studentId);
            const latest = getLatestSubmission(store, sub.lessonId, sub.studentId);
            if (latest && latest.id !== sub.id) return null;
            return (
              <AssignmentSubmissionCard
                key={sub.id}
                lang={lang}
                sub={sub}
                studentName={stu?.name ?? sub.studentName}
                lesson={lesson}
                course={course}
                t={t}
                onSaved={onSaved}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
