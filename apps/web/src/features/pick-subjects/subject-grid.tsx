import { Check, Plus, Lightbulb } from "lucide-react";
import { SUBJECTS_CONFIG } from "./config";
import type { PickSubjectsStrings } from "./strings";

interface Props {
  t: PickSubjectsStrings;
  selectedSubjects: Record<string, boolean>;
  onToggleSubject: (id: string) => void;
}

export function SubjectGrid({ t, selectedSubjects, onToggleSubject }: Props) {
  return (
    <div
      role="group"
      aria-label={t.subjectsGridAria}
      className="grid grid-cols-2 gap-3 sm:gap-3.5"
    >
      {SUBJECTS_CONFIG.map((subject) => {
        const Icon = subject.icon;
        const isSelected = Boolean(selectedSubjects[subject.id]);

        const title =
          subject.id === "firstLang"
            ? t.sub_firstLang_desktop
            : t[`sub_${subject.id}` as keyof PickSubjectsStrings];

        const subDesc =
          t[`subDesc_${subject.id}` as keyof PickSubjectsStrings] ||
          subject.scriptLine;

        const tagText =
          t[`tag_${subject.id}` as keyof PickSubjectsStrings] || "";

        return (
          <button
            key={subject.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggleSubject(subject.id)}
            className={`group relative rounded-2xl p-3 sm:p-3.5 text-left transition-all flex flex-col justify-between min-h-[120px] sm:min-h-[112px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--sn-primary)] cursor-pointer ${
              isSelected
                ? "bg-[var(--sn-olive)]/50 border-2 border-[var(--sn-primary)] shadow-xs"
                : "bg-white border border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between w-full gap-2">
              <span
                aria-hidden="true"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${subject.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </span>

              <span
                aria-hidden="true"
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[var(--sn-primary)] text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                }`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
              </span>
            </div>

            <div className="min-w-0 flex-1 space-y-0.5 mt-2">
              <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
                {title}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 leading-snug truncate">
                {subDesc}
              </div>

              {tagText ? (
                <div className="pt-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${subject.tagBg}`}
                  >
                    {tagText}
                  </span>
                </div>
              ) : null}
            </div>
          </button>
        );
      })}

      {/* 8th Card: Helpful Tip Callout */}
      <div className="rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between border border-[var(--sn-border)] bg-[var(--sn-olive)]/30 min-h-[120px] sm:min-h-[112px]">
        <span
          aria-hidden="true"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0"
        >
          <Lightbulb className="w-5 h-5" />
        </span>

        <div className="space-y-0.5 mt-2">
          <div className="text-xs sm:text-sm font-bold text-slate-900">
            {t.hintTitle}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
            {t.hintDesktopText}
          </p>
        </div>
      </div>
    </div>
  );
}
