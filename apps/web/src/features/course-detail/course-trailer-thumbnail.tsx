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
      {/* Crisp Optical Physics Diagram Background */}
      <svg
        viewBox="0 0 480 270"
        className="block h-full w-full"
        role="img"
        aria-label="Optical glass prism dispersion and spherical concave mirror ray diagram video preview"
      >
        <rect width="480" height="270" fill="#E2E8F0" />
        {/* Left Panel: Optical Glass Prism */}
        <rect x="12" y="12" width="222" height="246" rx="8" fill="#F8FAFC" />
        <polygon
          points="124,62 64,196 184,196"
          fill="#DBEAFE"
          stroke="#2563EB"
          strokeWidth="2.5"
        />
        {/* Incident White Light Ray */}
        <line
          x1="24"
          y1="146"
          x2="94"
          y2="128"
          stroke="#0F172A"
          strokeWidth="3"
        />
        {/* Spectrum Dispersion Rays */}
        <line
          x1="154"
          y1="128"
          x2="224"
          y2="144"
          stroke="#DC2626"
          strokeWidth="2.2"
        />
        <line
          x1="156"
          y1="133"
          x2="224"
          y2="154"
          stroke="#F59E0B"
          strokeWidth="2.2"
        />
        <line
          x1="158"
          y1="138"
          x2="224"
          y2="164"
          stroke="#10B981"
          strokeWidth="2.2"
        />
        <line
          x1="160"
          y1="143"
          x2="224"
          y2="174"
          stroke="#2563EB"
          strokeWidth="2.2"
        />
        {/* Normal Line */}
        <line
          x1="70"
          y1="108"
          x2="124"
          y2="148"
          stroke="#64748B"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />

        {/* Right Panel: Spherical Concave Mirror */}
        <rect x="246" y="12" width="222" height="246" rx="8" fill="#F8FAFC" />
        <line
          x1="258"
          y1="135"
          x2="454"
          y2="135"
          stroke="#94A3B8"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <path
          d="M412 52 Q448 135 412 218"
          fill="none"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="322" cy="135" r="4" fill="#1D4ED8" />
        <text x="317" y="154" fontSize="13" fontWeight="700" fill="#0F172A">
          C
        </text>
        <circle cx="372" cy="135" r="4" fill="#059669" />
        <text x="368" y="154" fontSize="13" fontWeight="700" fill="#0F172A">
          F
        </text>
        <line
          x1="286"
          y1="135"
          x2="286"
          y2="82"
          stroke="#1D4ED8"
          strokeWidth="3"
        />
        <polygon points="286,74 280,84 292,84" fill="#1D4ED8" />
        <line
          x1="286"
          y1="82"
          x2="424"
          y2="82"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="424"
          y1="82"
          x2="338"
          y2="176"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="286"
          y1="82"
          x2="424"
          y2="172"
          stroke="#D97706"
          strokeWidth="1.8"
        />
        <line
          x1="424"
          y1="172"
          x2="304"
          y2="172"
          stroke="#D97706"
          strokeWidth="1.8"
        />

        {/* Subtle Dark Scrim for High Button Contrast */}
        <rect width="480" height="270" fill="#0F172A" opacity="0.28" />
      </svg>

      {/* Top-left NIE Curriculum Badge (Mobile) */}
      {!compact && (
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-900 shadow-xs">
          <CheckCircle2
            className="h-4 w-4 shrink-0 text-emerald-700"
            aria-hidden="true"
          />
          <span>{t.nieTermBadge}</span>
        </div>
      )}

      {/* Center Play Preview Trigger */}
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

      {/* Bottom Video Meta Overlay */}
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
