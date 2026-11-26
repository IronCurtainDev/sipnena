interface ProgressBarProps {
  value: number;
  label: string;
  barClassName?: string;
  trackClassName?: string;
  heightClassName?: string;
}

/** CSP-safe progress bar without inline style= attributes. */
export function ProgressBar({
  value,
  label,
  barClassName = "fill-[var(--sn-primary)]",
  trackClassName = "bg-[var(--sn-surface-muted)]",
  heightClassName = "h-2.5",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full overflow-hidden rounded-full ${trackClassName} ${heightClassName}`}
    >
      <svg
        className="block h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="0"
          y="0"
          width={`${clamped}%`}
          height="100%"
          rx="6"
          className={barClassName}
        />
      </svg>
    </div>
  );
}
