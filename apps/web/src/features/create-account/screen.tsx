import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { CreateAccountHighlightCard } from "./highlight-card";
import { CreateAccountForm } from "./create-account-form";
import { CREATE_ACCOUNT_STRINGS } from "./strings";

export function CreateAccountScreen() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);
  const [formFeedback, setFormFeedback] = useState<{
    type: "info" | "warning" | "success";
    text: string;
  } | null>(null);

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

  const t = CREATE_ACCOUNT_STRINGS[selectedLang] || CREATE_ACCOUNT_STRINGS.en;

  const handleLanguageChange = (code: AppLanguage) => {
    setSelectedLang(code);
    saveLanguage(code);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/welcome-language" });
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
        <CreateAccountHighlightCard t={t} selectedLang={selectedLang} />
        <CreateAccountForm
          t={t}
          selectedLang={selectedLang}
          onLoginClick={() => void navigate({ to: "/login" })}
          formFeedback={formFeedback}
          setFormFeedback={setFormFeedback}
        />
      </div>
    </SipNenaOnboardingShell>
  );
}
