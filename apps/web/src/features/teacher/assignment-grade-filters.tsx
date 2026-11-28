import { ASSIGNMENT_GRADES, type Grade } from "@/data/courses";
import { formatGrade } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

interface AssignmentGradeFiltersProps {
  lang: AppLanguage;
  gradeFilter: Grade | "all";
  allGradesLabel: string;
  onChange: (next: Grade | "all") => void;
}

export function AssignmentGradeFilters({
  lang,
  gradeFilter,
  allGradesLabel,
  onChange,
}: AssignmentGradeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`min-h-10 rounded-full px-4 text-xs font-bold ${
          gradeFilter === "all"
            ? "bg-[var(--sn-primary)] text-white"
            : "border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)]"
        }`}
      >
        {allGradesLabel}
      </button>
      {ASSIGNMENT_GRADES.map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onChange(g)}
          className={`min-h-10 rounded-full px-4 text-xs font-bold ${
            gradeFilter === g
              ? "bg-[var(--sn-primary)] text-white"
              : "border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)]"
          }`}
        >
          {formatGrade(lang, g)}
        </button>
      ))}
    </div>
  );
}
