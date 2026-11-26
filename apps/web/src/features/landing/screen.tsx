import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { LandingCtaBanner } from "./landing-cta-banner";
import { LandingFaqSection } from "./landing-faq-section";
import { LandingFeaturesSection } from "./landing-features-section";
import { LandingFooter } from "./landing-footer";
import { LandingFreePreviewsSection } from "./landing-free-previews-section";
import { LandingGradesSection } from "./landing-grades-section";
import { LandingHero } from "./landing-hero";
import { LandingNavBar } from "./landing-nav-bar";
import { LandingParentsSection } from "./landing-parents-section";
import { LandingStepsSection } from "./landing-steps-section";
import { LandingSubjectsSection } from "./landing-subjects-section";
import { LANDING_STRINGS } from "./strings";

export function SipNenaLandingScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);

  const t = LANDING_STRINGS[lang];

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) setLang(customEvent.detail);
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () =>
      window.removeEventListener("sipnena_language_change", handleSync);
  }, []);

  const handleLanguageChange = (nextLang: AppLanguage) => {
    setLang(nextLang);
    saveLanguage(nextLang);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sipnena-onboarding relative min-h-svh bg-[var(--sn-page-bg)] font-sans text-[var(--sn-text-main)] antialiased">
      <LandingNavBar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onStartFree={() => void navigate({ to: "/welcome-language" })}
        onLogin={() => void navigate({ to: "/login" })}
        onScrollToSection={scrollToSection}
        onExploreCourses={() => void navigate({ to: "/courses" })}
        t={t}
      />

      <main>
        <LandingHero
          onStartFree={() => void navigate({ to: "/welcome-language" })}
          onForParents={() => scrollToSection("parents")}
          onWatchSample={() => void navigate({ to: "/lesson" })}
          t={t}
        />

        <LandingGradesSection
          onSelectGrade={(gradeNum) => {
            try {
              localStorage.setItem("sipnena_selected_grade", String(gradeNum));
            } catch {
              // Ignore storage restrictions
            }
            void navigate({ to: "/courses" });
          }}
          t={t}
        />

        <LandingSubjectsSection
          onSelectSubject={(subjectId) => {
            try {
              localStorage.setItem("sipnena_selected_subject", subjectId);
            } catch {
              // Ignore storage restrictions
            }
            void navigate({ to: "/courses" });
          }}
          t={t}
        />

        <LandingStepsSection t={t} />

        <LandingFeaturesSection t={t} />

        <LandingParentsSection
          onHowItWorksForParents={() =>
            void navigate({ to: "/checkout", search: { mode: "parent_pay" } })
          }
          t={t}
        />

        <LandingFreePreviewsSection
          onWatchCoursePreview={() => void navigate({ to: "/lesson" })}
          onSeeAllCourses={() => void navigate({ to: "/courses" })}
          t={t}
        />

        <LandingFaqSection lang={lang} t={t} />

        <LandingCtaBanner
          onStartFree={() => void navigate({ to: "/welcome-language" })}
          t={t}
        />
      </main>

      <LandingFooter
        onLanguageChange={handleLanguageChange}
        onWhatsAppHelp={() => {
          window.open("https://wa.me/94771234567", "_blank");
        }}
        t={t}
      />
    </div>
  );
}
