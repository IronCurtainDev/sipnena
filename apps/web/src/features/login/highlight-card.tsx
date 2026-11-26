import { Check, ShieldCheck, Smartphone } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import type { LoginStrings } from "./strings";

interface Props {
  t: LoginStrings;
}

export function LoginHighlightCard({ t }: Props) {
  const benefits = [
    {
      icon: Check,
      title: t.ben_resume_title,
      desc: t.ben_resume_desc,
    },
    {
      icon: ShieldCheck,
      title: t.ben_safe_title,
      desc: t.ben_safe_desc,
    },
    {
      icon: Smartphone,
      title: t.ben_sync_title,
      desc: t.ben_sync_desc,
    },
  ];

  return (
    <aside
      aria-label={t.leftTitle}
      className="hidden md:flex md:col-span-5 flex-col justify-between p-6 lg:p-8 bg-gradient-to-b from-slate-50 to-[var(--sn-olive)]/40 border-b md:border-b-0 md:border-r border-slate-200"
    >
      <div className="space-y-5">
        <AnimatedStudentsScene />

        <div className="space-y-4 animate-lang-switch">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
              {t.leftTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.leftSubline}
            </p>
          </div>

          <ul className="space-y-3 pt-1">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.title} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[var(--sn-sage)] text-[var(--sn-primary)]"
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

      <div className="flex items-center gap-2 pt-5 mt-6 border-t border-slate-200 text-xs font-medium text-emerald-700">
        <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{t.trustFooter}</span>
      </div>
    </aside>
  );
}
