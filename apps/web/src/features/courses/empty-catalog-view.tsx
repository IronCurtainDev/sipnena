import { BookOpen } from "lucide-react";
import { EmptyCoursesIllustration } from "./empty-illustration";
import type { CourseStrings } from "./strings.types";

interface EmptyCatalogViewProps {
  t: CourseStrings;
  kind: "none" | "filtered";
  onResetFilters?: () => void;
}

export function EmptyCatalogView({
  t,
  kind,
  onResetFilters,
}: EmptyCatalogViewProps) {
  const isFiltered = kind === "filtered";
  return (
    <section
      aria-labelledby="empty-catalog-heading"
      className="mx-auto w-full max-w-2xl space-y-5 rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 text-center sm:p-10"
    >
      <EmptyCoursesIllustration />
      <div className="mx-auto max-w-lg space-y-2">
        <h2
          id="empty-catalog-heading"
          className="text-xl font-bold tracking-tight text-[var(--sn-text-main)] sm:text-2xl"
        >
          {isFiltered ? t.emptyFilterTitleDesktop : t.emptyFilterTitleMobile}
        </h2>
        <p className="text-base text-[var(--sn-text-secondary)]">
          {isFiltered ? t.emptyFilterDescDesktop : t.emptyFilterDescMobile}
        </p>
      </div>
      {isFiltered && onResetFilters ? (
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-base font-semibold text-white"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          {t.resetFiltersDesktopBtn}
        </button>
      ) : null}
    </section>
  );
}
