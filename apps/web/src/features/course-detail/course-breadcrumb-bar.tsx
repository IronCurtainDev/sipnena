import { ArrowLeft, Bookmark, ChevronRight, Home, Share2 } from "lucide-react";
import type { CourseDetailStrings } from "./strings.types";

interface CourseBreadcrumbBarProps {
  t: CourseDetailStrings;
  isSaved: boolean;
  onBackToCourses: () => void;
  onShare: () => void;
  onToggleSave: () => void;
}

export function CourseBreadcrumbBar({
  t,
  isSaved,
  onBackToCourses,
  onShare,
  onToggleSave,
}: CourseBreadcrumbBarProps) {
  return (
    <>
      {/* MOBILE ACTION BAR: BACK, SHARE, SAVE (< 640px) */}
      <div className="-mt-1 flex items-center justify-between sm:hidden">
        <button
          type="button"
          onClick={onBackToCourses}
          aria-label={t.backAria}
          className="flex h-12 w-12 -ml-2 items-center justify-center rounded-full text-[var(--sn-text-main)] transition hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onShare}
            aria-label={t.shareAria}
            className="flex h-12 w-12 items-center justify-center rounded-full text-[var(--sn-text-secondary)] transition hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <Share2 className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onToggleSave}
            aria-label={isSaved ? t.savedAria : t.saveAria}
            aria-pressed={isSaved}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
              isSaved
                ? "text-[var(--sn-primary)]"
                : "text-[var(--sn-text-secondary)]"
            }`}
          >
            <Bookmark
              className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* DESKTOP & TABLET BREADCRUMB ROW (>= 640px) */}
      <div className="hidden flex-wrap items-center justify-between gap-3 sm:flex">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm font-medium"
        >
          <button
            type="button"
            onClick={onBackToCourses}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-[var(--sn-text-muted)] transition hover:text-[var(--sn-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>{t.breadcrumbCourses}</span>
          </button>

          <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />

          <button
            type="button"
            onClick={onBackToCourses}
            className="min-h-[44px] rounded-lg px-2 text-[var(--sn-text-muted)] transition hover:text-[var(--sn-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            {t.breadcrumbSubject}
          </button>

          <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />

          <span className="font-bold text-[var(--sn-text-main)]">
            {t.breadcrumbCurrent}
          </span>
        </nav>

        <button
          type="button"
          onClick={onBackToCourses}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-[var(--sn-primary)] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{t.backToScienceBtn}</span>
        </button>
      </div>
    </>
  );
}
