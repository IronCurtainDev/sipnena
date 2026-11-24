import { BookOpen, ChevronRight, Clock, Play } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { HOME_SUBJECTS, NEW_COURSES } from "./mock-data";
import { CourseThumbnail } from "./thumbnails";
import { HOME_STRINGS, type HomeStrings } from "./strings";

interface CoursesAndSubjectsProps {
  lang: AppLanguage;
  onSubjectClick: (id: string) => void;
  onCourseClick: (id: string) => void;
}

export function MySubjectsSection({
  lang,
  onSubjectClick,
}: Pick<CoursesAndSubjectsProps, "lang" | "onSubjectClick">) {
  const t = HOME_STRINGS[lang];

  return (
    <section aria-labelledby="subjects-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2
          id="subjects-heading"
          className="text-lg font-bold tracking-tight text-[var(--sn-text-main)] sm:text-xl"
        >
          {t.mySubjectsTitle}
        </h2>

        <button
          type="button"
          onClick={() => onSubjectClick("all")}
          className="inline-flex min-h-[40px] items-center gap-1 rounded-xl px-2.5 py-1 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-surface-selected)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span>{t.viewAllBtn}</span>
          <ChevronRight
            className="hidden h-4 w-4 sm:inline"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3">
        {HOME_SUBJECTS.map((sub) => {
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
    </section>
  );
}

export function NewCoursesSection({
  lang,
  onCourseClick,
}: Pick<CoursesAndSubjectsProps, "lang" | "onCourseClick">) {
  const t = HOME_STRINGS[lang];

  return (
    <section aria-labelledby="new-courses-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2
          id="new-courses-heading"
          className="text-lg font-bold tracking-tight text-[var(--sn-text-main)] sm:text-xl"
        >
          {t.newForGradeTitle}
        </h2>

        <span className="text-xs font-medium text-[var(--sn-text-muted)] sm:text-sm">
          {t.updatedThisWeek}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {NEW_COURSES.map((course) => {
          const subjectLabel = getSubjectName(course.subjectTagId, t);
          const courseTitle = getCourseTitle(course.id, t);
          const mediumText = t[course.mediumKey];

          return (
            <article
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] transition hover:border-[var(--sn-text-muted)]"
            >
              <div className="flex items-start gap-3.5 p-4 sm:hidden">
                <CourseThumbnail
                  courseId={course.id}
                  badgeText={subjectLabel}
                  tagBg={course.tagBg}
                  tagColor={course.tagColor}
                  compact
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--sn-text-main)]">
                    {courseTitle}
                  </h3>
                  <p className="truncate text-xs font-medium text-[var(--sn-text-secondary)]">
                    {t.byTeacherPrefix} {course.teacher}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 text-xs font-medium text-[var(--sn-text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Play
                        className="h-3.5 w-3.5 fill-[var(--sn-text-muted)]"
                        aria-hidden="true"
                      />
                      {course.lessonsCount} {t.lessonsWord}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>
                      {course.hours} {t.hrsWord}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--sn-border)] px-4 py-2.5 sm:hidden">
                <span className="rounded-lg bg-[var(--sn-surface-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--sn-text-secondary)]">
                  {mediumText}
                </span>
                <button
                  type="button"
                  onClick={() => onCourseClick(course.id)}
                  className={`min-h-[36px] px-2 text-sm font-bold ${
                    course.isFree
                      ? "text-emerald-700"
                      : "text-[var(--sn-text-main)]"
                  }`}
                >
                  {course.isFree ? t.freeLabel : course.price}
                </button>
              </div>

              <div className="hidden sm:flex sm:flex-1 sm:flex-col sm:justify-between">
                <div>
                  <CourseThumbnail
                    courseId={course.id}
                    badgeText={mediumText}
                  />
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${course.tagBg} ${course.tagColor}`}
                      >
                        {subjectLabel}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          course.isFree
                            ? "rounded-md border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-emerald-800"
                            : "text-[var(--sn-text-main)]"
                        }`}
                      >
                        {course.isFree ? t.freeLabel : course.price}
                      </span>
                    </div>
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--sn-text-main)]">
                      {courseTitle}
                    </h3>
                    <p className="truncate text-xs font-medium text-[var(--sn-text-muted)]">
                      {t.byTeacherPrefix} {course.teacher}
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-xs font-semibold text-[var(--sn-text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen
                          className="h-3.5 w-3.5 text-[var(--sn-primary)]"
                          aria-hidden="true"
                        />
                        {course.lessonsCount} {t.lessonsWord}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock
                          className="h-3.5 w-3.5 text-[var(--sn-primary)]"
                          aria-hidden="true"
                        />
                        {course.hours} {t.hrsWord}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--sn-border)] p-4 pt-3">
                  <button
                    type="button"
                    onClick={() => onCourseClick(course.id)}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-surface-selected)] text-xs font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-primary)] hover:text-white active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
                  >
                    <Play
                      className="h-3.5 w-3.5 fill-current"
                      aria-hidden="true"
                    />
                    <span>
                      {course.isFree ? t.startCourseBtn : t.enrollNowBtn}
                    </span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
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

function getCourseTitle(id: string, t: HomeStrings): string {
  switch (id) {
    case "geometry":
      return t.course_geometry_title;
    case "python":
      return t.course_python_title;
    case "history":
      return t.course_history_title;
    default:
      return id;
  }
}
