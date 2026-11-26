import { Library, Plus } from "lucide-react";
import type { TeacherCourseCopy } from "./course-strings";

interface CoursesLibraryEmptyProps {
  copy: TeacherCourseCopy;
  kind: "none" | "nomatch";
  onCreate: () => void;
  onClearFilters: () => void;
}

export function CoursesLibraryEmpty({
  copy,
  kind,
  onCreate,
  onClearFilters,
}: CoursesLibraryEmptyProps) {
  if (kind === "none") {
    return (
      <div className="rounded-[2rem] border-2 border-dashed border-[var(--sn-border)] bg-[var(--sn-olive)]/20 p-10 text-center sm:p-12">
        <Library className="mx-auto h-10 w-10 text-[var(--sn-primary)] opacity-40" />
        <h3 className="mt-4 text-xl font-extrabold text-[var(--sn-primary)]">
          {copy.emptyCoursesHeading}
        </h3>
        <p className="mt-2 text-base text-[var(--sn-text-secondary)]">
          {copy.emptyCourses}
        </p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 text-base font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          <span>{copy.newCourseBtn}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
      <p className="text-base text-[var(--sn-text-secondary)]">
        {copy.noMatchCourses}
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-4 inline-flex min-h-12 items-center rounded-xl border border-[var(--sn-border)] px-4 text-base font-bold text-[var(--sn-primary)]"
      >
        {copy.clearFiltersBtn}
      </button>
    </div>
  );
}
