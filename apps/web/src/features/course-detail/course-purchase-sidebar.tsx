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
      className="hidden sm:flex sm:flex-col lg:sticky lg:top-5 lg:h-[calc(100svh-2.5rem)]"
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)]">
        <div className="shrink-0">
          <TrailerVideoThumbnail
            t={t}
            compact
            onWatchPreview={onWatchPreview}
          />
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-[var(--sn-text-main)]">
                {course.priceCurrent}
              </span>
              <span className="text-base text-[var(--sn-text-muted)] line-through">
                {course.priceOriginal}
              </span>
            </div>

            <span className="rounded-lg bg-[var(--sn-olive)] px-2.5 py-1 text-xs font-bold text-[var(--sn-primary)]">
              {course.discountLabel}
            </span>
          </div>

          <p className="text-sm leading-normal text-[var(--sn-text-muted)]">
            {t.accessSubtitleDesktop}
          </p>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={onEnroll}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 text-base font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <span>{t.enrollNowBtn}</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onWatchPreview}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 text-sm font-bold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <Play
                className="h-4 w-4 text-[var(--sn-primary)]"
                aria-hidden="true"
              />
              <span>{t.watch2FreeBtn}</span>
            </button>

            <button
              type="button"
              onClick={onSendToParent}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-4 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-sage)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.sendToParentBtn}</span>
            </button>
          </div>

          <ul className="space-y-2.5 border-t border-[var(--sn-border)] pt-4 text-sm text-[var(--sn-text-secondary)]">
            {course.inclusions.map((inc) => {
              const Icon = inc.icon;
              return (
                <li key={inc.id} className="flex items-start gap-2.5">
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sn-primary)]"
                    aria-hidden="true"
                  />
                  <span className="leading-normal">{t[inc.id]}</span>
                </li>
              );
            })}
          </ul>

          <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-4">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-surface)] text-[var(--sn-primary)]"
              >
                <MessageCircle className="h-5 w-5" />
              </span>
              <div className="space-y-1">
                <h3 className="text-base font-bold leading-normal text-[var(--sn-text-main)]">
                  {t.helpTitle}
                </h3>
                <p className="text-sm leading-normal text-[var(--sn-text-secondary)]">
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
        </div>
      </div>
    </aside>
  );
}
