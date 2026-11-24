interface RayDiagramProps {
  isPlaying: boolean;
  compact?: boolean;
}

export function RayDiagramGraphic({
  isPlaying,
  compact = false,
}: RayDiagramProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950 select-none overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <svg
        viewBox="0 0 800 450"
        className="w-full h-full max-h-[480px] object-contain relative z-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="laserGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="1" />
          </linearGradient>
          <filter id="laserFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Optical Axis (Principal Axis) */}
        <line
          x1="40"
          y1="225"
          x2="740"
          y2="225"
          stroke="#475569"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="50" y="215" fill="#94a3b8" fontSize="12" fontWeight="600">
          Principal Axis / Optic Axis
        </text>

        {/* Concave Mirror Arc */}
        <path
          d="M 640 60 A 300 300 0 0 1 640 390"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
          className="drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
        />

        {/* Back of Mirror Silvering Stripes */}
        {Array.from({ length: 18 }).map((_, i) => {
          const y = 80 + i * 17;
          const curveOffset = Math.sin((i / 17) * Math.PI) * 24;
          const x = 640 + curveOffset;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + 12}
              y2={y - 8}
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}

        {/* Pole Label (P) */}
        <circle cx="664" cy="225" r="5" fill="#38bdf8" />
        <text x="675" y="230" fill="#e2e8f0" fontSize="14" fontWeight="bold">
          P (Pole)
        </text>

        {/* Focus Label (F) */}
        <circle cx="510" cy="225" r="5" fill="#facc15" />
        <text x="505" y="248" fill="#fde047" fontSize="14" fontWeight="bold">
          F
        </text>
        <text x="475" y="264" fill="#cbd5e1" fontSize="11">
          Focal Point (F)
        </text>

        {/* Center of Curvature Label (C) */}
        <circle cx="350" cy="225" r="5" fill="#38bdf8" />
        <text x="345" y="248" fill="#e2e8f0" fontSize="14" fontWeight="bold">
          C
        </text>
        <text x="300" y="264" fill="#cbd5e1" fontSize="11">
          Center of Curvature (C)
        </text>

        {/* Distance Indicator: Focal length (f) */}
        <line
          x1="510"
          y1="310"
          x2="664"
          y2="310"
          stroke="#facc15"
          strokeWidth="1.5"
        />
        <circle cx="510" cy="310" r="3" fill="#facc15" />
        <circle cx="664" cy="310" r="3" fill="#facc15" />
        <text x="555" y="302" fill="#facc15" fontSize="12" fontWeight="bold">
          f (Focal length)
        </text>

        {/* Distance Indicator: Radius of Curvature (R) */}
        <line
          x1="350"
          y1="340"
          x2="664"
          y2="340"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <circle cx="350" cy="340" r="3" fill="#38bdf8" />
        <circle cx="664" cy="340" r="3" fill="#38bdf8" />
        <text x="475" y="333" fill="#38bdf8" fontSize="12" fontWeight="bold">
          R (Radius)
        </text>

        {/* Object Arrow */}
        <line
          x1="240"
          y1="225"
          x2="240"
          y2="125"
          stroke="#ef4444"
          strokeWidth="3.5"
        />
        <polygon points="240,118 234,132 246,132" fill="#ef4444" />
        <text x="218" y="112" fill="#fca5a5" fontSize="12" fontWeight="bold">
          Object
        </text>

        {/* Ray 1: Parallel incoming ray -> hits mirror -> reflects through Focus F */}
        <g filter="url(#laserFilter)">
          <line
            x1="240"
            y1="125"
            x2="650"
            y2="125"
            stroke="url(#laserGlow)"
            strokeWidth="2.5"
            strokeDasharray={isPlaying ? "8 4" : undefined}
            className={isPlaying ? "animate-[dash_1.5s_linear_infinite]" : ""}
          />
          {/* Arrowhead */}
          <polygon points="460,121 472,125 460,129" fill="#93c5fd" />

          {/* Reflected Ray passing through F */}
          <line
            x1="650"
            y1="125"
            x2="350"
            y2="340"
            stroke="url(#laserGlow)"
            strokeWidth="2.5"
            strokeDasharray={isPlaying ? "8 4" : undefined}
          />
          <polygon points="560,195 550,188 554,200" fill="#93c5fd" />
        </g>

        {/* Ray 2: Ray passing through F -> hits mirror -> reflects parallel */}
        <g filter="url(#laserFilter)">
          <line
            x1="240"
            y1="125"
            x2="658"
            y2="280"
            stroke="#60a5fa"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon points="400,185 410,189 402,195" fill="#60a5fa" />

          {/* Parallel reflection */}
          <line
            x1="658"
            y1="280"
            x2="100"
            y2="280"
            stroke="#60a5fa"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon points="380,284 368,280 380,276" fill="#60a5fa" />
        </g>

        {/* Real Inverted Image */}
        <line
          x1="410"
          y1="225"
          x2="410"
          y2="285"
          stroke="#22c55e"
          strokeWidth="3.5"
        />
        <polygon points="410,292 404,278 416,278" fill="#22c55e" />
        <text x="390" y="306" fill="#86efac" fontSize="12" fontWeight="bold">
          Real Image
        </text>

        {/* Sinhala & Tamil annotations on canvas */}
        {!compact && (
          <g>
            <rect
              x="420"
              y="38"
              width="220"
              height="24"
              rx="4"
              fill="#0f172a"
              fillOpacity="0.8"
            />
            <text x="430" y="54" fill="#7dd3fc" fontSize="11" fontWeight="bold">
              Concave Mirror (අවතල දර්පණය)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
