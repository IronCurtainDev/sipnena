export function StudentKasunCharacter() {
  return (
    <g id="student" transform="translate(145, 30)">
      {/* Legs & Shoes */}
      <rect x="36" y="142" width="9" height="34" rx="4" fill="#F5D0B5" />
      <rect x="55" y="142" width="9" height="34" rx="4" fill="#F5D0B5" />
      {/* White socks */}
      <rect x="35" y="166" width="11" height="10" rx="2" fill="#FFFFFF" />
      <rect x="54" y="166" width="11" height="10" rx="2" fill="#FFFFFF" />
      {/* Black shoes */}
      <path
        d="M 33 175 C 33 173, 48 173, 49 175 L 49 181 C 49 183, 31 183, 31 180 Z"
        fill="#1E293B"
      />
      <path
        d="M 52 175 C 52 173, 67 173, 68 175 L 68 181 C 68 183, 50 183, 50 180 Z"
        fill="#1E293B"
      />

      {/* School Uniform Blue Shorts */}
      <path
        d="M 32 108 L 68 108 L 71 144 L 54 144 L 50 119 L 46 144 L 29 144 Z"
        fill="url(#blueUniform)"
      />
      {/* Shorts belt */}
      <rect x="32" y="107" width="36" height="4" fill="#0F172A" />

      {/* White Uniform Shirt */}
      <path
        d="M 28 66 L 72 66 L 70 108 L 30 108 Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1"
      />
      {/* Pocket with school crest line */}
      <rect
        x="34"
        y="78"
        width="9"
        height="11"
        rx="1.5"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="0.8"
      />
      <circle cx="38.5" cy="83" r="2" fill="#3B82F6" opacity="0.6" />
      {/* Collar & Buttons */}
      <polygon
        points="46,66 50,78 42,66"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="0.8"
      />
      <polygon
        points="54,66 50,78 58,66"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="0.8"
      />
      <circle cx="50" cy="86" r="1.2" fill="#94A3B8" />
      <circle cx="50" cy="96" r="1.2" fill="#94A3B8" />

      {/* Right Arm holding certificate */}
      <path
        d="M 28 68 C 18 78, 12 92, 10 102"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="9" cy="104" r="5.5" fill="#F5D0B5" />

      {/* Left Arm raised with certificate */}
      <path
        d="M 70 68 C 76 78, 80 88, 77 98"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="77" cy="100" r="5.5" fill="#F5D0B5" />

      {/* Official Course Certificate held by Kasun */}
      <g id="certificateHeld" transform="translate(-18, 75)">
        <rect
          x="0"
          y="0"
          width="48"
          height="62"
          rx="3"
          fill="#FFFBEB"
          stroke="#D97706"
          strokeWidth="1.5"
          filter="drop-shadow(0 3px 6px rgba(0,0,0,0.1))"
        />
        {/* Cert decorative inner border */}
        <rect
          x="3"
          y="3"
          width="42"
          height="56"
          rx="1.5"
          fill="none"
          stroke="#FDE68A"
          strokeWidth="0.8"
        />
        {/* Certificate Header Sinhala / English badge */}
        <rect
          x="8"
          y="7"
          width="32"
          height="7"
          rx="1.5"
          fill="url(#goldCert)"
        />
        <text
          x="24"
          y="12"
          fontSize="3.8"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
        >
          විශිෂ්ටතා සහතිකය
        </text>
        <text
          x="24"
          y="19"
          fontSize="3.2"
          fill="#92400E"
          textAnchor="middle"
          fontWeight="bold"
        >
          Course Certificate
        </text>

        {/* Faux text lines */}
        <line
          x1="8"
          y1="26"
          x2="40"
          y2="26"
          stroke="#D1D5DB"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="11"
          y1="31"
          x2="37"
          y2="31"
          stroke="#D1D5DB"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="36"
          x2="34"
          y2="36"
          stroke="#D1D5DB"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Gold Seal with ribbon */}
        <circle cx="24" cy="46" r="6" fill="#F59E0B" />
        <circle cx="24" cy="46" r="4.5" fill="#FEF3C7" />
        {/* Ribbon tails */}
        <polygon points="21,50 19,57 24,53" fill="#D97706" />
        <polygon points="27,50 29,57 24,53" fill="#D97706" />
      </g>

      {/* Student Head & Smile */}
      <g id="face">
        {/* Ears */}
        <circle cx="34" cy="43" r="4" fill="#F5D0B5" />
        <circle cx="66" cy="43" r="4" fill="#F5D0B5" />
        {/* Face oval */}
        <ellipse cx="50" cy="42" rx="16" ry="17" fill="#F5D0B5" />
        {/* Cheeks blush */}
        <circle cx="41" cy="46" r="3" fill="#FDA4AF" opacity="0.6" />
        <circle cx="59" cy="46" r="3" fill="#FDA4AF" opacity="0.6" />
        {/* Big happy eyes */}
        <circle cx="43" cy="40" r="2.2" fill="#1F2937" />
        <circle cx="57" cy="40" r="2.2" fill="#1F2937" />
        <circle cx="44" cy="39" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="39" r="0.8" fill="#FFFFFF" />
        {/* Eyebrows */}
        <path
          d="M 40 35 Q 43 33 46 35"
          fill="none"
          stroke="#1F2937"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 54 35 Q 57 33 60 35"
          fill="none"
          stroke="#1F2937"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Wide proud smile */}
        <path d="M 43 47 Q 50 55 57 47 Z" fill="#DC2626" />
        {/* Smile teeth */}
        <path d="M 45 47 Q 50 50 55 47 Z" fill="#FFFFFF" />
        {/* Hair */}
        <path
          d="M 33 38 C 32 24, 42 17, 50 17 C 58 17, 68 24, 67 38 C 65 31, 57 28, 50 29 C 43 28, 35 31, 33 38 Z"
          fill="#1F2937"
        />
      </g>
    </g>
  );
}
