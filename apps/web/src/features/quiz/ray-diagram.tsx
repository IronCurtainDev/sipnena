interface QuizRayDiagramProps {
  incidentAngle?: number;
  reflectedAngle?: number;
  showLawBadge?: boolean;
  highlightCorrect?: boolean;
}

export function QuizRayDiagram({
  incidentAngle = 35,
  showLawBadge = true,
  highlightCorrect = false,
}: QuizRayDiagramProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs">
      <div className="mx-auto flex max-w-[480px] flex-col items-center">
        {/* SVG Ray Diagram */}
        <svg
          viewBox="0 0 460 220"
          className="h-auto w-full select-none"
          aria-label="Reflection ray diagram on plane mirror"
        >
          <defs>
            {/* Arrow marker for incident ray */}
            <marker
              id="arrowIncident"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
            </marker>

            {/* Arrow marker for reflected ray */}
            <marker
              id="arrowReflected"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 1 L 10 5 L 0 9 z"
                fill={highlightCorrect ? "#16a34a" : "#2563eb"}
              />
            </marker>

            {/* Pattern for mirror hatch marks */}
            <pattern
              id="hatchPattern"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>

          {/* Normal Dashed Line */}
          <line
            x1="230"
            y1="30"
            x2="230"
            y2="160"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text
            x="230"
            y="22"
            textAnchor="middle"
            className="fill-slate-600 text-[11px] font-bold"
          >
            Normal (90°)
          </text>

          {/* Incident Ray (Blue) */}
          <line
            x1="110"
            y1="75"
            x2="230"
            y2="160"
            stroke="#2563eb"
            strokeWidth="2.75"
            markerMid="url(#arrowIncident)"
          />
          {/* Mid arrow position */}
          <path d="M 164 113 L 174 120 L 166 126 Z" fill="#2563eb" />
          <text
            x="115"
            y="65"
            className="fill-[var(--sn-primary)] text-[11px] font-extrabold"
          >
            Incident Ray
          </text>

          {/* Reflected Ray (Green or Blue) */}
          <line
            x1="230"
            y1="160"
            x2="350"
            y2="75"
            stroke={highlightCorrect ? "#16a34a" : "#2563eb"}
            strokeWidth="2.75"
          />
          {/* Mid arrow position pointing outward */}
          <path
            d="M 286 120 L 296 113 L 294 126 Z"
            fill={highlightCorrect ? "#16a34a" : "#2563eb"}
          />
          <text
            x="345"
            y="65"
            textAnchor="middle"
            className={
              highlightCorrect
                ? "fill-emerald-700 text-[11px] font-extrabold"
                : "fill-[var(--sn-primary)] text-[11px] font-extrabold"
            }
          >
            Reflected Ray
          </text>

          {/* Incident Angle Arc */}
          <path
            d="M 205 160 A 35 35 0 0 1 214 135"
            fill="none"
            stroke="#2563eb"
            strokeWidth="1.75"
          />
          <text
            x="195"
            y="132"
            textAnchor="end"
            className="fill-[var(--sn-primary)] text-[11px] font-bold"
          >
            i = {incidentAngle}°
          </text>

          {/* Reflected Angle Arc */}
          <path
            d="M 246 135 A 35 35 0 0 1 255 160"
            fill="none"
            stroke={highlightCorrect ? "#16a34a" : "#2563eb"}
            strokeWidth="1.75"
          />
          <text
            x="265"
            y="132"
            textAnchor="start"
            className={
              highlightCorrect
                ? "fill-emerald-700 text-[11px] font-bold"
                : "fill-[var(--sn-primary)] text-[11px] font-bold"
            }
          >
            {highlightCorrect ? "r = 35°" : "r = ?"}
          </text>

          {/* Point of Incidence dot */}
          <circle cx="230" cy="160" r="3.5" fill="#1e293b" />

          {/* Plane Mirror Table line */}
          <rect
            x="70"
            y="160"
            width="320"
            height="14"
            fill="url(#hatchPattern)"
          />
          <line
            x1="70"
            y1="160"
            x2="390"
            y2="160"
            stroke="#1e293b"
            strokeWidth="3"
          />

          <text
            x="230"
            y="192"
            textAnchor="middle"
            className="fill-slate-600 text-[11px] font-medium"
          >
            Plane Mirror (තල කණ්ණාඩිය)
          </text>
        </svg>

        {/* First Law of Reflection formula pill banner */}
        {showLawBadge && (
          <div className="mt-2 flex w-full items-center justify-between rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/80 px-4 py-2 text-xs font-semibold text-[var(--sn-text-main)]">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-2 w-2 rounded-full bg-[var(--sn-primary)]" />
              First Law of Reflection:
            </span>
            <span className="rounded-lg bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--sn-primary)] shadow-2xs">
              i = r
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
