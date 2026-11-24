import { CheckCircle2, ChevronRight, FlaskConical } from "lucide-react";
import type { CourseStrings } from "./strings.types";

interface CourseHeroProps {
  t: CourseStrings;
}

export function CourseHero({ t }: CourseHeroProps) {
  return (
    <>
      {/* Mobile Subject Header Row (< 640px) */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"
          >
            <FlaskConical className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-bold text-[var(--sn-text-main)]">
                {t.mobileSubjectTitle}
              </h2>
              <span className="text-sm font-medium text-[var(--sn-text-muted)]">
                {t.gradesRangeTag}
              </span>
            </div>
            <p className="truncate text-sm text-[var(--sn-text-muted)]">
              {t.mobileSubjectSub}
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[var(--sn-surface-selected)] px-3 py-1.5 text-sm font-bold text-[var(--sn-text-main)]">
          <span
            className="h-2 w-2 rounded-full bg-emerald-600"
            aria-hidden="true"
          />
          <span>{t.mobileUnitsBadge}</span>
        </span>
      </div>

      {/* Desktop & Tablet Subject Hero Card (>= 640px) */}
      <section
        aria-label="Science subject overview"
        className="hidden items-center justify-between gap-6 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 sm:flex"
      >
        <div className="flex max-w-2xl items-start gap-4">
          <span
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"
          >
            <FlaskConical className="h-7 w-7" />
          </span>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-md bg-emerald-700 px-2.5 py-0.5 font-bold text-white">
                {t.gradesRangeTag}
              </span>
              <span className="font-medium text-[var(--sn-text-muted)]">
                • {t.generalScienceLabs}
              </span>
            </div>
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-[var(--sn-text-main)]">
              {t.subjectHeroTitle}
            </h1>
            <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
              {t.subjectHeroDesc}
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-6 border-l border-[var(--sn-border)] pl-6 md:flex">
          <div>
            <div className="text-sm text-[var(--sn-text-muted)]">
              {t.totalAvailableLabel}
            </div>
            <div className="mt-0.5 text-lg font-bold text-[var(--sn-text-main)]">
              {t.totalAvailableValue}
            </div>
          </div>
          <div>
            <div className="text-sm text-[var(--sn-text-muted)]">
              {t.termExamFocusLabel}
            </div>
            <div className="mt-0.5 text-lg font-bold text-emerald-800">
              {t.termExamFocusValue}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface BreadcrumbTrustRowProps {
  t: CourseStrings;
  isZeroResults: boolean;
  onResetFilters: () => void;
}

export function BreadcrumbTrustRow({
  t,
  isZeroResults,
  onResetFilters,
}: BreadcrumbTrustRowProps) {
  return (
    <div className="hidden flex-wrap items-center justify-between gap-3 sm:flex">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-base"
      >
        <button
          type="button"
          onClick={onResetFilters}
          className="min-h-[44px] rounded-lg px-2 font-medium text-[var(--sn-text-secondary)] transition hover:text-[var(--sn-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          {t.breadcrumbRoot}
        </button>
        <ChevronRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
        <span className="font-bold text-[var(--sn-text-main)]">
          {t.breadcrumbCurrent}
        </span>
      </nav>

      {!isZeroResults && (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-semibold text-emerald-800">
            <span
              className="h-2 w-2 rounded-full bg-emerald-600"
              aria-hidden="true"
            />
            <span>{t.nieAlignedBadge}</span>
          </span>

          <span className="hidden items-center gap-2 rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3.5 py-1.5 text-sm font-semibold text-[var(--sn-text-secondary)] md:inline-flex">
            <CheckCircle2
              className="h-4 w-4 text-emerald-700"
              aria-hidden="true"
            />
            <span>{t.verifiedTeachersBadge}</span>
          </span>
        </div>
      )}
    </div>
  );
}
