import { useMemo, useState } from "react";
import { FileCheck2 } from "lucide-react";
import {
  pickLocalized,
  resolveActiveStudentId,
  studentAssignmentEntries,
  useCoursesStore,
  type StudentAssignmentStatus,
} from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { AssignmentLessonPanel } from "@/features/video-lesson/assignment-panel";
import { formatGrade } from "@/lib/i18n-common";
import {
  STUDENT_ASSIGN_COPY,
  statusBadgeClass,
  statusLabel,
} from "./assignment-status-copy";

export function StudentAssignmentsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const t = STUDENT_ASSIGN_COPY[lang];
  const [statusFilter, setStatusFilter] = useState<
    "all" | StudentAssignmentStatus
  >("all");

  const studentId = resolveActiveStudentId(store.activeStudentId);
  const entries = useMemo(
    () => studentAssignmentEntries(store, studentId),
    [store, studentId],
  );

  const visible = entries.filter((row) =>
    statusFilter === "all" ? true : row.status === statusFilter,
  );

  const counts = {
    all: entries.length,
    todo: entries.filter((e) => e.status === "todo").length,
    submitted: entries.filter((e) => e.status === "submitted").length,
    graded: entries.filter((e) => e.status === "graded").length,
    overdue: entries.filter((e) => e.status === "overdue").length,
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={t.title}
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--sn-primary)]">
            {t.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
            {t.subtitle}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-sm font-bold text-[var(--sn-primary)]">
          <FileCheck2 className="h-4 w-4" aria-hidden="true" />
          {entries.length}
        </span>
      </section>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", t.all, counts.all],
            ["todo", t.todo, counts.todo],
            ["submitted", t.submitted, counts.submitted],
            ["graded", t.graded, counts.graded],
            ["overdue", t.overdue, counts.overdue],
          ] as const
        ).map(([id, label, count]) => (
          <button
            key={id}
            type="button"
            onClick={() => setStatusFilter(id)}
            className={`min-h-10 rounded-full px-4 text-xs font-bold ${
              statusFilter === id
                ? "bg-[var(--sn-primary)] text-white"
                : "border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)]"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center text-base text-[var(--sn-text-muted)]">
          {t.empty}
        </div>
      ) : (
        <div className="space-y-5">
          {visible.map(({ lesson, course, item, status, submission }) => (
            <div key={lesson.id} className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--sn-text-muted)]">
                  {formatGrade(lang, course.grade)} ·{" "}
                  {pickLocalized(course.title, lang)} ·{" "}
                  {pickLocalized(lesson.title, lang)}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusBadgeClass(status)}`}
                >
                  {statusLabel(lang, status)}
                  {status === "graded" && submission?.score !== undefined
                    ? ` · ${submission.score}/${item.maxScore ?? 10}`
                    : ""}
                  {item.dueAt ? ` · ${t.dueLabel} ${item.dueAt.slice(0, 10)}` : ""}
                </span>
              </div>
              <AssignmentLessonPanel
                lessonId={lesson.id}
                courseId={course.id}
                title={pickLocalized(lesson.title, lang)}
                instructions={pickLocalized(item.instructions, lang)}
                dueAt={item.dueAt}
                maxScore={item.maxScore ?? 10}
                submissionMode={item.submissionMode}
                lang={lang}
                onToast={showToast}
              />
            </div>
          ))}
        </div>
      )}
    </SipNenaPortalShell>
  );
}
