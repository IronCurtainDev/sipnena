import { BookOpen, Clock, Play } from "lucide-react";
import {
  getLessonsForCourse,
  isCourseAssignedToStudent,
  pickLocalized,
  resolveActiveStudentId,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { CourseThumbnail } from "./thumbnails";
import { HOME_STRINGS } from "./strings";

interface NewCoursesSectionProps {
  lang: AppLanguage;
  onCourseClick: (id: string) => void;
}

export function NewCoursesSection({
  lang,
  onCourseClick,
}: NewCoursesSectionProps) {
  const t = HOME_STRINGS[lang];
  const { store } = useCoursesStore();
  const mediumMap: Record<"si" | "ta" | "en", string> = {
    si: t.mediumSinhala,
    ta:
      lang === "si"
        ? "දෙමළ මාධ්‍යය"
        : lang === "ta"
          ? "தமிழ் மொழி"
          : "Tamil Medium",
    en: t.mediumEnglish,
  };
  const assignedBadge =
    lang === "si"
      ? "ගුරුවරයාගෙන්"
      : lang === "ta"
        ? "ஆசிரியரிடமிருந்து"
        : "From my teacher";

  const studentId = resolveActiveStudentId(store.activeStudentId);
  const courses = store.courses
    .filter((c) => c.status === "published")
    .sort((a, b) => {
      const aAssigned = isCourseAssignedToStudent(store, a.id, studentId)
        ? 0
        : 1;
      const bAssigned = isCourseAssignedToStudent(store, b.id, studentId)
        ? 0
        : 1;
      return aAssigned - bAssigned;
    })
    .slice(0, 3)
    .map((c) => {
      const lessons = getLessonsForCourse(store, c.id, {
        includeDrafts: false,
      });
      const totalMin = lessons.reduce(
        (acc, l) => acc + (l.durationMin ?? 0),
        0,
      );
      const hours =
        totalMin > 0
          ? Math.max(0.5, Math.round((totalMin / 60) * 10) / 10).toFixed(1)
          : (c.hoursLabel ?? "2.0");
      const assigned = isCourseAssignedToStudent(store, c.id, studentId);
      const thumbId =
        c.subject === "Mathematics"
          ? "geometry"
          : c.subject === "ICT"
            ? "python"
            : c.subject === "History"
              ? "history"
              : "geometry";
      return {
        id: c.id,
        thumbId,
        coverImageUrl: c.coverImageUrl,
        title: pickLocalized(c.title, lang),
        subject: c.subject,
        teacher: c.teacherName ?? "SipNena Mentor",
        lessonsCount: lessons.length || 1,
        hours,
        isFree: c.isFree,
        price:
          !c.isFree && c.priceLkr
            ? `Rs. ${c.priceLkr.toLocaleString("en-LK")}`
            : null,
        mediumText: mediumMap[c.medium],
        assigned,
        tagBg: assigned ? "bg-emerald-50" : "bg-[var(--sn-olive)]",
        tagColor: assigned ? "text-emerald-800" : "text-[var(--sn-primary)]",
      };
    });

  return (
    <section aria-labelledby="new-courses-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2
          id="new-courses-heading"
          className="text-lg font-bold leading-normal text-[var(--sn-text-main)] sm:text-xl"
        >
          {t.newForGradeTitle}
        </h2>

        <span className="text-xs font-medium text-[var(--sn-text-muted)] sm:text-sm">
          {t.updatedThisWeek}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {courses.map((course) => {
          const subjectLabel = course.assigned ? assignedBadge : course.subject;

          return (
            <article
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] transition hover:border-[var(--sn-text-muted)]"
            >
              <div
                onClick={() => onCourseClick(course.id)}
                className="flex cursor-pointer items-start gap-3.5 p-4 sm:hidden"
              >
                <CourseThumbnail
                  courseId={course.thumbId}
                  coverImageUrl={course.coverImageUrl}
                  badgeText={subjectLabel}
                  tagBg={course.tagBg}
                  tagColor={course.tagColor}
                  compact
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--sn-text-main)]">
                    {course.title}
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
                  {course.mediumText}
                </span>
                <button
                  type="button"
                  onClick={() => onCourseClick(course.id)}
                  className={`min-h-[44px] px-2 text-sm font-bold ${
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
                    courseId={course.thumbId}
                    coverImageUrl={course.coverImageUrl}
                    badgeText={course.mediumText}
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
                      {course.title}
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
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-surface-selected)] text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-primary)] hover:text-white active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
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
