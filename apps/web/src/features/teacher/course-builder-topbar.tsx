import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";
import type { TeacherCourseCopy } from "./course-strings";

interface CourseBuilderTopbarProps {
  copy: TeacherCourseCopy;
  courseId: string;
  title: string;
  published: boolean;
  onTitleChange: (title: string) => void;
  onPublishedChange: (published: boolean) => void;
}

export function CourseBuilderTopbar({
  copy,
  courseId,
  title,
  published,
  onTitleChange,
  onPublishedChange,
}: CourseBuilderTopbarProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-4 sm:flex-row sm:items-center sm:justify-between"
      data-testid="teacher-course-builder-topbar"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link
          to="/teacher/courses"
          className="inline-flex min-h-12 shrink-0 items-center gap-1 rounded-xl px-2 text-base font-bold text-[var(--sn-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
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
        <div className="flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-1.5">
          <span className="text-base font-bold text-[var(--sn-text-main)]">
            {published ? copy.publishedLabel : copy.draftLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={published}
            onClick={() => onPublishedChange(!published)}
            className={`relative h-8 w-14 rounded-full transition ${
              published ? "bg-[var(--sn-primary)]" : "bg-[var(--sn-moss)]"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-xs transition ${
                published ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
        <Link
          to="/courses/$courseId/lesson"
          params={{ courseId }}
          data-testid="teacher-course-preview"
          className="inline-flex min-h-12 items-center gap-1 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 text-base font-bold text-[var(--sn-primary)]"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>{copy.previewBtn}</span>
        </Link>
      </div>
    </div>
  );
}
