import { StudentKasunCharacter } from "./completion-character-svg";

export function CompletionIllustration() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center py-2 sm:max-w-[400px]">
      <svg
        viewBox="0 0 400 240"
        className="h-auto w-full select-none overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Background warm celebration glow */}
          <radialGradient
            id="bgGlow"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FEF08A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </radialGradient>
          {/* Gold certificate gradient */}
          <linearGradient id="goldCert" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          {/* Blue shorts gradient */}
          <linearGradient id="blueUniform" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="200" cy="120" r="110" fill="url(#bgGlow)" />

        {/* Confetti particles */}
        <g opacity="0.85">
          <circle cx="95" cy="55" r="4" fill="#EF4444" />
          <circle cx="120" cy="35" r="3.5" fill="#3B82F6" />
          <circle cx="145" cy="70" r="3" fill="#10B981" />
          <circle cx="250" cy="40" r="4" fill="#F59E0B" />
          <circle cx="280" cy="65" r="3" fill="#EC4899" />
          <circle cx="310" cy="50" r="4" fill="#6366F1" />
          <circle cx="105" cy="110" r="3" fill="#F59E0B" />
          <circle cx="295" cy="115" r="3.5" fill="#10B981" />

          {/* Confetti streamers */}
          <rect
            x="85"
            y="75"
            width="8"
            height="3.5"
            rx="1.5"
            fill="#3B82F6"
            transform="rotate(25 85 75)"
          />
          <rect
            x="265"
            y="85"
            width="9"
            height="3"
            rx="1.5"
            fill="#EF4444"
            transform="rotate(-20 265 85)"
          />
          <rect
            x="130"
            y="25"
            width="7"
            height="3"
            rx="1"
            fill="#F59E0B"
            transform="rotate(40 130 25)"
          />
          <rect
            x="290"
            y="30"
            width="8"
            height="3"
            rx="1.5"
            fill="#10B981"
            transform="rotate(-35 290 30)"
          />
        </g>

        {/* Stack of Sri Lankan Textbooks on right floor */}
        <g id="books" transform="translate(250, 168)">
          {/* Floor shadow */}
          <ellipse
            cx="25"
            cy="42"
            rx="35"
            ry="6"
            fill="#000000"
            opacity="0.08"
          />

          {/* Book 1: English (Navy) */}
          <rect x="0" y="28" width="50" height="12" rx="2" fill="#1E3A8A" />
          <rect x="2" y="29" width="46" height="2" fill="#3B82F6" />
          <text x="7" y="37" fontSize="5.5" fill="#FFFFFF" fontWeight="bold">
            English
          </text>

          {/* Book 2: Maths (Orange) */}
          <rect x="3" y="16" width="45" height="12" rx="2" fill="#C2410C" />
          <rect x="5" y="17" width="41" height="2" fill="#F97316" />
          <text x="10" y="25" fontSize="5.5" fill="#FFFFFF" fontWeight="bold">
            Maths
          </text>

          {/* Book 3: Science (Emerald) */}
          <rect x="6" y="5" width="42" height="11" rx="2" fill="#047857" />
          <rect x="8" y="6" width="38" height="2" fill="#34D399" />
          <text x="12" y="13.5" fontSize="5.5" fill="#FFFFFF" fontWeight="bold">
            Science
          </text>

          {/* Conical Flask on books */}
          <path
            d="M 40 -8 L 44 -8 L 44 -4 L 49 4 L 35 4 L 40 -4 Z"
            fill="#818CF8"
            opacity="0.85"
          />
          <ellipse cx="42" cy="4" rx="7" ry="2" fill="#6366F1" />
          <circle cx="42" cy="0" r="1.5" fill="#C7D2FE" />
        </g>

        {/* Student Shadow */}
        <ellipse
          cx="195"
          cy="222"
          rx="38"
          ry="7"
          fill="#000000"
          opacity="0.12"
        />

        {/* Student Character: Kasun (Sri Lankan schoolboy in uniform) */}
        <StudentKasunCharacter />
      </svg>
    </div>
  );
}
