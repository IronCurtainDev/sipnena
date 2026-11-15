import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm",
        className,
      )}
    >
      <Sparkles className="size-4" />
    </span>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center gap-2.5 rounded-lg font-semibold tracking-tight no-underline outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <BrandMark />
      <span className="truncate">{brand.name}</span>
    </Link>
  );
}
