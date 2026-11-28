import { Bookmark, Clock, Play, Star } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { CourseCoverIllustration } from "./course-illustrations";
import { CATALOG_EXTRA_COPY } from "./courses-adapter";
import type { CourseItem } from "./mock-data";
import type { CourseStrings } from "./strings.types";

interface CourseCardProps {
  course: CourseItem;
  lang: AppLanguage;
  isSaved: boolean;
  onToggleSave: (id: string, title: string) => void;
  onOpenModal: (course: CourseItem) => void;
  t: CourseStrings;
}

export function CourseCard({
  course,
  lang,
  isSaved,
  onToggleSave,
  onOpenModal,
  t,
}: CourseCardProps) {
  const extra = CATALOG_EXTRA_COPY[lang];
  const fallbackMobile =
    course.key !== "dynamic"
      ? t[`course_${course.key}_title` as keyof CourseStrings] || ""
      : "";
  const fallbackDesktop =
    course.key !== "dynamic"
      ? t[`course_${course.key}_titleDesktop` as keyof CourseStrings] ||
        fallbackMobile
      : "";
  const mobileTitle = course.title ?? fallbackMobile;
  const desktopTitle = course.title ?? fallbackDesktop;
  const courseDesc =
    course.desc ??
    (course.key !== "dynamic"
      ? t[`course_${course.key}_desc` as keyof CourseStrings] || ""
      : "");
  const mediumText =
    course.mediumLabel ?? t[course.mediumBadgeKey as keyof CourseStrings] ?? "";
  const mediumDesktopText =
    course.mediumDesktopLabel ??
    t[`${course.mediumBadgeKey}Desktop` as keyof CourseStrings] ??
    mediumText;
  const unitText =
    course.unitLabel ?? t[course.unitKey as keyof CourseStrings] ?? "";

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-xs transition hover:border-[var(--sn-border-selected)]">
      {/* MOBILE HORIZONTAL COURSE CARD (< 640px) */}
      <div className="flex sm:hidden">
        <div className="w-1.5 shrink-0 bg-[var(--sn-primary)]" />

        <div className="min-w-0 flex-1 space-y-3 p-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => onOpenModal(course)}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[var(--sn-border)] text-left cursor-pointer focus:outline-none"
            >
              <CourseCoverIllustration
                courseId={course.id}
                coverImageUrl={course.coverImageUrl}
              />
              <span className="absolute bottom-1 right-1 rounded bg-slate-900/90 px-1.5 py-0.5 text-xs font-bold text-white">
                {course.videosCount} {t.vidShort}
              </span>
            </button>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-start justify-between gap-1">
                <button
                  type="button"
                  onClick={() => onOpenModal(course)}
                  className="line-clamp-2 text-base font-bold leading-snug text-[var(--sn-text-main)] text-left cursor-pointer hover:text-[var(--sn-primary)] focus:outline-none"
                >
                  {mobileTitle}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSave(course.id, mobileTitle)}
                  aria-label={isSaved ? t.savedCourseAria : t.saveCourseAria}
                  aria-pressed={isSaved}
                  className={`-mr-2 -mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                    isSaved ? "text-[var(--sn-primary)]" : "text-slate-400"
                  }`}
                >
                  <Bookmark
                    className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <p className="truncate text-sm text-[var(--sn-text-muted)]">
                {t.byPrefix} {course.teacher}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-sm text-[var(--sn-text-secondary)]">
                {course.rating ? (
                  <>
                    <span className="inline-flex items-center gap-1 font-bold text-amber-800">
                      <Star
                        className="h-4 w-4 fill-amber-400 text-amber-600"
                        aria-hidden="true"
                      />
                      {course.rating}
                    </span>
                    {course.reviews > 0 ? (
                      <span className="text-[var(--sn-text-muted)]">
                        ({course.reviews})
                      </span>
                    ) : null}
                    <span>•</span>
                  </>
                ) : null}
                <span>
                  {course.lessonsCount} {t.lessonsWord}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <span className="rounded-lg bg-[var(--sn-surface-muted)] px-3 py-1 text-sm font-medium text-[var(--sn-text-secondary)]">
              {mediumText}
            </span>

            <button
              type="button"
              onClick={() => onOpenModal(course)}
              className={`min-h-[44px] rounded-xl px-4 text-base font-semibold transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                course.isFree
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)]"
              }`}
            >
              {course.isFree ? t.freeOption : course.price}
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP & TABLET VERTICAL COURSE CARD (>= 640px) */}
      <div className="hidden flex-1 flex-col justify-between sm:flex">
        <div>
          <div className="relative h-36 w-full overflow-hidden border-b border-[var(--sn-border)]">
            <CourseCoverIllustration
              courseId={course.id}
              coverImageUrl={course.coverImageUrl}
            />

            <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5 pr-12">
              <span className="rounded-md border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2.5 py-1 text-xs font-bold text-[var(--sn-primary)]">
                {t.gradePrefix} {course.grade}
              </span>
              <span className="rounded-md border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--sn-text-main)]">
                {mediumDesktopText}
              </span>
              {course.isAssigned ? (
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  {extra.fromTeacher}
                </span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => onToggleSave(course.id, desktopTitle)}
              aria-label={isSaved ? t.savedCourseAria : t.saveCourseAria}
              aria-pressed={isSaved}
              className={`absolute right-2.5 top-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface)] transition hover:bg-[var(--sn-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                isSaved
                  ? "text-[var(--sn-primary)]"
                  : "text-[var(--sn-text-muted)]"
              }`}
            >
              <Bookmark
                className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
              />
            </button>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[var(--sn-text-main)]/90 px-3.5 py-1.5 text-sm font-medium text-[var(--sn-cream)]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {course.hours} {t.hrsWord}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Play className="h-4 w-4" aria-hidden="true" />
                {course.unitsCount ?? 1} {extra.unitsWord} ·{" "}
                {course.lessonsCount} {t.lessonsWord}
              </span>
            </div>
          </div>

          <div className="space-y-2 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-[var(--sn-primary)]">
              <span>{unitText}</span>
              {course.progressPercent && course.progressPercent > 0 ? (
                <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                  {course.progressPercent}% {extra.completedWord}
                </span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => onOpenModal(course)}
              className="line-clamp-2 cursor-pointer text-left text-lg font-bold leading-normal text-[var(--sn-text-main)] hover:text-[var(--sn-primary)] focus:outline-none"
            >
              {desktopTitle}
            </button>

            <p className="line-clamp-2 text-base leading-normal text-[var(--sn-text-secondary)]">
              {courseDesc}
            </p>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${course.avatarClass}`}
                >
                  {course.teacherInitials}
                </span>
                <span className="truncate text-sm font-medium text-[var(--sn-text-secondary)]">
                  {course.teacher}
                </span>
              </div>

              {course.rating ? (
                <div className="inline-flex shrink-0 items-center gap-1 text-sm">
                  <Star
                    className="h-4 w-4 fill-amber-400 text-amber-600"
                    aria-hidden="true"
                  />
                  <span className="font-bold text-[var(--sn-text-main)]">
                    {course.rating}
                  </span>
                  {course.reviews > 0 ? (
                    <span className="text-[var(--sn-text-muted)]">
                      ({course.reviews})
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--sn-border)] px-4 py-3">
          <div>
            <div className="text-xs font-medium text-[var(--sn-text-muted)]">
              {course.isFree ? t.courseAccessLabel : t.totalPriceLabel}
            </div>
            <div
              className={`text-base font-bold ${
                course.isFree
                  ? "text-[var(--sn-primary)]"
                  : "text-[var(--sn-text-main)]"
              }`}
            >
              {course.isFree ? t.freeOption : course.price}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenModal(course)}
            className="min-h-[48px] rounded-xl bg-[var(--sn-primary)] px-5 text-base font-semibold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            {course.isFree ? t.startCourseBtn : t.enrollNowBtn}
          </button>
        </div>
      </div>
    </article>
  );
}
