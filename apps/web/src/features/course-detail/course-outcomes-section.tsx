import { Check, ListChecks } from "lucide-react";
import type { CourseDetailStrings } from "./strings.types";

interface CourseOutcomesSectionProps {
  outcomes: string[];
  t: CourseDetailStrings;
}

export function CourseOutcomesSection({
  outcomes,
  t,
}: CourseOutcomesSectionProps) {
  return (
    <section
      aria-labelledby="outcomes-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:p-6"
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"
        >
          <ListChecks className="h-5 w-5" />
        </span>
        <h2
          id="outcomes-heading"
          className="text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:text-xl"
        >
          {t.whatYouLearnTitle}
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {outcomes.map((key) => {
          const outcomeText = t[key as keyof CourseDetailStrings] || key;
          return (
            <li key={key} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
              </span>
              <span className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
                {outcomeText}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
