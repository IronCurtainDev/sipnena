import { useState } from "react";
import { ArrowUpDown, ChevronDown, Search, X } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { CATALOG_EXTRA_COPY } from "./courses-adapter";
import { GRADES, type PriceFilter, type SortOption } from "./mock-data";
import { formatCourseString } from "./strings";
import type { CourseStrings } from "./strings.types";

interface CourseFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedGrade: string;
  onGradeChange: (g: string) => void;
  selectedMedium: string;
  onMediumChange: (m: string) => void;
  priceFilter: PriceFilter;
  onPriceFilterChange: (p: PriceFilter) => void;
  sortBy: SortOption;
  onSortToggle: () => void;
  courseCount: number;
  t: CourseStrings;
  lang: AppLanguage;
}

export function CourseFilterBar({
  searchQuery,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  selectedMedium,
  onMediumChange,
  priceFilter,
  onPriceFilterChange,
  sortBy,
  onSortToggle,
  courseCount,
  t,
  lang,
}: CourseFilterBarProps) {
  const [showMore, setShowMore] = useState(false);
  const moreActive = selectedMedium !== "all" || priceFilter !== "all";

  return (
    <div className="space-y-3">
      <section
        aria-label="Search and filter courses"
        className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--sn-text-muted)]"
            aria-hidden="true"
          />
          <input
            id="course-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchLabel}
            className="min-h-[48px] w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] pl-11 pr-12 text-base text-[var(--sn-text-main)] placeholder:text-[var(--sn-text-muted)] focus:bg-[var(--sn-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label={t.clearSearchAria}
              className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--sn-text-muted)] hover:text-[var(--sn-text-main)]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-[var(--sn-text-main)]">
            {t.gradeFilterLabel}
          </p>
          <div
            role="group"
            aria-label={t.gradeFilterLabel}
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => onGradeChange("all")}
              aria-pressed={selectedGrade === "all"}
              className={`min-h-[44px] rounded-xl px-3.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                selectedGrade === "all"
                  ? "bg-[var(--sn-primary)] text-[var(--sn-cream)]"
                  : "border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]"
              }`}
            >
              {CATALOG_EXTRA_COPY[lang].allGrades}
            </button>
            {GRADES.map((g) => {
              const active = selectedGrade === g;
              const label =
                lang === "si" || lang === "ta"
                  ? `${g} ${t.gradePrefix}`
                  : `${t.gradePrefix} ${g}`;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => onGradeChange(g)}
                  aria-pressed={active}
                  className={`min-h-[44px] rounded-xl px-3.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                    active
                      ? "bg-[var(--sn-primary)] text-[var(--sn-cream)]"
                      : "border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
              moreActive || showMore
                ? "border-[var(--sn-primary)] bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                : "border-[var(--sn-border)] text-[var(--sn-text-secondary)]"
            }`}
          >
            <span>
              {t.mediumFilterLabel} · {t.costFilterLabel}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition ${showMore ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={onSortToggle}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-sm font-semibold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <ArrowUpDown className="h-4 w-4 text-[var(--sn-text-muted)]" />
            <span>{sortBy === "popular" ? t.sortPopular : t.sortLessons}</span>
          </button>
        </div>

        {showMore && (
          <div className="grid grid-cols-1 gap-3 border-t border-[var(--sn-border)] pt-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="medium-filter-select"
                className="mb-1.5 block text-sm font-bold text-[var(--sn-text-main)]"
              >
                {t.mediumFilterLabel}
              </label>
              <div className="relative">
                <select
                  id="medium-filter-select"
                  value={selectedMedium}
                  onChange={(e) => onMediumChange(e.target.value)}
                  className="min-h-[48px] w-full cursor-pointer appearance-none rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] pl-4 pr-10 text-base font-semibold text-[var(--sn-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
                >
                  <option value="all">{t.allMediumsOption}</option>
                  <option value="si">{t.mediumSinhalaDesktop}</option>
                  <option value="ta">{t.mediumTamilDesktop}</option>
                  <option value="en">{t.mediumEnglishDesktop}</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--sn-text-muted)]"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <span
                id="cost-filter-label"
                className="mb-1.5 block text-sm font-bold text-[var(--sn-text-main)]"
              >
                {t.costFilterLabel}
              </span>
              <div
                role="group"
                aria-labelledby="cost-filter-label"
                className="grid min-h-[48px] grid-cols-3 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-1"
              >
                {(
                  [
                    { id: "all", label: t.allOption },
                    { id: "free", label: t.freeOption },
                    { id: "paid", label: t.paidOption },
                  ] as const
                ).map((opt) => {
                  const active = priceFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onPriceFilterChange(opt.id)}
                      aria-pressed={active}
                      className={`min-h-[38px] rounded-lg px-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                        active
                          ? "bg-[var(--sn-primary)] text-[var(--sn-cream)]"
                          : "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      <p className="text-base font-bold leading-normal text-[var(--sn-text-main)]">
        {formatCourseString(t.showingCoursesText, {
          count: courseCount,
          grade: selectedGrade,
        })}
      </p>
    </div>
  );
}
