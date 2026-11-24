interface Props {
  courseId: string;
  badgeText?: string;
  tagBg?: string;
  tagColor?: string;
  compact?: boolean;
}

export function CourseThumbnail({
  courseId,
  badgeText,
  tagBg,
  tagColor,
  compact = false,
}: Props) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 ${
        compact ? "w-24 h-24 shrink-0" : "w-full h-36"
      }`}
    >
      {courseId === "geometry" && (
        <svg
          viewBox="0 0 240 140"
          className="w-full h-full block"
          aria-hidden="true"
        >
          <rect width="240" height="140" fill="#EFF6FF" />
          <polygon
            points="48,112 135,112 95,42"
            fill="#DBEAFE"
            stroke="#0D5BD7"
            strokeWidth="2"
          />
          <path
            d="M115 112 A20 20 0 0 1 124 94"
            fill="none"
            stroke="#D97706"
            strokeWidth="2"
          />
          <path
            d="M140 105 A42 42 0 0 1 215 105 Z"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="1.5"
          />
          <line
            x1="177"
            y1="105"
            x2="177"
            y2="66"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          <line
            x1="177"
            y1="105"
            x2="202"
            y2="78"
            stroke="#0D5BD7"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {courseId === "python" && (
        <svg
          viewBox="0 0 240 140"
          className="w-full h-full block"
          aria-hidden="true"
        >
          <rect width="240" height="140" fill="#EEF2FF" />
          <rect x="34" y="24" width="76" height="24" rx="12" fill="#4F46E5" />
          <rect x="52" y="33" width="40" height="6" rx="3" fill="#FFFFFF" />
          <line
            x1="72"
            y1="48"
            x2="72"
            y2="64"
            stroke="#6366F1"
            strokeWidth="2"
          />
          <polygon
            points="72,64 114,84 72,104 30,84"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2"
          />
          <rect x="132" y="72" width="78" height="26" rx="6" fill="#10B981" />
          <rect x="144" y="82" width="54" height="6" rx="3" fill="#FFFFFF" />
          <line
            x1="114"
            y1="84"
            x2="132"
            y2="84"
            stroke="#059669"
            strokeWidth="2"
          />
        </svg>
      )}

      {courseId === "history" && (
        <svg
          viewBox="0 0 240 140"
          className="w-full h-full block"
          aria-hidden="true"
        >
          <rect width="240" height="140" fill="#FEF3C7" />
          <circle cx="188" cy="36" r="16" fill="#FDE68A" />
          <rect x="56" y="102" width="128" height="14" rx="2" fill="#E2E8F0" />
          <path
            d="M72 102 A48 48 0 0 1 168 102 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <rect x="114" y="42" width="12" height="14" fill="#F59E0B" />
          <polygon points="120,22 114,42 126,42" fill="#D97706" />
          <rect
            x="36"
            y="116"
            width="168"
            height="24"
            fill="#D97706"
            opacity="0.25"
          />
        </svg>
      )}

      {compact && badgeText && tagBg && tagColor ? (
        <span
          className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold ${tagBg} ${tagColor}`}
        >
          {badgeText}
        </span>
      ) : null}
    </div>
  );
}

export function RayDiagramThumbnail({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center ${
        compact ? "w-24 h-24 shrink-0" : "w-full h-40 sm:h-44"
      }`}
    >
      <svg
        viewBox="0 0 260 160"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <rect width="260" height="160" fill="#F8FAFC" />
        {/* Principal Axis */}
        <line
          x1="15"
          y1="80"
          x2="245"
          y2="80"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Concave Mirror Arc */}
        <path
          d="M210 20 A120 120 0 0 0 210 140"
          fill="none"
          stroke="#0D5BD7"
          strokeWidth="4"
        />
        {/* Silvered Back Hatches */}
        <path
          d="M212 25 l8 -8 M213 45 l8 -8 M214 65 l8 -8 M214 85 l8 -8 M213 105 l8 -8 M212 125 l8 -8 M210 138 l8 -8"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* Center of Curvature & Focus */}
        <circle cx="70" cy="80" r="3.5" fill="#0D5BD7" />
        <text
          x="70"
          y="98"
          fontSize="11"
          fontWeight="bold"
          fill="#475569"
          textAnchor="middle"
        >
          C
        </text>

        <circle cx="140" cy="80" r="3.5" fill="#0D5BD7" />
        <text
          x="140"
          y="98"
          fontSize="11"
          fontWeight="bold"
          fill="#475569"
          textAnchor="middle"
        >
          F
        </text>

        {/* Object Arrow Beyond C */}
        <line
          x1="45"
          y1="80"
          x2="45"
          y2="40"
          stroke="#059669"
          strokeWidth="2.5"
        />
        <polygon points="45,35 41,43 49,43" fill="#059669" />

        {/* Inverted Real Image between C and F */}
        <line
          x1="105"
          y1="80"
          x2="105"
          y2="105"
          stroke="#D97706"
          strokeWidth="2.5"
        />
        <polygon points="105,110 101,102 109,102" fill="#D97706" />

        {/* Incident Ray 1 Parallel to Principal Axis */}
        <line
          x1="45"
          y1="40"
          x2="210"
          y2="40"
          stroke="#2563EB"
          strokeWidth="1.5"
        />
        {/* Reflected Ray 1 Passes Through Focus F */}
        <line
          x1="210"
          y1="40"
          x2="25"
          y2="145"
          stroke="#2563EB"
          strokeWidth="1.5"
        />

        {/* Incident Ray 2 Passing through Center of Curvature */}
        <line
          x1="45"
          y1="40"
          x2="200"
          y2="128"
          stroke="#E11D48"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </svg>
      <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-semibold">
        Ray Diagram
      </span>
    </div>
  );
}
