import { ChevronRight } from "lucide-react";
import {
  getCourseById,
  getStudentEnrollments,
  resolveActiveStudentId,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { HOME_SUBJECTS } from "./mock-data";
import { HOME_STRINGS, type HomeStrings } from "./strings";

export { NewCoursesSection } from "./new-courses-section";

interface CoursesAndSubjectsProps {
  lang: AppLanguage;
  onSubjectClick: (id: string) => void;
}

function getChosenSubjectsFromStorage(): string[] {
  try {
    const raw = window.localStorage.getItem("sipnena_chosen_subjects");
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((s): s is string => typeof s === "string")
      : [];
  } catch {
    return [];
  }
}

export function MySubjectsSection({
  lang,
  onSubjectClick,
}: CoursesAndSubjectsProps) {
  const t = HOME_STRINGS[lang];
  const { store } = useCoursesStore();
  const studentId = resolveActiveStudentId(store.activeStudentId);
  const enrolledCourses = getStudentEnrollments(store, studentId);
  const subjectIds = new Set<string>();
  for (const enrollment of enrolledCourses) {
    const course = getCourseById(store, enrollment.courseId);
    if (course?.subject) subjectIds.add(course.subject);
  }
  for (const s of getChosenSubjectsFromStorage()) {
    subjectIds.add(s);
  }
  const visibleSubjects = HOME_SUBJECTS.filter((sub) => subjectIds.has(sub.id));

  return (
    <section aria-labelledby="subjects-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2
          id="subjects-heading"
          className="text-lg font-bold leading-normal text-[var(--sn-text-main)] sm:text-xl"
        >
          {t.mySubjectsTitle}
        </h2>

        <button
          type="button"
          onClick={() => onSubjectClick("all")}
          className="inline-flex min-h-[44px] items-center gap-1 rounded-xl px-2.5 py-1 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-surface-selected)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span>{t.viewAllBtn}</span>
          <ChevronRight
            className="hidden h-4 w-4 sm:inline"
            aria-hidden="true"
          />
        </button>
      </div>

      {visibleSubjects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 text-sm text-[var(--sn-text-secondary)]">
          No subjects selected yet. Browse courses to get started.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3">
          {visibleSubjects.map((sub) => {
            const label = getSubjectName(sub.id, t);
            const Icon = sub.icon;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSubjectClick(sub.id)}
                className="group flex min-h-[80px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2.5 py-2.5 text-center transition hover:border-[var(--sn-border-selected)] hover:bg-[var(--sn-surface-selected)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:min-h-[92px] sm:items-start sm:px-3 sm:py-3 sm:text-left"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${sub.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="w-full min-w-0">
                  <div className="truncate text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
                    <span className="sm:hidden">
                      {lang === "en" ? sub.mobileLabel : label}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                  <div className="hidden truncate text-xs font-medium text-[var(--sn-text-muted)] sm:block">
                    {sub.nativeScript}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function getSubjectName(id: string, t: HomeStrings): string {
  switch (id) {
    case "maths":
      return t.sub_maths;
    case "science":
      return t.sub_science;
    case "english":
      return t.sub_english;
    case "sinhala":
      return t.sub_sinhala;
    case "ict":
      return t.sub_ict;
    case "history":
      return t.sub_history;
    default:
      return id;
  }
}
