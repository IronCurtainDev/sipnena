import { useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronRight } from "lucide-react";
import type { CourseStrings } from "./strings.types";

interface CourseHeroProps {
  t: CourseStrings;
  courseCount: number;
}

export function CourseHero({ t, courseCount }: CourseHeroProps) {
  return (
    <section
      aria-label={t.breadcrumbCurrent}
      className="flex items-center gap-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 py-4 sm:px-5"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]"
      >
        <BookOpen className="h-6 w-6" />
      </span>
      <div className="min-w-0 space-y-0.5">
        <h1 className="text-xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-2xl">
          {t.breadcrumbCurrent}
        </h1>
        <p className="text-base text-[var(--sn-text-secondary)]">
          {courseCount}{" "}
          {courseCount === 1 ? t.courseSingularWord : t.coursesWord}
        </p>
      </div>
    </section>
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
