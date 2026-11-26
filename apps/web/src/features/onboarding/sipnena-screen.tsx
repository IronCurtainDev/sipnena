import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="flex flex-col min-w-0 text-left focus:outline-none cursor-pointer"
        >
          <span className="text-sm sm:text-lg font-black text-[var(--sn-text-main)] tracking-tight leading-none block truncate">
            {ONBOARDING_CONFIG.brandName}
          </span>
          <span className="text-[11px] sm:text-xs text-[var(--sn-text-muted)] font-medium truncate hidden min-[420px]:block">
            {t.topContext}
          </span>
        </button>

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
