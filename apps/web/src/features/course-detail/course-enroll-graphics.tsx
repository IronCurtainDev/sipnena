import { Check } from "lucide-react";

export function OpticsRayDiagramThumbnail({
  className = "w-14 h-14",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-xl border border-slate-200 bg-[#fbfcfd] shadow-2xs shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="block h-full w-full">
        <defs>
          <pattern
            id="opticsGridWeb"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#opticsGridWeb)" />
        <line
          x1="6"
          y1="50"
          x2="94"
          y2="50"
          stroke="#94A3B8"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <path
          d="M 76 16 Q 84 50 76 84"
          fill="none"
          stroke="#1E293B"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="77"
          y1="20"
          x2="81"
          y2="18"
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line
          x1="79"
          y1="32"
          x2="84"
          y2="30"
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line
          x1="81"
          y1="50"
          x2="86"
          y2="50"
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line
          x1="79"
          y1="68"
          x2="84"
          y2="70"
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line
          x1="77"
          y1="80"
          x2="81"
          y2="82"
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line
          x1="16"
          y1="32"
          x2="79"
          y2="32"
          stroke="#2563EB"
          strokeWidth="1.8"
        />
        <polygon points="46,30 52,32 46,34" fill="#2563EB" />
        <line
          x1="79"
          y1="32"
          x2="22"
          y2="68"
          stroke="#DC2626"
          strokeWidth="1.8"
        />
        <polygon points="56,48 50,49 53,44" fill="#DC2626" />
        <circle cx="50" cy="50" r="2" fill="#1E293B" />
        <text
          x="47"
          y="62"
          fontSize="7"
          fill="#64748B"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          F
        </text>
        <circle cx="26" cy="50" r="2" fill="#1E293B" />
        <text
          x="23"
          y="62"
          fontSize="7"
          fill="#64748B"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          C
        </text>
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
