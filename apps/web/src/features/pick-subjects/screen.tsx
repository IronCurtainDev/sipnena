import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { DEFAULT_SELECTED_SUBJECTS } from "./config";
import { PickSubjectsHighlightCard } from "./highlight-card";
import { PickSubjectsContent } from "./content";
import { PICK_SUBJECTS_STRINGS, type PickSubjectsStrings } from "./strings";

export function PickSubjectsScreen() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);

  const [selectedSubjects, setSelectedSubjects] = useState<
    Record<string, boolean>
  >(() => {
    const init: Record<string, boolean> = {};
    DEFAULT_SELECTED_SUBJECTS.forEach((id) => {
      init[id] = true;
    });
    return init;
  });

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

  const t: PickSubjectsStrings =
    PICK_SUBJECTS_STRINGS[selectedLang] || PICK_SUBJECTS_STRINGS.en;

  const handleLanguageChange = (code: AppLanguage) => {
    setSelectedLang(code);
    saveLanguage(code);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/create-account" });
    }
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleProceed = () => {
    const chosen = Object.keys(selectedSubjects).filter(
      (id) => selectedSubjects[id],
    );
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sipnena_chosen_subjects", JSON.stringify(chosen));
      } catch {
        // localStorage restricted
      }
    }
    void navigate({ to: "/preparing-courses" });
  };

  return (
    <SipNenaOnboardingShell
      selectedLang={selectedLang}
      onLanguageChange={handleLanguageChange}
      langSwitcherAria={t.langSwitcherAria}
      brandSubtitle={t.brandSubtitle}
      topBadge={t.topBadge}
      footer={t.footerText}
      onBack={handleBack}
      backAria={t.backBtn}
    >
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-page-enter">
        <PickSubjectsHighlightCard t={t} />
        <PickSubjectsContent
          t={t}
          selectedSubjects={selectedSubjects}
          onToggleSubject={toggleSubject}
          onProceed={handleProceed}
        />
      </div>
    </SipNenaOnboardingShell>
  );
}
