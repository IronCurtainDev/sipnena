import { BookOpen, FilterX, FlaskConical, X } from "lucide-react";
import { EmptyCoursesIllustration } from "./empty-illustration";
import { PopularSubjectsSection } from "./empty-popular-subjects";
import type { PriceFilter } from "./mock-data";
import type { CourseStrings } from "./strings.types";

interface EmptyFilterViewProps {
  selectedGrade: string;
  selectedMedium: string;
  priceFilter: PriceFilter;
  onResetGrade: () => void;
  onResetMedium: () => void;
  onResetPrice: () => void;
  onResetAll: () => void;
  onSeeAllSubjects: (subName?: string) => void;
  onRequestModule: () => void;
  t: CourseStrings;
}

export function EmptyFilterView({
  selectedGrade,
  selectedMedium,
  priceFilter,
  onResetGrade,
  onResetMedium,
  onResetPrice,
  onResetAll,
  onSeeAllSubjects,
  onRequestModule,
  t,
}: EmptyFilterViewProps) {
  const getMediumLabel = (med: string) => {
    if (med === "si") return "සිංහල";
    if (med === "ta") return "தமிழ் (Tamil)";
    if (med === "en") return "English";
    return t.allOption;
  };

  return (
    <div className="space-y-6">
      {/* Active Filter Chips Row */}
      <div className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <FlaskConical className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:text-xl">
                {t.mobileSubjectTitle} • {t.gradeFilterLabel} {selectedGrade} (
                {getMediumLabel(selectedMedium)})
              </h2>
              <span className="rounded-full bg-[var(--sn-surface-muted)] px-3 py-1 text-sm font-semibold text-[var(--sn-text-secondary)]">
                {t.zeroCoursesDesktop}
              </span>
            </div>
            <p className="text-base text-[var(--sn-text-muted)]">
              {t.olGeneralScienceSub}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-3">
          <span className="text-sm font-semibold text-[var(--sn-text-muted)]">
            {t.activeFiltersLabel}
          </span>

          <button
            type="button"
            onClick={onResetGrade}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-blue-200 bg-[var(--sn-surface-selected)] px-4 text-sm font-semibold text-[var(--sn-text-main)] transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <span>
              {t.gradeFilterLabel} {selectedGrade}
            </span>
            <X className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </button>

          {selectedMedium !== "all" && (
            <button
              type="button"
              onClick={onResetMedium}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-blue-200 bg-[var(--sn-surface-selected)] px-4 text-sm font-semibold text-[var(--sn-text-main)] transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <span>{getMediumLabel(selectedMedium)}</span>
              <X className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </button>
          )}

          {priceFilter !== "all" && (
            <button
              type="button"
              onClick={onResetPrice}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-blue-200 bg-[var(--sn-surface-selected)] px-4 text-sm font-semibold text-[var(--sn-text-main)] transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <span>
                {priceFilter === "free" ? t.freeOption : t.paidOption}
              </span>
              <X className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            onClick={onResetAll}
            className="min-h-[40px] rounded-xl px-3 text-sm font-semibold text-[var(--sn-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            {t.clearAllBtn}
          </button>
        </div>
      </div>

      {/* Center Empty Filter Card */}
      <section
        aria-labelledby="empty-filter-heading"
        className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 text-center sm:p-10"
      >
        <EmptyCoursesIllustration />

        <div className="mx-auto max-w-lg space-y-2">
          <h2
            id="empty-filter-heading"
            className="text-xl font-bold tracking-tight text-[var(--sn-text-main)] sm:text-2xl"
          >
            <span className="sm:hidden">{t.emptyFilterTitleMobile}</span>
            <span className="hidden sm:inline">
              {t.emptyFilterTitleDesktop}
            </span>
          </h2>

          <p className="hidden text-sm font-medium text-[var(--sn-text-muted)] sm:block">
            {t.emptyFilterBilingualSub}
          </p>

          <p className="pt-1 text-base text-[var(--sn-text-secondary)]">
            <span className="sm:hidden">{t.emptyFilterDescMobile}</span>
            <span className="hidden sm:inline">{t.emptyFilterDescDesktop}</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-base font-semibold text-white transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2 sm:w-auto"
          >
            <FilterX className="h-5 w-5" aria-hidden="true" />
            <span>{t.resetFiltersDesktopBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => onSeeAllSubjects()}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-surface-muted)] px-6 text-base font-semibold text-[var(--sn-text-main)] transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto"
          >
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <span>{t.seeAllSubjectsBtn}</span>
          </button>
        </div>
      </section>

      {/* Popular Subjects */}
      <PopularSubjectsSection
        selectedGrade={selectedGrade}
        onSeeAllSubjects={onSeeAllSubjects}
        onRequestModule={onRequestModule}
        t={t}
      />
    </div>
  );
}
