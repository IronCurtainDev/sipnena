import { ChevronDown } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ShellProps = {
  id: string;
  label: ReactNode;
  labelAction?: ReactNode;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function FieldShell({
  id,
  label,
  labelAction,
  description,
  className,
  children,
}: ShellProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex min-h-4 items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {labelAction}
      </div>
      {children}
      {description && (
        <p id={`${id}-description`} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

type FieldProps = ComponentProps<"input"> & Omit<ShellProps, "id" | "children">;

export function Field({
  label,
  labelAction,
  description,
  className,
  id,
  ...props
}: FieldProps) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <FieldShell
      id={inputId}
      label={label}
      labelAction={labelAction}
      description={description}
      className={className}
    >
      <Input
        id={inputId}
        className="h-9"
        aria-describedby={description ? `${inputId}-description` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function NativeSelect({
  className,
  ...props
}: ComponentProps<"select">) {
  return (
    <div className={cn("relative", className)}>
      <select
        className="h-9 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent pr-8 pl-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 [&>option]:bg-popover [&>option]:text-popover-foreground"
        {...props}
      />
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export function SelectField({
  label,
  description,
  className,
  ...props
}: ComponentProps<"select"> & { label: ReactNode; description?: ReactNode }) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      description={description}
      className={className}
    >
      <NativeSelect id={id} {...props} />
    </FieldShell>
  );
}
