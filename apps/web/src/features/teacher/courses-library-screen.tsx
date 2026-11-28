import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import {
  duplicateCourse,
  pickLocalized,
  updateCourseStore,
  useCoursesStore,
  type Course,
  type Medium,
  type PublishStatus,
} from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import { CoursesLibraryEmpty } from "./courses-library-empty";
import { TEACHER_COURSE_COPY } from "./course-strings";
import { NewCourseDialog } from "./new-course-dialog";
import { TeacherCourseCard } from "./teacher-course-card";

type StatusFilter = "all" | PublishStatus;

export function TeacherCoursesLibraryScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const navigate = useNavigate();
  const copy = TEACHER_COURSE_COPY[lang];
  const extra = BUILDER_EXTRA_COPY[lang];
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const activeTeacherId = store.activeTeacherId;
  const hasActiveTeacher = Boolean(
    activeTeacherId &&
      store.teachers.some(
        (t) => t.id === activeTeacherId && t.status === "active",
      ),
  );
  const ownedCourses = store.courses.filter(
    (course) =>
      Boolean(activeTeacherId) && course.teacherId === activeTeacherId,
  );
  const filtered = ownedCourses.filter((course) => {
    if (status !== "all" && course.status !== status) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const haystack = [
      course.title.en,
      course.title.si,
      course.title.ta,
      course.subject,
      course.description.en,
      course.description.si,
      course.description.ta,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  const handleDuplicate = (course: Course, targetMedium: Medium) => {
    const newId = duplicateCourse(course.id, targetMedium);
    if (!newId) return;
    showToast(copy.courseCreatedToast);
    void navigate({
      to: "/teacher/courses/$courseId",
      params: { courseId: newId },
    });
  };

  const handleDelete = (course: Course) => {
    if (!window.confirm(copy.deleteConfirm)) return;
    updateCourseStore((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== course.id),
      units: prev.units.filter((u) => u.courseId !== course.id),
      lessons: prev.lessons.filter((l) => l.courseId !== course.id),
    }));
    showToast(copy.courseDeletedToast);
  };

  const filters: { id: StatusFilter; label: string }[] = [
    { id: "all", label: copy.filterAll },
    { id: "draft", label: extra.statusDraft },
    { id: "scheduled", label: extra.statusScheduled },
    { id: "published", label: extra.statusPublished },
  ];

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.libraryTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-[var(--sn-text-secondary)]">
          {copy.librarySubtitle}
        </p>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          disabled={!hasActiveTeacher}
          data-testid="teacher-new-course"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 text-base font-extrabold text-white shadow-sm disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          <span>{copy.newCourseBtn}</span>
        </button>
      </div>

      {!hasActiveTeacher ? (
        <p
          className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950"
          data-testid="teacher-no-account-banner"
        >
          Ask an admin to create a teacher account, then pick it from the
          Teacher role switcher.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStatus(item.id)}
              className={`min-h-11 rounded-full px-4 text-sm font-bold ${
                status === item.id
                  ? "bg-[var(--sn-primary)] text-white"
                  : "border border-[var(--sn-border)] text-[var(--sn-text-main)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute top-3.5 left-3 h-4 w-4 text-[var(--sn-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] py-2 pr-3 pl-9 text-base"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <CoursesLibraryEmpty
          copy={copy}
          kind={status === "all" && !query.trim() ? "none" : "nomatch"}
          onCreate={() => setDialogOpen(true)}
          onClearFilters={() => {
            setStatus("all");
            setQuery("");
          }}
        />
      ) : (
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
          data-testid="teacher-course-list"
        >
          {filtered.map((course) => (
            <TeacherCourseCard
              key={course.id}
              lang={lang}
              copy={copy}
              course={course}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <NewCourseDialog
        lang={lang}
        copy={copy}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={(courseId) => {
          setDialogOpen(false);
          showToast(
            `${copy.courseCreatedToast} (${pickLocalized({ en: courseId }, lang)})`,
          );
          void navigate({
            to: "/teacher/courses/$courseId",
            params: { courseId },
          });
        }}
      />
    </SipNenaPortalShell>
  );
}
