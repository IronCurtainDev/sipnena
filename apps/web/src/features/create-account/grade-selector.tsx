import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, GraduationCap } from "lucide-react";
import { CREATE_ACCOUNT_CONFIG } from "./strings";

interface Props {
  selectedGrade: number;
  onSelectGrade: (grade: number) => void;
  gradeLabel: string;
  olBadge: string;
  gradeItem: string;
  selectedLang: "en" | "si" | "ta";
}

export function GradeSelector({
  selectedGrade,
  onSelectGrade,
  gradeLabel,
  olBadge,
  gradeItem,
  selectedLang,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getGradeText = (grade: number) =>
    selectedLang === "si" ? `${grade} ${gradeItem}` : `${gradeItem} ${grade}`;

  const getGradeCategory = (grade: number) => {
    if (grade >= 10) return olBadge;
    return selectedLang === "si"
      ? "6–9 ශ්‍රේණි"
      : selectedLang === "ta"
        ? "தரம் 6–9"
        : "Grades 6–9";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center justify-between mb-1.5">
        <label
          id="grade-select-label"
          className="text-sm font-semibold text-slate-900"
        >
          {gradeLabel}
        </label>
        <span className="text-xs text-slate-500 font-medium">{olBadge}</span>
      </div>

      <button
        type="button"
        id="grade-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="grade-select-label grade-select-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl text-left bg-slate-100 hover:bg-slate-200/80 border border-transparent focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 transition-all flex items-center justify-between gap-3 shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-[var(--sn-sage)] text-[var(--sn-primary)] flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </span>
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-sm sm:text-base font-bold text-slate-900">
              {getGradeText(selectedGrade)}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden min-[360px]:inline">
              • {getGradeCategory(selectedGrade)}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[var(--sn-primary)]" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Elegant Dropdown Menu */}
      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby="grade-select-label"
          className="absolute z-30 mt-1.5 w-full bg-white rounded-2xl border border-slate-200 shadow-xl py-1.5 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150"
        >
          {CREATE_ACCOUNT_CONFIG.grades.map((grade) => {
            const isSelected = selectedGrade === grade;
            return (
              <li key={grade} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectGrade(grade);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-3 text-sm transition-colors ${
                    isSelected
                      ? "bg-[var(--sn-olive)] font-semibold text-[var(--sn-primary)]"
                      : "text-slate-800 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? "bg-[var(--sn-primary)] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {grade}
                    </span>
                    <span className="truncate">{getGradeText(grade)}</span>
                    <span className="text-xs text-slate-400 font-normal hidden min-[400px]:inline">
                      ({getGradeCategory(grade)})
                    </span>
                  </div>

                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-[var(--sn-primary)] shrink-0 stroke-[2.5]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
