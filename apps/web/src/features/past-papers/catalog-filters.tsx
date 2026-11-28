import { ChevronDown, Filter } from "lucide-react";
import { formatGrade, formatMedium, formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { PastPapersCopy } from "./strings";

const YEARS = ["all", "2025", "2024", "2023", "2022", "2021", "2019", "2016"];

interface PastPapersFiltersProps {
  lang: AppLanguage;
  copy: PastPapersCopy;
  grades: readonly number[];
  grade: number;
  onGradeChange: (grade: number) => void;
  subjects: string[];
  subject: string;
  onSubjectChange: (subject: string) => void;
  year: string;
  onYearChange: (year: string) => void;
  medium: string;
  onMediumChange: (medium: string) => void;
  paperType: string;
  onPaperTypeChange: (paperType: string) => void;
  moreOpen: boolean;
  onToggleMore: () => void;
}

const selectClass =
  "w-full min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-sm font-semibold text-[var(--sn-text-main)]";

export function PastPapersFilters({
  lang,
  copy,
  grades,
  grade,
  onGradeChange,
  subjects,
  subject,
  onSubjectChange,
  year,
  onYearChange,
  medium,
  onMediumChange,
  paperType,
  onPaperTypeChange,
  moreOpen,
  onToggleMore,
}: PastPapersFiltersProps) {
  return (
    <div className="mt-4 space-y-4">
      <div>
        <p className="mb-2 text-xs font-bold text-[var(--sn-text-secondary)]">
          {copy.gradeLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {grades.map((value) => {
            const active = grade === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onGradeChange(value)}
                data-testid={`past-paper-grade-${value}`}
                className={`min-h-12 min-w-12 rounded-2xl px-3 text-sm font-extrabold ${
                  active
                    ? "bg-[var(--sn-primary)] text-white"
                    : "border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)]"
                }`}
              >
                {formatGrade(lang, value)}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
        <span className="mb-1 flex items-center gap-1">
          <Filter className="h-3 w-3" /> {copy.subjectLabel}
        </span>
        <select
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className={selectClass}
        >
          {subjects.map((item) => (
            <option key={item} value={item}>
              {formatSubject(lang, item)}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={onToggleMore}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)]"
        aria-expanded={moreOpen}
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
        />
        {moreOpen ? copy.hideFilters : copy.moreFilters}
      </button>

      {moreOpen ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">{copy.yearLabel}</span>
            <select
              value={year}
              onChange={(e) => onYearChange(e.target.value)}
              className={selectClass}
            >
              {YEARS.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? copy.allYears : item}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">{copy.mediumLabel}</span>
            <select
              value={medium}
              onChange={(e) => onMediumChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">{copy.allMediums}</option>
              <option value="si">{formatMedium(lang, "si")}</option>
              <option value="ta">{formatMedium(lang, "ta")}</option>
              <option value="en">{formatMedium(lang, "en")}</option>
            </select>
          </label>
          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">{copy.paperTypeLabel}</span>
            <select
              value={paperType}
              onChange={(e) => onPaperTypeChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">{copy.allTypes}</option>
              <option value="Part I MCQ">{copy.part1Label}</option>
              <option value="Part II Structured & Essay">
                {copy.part2Label}
              </option>
            </select>
          </label>
        </div>
      ) : null}
    </div>
  );
}
