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
  courseMode?: boolean;
}

export function LessonActionBar({
  t,
  lessonTitle,
  lessonCounter,
  isDone,
  onToggleDone,
  onDownloadNotes,
  courseMode = false,
}: LessonActionBarProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-[min(100%,24rem)] flex-1 space-y-1">
        <p className="text-sm font-semibold leading-normal text-[var(--sn-text-secondary)]">
          {courseMode ? lessonCounter : `${lessonCounter} · ${t.unitSubtitle}`}
        </p>
        <h1 className="text-xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-2xl">
          {lessonTitle}
        </h1>
        {courseMode ? null : (
          <p className="text-base text-[var(--sn-text-secondary)]">
            {t.lessonSubtitle}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
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
