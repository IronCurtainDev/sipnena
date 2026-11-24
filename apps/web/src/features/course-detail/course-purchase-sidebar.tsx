import {
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Play,
  Share2,
} from "lucide-react";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";
import { TrailerVideoThumbnail } from "./course-trailer-thumbnail";

interface CoursePurchaseSidebarProps {
  course: CourseDetailData;
  t: CourseDetailStrings;
  onWatchPreview: () => void;
  onEnroll: () => void;
  onSendToParent: () => void;
  onContactDesk: () => void;
}

export function CoursePurchaseSidebar({
  course,
  t,
  onWatchPreview,
  onEnroll,
  onSendToParent,
  onContactDesk,
}: CoursePurchaseSidebarProps) {
  return (
    <aside
      aria-label="Course enrollment and parent options"
      className="hidden space-y-4 sm:block lg:sticky lg:top-6"
    >
      {/* Enrollment & Video Preview Card */}
      <div className="overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-xs">
        <TrailerVideoThumbnail t={t} compact onWatchPreview={onWatchPreview} />

        <div className="space-y-4 p-5">
          {/* Price & Discount Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-[var(--sn-text-main)]">
                {course.priceCurrent}
              </span>
              <span className="text-base text-[var(--sn-text-muted)] line-through">
                {course.priceOriginal}
              </span>
            </div>

            <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
              {course.discountLabel}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[var(--sn-text-muted)]">
            {t.accessSubtitleDesktop}
          </p>

          {/* Primary Action: Enroll Now */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={onEnroll}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 text-base font-bold text-white transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
            >
              <span>{t.enrollNowBtn}</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Secondary Action: Watch 2 Free Preview Lessons */}
            <button
              type="button"
              onClick={onWatchPreview}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-white px-4 text-sm font-bold text-[var(--sn-text-main)] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <Play
                className="h-4 w-4 text-[var(--sn-primary)]"
                aria-hidden="true"
              />
              <span>{t.watch2FreeBtn}</span>
            </button>

            {/* Kid-Safe Parent Payment Helper */}
            <button
              type="button"
              onClick={onSendToParent}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.sendToParentBtn}</span>
            </button>
          </div>

          {/* 5 Clear Course Inclusions */}
          <ul className="space-y-2.5 border-t border-slate-100 pt-4 text-sm text-[var(--sn-text-secondary)]">
            {course.inclusions.map((inc) => {
              const Icon = inc.icon;
              return (
                <li key={inc.id} className="flex items-start gap-2.5">
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span>{t[inc.id]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Student & Parent Support Desk Card */}
      <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-800 shadow-2xs"
          >
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[var(--sn-text-main)]">
              {t.helpTitle}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--sn-text-secondary)]">
              {t.helpDesc}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContactDesk}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-2 text-sm font-bold text-[var(--sn-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span>{t.contactDeskBtn}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
