import { CheckCircle2, Play } from "lucide-react";
import type { CourseDetailStrings } from "./strings.types";

interface TrailerVideoThumbnailProps {
  t: CourseDetailStrings;
  onWatchPreview: () => void;
  compact?: boolean;
}

export function TrailerVideoThumbnail({
  t,
  onWatchPreview,
  compact = false,
}: TrailerVideoThumbnailProps) {
  return (
    <div className="relative aspect-[16/9] w-full select-none overflow-hidden bg-slate-900">
      <svg
        viewBox="0 0 480 270"
        className="block h-full w-full"
        role="img"
        aria-label="Course video preview"
      >
        <defs>
          <linearGradient id="snCoursePreviewBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a2f" />
            <stop offset="55%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>
        <rect width="480" height="270" fill="url(#snCoursePreviewBg)" />
        <circle cx="360" cy="70" r="90" fill="#22c55e" opacity="0.12" />
        <circle cx="80" cy="210" r="70" fill="#86efac" opacity="0.1" />
        <rect
          x="48"
          y="48"
          width="384"
          height="174"
          rx="16"
          fill="#0f172a"
          opacity="0.35"
        />
      </svg>

      {!compact && (
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-900 shadow-xs">
          <CheckCircle2
            className="h-4 w-4 shrink-0 text-emerald-700"
            aria-hidden="true"
          />
          <span>{t.nieTermBadge}</span>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        {compact ? (
          <button
            type="button"
            onClick={onWatchPreview}
            aria-label={t.watchPreviewBtn}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-md transition hover:bg-[var(--sn-primary-hover)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
          >
            <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onWatchPreview}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-base font-bold text-slate-900 shadow-md transition hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sn-olive)] text-[var(--sn-primary)]">
              <Play
                className="ml-0.5 h-4 w-4 fill-current"
                aria-hidden="true"
              />
            </span>
            <span>{t.watchPreviewBtn}</span>
          </button>
        )}
      </div>

      <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between gap-2 text-xs font-semibold text-white">
        <span className="rounded-md bg-slate-900/85 px-2.5 py-1">
          {t.videoQualityLabel}
        </span>
        <span className="rounded-md bg-slate-900/85 px-2.5 py-1">
          {t.trailerDurationLabel}
        </span>
      </div>
    </div>
  );
}
