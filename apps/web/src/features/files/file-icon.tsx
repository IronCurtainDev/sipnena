import { File, FileImage, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileIcon({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const Icon = type.startsWith("image/")
    ? FileImage
    : type === "application/pdf"
      ? FileText
      : File;
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground",
        type.startsWith("image/") &&
          "bg-sky-500/10 text-sky-600 dark:text-sky-400",
        type === "application/pdf" &&
          "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}
