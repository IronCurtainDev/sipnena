import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { LanguageSetupContent } from "./content";
import { ONBOARDING_CONFIG } from "./tokens";
import { ONBOARDING_STRINGS } from "./strings";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";

export function SipNenaLanguageSetupScreen() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);
  const [statusMessage, setStatusMessage] = useState("");

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

  const t = ONBOARDING_STRINGS[selectedLang] || ONBOARDING_STRINGS.en;

  const handleLanguageChange = (code: string) => {
    const lang = code as AppLanguage;
    setSelectedLang(lang);
    saveLanguage(lang);
    const chosen = ONBOARDING_CONFIG.languages.find((l) => l.code === code);
    if (chosen) {
      setStatusMessage(
        `${ONBOARDING_STRINGS[lang].selectedFeedback} ${chosen.nativeTitle}`,
      );
    }
  };

  const handleContinue = () => {
    const chosen = ONBOARDING_CONFIG.languages.find(
      (l) => l.code === selectedLang,
    );
    setStatusMessage(
      `${t.continueFeedback} ${chosen ? chosen.nativeTitle : selectedLang}`,
    );
    setTimeout(() => {
      void navigate({ to: "/create-account" });
    }, 280);
  };

  return (
    <div className="sipnena-onboarding min-h-screen flex flex-col overflow-x-hidden bg-[var(--sn-page-bg)]">
      <header className="w-full bg-white/95 backdrop-blur border-b border-[var(--sn-border)] sticky top-0 z-20 px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs bg-[var(--sn-primary)]">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-none block truncate">
              {ONBOARDING_CONFIG.brandName}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium truncate hidden min-[420px]:block">
              {t.topContext}
            </span>
          </div>
        </div>

        <CompactLanguageSwitcher
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
          ariaLabel={t.quickLangLabel}
        />
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 flex flex-col justify-center animate-page-enter">
        <LanguageSetupContent
          t={t}
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
          onContinue={handleContinue}
          statusMessage={statusMessage}
        />
      </main>
    </div>
  );
}
