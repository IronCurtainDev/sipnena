import { useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { LANDING_GRADES } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingGradesSectionProps {
  onSelectGrade: (gradeNum: number) => void;
  t: LandingStrings;
}

export function LandingGradesSection({
  onSelectGrade,
  t,
}: LandingGradesSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<number>(8);

  const handleGradeClick = (gradeNum: number) => {
    setSelectedGrade(gradeNum);
    onSelectGrade(gradeNum);
  };

  return (
    <section id="grades" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-xs sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-primary)] uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" />
                <span>Sri Lanka National Curriculum</span>
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
                {t.chooseGradeTitle}
              </h2>
              <p className="mt-0.5 text-xs text-[var(--sn-text-secondary)] sm:text-sm">
                {t.chooseGradeSubtitle}
              </p>
            </div>
            <span className="self-start rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)] sm:self-auto">
              {t.chooseGradeBadge}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {LANDING_GRADES.map((g) => {
              const isSelected = selectedGrade === g.gradeNumber;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleGradeClick(g.gradeNumber)}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all active:scale-[0.98] ${
                    isSelected
                      ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] shadow-md ring-2 ring-[var(--sn-primary)]/20"
                      : "border-[var(--sn-border)] bg-[var(--sn-surface)] hover:border-[var(--sn-border-selected)] hover:bg-slate-50"
                  }`}
                >
                  {g.isOL && (
                    <span className="absolute top-2 right-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
                      O/L
                    </span>
                  )}

                  <span
                    className={`text-base font-extrabold ${
                      isSelected
                        ? "text-[var(--sn-primary)]"
                        : "text-[var(--sn-text-main)]"
                    }`}
                  >
                    {g.labelEn}
                  </span>
                  <span className="mt-1 text-xs font-semibold text-slate-600">
                    {g.labelSi}
                  </span>
                  <span className="mt-0.5 text-[11px] text-slate-400">
                    {g.labelTa}
                  </span>

                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[var(--sn-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
