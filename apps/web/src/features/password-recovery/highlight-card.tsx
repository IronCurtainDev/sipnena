import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import type { PasswordStrings } from "./strings";

interface Props {
  t: PasswordStrings;
  mode: "forgot" | "reset";
}

export function PasswordRecoveryHighlightCard({ t, mode }: Props) {
  const isForgot = mode === "forgot";
  const title = isForgot ? t.leftTitleForgot : t.leftTitleReset;
  const subline = isForgot ? t.leftSublineForgot : t.leftSublineReset;

  const benefits = [
    {
      icon: Sparkles,
      title: t.ben_fast_title,
      desc: t.ben_fast_desc,
    },
    {
      icon: ShieldCheck,
      title: t.ben_safe_title,
      desc: t.ben_safe_desc,
    },
    {
      icon: Check,
      title: t.ben_help_title,
      desc: t.ben_help_desc,
    },
  ];

  return (
    <aside
      aria-label={title}
      className="hidden md:flex md:col-span-5 flex-col justify-between p-6 lg:p-8 bg-gradient-to-b from-slate-50 to-blue-50/40 border-b md:border-b-0 md:border-r border-slate-200"
    >
      <div className="space-y-5">
        <AnimatedStudentsScene />

        <div className="space-y-4 animate-lang-switch">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {subline}
            </p>
          </div>

          <ul className="space-y-3 pt-1">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.title} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-blue-100 text-blue-700"
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {b.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {b.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{t.trustFooter}</span>
      </div>
    </aside>
  );
}
