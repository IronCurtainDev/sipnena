interface CourseCoverProps {
  courseId: string;
  coverImageUrl?: string;
}

export function CourseCoverIllustration({
  courseId,
  coverImageUrl,
}: CourseCoverProps) {
  if (coverImageUrl) {
    return (
      <img
        src={coverImageUrl}
        alt=""
        className="block h-full w-full object-cover select-none"
      />
    );
  }

  if (courseId === "human-body") {
    return (
      <svg
        viewBox="0 0 280 160"
        className="block h-full w-full select-none"
        aria-hidden="true"
      >
        <rect width="280" height="160" fill="#EFF6FF" />
        <rect
          x="18"
          y="14"
          width="110"
          height="132"
          rx="10"
          fill="#FFFFFF"
          stroke="#BFDBFE"
          strokeWidth="1.5"
        />
        <circle
          cx="73"
          cy="36"
          r="12"
          fill="#DBEAFE"
          stroke="#1D4ED8"
          strokeWidth="1.5"
        />
        <path
          d="M50 56 Q73 48 96 56 L102 128 L44 128 Z"
          fill="#F8FAFC"
          stroke="#93C5FD"
          strokeWidth="1.5"
        />
        <ellipse cx="62" cy="78" rx="10" ry="16" fill="#BFDBFE" />
        <ellipse cx="84" cy="78" rx="10" ry="16" fill="#BFDBFE" />
        <circle cx="73" cy="78" r="7" fill="#EF4444" />
        <path d="M62 102 Q73 114 84 102 Q84 120 62 120 Z" fill="#F59E0B" />
        <rect
          x="144"
          y="14"
          width="118"
          height="132"
          rx="10"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        <path
          d="M203 54 C193 42 175 50 175 66 C175 84 203 102 203 102 C203 102 231 84 231 66 C231 50 213 42 203 54 Z"
          fill="#FEE2E2"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <line
          x1="156"
          y1="118"
          x2="248"
          y2="118"
          stroke="#CBD5E1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="156"
          y1="128"
          x2="224"
          y2="128"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (courseId === "optics-mirrors") {
    return (
      <svg
        viewBox="0 0 280 160"
        className="block h-full w-full select-none"
        aria-hidden="true"
      >
        <rect width="280" height="160" fill="#F8FAFC" />
        <line
          x1="20"
          y1="80"
          x2="250"
          y2="80"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M216 22 Q246 80 216 138"
          fill="none"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="110" cy="80" r="3.5" fill="#1D4ED8" />
        <text x="105" y="96" fontSize="11" fontWeight="700" fill="#0F172A">
          C
        </text>
        <circle cx="164" cy="80" r="3.5" fill="#059669" />
        <text x="160" y="96" fontSize="11" fontWeight="700" fill="#0F172A">
          F
        </text>
        <line
          x1="72"
          y1="80"
          x2="72"
          y2="42"
          stroke="#1D4ED8"
          strokeWidth="2.8"
        />
        <polygon points="72,35 66,44 78,44" fill="#1D4ED8" />
        <line
          x1="72"
          y1="42"
          x2="226"
          y2="42"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="226"
          y1="42"
          x2="128"
          y2="112"
          stroke="#059669"
          strokeWidth="2"
        />
        <line
          x1="72"
          y1="42"
          x2="226"
          y2="108"
          stroke="#D97706"
          strokeWidth="1.8"
        />
        <line
          x1="226"
          y1="108"
          x2="96"
          y2="108"
          stroke="#D97706"
          strokeWidth="1.8"
        />
        <line
          x1="134"
          y1="80"
          x2="134"
          y2="108"
          stroke="#E11D48"
          strokeWidth="2.4"
        />
      </svg>
    );
  }

  if (courseId === "plant-nutrition") {
    return (
      <svg
        viewBox="0 0 280 160"
        className="block h-full w-full select-none"
        aria-hidden="true"
      >
        <rect width="280" height="160" fill="#ECFDF5" />
        <circle
          cx="238"
          cy="34"
          r="18"
          fill="#FDE68A"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <line
          x1="212"
          y1="46"
          x2="178"
          y2="64"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <line
          x1="222"
          y1="58"
          x2="192"
          y2="82"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <path
          d="M42 108 C56 54 138 42 192 78 C154 126 76 132 42 108 Z"
          fill="#34D399"
          stroke="#047857"
          strokeWidth="2"
        />
        <path
          d="M46 107 Q118 86 188 79"
          fill="none"
          stroke="#065F46"
          strokeWidth="2"
        />
        <path
          d="M88 95 L104 74M122 88 L138 68M105 92 L124 108"
          stroke="#065F46"
          strokeWidth="1.5"
        />
        <path
          d="M56 36 C56 36 44 52 44 60 A12 12 0 0 0 68 60 C68 52 56 36 56 36 Z"
          fill="#2563EB"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 160"
      className="block h-full w-full select-none"
      aria-hidden="true"
    >
      <rect width="280" height="160" fill="#FEF3C7" />
      <rect x="64" y="132" width="152" height="8" rx="4" fill="#94A3B8" />
      <path
        d="M124 34 L156 34 L156 58 L186 122 C188 127 184 132 178 132 L102 132 C96 132 92 127 94 122 L124 58 Z"
        fill="#FFFFFF"
        stroke="#475569"
        strokeWidth="2"
      />
      <path
        d="M106 98 L174 98 L184 121 C186 126 182 130 177 130 L103 130 C98 130 94 126 96 121 Z"
        fill="#F59E0B"
      />
      <circle cx="132" cy="112" r="4" fill="#FEF3C7" />
      <circle cx="150" cy="118" r="5" fill="#FEF3C7" />
      <circle cx="140" cy="78" r="4" fill="#60A5FA" />
      <circle cx="148" cy="64" r="3" fill="#60A5FA" />
    </svg>
  );
}
