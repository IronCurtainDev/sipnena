import { Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Optional accent square — not a logo; prefer `Brand` wordmark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block size-2 rounded-sm bg-brand", className)}
    />
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center rounded-lg font-black tracking-tight no-underline outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <span className="truncate text-lg">{brand.name}</span>
    </Link>
  );
}
