import { useMemo, useState } from "react";
import { FileCheck2, Plus } from "lucide-react";
import {
  getLatestSubmission,
  listPublishedAssignmentLessons,
  useCoursesStore,
  type Grade,
} from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { ASSIGN_COPY } from "./assignment-copy";
import { AssignmentCreateForm } from "./assignment-create-form";
import { AssignmentGradeFilters } from "./assignment-grade-filters";
import { AssignmentMarkingPanel } from "./assignment-marking-panel";
import { AssignmentPublishedList } from "./assignment-published-list";

export function TeacherAssignmentsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const t = ASSIGN_COPY[lang];

  const paidSubmissions = store.submissions.filter((sub) => {
    const lesson = store.lessons.find((l) => l.id === sub.lessonId);
    if (!lesson) return false;
    const course = store.courses.find((c) => c.id === lesson.courseId);
    return Boolean(course && course.grade && !course.isFree);
  });
  const pendingCount = paidSubmissions.filter((s) => !s.gradedAt).length;

  const [mode, setMode] = useState<"marking" | "published">(
    pendingCount > 0 ? "marking" : "published",
  );
  const [creating, setCreating] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<Grade | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "graded"
  >("all");
  const [lessonFilter, setLessonFilter] = useState<string | null>(null);
  const [selectedPublishedId, setSelectedPublishedId] = useState<string | null>(
    null,
  );

  const publishedRows = useMemo(
    () =>
      listPublishedAssignmentLessons(store, {
        grade: gradeFilter,
        paidOnly: true,
      }),
    [store, gradeFilter],
  );

  const gradedList = paidSubmissions.filter((s) => Boolean(s.gradedAt));
  const avgScore =
    gradedList.length > 0
      ? Math.round(
          (gradedList.reduce((acc, s) => acc + (s.score ?? 0), 0) /
            gradedList.length) *
            10,
        ) / 10
      : 0;

  const visibleSubmissions = paidSubmissions.filter((s) => {
    const lesson = store.lessons.find((l) => l.id === s.lessonId);
    const course = lesson
      ? store.courses.find((c) => c.id === lesson.courseId)
      : undefined;
    if (!lesson || !course) return false;
    if (gradeFilter !== "all" && course.grade !== gradeFilter) return false;
    if (lessonFilter && s.lessonId !== lessonFilter) return false;
    const latest = getLatestSubmission(store, s.lessonId, s.studentId);
    if (latest && latest.id !== s.id) return false;
    if (statusFilter === "pending") return !s.gradedAt;
    if (statusFilter === "graded") return Boolean(s.gradedAt);
    return true;
  });

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={t.title}
      roleOverride="teacher"
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
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-sm font-bold text-[var(--sn-primary)]">
            <FileCheck2 className="h-4 w-4" />
            {paidSubmissions.length} {t.submissionsLabel}
          </span>
          <button
            type="button"
            onClick={() => setCreating((prev) => !prev)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{t.createBtn}</span>
          </button>
        </div>
      </section>

      {creating ? (
        <AssignmentCreateForm
          lang={lang}
          courses={store.courses}
          units={store.units}
          initialGrade={gradeFilter}
          onCreated={() => {
            setCreating(false);
            setMode("published");
            showToast(t.publishedToast);
          }}
          onCancel={() => setCreating(false)}
        />
      ) : null}

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["marking", t.tabMarking],
            ["published", t.tabPublished],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`min-h-11 rounded-xl px-4 text-sm font-bold ${
              mode === id
                ? "bg-[var(--sn-primary)] text-white"
                : "border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)]"
            }`}
          >
            {label}
            {id === "marking" && pendingCount > 0 ? ` (${pendingCount})` : ""}
          </button>
        ))}
      </div>

      <AssignmentGradeFilters
        lang={lang}
        gradeFilter={gradeFilter}
        allGradesLabel={t.allGrades}
        onChange={(next) => {
          setGradeFilter(next);
          setLessonFilter(null);
        }}
      />

      {mode === "marking" ? (
        <AssignmentMarkingPanel
          lang={lang}
          t={t}
          store={store}
          publishedCount={publishedRows.length}
          pendingCount={pendingCount}
          gradedCount={gradedList.length}
          avgScore={avgScore}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
          lessonFilter={lessonFilter}
          onClearLessonFilter={() => setLessonFilter(null)}
          visibleSubmissions={visibleSubmissions}
          onSaved={() => showToast(t.savedToast)}
        />
      ) : (
        <AssignmentPublishedList
          lang={lang}
          store={store}
          rows={publishedRows}
          selectedLessonId={selectedPublishedId}
          t={t}
          emptyLabel={t.emptyPublished}
          onSelect={(id) => setSelectedPublishedId(id || null)}
          onOpenMarking={(lessonId) => {
            setLessonFilter(lessonId);
            setMode("marking");
            setStatusFilter("all");
          }}
        />
      )}
    </SipNenaPortalShell>
  );
}
