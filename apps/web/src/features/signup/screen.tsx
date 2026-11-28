import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Check, ShieldCheck, Smartphone } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { SipNenaSignupForm } from "./signup-form";
import { SIGNUP_STRINGS } from "./strings";

export function SipNenaSignupScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const t = SIGNUP_STRINGS[lang];

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/login" });
    }
  };

  const benefits = [
    {
      icon: BookOpen,
      title: t.ben_curriculum_title,
      desc: t.ben_curriculum_desc,
    },
    {
      icon: ShieldCheck,
      title: t.ben_safe_title,
      desc: t.ben_safe_desc,
    },
    {
      icon: Smartphone,
      title: t.ben_progress_title,
      desc: t.ben_progress_desc,
    },
  ];

  return (
    <SipNenaOnboardingShell
      selectedLang={lang}
      onLanguageChange={setLang}
      langSwitcherAria={t.langSwitcherAria}
      brandSubtitle={t.brandSubtitle}
      topBadge={t.topBadge}
      footer={t.pageBottomFooter}
      onBack={handleBack}
      backAria={t.backBtn}
    >
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm sm:rounded-3xl md:grid-cols-12">
        <aside
          aria-label={t.leftTitle}
          className="hidden flex-col justify-between border-b border-slate-200 bg-gradient-to-b from-slate-50 to-[var(--sn-olive)]/40 p-6 md:col-span-5 md:flex md:border-b-0 md:border-r lg:p-8"
        >
          <div className="space-y-5">
            <AnimatedStudentsScene />
            <div className="space-y-4 animate-lang-switch">
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                  {t.leftTitle}
                </h2>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
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
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sn-sage)] text-[var(--sn-primary)]"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-900 sm:text-sm">
                          {b.title}
                        </div>
                        <p className="text-xs leading-snug text-slate-600">
                          {b.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-5 text-xs font-medium text-emerald-700">
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.trustFooter}</span>
          </div>
        </aside>

        <SipNenaSignupForm t={t} selectedLang={lang} />
      </div>
    </SipNenaOnboardingShell>
  );
}
