import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { ForgotPasswordForm } from "@/features/password-recovery/forgot-form";
import { ResetPasswordForm } from "@/features/password-recovery/reset-form";
import { PasswordRecoveryHighlightCard } from "@/features/password-recovery/highlight-card";
import {
  PASSWORD_STRINGS,
  type PasswordStrings,
} from "@/features/password-recovery/strings";

function usePasswordLanguage(): [
  AppLanguage,
  (lang: AppLanguage) => void,
  PasswordStrings,
] {
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) {
        setSelectedLang(customEvent.detail);
      }
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () => {
      window.removeEventListener("sipnena_language_change", handleSync);
    };
  }, []);

  const handleLanguageChange = (code: AppLanguage) => {
    setSelectedLang(code);
    saveLanguage(code);
  };

  const t = PASSWORD_STRINGS[selectedLang] || PASSWORD_STRINGS.en;
  return [selectedLang, handleLanguageChange, t];
}

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [selectedLang, handleLanguageChange, t] = usePasswordLanguage();

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/login" });
    }
  };

  return (
    <SipNenaOnboardingShell
      selectedLang={selectedLang}
      onLanguageChange={handleLanguageChange}
      langSwitcherAria={t.langSwitcherAria}
      brandSubtitle={t.brandSubtitle}
      topBadge={t.topBadge}
      footer={t.pageBottomFooter}
      onBack={handleBack}
      backAria={t.backBtn}
    >
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <PasswordRecoveryHighlightCard t={t} mode="forgot" />
        <div className="md:col-span-7 flex flex-col justify-center">
          <ForgotPasswordForm t={t} />
        </div>
      </div>
    </SipNenaOnboardingShell>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [selectedLang, handleLanguageChange, t] = usePasswordLanguage();

  const handleBack = () => {
    void navigate({ to: "/login" });
  };

  return (
    <SipNenaOnboardingShell
      selectedLang={selectedLang}
      onLanguageChange={handleLanguageChange}
      langSwitcherAria={t.langSwitcherAria}
      brandSubtitle={t.brandSubtitle}
      topBadge={t.topBadge}
      footer={t.pageBottomFooter}
      onBack={handleBack}
      backAria={t.backBtn}
    >
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <PasswordRecoveryHighlightCard t={t} mode="reset" />
        <div className="md:col-span-7 flex flex-col justify-center">
          <ResetPasswordForm t={t} />
        </div>
      </div>
    </SipNenaOnboardingShell>
  );
}
