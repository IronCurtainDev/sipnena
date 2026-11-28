import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Eye, Users } from "lucide-react";
import type { PublishStatus } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import type { TeacherCourseCopy } from "./course-strings";
import type { SaveIndicator } from "./use-course-builder";

interface CourseBuilderTopbarProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  courseId: string;
  title: string;
  status: PublishStatus;
  releaseAt?: string;
  saveState: SaveIndicator;
  counts: {
    totalLessons: number;
    publishedLessons: number;
    scheduledLessons: number;
    draftLessons: number;
  };
  onTitleChange: (title: string) => void;
  onStatusChange: (status: PublishStatus, releaseAt?: string) => void;
  onOpenAssign: () => void;
}

export function CourseBuilderTopbar({
  lang,
  copy,
  courseId,
  title,
  status,
  releaseAt,
  saveState,
  counts,
  onTitleChange,
  onStatusChange,
  onOpenAssign,
}: CourseBuilderTopbarProps) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const saveLabel =
    saveState === "saving"
      ? extra.savingNow
      : saveState === "dirty"
        ? extra.unsavedChanges
        : extra.savedJustNow;

  return (
    <div
      className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-4"
      data-testid="teacher-course-builder-topbar"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            to="/teacher/courses"
            className="inline-flex min-h-12 shrink-0 items-center gap-1 rounded-xl px-2 text-base font-bold text-[var(--sn-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{copy.backToLibrary}</span>
          </Link>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            aria-label={copy.titleField}
            className="min-w-0 flex-1 truncate rounded-xl border border-transparent bg-transparent px-2 py-2 text-lg font-bold text-[var(--sn-text-main)] outline-none hover:border-[var(--sn-border)] focus:border-[var(--sn-primary)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-xs font-bold text-[var(--sn-text-muted)]"
            data-testid="builder-save-indicator"
          >
            {saveLabel}
          </span>

          <select
            aria-label="Course status"
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as PublishStatus, releaseAt)
            }
            className="min-h-12 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-sm font-bold text-[var(--sn-primary)]"
          >
            <option value="draft">{extra.statusDraft}</option>
            <option value="scheduled">{extra.statusScheduled}</option>
            <option value="published">{extra.statusPublished}</option>
          </select>

          {status === "scheduled" ? (
            <label className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2.5 text-xs font-semibold">
              <CalendarClock className="h-4 w-4 text-[var(--sn-primary)]" />
              <input
                type="datetime-local"
                value={(releaseAt ?? "").slice(0, 16)}
                onChange={(e) => onStatusChange("scheduled", e.target.value)}
                title={extra.colomboHint}
                className="bg-transparent text-xs outline-none"
              />
            </label>
          ) : null}

          <button
            type="button"
            onClick={onOpenAssign}
            className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3.5 text-sm font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
          >
            <Users className="h-4 w-4" />
            <span>{extra.assignBtn}</span>
          </button>

          <Link
            to="/teacher/courses/$courseId/preview"
            params={{ courseId }}
            data-testid="teacher-course-preview"
            className="inline-flex min-h-12 items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white"
          >
            <Eye className="h-4 w-4" />
            <span>{copy.previewBtn}</span>
          </Link>
        </div>
      </div>

      <p className="text-xs font-semibold text-[var(--sn-text-secondary)]">
        {counts.totalLessons} lessons · {counts.publishedLessons} published ·{" "}
        {counts.scheduledLessons} scheduled · {counts.draftLessons} drafts
      </p>
    </div>
  );
}
