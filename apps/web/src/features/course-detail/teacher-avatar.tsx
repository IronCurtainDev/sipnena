interface TeacherAvatarProps {
  size?: "md" | "lg";
  className?: string;
}

export function TeacherAvatar({
  size = "md",
  className = "",
}: TeacherAvatarProps) {
  const dimensions = size === "lg" ? "h-16 w-16" : "h-11 w-11";

  return (
    <div
      className={`${dimensions} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-200 bg-amber-100 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" className="block h-full w-full">
        <rect width="80" height="80" fill="#FEF3C7" />
        {/* Hair */}
        <circle cx="40" cy="34" r="19" fill="#1E293B" />
        {/* Face */}
        <circle cx="40" cy="36" r="14" fill="#E8B48A" />
        {/* Smile & Eyes */}
        <circle cx="35" cy="35" r="1.6" fill="#0F172A" />
        <circle cx="45" cy="35" r="1.6" fill="#0F172A" />
        <path
          d="M36 41c2.2 2 5.8 2 8 0"
          stroke="#0F172A"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Saree / Academic Blouse */}
        <path d="M18 76c2-15 12-22 22-22s20 7 22 22z" fill="#1D4ED8" />
        <path d="M26 56l26 20H18z" fill="#F59E0B" opacity="0.85" />
      </svg>
    </div>
  );
}
