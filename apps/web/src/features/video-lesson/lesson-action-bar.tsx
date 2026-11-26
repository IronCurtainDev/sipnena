import { Check, Download } from "lucide-react";
import type { VideoLessonStrings } from "./strings";

interface LessonActionBarProps {
  t: VideoLessonStrings;
  lessonTitle: string;
  lessonCounter: string;
  isDone: boolean;
  onToggleDone: () => void;
  onDownloadNotes: () => void;
  onHelp: () => void;
}

export function LessonActionBar({
  t,
  lessonTitle,
  lessonCounter,
  isDone,
  onToggleDone,
  onDownloadNotes,
}: LessonActionBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold leading-normal text-[var(--sn-text-secondary)]">
          {lessonCounter} · {t.unitSubtitle}
        </p>
        <h1 className="text-xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-2xl">
          {lessonTitle}
        </h1>
        <p className="text-base text-[var(--sn-text-secondary)]">
          {t.lessonSubtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onToggleDone}
          className={`inline-flex min-h-[48px] items-center gap-2 rounded-2xl px-5 text-sm font-bold transition active:scale-[0.99] ${
            isDone
              ? "bg-[var(--sn-primary)] text-[var(--sn-cream)]"
              : "border border-[var(--sn-primary)] bg-[var(--sn-surface)] text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
          }`}
        >
          <Check className="h-4 w-4" />
          <span>{isDone ? t.markedDone : t.markAsDone}</span>
        </button>

        <button
          type="button"
          onClick={onDownloadNotes}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 text-sm font-bold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-olive)] active:scale-[0.99]"
        >
          <Download className="h-4 w-4" />
          <span>{t.notePdf}</span>
        </button>
      </div>
    </div>
  );
}
