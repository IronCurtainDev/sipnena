import React from "react";

interface AvatarIconProps {
  id: string;
  size?: number;
  className?: string;
}

export function AvatarIcon({ id, size = 64, className = "" }: AvatarIconProps) {
  switch (id) {
    case "scholar-girl":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={`select-none ${className}`}
        >
          <circle cx="32" cy="32" r="30" fill="#FDF2F8" />
          {/* Hair & Red Ribbons */}
          <circle cx="17" cy="30" r="5" fill="#EF4444" />
          <circle cx="47" cy="30" r="5" fill="#EF4444" />
          <path
            d="M 17 26 C 17 14, 47 14, 47 26 C 47 38, 17 38, 17 26 Z"
            fill="#1F2937"
          />
          {/* Face */}
          <ellipse cx="32" cy="31" rx="14" ry="14" fill="#F5D0B5" />
          {/* Bangs */}
          <path
            d="M 18 27 C 22 20, 32 20, 32 24 C 32 20, 42 20, 46 27 Z"
            fill="#1F2937"
          />
          {/* Eyes & Smile */}
          <circle cx="26" cy="30" r="1.8" fill="#1F2937" />
          <circle cx="38" cy="30" r="1.8" fill="#1F2937" />
          <circle cx="23" cy="34" r="2.2" fill="#FDA4AF" opacity="0.6" />
          <circle cx="41" cy="34" r="2.2" fill="#FDA4AF" opacity="0.6" />
          <path
            d="M 28 36 Q 32 40 36 36"
            fill="none"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* White School Uniform Shirt & Red Tie */}
          <path
            d="M 18 60 L 46 60 L 44 45 L 20 45 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <polygon points="32,45 34,55 32,58 30,55" fill="#EF4444" />
        </svg>
      );

    case "junior-cap":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={`select-none ${className}`}
        >
          <circle cx="32" cy="32" r="30" fill="#F0FDFA" />
          {/* Face */}
          <ellipse cx="32" cy="35" rx="13" ry="13" fill="#F5D0B5" />
          {/* Hair */}
          <path d="M 20 32 C 20 25, 44 25, 44 32 Z" fill="#1F2937" />
          {/* Graduation Mortarboard Cap */}
          <polygon points="32,15 50,23 32,30 14,23" fill="#1E3A8A" />
          <rect x="22" y="23" width="20" height="6" rx="2" fill="#1E40AF" />
          {/* Tassel */}
          <path
            d="M 32 22 Q 45 23 46 32"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          <circle cx="46" cy="33" r="2" fill="#F59E0B" />
          {/* Eyes & Smile */}
          <circle cx="27" cy="35" r="1.8" fill="#1F2937" />
          <circle cx="37" cy="35" r="1.8" fill="#1F2937" />
          <path
            d="M 28 40 Q 32 44 36 40"
            fill="none"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Academic Gown */}
          <path d="M 16 60 L 48 60 L 44 48 L 20 48 Z" fill="#0D9488" />
        </svg>
      );

    case "prefect":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={`select-none ${className}`}
        >
          <circle cx="32" cy="32" r="30" fill="#EEF2FF" />
          {/* Hair */}
          <path
            d="M 18 28 C 18 16, 46 16, 46 28 C 44 22, 20 22, 18 28 Z"
            fill="#1E293B"
          />
          {/* Face */}
          <ellipse cx="32" cy="32" rx="13" ry="14" fill="#F5D0B5" />
          <circle cx="27" cy="30" r="1.8" fill="#1F2937" />
          <circle cx="37" cy="30" r="1.8" fill="#1F2937" />
          <path
            d="M 29 36 Q 32 39 35 36"
            fill="none"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Prefect Blazer & Crest */}
          <path d="M 16 60 L 48 60 L 44 46 L 20 46 Z" fill="#312E81" />
          <polygon points="32,46 35,58 32,60 29,58" fill="#F59E0B" />
          <circle cx="24" cy="52" r="2.5" fill="#FBBF24" />
        </svg>
      );

    case "explorer":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={`select-none ${className}`}
        >
          <circle cx="32" cy="32" r="30" fill="#FFFBEB" />
          {/* Face & Hair */}
          <path d="M 18 28 C 18 16, 46 16, 46 28 Z" fill="#78350F" />
          <ellipse cx="32" cy="32" rx="13" ry="13" fill="#F5D0B5" />
          {/* Scientist Glasses */}
          <circle
            cx="26"
            cy="30"
            r="4.5"
            fill="none"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <circle
            cx="38"
            cy="30"
            r="4.5"
            fill="none"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <line
            x1="30.5"
            y1="30"
            x2="33.5"
            y2="30"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <circle cx="26" cy="30" r="1.8" fill="#1F2937" />
          <circle cx="38" cy="30" r="1.8" fill="#1F2937" />
          <path
            d="M 29 38 Q 32 41 35 38"
            fill="none"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Lab Coat */}
          <path
            d="M 16 60 L 48 60 L 44 46 L 20 46 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <polygon points="32,46 34,56 32,58 30,56" fill="#D97706" />
        </svg>
      );

    case "reader":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={`select-none ${className}`}
        >
          <circle cx="32" cy="32" r="30" fill="#ECFDF5" />
          {/* Face & Hair */}
          <path d="M 18 27 C 18 15, 46 15, 46 27 Z" fill="#064E3B" />
          <ellipse cx="32" cy="30" rx="13" ry="13" fill="#F5D0B5" />
          <circle cx="27" cy="29" r="1.8" fill="#1F2937" />
          <circle cx="37" cy="29" r="1.8" fill="#1F2937" />
          <path
            d="M 28 35 Q 32 38 36 35"
            fill="none"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Open Book in Front */}
          <path
            d="M 18 60 L 46 60 L 44 44 L 20 44 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1"
          />
          <path
            d="M 20 48 Q 32 44 44 48 L 44 58 Q 32 54 20 58 Z"
            fill="#059669"
          />
          <path
            d="M 22 49 Q 32 46 42 49"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        </svg>
      );

    case "student":
    case "kasun":
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={`select-none ${className}`}
        >
          <circle cx="32" cy="32" r="30" fill="#EFF6FF" />
          {/* Hair */}
          <path
            d="M 20 28 C 18 16, 46 16, 44 28 C 42 22, 22 22, 20 28 Z"
            fill="#1E293B"
          />
          {/* Face */}
          <ellipse cx="32" cy="32" rx="13" ry="14" fill="#F5D0B5" />
          {/* Smile and Cheeks */}
          <circle cx="25" cy="34" r="2" fill="#FDA4AF" opacity="0.6" />
          <circle cx="39" cy="34" r="2" fill="#FDA4AF" opacity="0.6" />
          <circle cx="27" cy="30" r="1.8" fill="#1F2937" />
          <circle cx="37" cy="30" r="1.8" fill="#1F2937" />
          <path
            d="M 28 36 Q 32 41 36 36"
            fill="none"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* White School Uniform Shirt & Blue Tie */}
          <path
            d="M 16 60 L 48 60 L 44 46 L 20 46 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1"
          />
          <polygon points="32,46 34,56 32,58 30,56" fill="#1D4ED8" />
        </svg>
      );
  }
}
