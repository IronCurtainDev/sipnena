import { Play, X } from "lucide-react";
import type { CourseItem } from "./mock-data";
import type { CourseStrings } from "./strings.types";

interface CourseModalProps {
  course: CourseItem | null;
  onClose: () => void;
  onBeginLesson: (course: CourseItem) => void;
  t: CourseStrings;
}

export function CourseModal({
  course,
  onClose,
  onBeginLesson,
  t,
}: CourseModalProps) {
  if (!course) return null;

  const title =
    t[`course_${course.key}_titleDesktop` as keyof CourseStrings] ||
    t[`course_${course.key}_title` as keyof CourseStrings] ||
    "";
  const desc = t[`course_${course.key}_desc` as keyof CourseStrings] || "";
  const unitText = t[course.unitKey as keyof CourseStrings] || "";
  const mediumDesktop =
    t[`${course.mediumBadgeKey}Desktop` as keyof CourseStrings] || "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-xs sm:items-center"
    >
      <div className="w-full max-w-lg space-y-5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="mb-2 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              {unitText}
            </span>
            <h2
              id="course-modal-title"
              className="text-lg font-bold leading-snug text-[var(--sn-text-main)]"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.modalCloseBtn}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
          {desc}
        </p>

        <dl className="grid grid-cols-3 gap-3 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3.5 text-sm">
          <div>
            <dt className="text-[var(--sn-text-muted)]">
              {t.modalTeacherLabel}
            </dt>
            <dd className="mt-0.5 line-clamp-2 font-bold text-[var(--sn-text-main)]">
              {course.teacher}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--sn-text-muted)]">
              {t.modalDurationLabel}
            </dt>
            <dd className="mt-0.5 font-bold text-[var(--sn-text-main)]">
              {course.lessonsCount} {t.lessonsWord} ({course.hours} {t.hrsWord})
            </dd>
          </div>
          <div>
            <dt className="text-[var(--sn-text-muted)]">
              {t.modalMediumLabel}
            </dt>
            <dd className="mt-0.5 font-bold text-[var(--sn-text-main)]">
              {mediumDesktop}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col-reverse items-center justify-end gap-3 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] w-full rounded-xl bg-[var(--sn-surface-muted)] px-5 text-base font-semibold text-[var(--sn-text-main)] transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto"
          >
            {t.modalCloseBtn}
          </button>
          <button
            type="button"
            onClick={() => onBeginLesson(course)}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-base font-semibold text-white transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2 sm:w-auto"
          >
            <Play className="h-5 w-5 fill-current" aria-hidden="true" />
            <span>{t.modalBeginLessonBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
