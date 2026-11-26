import {
  ArrowRight,
  BookText,
  Calculator,
  Compass,
  FlaskConical,
  Languages,
  Laptop,
  Scroll,
} from "lucide-react";
import { LANDING_SUBJECTS } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingSubjectsSectionProps {
  onSelectSubject: (subjectId: string) => void;
  t: LandingStrings;
}

export function LandingSubjectsSection({
  onSelectSubject,
  t,
}: LandingSubjectsSectionProps) {
  const getSubjectIcon = (id: string) => {
    switch (id) {
      case "maths":
        return <Calculator className="h-5 w-5" />;
      case "science":
        return <FlaskConical className="h-5 w-5" />;
      case "english":
        return <Languages className="h-5 w-5" />;
      case "first-lang":
        return <BookText className="h-5 w-5" />;
      case "history":
        return <Scroll className="h-5 w-5" />;
      case "geography":
        return <Compass className="h-5 w-5" />;
      case "ict":
        return <Laptop className="h-5 w-5" />;
      default:
        return <BookText className="h-5 w-5" />;
    }
  };

  return (
    <section id="subjects" className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
            {t.schoolSubjectsTitle}
          </h2>
          <p className="mt-1 text-xs text-[var(--sn-text-secondary)] sm:text-sm">
            {t.schoolSubjectsSubtitle}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_SUBJECTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectSubject(s.id)}
              className="group flex items-center gap-3.5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 text-left shadow-2xs transition hover:border-[var(--sn-border-selected)] hover:shadow-md active:scale-[0.99]"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${s.iconBg} ${s.colorClass} transition-transform group-hover:scale-105`}
              >
                {getSubjectIcon(s.id)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[var(--sn-text-main)] group-hover:text-[var(--sn-primary)] transition-colors">
                  {s.titleEn}
                </span>
                <span className="block text-xs font-semibold text-[var(--sn-text-secondary)]">
                  {s.titleSi}
                </span>
                <span className="block text-[10px] text-[var(--sn-text-muted)]">
                  {s.titleTa}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[var(--sn-primary)]" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
