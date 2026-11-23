import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function AuthHeading({
  icon: Icon,
  title,
  description,
}: {
  icon?: LucideIcon;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-8 grid gap-2">
      {Icon && (
        <span className="mb-2 grid size-11 place-items-center rounded-xl border bg-card shadow-xs">
          <Icon className="size-5" />
        </span>
      )}
      <h1 className="text-[1.75rem] leading-tight font-semibold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 grid gap-2 text-center text-sm text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline-offset-4 [&_a]:hover:underline">
      {children}
    </div>
  );
}
