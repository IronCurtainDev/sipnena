import { Check } from "lucide-react";

export function OpticsRayDiagramThumbnail({
  className = "w-14 h-14",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-xl border border-slate-200 bg-[var(--sn-olive)] shadow-2xs shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="block h-full w-full">
        <defs>
          <linearGradient id="snEnrollThumbBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dce8df" />
            <stop offset="100%" stopColor="#b7cfc0" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#snEnrollThumbBg)" />
        <circle cx="72" cy="28" r="22" fill="#166534" opacity="0.12" />
        <circle cx="28" cy="74" r="18" fill="#14532d" opacity="0.1" />
        <rect
          x="22"
          y="30"
          width="56"
          height="40"
          rx="8"
          fill="#14532d"
          opacity="0.18"
        />
        <polygon points="42,42 42,58 58,50" fill="#14532d" opacity="0.55" />
      </svg>
    </div>
  );
}

export function CelebrationCheckGraphic() {
  return (
    <div className="relative mx-auto my-1 flex h-20 w-20 select-none items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -inset-4 h-[132px] w-[132px]"
        aria-hidden="true"
      >
        <path
          d="M 86 20 Q 86 28 94 28 Q 86 28 86 36 Q 86 28 78 28 Q 86 28 86 20 Z"
          fill="#F59E0B"
        />
        <circle cx="92" cy="14" r="1.5" fill="#F59E0B" />
        <path
          d="M 18 22 Q 18 27 23 27 Q 18 27 18 32 Q 18 27 13 27 Q 18 27 18 22 Z"
          fill="#10B981"
        />
        <path
          d="M 22 74 Q 22 81 29 81 Q 22 81 22 88 Q 22 81 15 81 Q 22 81 22 74 Z"
          fill="#3B82F6"
        />
        <circle cx="16" cy="68" r="1.5" fill="#3B82F6" />
      </svg>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-8 ring-emerald-50 sm:h-20 sm:w-20">
        <Check className="h-8 w-8 stroke-[3.2] sm:h-10 sm:w-10" />
      </div>
    </div>
  );
}
