import { Check, GraduationCap, ShieldCheck } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import { CREATE_ACCOUNT_CONFIG } from "./strings";
import type { CreateAccountStrings } from "./strings";

interface Props {
  t: CreateAccountStrings;
  selectedLang: "en" | "si" | "ta";
}

export function CreateAccountHighlightCard({ t, selectedLang }: Props) {
  return (
    <aside
      aria-label={t.leftTitle}
      className="hidden md:flex md:col-span-5 flex-col justify-between p-6 lg:p-8 bg-gradient-to-b from-slate-50 to-blue-50/40 border-b md:border-b-0 md:border-r border-slate-200"
    >
      <div className="space-y-5">
        <AnimatedStudentsScene />

        <div className="space-y-4 animate-lang-switch">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.gradePill}</span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
              {t.leftTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.leftDesc}
            </p>
            {selectedLang === "si" && t.leftDescSinhala ? (
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {t.leftDescSinhala}
              </p>
            ) : null}
          </div>

          <ul className="space-y-3 pt-1">
            {CREATE_ACCOUNT_CONFIG.features.map((feat) => (
              <li key={feat.id} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-emerald-100 text-emerald-700"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {t[`feat_${feat.id}_title` as keyof CreateAccountStrings]}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {t[`feat_${feat.id}_desc` as keyof CreateAccountStrings]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-5 mt-6 border-t border-slate-200 text-xs font-medium text-emerald-700">
        <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{t.trustFooter}</span>
      </div>
    </aside>
  );
}
