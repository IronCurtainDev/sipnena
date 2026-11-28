import { X } from "lucide-react";
import {
  getCompletedLessonIds,
  getStudentQuizAttempts,
  isQuizAttemptPassed,
  pickLocalized,
  type CourseStoreState,
  type StudentAccount,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

interface StudentDetailDrawerProps {
  lang: AppLanguage;
  student: StudentAccount | null;
  store: CourseStoreState;
  onClose: () => void;
}

export function StudentDetailDrawer({
  lang,
  student,
  store,
  onClose,
}: StudentDetailDrawerProps) {
  if (!student) return null;

  const completedIds = new Set(getCompletedLessonIds(store, student.id));
  const completedLessons = store.lessons.filter((l) => completedIds.has(l.id));
  const attempts = getStudentQuizAttempts(store, student.id);
  const submissions = store.submissions.filter(
    (s) => s.studentId === student.id,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-detail-title"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs"
    >
      <div className="h-full w-full max-w-md space-y-5 overflow-y-auto bg-[var(--sn-surface)] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2
              id="student-detail-title"
              className="text-xl font-extrabold text-[var(--sn-primary)]"
            >
              {student.name}
            </h2>
            <p className="text-sm text-[var(--sn-text-muted)]">
              Grade {student.grade} · {student.medium.toUpperCase()} ·{" "}
              {student.xp ?? 0} XP
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sn-border)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase text-[var(--sn-text-muted)]">
            Completed lessons ({completedLessons.length})
          </h3>
          {completedLessons.length === 0 ? (
            <p className="text-sm text-[var(--sn-text-muted)]">
              No completed lessons yet.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {completedLessons.map((l) => (
                <li
                  key={l.id}
                  className="rounded-xl border border-[var(--sn-border)] px-3 py-2 font-semibold"
                >
                  {pickLocalized(l.title, lang)}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase text-[var(--sn-text-muted)]">
            Quiz attempts ({attempts.length})
          </h3>
          {attempts.length === 0 ? (
            <p className="text-sm text-[var(--sn-text-muted)]">
              No quiz attempts yet.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {attempts.map((att, idx) => {
                const quiz = store.quizzes.find((q) => q.id === att.quizId);
                const passed = isQuizAttemptPassed(att, quiz);
                return (
                  <li
                    key={`${att.quizId}-${idx}`}
                    className="rounded-xl border border-[var(--sn-border)] p-3"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>
                        {quiz ? pickLocalized(quiz.title, lang) : att.quizId}
                      </span>
                      <span
                        className={
                          passed ? "text-emerald-700" : "text-amber-700"
                        }
                      >
                        {att.score}/{att.total}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase text-[var(--sn-text-muted)]">
            Assignment submissions ({submissions.length})
          </h3>
          {submissions.length === 0 ? (
            <p className="text-sm text-[var(--sn-text-muted)]">None yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {submissions.map((sub) => (
                <li
                  key={sub.id}
                  className="rounded-xl border border-[var(--sn-border)] p-3"
                >
                  <p className="font-semibold">{sub.text || "Photo upload"}</p>
                  <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
                    {sub.gradedAt
                      ? `Score: ${sub.score ?? 0}`
                      : "Pending review"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
