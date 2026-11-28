import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Star,
} from "lucide-react";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface CourseOverviewSectionProps {
  course: CourseDetailData;
  t: CourseDetailStrings;
  isDescExpanded: boolean;
  onToggleDesc: () => void;
}

export function CourseOverviewSection({
  course,
  t,
  isDescExpanded,
  onToggleDesc,
}: CourseOverviewSectionProps) {
  const description = course.description?.trim() || "";

  return (
    <section
      aria-labelledby="course-detail-heading"
      className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
          <FlaskConical className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{course.subjectGradePill}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 py-1.5 text-sm font-semibold text-[var(--sn-primary)]">
          <span>{course.mediumPill}</span>
        </span>

        {course.isAssigned ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>From my teacher</span>
          </span>
        ) : null}
      </div>

      <h1
        id="course-detail-heading"
        className="text-2xl font-bold leading-snug tracking-tight text-[var(--sn-text-main)] sm:text-3xl"
      >
        {course.title}
      </h1>

      {course.instructor.name ? (
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sn-sage)] text-xs font-bold text-[var(--sn-primary)]">
            {course.instructor.initials}
          </span>
          <span className="text-base font-bold text-[var(--sn-text-main)]">
            {course.instructor.name}
          </span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--sn-text-secondary)]">
        {course.rating ? (
          <span className="inline-flex items-center gap-1">
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-600"
              aria-hidden="true"
            />
            <strong className="text-[var(--sn-text-main)]">
              {course.rating}
            </strong>
            {course.reviewsCount > 0 ? (
              <span className="text-[var(--sn-text-muted)]">
                ({course.reviewsCount} {t.reviewsWord})
              </span>
            ) : null}
          </span>
        ) : null}

        <span className="inline-flex items-center gap-1 text-[var(--sn-text-muted)]">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>
            {course.duration} · {course.lessonsTotal}{" "}
            {t.lessonsTotalWord}
          </span>
        </span>
      </div>

      {description ? (
        <div className="space-y-2 pt-1">
          <p
            className={`text-base leading-relaxed text-[var(--sn-text-secondary)] sm:block ${
              isDescExpanded ? "" : "line-clamp-3 sm:line-clamp-none"
            }`}
          >
            {description}
          </p>
          <button
            type="button"
            onClick={onToggleDesc}
            aria-expanded={isDescExpanded}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-1 text-base font-bold text-[var(--sn-primary)] sm:hidden"
          >
            <span>{isDescExpanded ? t.showLessBtn : t.readMoreBtn}</span>
            {isDescExpanded ? (
              <ChevronUp className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      ) : null}
    </section>
  );
}
