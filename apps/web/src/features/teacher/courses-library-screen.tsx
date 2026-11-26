import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  usePrototypeState,
  type TeacherCourseDraft,
} from "@/lib/prototype-state";
import { deleteTeacherCourse } from "@/lib/teacher-curriculum";
import { CoursesLibraryEmpty } from "./courses-library-empty";
import { TEACHER_COURSE_COPY } from "./course-strings";
import { TeacherCourseCard } from "./teacher-course-card";

type StatusFilter = "all" | "draft" | "published";

export function TeacherCoursesLibraryScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const navigate = useNavigate();
  const copy = TEACHER_COURSE_COPY[lang];
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const lessonCounts: Record<string, number> = {};
  for (const lesson of state.teacherLessons) {
    lessonCounts[lesson.courseId] = (lessonCounts[lesson.courseId] ?? 0) + 1;
  }

  const filtered = state.teacherCourses.filter((course) => {
    if (status === "draft" && course.published) return false;
    if (status === "published" && !course.published) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      course.title.toLowerCase().includes(q) ||
      course.subject.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q)
    );
  });

  const createCourse = () => {
    const id = `tc-${Date.now()}`;
    const sectionId = `ts-${Date.now()}`;
    update((prev) => ({
      ...prev,
      teacherCourses: [
        {
          id,
          title:
            lang === "si"
              ? "නව පාඨමාලාව"
              : lang === "ta"
                ? "புதிய பாடநெறி"
                : "Untitled course",
          subject: "Science",
          grade: 8,
          medium: "si",
          term: "Term 2",
          description: "",
          isFree: true,
          price: null,
          published: false,
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev.teacherCourses,
      ],
      teacherCourseSections: [
        {
          id: sectionId,
          courseId: id,
          title: copy.defaultSectionTitle,
          order: 0,
        },
        ...prev.teacherCourseSections,
      ],
    }));
    showToast(copy.courseCreatedToast);
    void navigate({
      to: "/teacher/courses/$courseId",
      params: { courseId: id },
    });
  };

  const deleteCourse = (course: TeacherCourseDraft) => {
    if (!window.confirm(copy.deleteConfirm)) return;
    update((prev) => deleteTeacherCourse(prev, course.id));
    showToast(copy.courseDeletedToast);
  };

  const filters: { id: StatusFilter; label: string }[] = [
    { id: "all", label: copy.filterAll },
    { id: "draft", label: copy.filterDraft },
    { id: "published", label: copy.filterPublished },
  ];

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.libraryTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--sn-primary)]">
            {copy.libraryTitle}
          </h2>
          <p className="mt-1 text-base text-[var(--sn-text-secondary)]">
            {copy.librarySubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={createCourse}
          data-testid="teacher-new-course"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 text-base font-bold text-white hover:bg-[var(--sn-primary-hover)]"
        >
          <Plus className="h-5 w-5" />
          <span>{copy.newCourseBtn}</span>
        </button>
      </section>

      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex gap-1 border-b border-[var(--sn-border)] text-base font-bold text-[var(--sn-text-secondary)]">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatus(f.id)}
              className={`min-h-12 border-b-2 px-4 ${
                status === f.id
                  ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                  : "border-transparent hover:text-[var(--sn-text-main)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="relative block min-w-0 flex-1 md:max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--sn-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="min-h-12 w-full rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] py-3 pr-3 pl-12 text-base"
          />
        </label>
      </section>

      <section data-testid="teacher-course-list">
        {state.teacherCourses.length === 0 ? (
          <CoursesLibraryEmpty
            copy={copy}
            kind="none"
            onCreate={createCourse}
            onClearFilters={() => {
              setQuery("");
              setStatus("all");
            }}
          />
        ) : filtered.length === 0 ? (
          <CoursesLibraryEmpty
            copy={copy}
            kind="nomatch"
            onCreate={createCourse}
            onClearFilters={() => {
              setQuery("");
              setStatus("all");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((course) => (
              <TeacherCourseCard
                key={course.id}
                lang={lang}
                copy={copy}
                course={course}
                lessonCount={lessonCounts[course.id] ?? 0}
                onDelete={deleteCourse}
              />
            ))}
          </div>
        )}
      </section>
    </SipNenaPortalShell>
  );
}
