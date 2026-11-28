import { ArrowRight } from "lucide-react";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface CourseMobileEnrollBarProps {
  course: CourseDetailData;
  t: CourseDetailStrings;
  onEnroll: () => void;
}

export function CourseMobileEnrollBar({
  course,
  t,
  onEnroll,
}: CourseMobileEnrollBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(68px+env(safe-area-inset-bottom,0px))] z-20 flex items-center justify-between gap-3 border-t border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 py-3 shadow-lg sm:hidden">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-[var(--sn-text-main)]">
            {course.priceCurrent}
          </span>
          {course.priceOriginal ? (
            <span className="text-sm text-[var(--sn-text-muted)] line-through">
              {course.priceOriginal}
            </span>
          ) : null}
        </div>
        <div className="truncate text-xs font-semibold text-emerald-800">
          {t.accessSubtitleMobile}
        </div>
      </div>

      <button
        type="button"
        onClick={onEnroll}
        className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 text-base font-bold text-white transition hover:bg-[var(--sn-primary-hover)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
      >
        <span>{t.enrollNowBtn}</span>
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
