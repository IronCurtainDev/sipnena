import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, FlaskConical } from "lucide-react";
import type { CourseStrings } from "./strings.types";

interface CourseHeroProps {
  t: CourseStrings;
}

export function CourseHero({ t }: CourseHeroProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]"
          >
            <FlaskConical className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-normal text-[var(--sn-text-main)]">
              {t.mobileSubjectTitle}
            </h2>
            <p className="truncate text-sm text-[var(--sn-text-muted)]">
              {t.gradesRangeTag}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-xl bg-[var(--sn-surface-selected)] px-3 py-1.5 text-sm font-bold text-[var(--sn-primary)]">
          {t.mobileUnitsBadge}
        </span>
      </div>

      <section
        aria-label="Science subject overview"
        className="hidden items-center gap-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-5 py-4 sm:flex"
      >
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]"
        >
          <FlaskConical className="h-6 w-6" />
        </span>
        <div className="min-w-0 space-y-0.5">
          <p className="text-sm font-semibold text-[var(--sn-text-secondary)]">
            {t.gradesRangeTag} · {t.nieAlignedBadge}
          </p>
          <h1 className="text-xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-2xl">
            {t.subjectHeroTitle}
          </h1>
          <p className="line-clamp-2 text-base leading-normal text-[var(--sn-text-secondary)]">
            {t.subjectHeroDesc}
          </p>
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
  onResetFilters,
}: BreadcrumbTrustRowProps) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden items-center gap-2 text-base sm:flex"
    >
      <button
        type="button"
        onClick={() => {
          onResetFilters();
          void navigate({ to: "/home" });
        }}
        className="min-h-[44px] rounded-lg px-2 font-medium text-[var(--sn-text-secondary)] transition hover:text-[var(--sn-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
      >
        {t.breadcrumbRoot}
      </button>
      <ChevronRight
        className="h-5 w-5 text-[var(--sn-text-muted)]"
        aria-hidden="true"
      />
      <span className="font-bold text-[var(--sn-text-main)]">
        {t.breadcrumbCurrent}
      </span>
    </nav>
  );
}
