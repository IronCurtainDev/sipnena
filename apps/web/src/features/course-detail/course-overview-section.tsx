import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Star,
  Users,
} from "lucide-react";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";
import { TeacherAvatar } from "./teacher-avatar";

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
  return (
    <section
      aria-labelledby="course-detail-heading"
      className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:p-5"
    >
      {/* Subject, Grade, Medium & NIE Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
          <FlaskConical className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t.subjectGradePill}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 py-1.5 text-sm font-semibold text-[var(--sn-primary)]">
          <span>{t.mediumPill}</span>
        </span>

        <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 sm:inline-flex">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t.nieAlignedDesktopBadge}</span>
        </span>
      </div>

      {/* Main Course Title */}
      <h1
        id="course-detail-heading"
        className="text-2xl font-bold leading-snug tracking-tight text-[var(--sn-text-main)] sm:text-3xl"
      >
        {t.courseTitle}
      </h1>

      {/* Mobile Instructor Row */}
      <div className="flex items-center gap-3 sm:hidden">
        <TeacherAvatar size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-base font-bold text-[var(--sn-text-main)]">
            <span className="truncate">{course.instructor.name}</span>
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-[var(--sn-primary)]"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-[var(--sn-text-muted)]">
            {t.instructorRoleMobile}
          </p>
        </div>
      </div>

      {/* Desktop & Tablet Inline Meta Row */}
      <div className="hidden flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--sn-text-secondary)] sm:flex">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sn-sage)] text-xs font-bold text-[var(--sn-primary)]">
            {course.instructor.initials}
          </span>
          <span className="font-semibold text-[var(--sn-text-main)]">
            {course.instructor.name}
          </span>
          <CheckCircle2
            className="h-4 w-4 shrink-0 text-[var(--sn-primary)]"
            aria-hidden="true"
          />
        </div>

        <span className="inline-flex items-center gap-1">
          <Star
            className="h-4 w-4 fill-amber-400 text-amber-600"
            aria-hidden="true"
          />
          <strong className="text-[var(--sn-text-main)]">
            {course.rating}
          </strong>
          <span className="text-[var(--sn-text-muted)]">
            ({course.reviewsCount} {t.reviewsWord})
          </span>
        </span>

        <span className="inline-flex items-center gap-1 text-[var(--sn-text-muted)]">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>
            {course.duration} ({t.lessonsShort})
          </span>
        </span>

        <span className="inline-flex items-center gap-1 text-[var(--sn-text-muted)]">
          <Users className="h-4 w-4" aria-hidden="true" />
          <span>{t.studentsEnrolledDesktop}</span>
        </span>
      </div>

      {/* Mobile 3-Box Stats Strip */}
      <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] py-3 px-2 text-center sm:hidden">
        <div className="px-1">
          <div className="inline-flex items-center justify-center gap-1 text-base font-bold text-[var(--sn-text-main)]">
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-600"
              aria-hidden="true"
            />
            <span>{course.rating}</span>
          </div>
          <div className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
            {course.reviewsCount} {t.reviewsWord}
          </div>
        </div>

        <div className="px-1">
          <div className="inline-flex items-center justify-center gap-1 text-base font-bold text-[var(--sn-text-main)]">
            <Clock
              className="h-4 w-4 text-[var(--sn-primary)]"
              aria-hidden="true"
            />
            <span>{course.duration}</span>
          </div>
          <div className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
            {t.lessonsShort}
          </div>
        </div>

        <div className="px-1">
          <div className="inline-flex items-center justify-center gap-1 text-base font-bold text-[var(--sn-text-main)]">
            <Users className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            <span>{course.studentsEnrolled}</span>
          </div>
          <div className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
            {t.studentsEnrolledMobile}
          </div>
        </div>
      </div>

      {/* Course Description (Expandable on Mobile, Full on Desktop) */}
      <div className="space-y-2 pt-1">
        <p className="text-base leading-relaxed text-[var(--sn-text-secondary)] sm:hidden">
          {isDescExpanded ? t.courseDescFull : t.courseDescShort}
        </p>

        <button
          type="button"
          onClick={onToggleDesc}
          aria-expanded={isDescExpanded}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-1 text-base font-bold text-[var(--sn-primary)] sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span>{isDescExpanded ? t.showLessBtn : t.readMoreBtn}</span>
          {isDescExpanded ? (
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <p className="hidden text-base leading-relaxed text-[var(--sn-text-secondary)] sm:block">
          {t.courseDescFull}
        </p>
      </div>
    </section>
  );
}
