import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { DesktopSidebar } from "./nav-sidebar";
import { TabletRail, MobileBottomNav, HomeTopBar } from "./nav-bars";
import { HeroBanner } from "./hero-card";
import { ActiveLessonCard } from "./active-lesson-card";
import { MySubjectsSection, NewCoursesSection } from "./courses-and-subjects";
import {
  TimetableWidget,
  StudyTipWidget,
  TermProgressWidget,
  MobileSupportStrip,
} from "./timetable-progress-widgets";
import { HOME_STRINGS } from "./strings";

export function SipNenaHomeScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);
  const [activeTab, setActiveTab] = useState("home");
  const [statusToast, setStatusToast] = useState<string | null>(null);

  const t = HOME_STRINGS[lang];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses" || tab === "saved")
      void navigate({ to: "/courses" });
    else if (tab === "me" || tab === "profile") void navigate({ to: "/me" });
    else showToast(`${tab.toUpperCase()}`);
  };

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      }
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () => {
      window.removeEventListener("sipnena_language_change", handleSync);
    };
  }, []);

  const handleLanguageChange = (nextLang: AppLanguage) => {
    setLang(nextLang);
    saveLanguage(nextLang);
  };

  const showToast = useCallback((msg: string) => {
    setStatusToast(msg);
    const timer = setTimeout(() => {
      setStatusToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased sm:flex-row">
      <DesktopSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />
      <TabletRail
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-24 sm:pb-6">
        <HomeTopBar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onProfileClick={() => void navigate({ to: "/me" })}
        />

        <main className="w-full flex-1 space-y-4 px-4 py-4 sm:px-6 sm:py-5 xl:px-8">
          <HeroBanner
            lang={lang}
            onToggleOffline={() => showToast(t.statusOfflineReady)}
          />

          <ActiveLessonCard
            lang={lang}
            onContinue={() => void navigate({ to: "/lesson" })}
          />

          <MobileSupportStrip
            lang={lang}
            onJoinSession={() => void navigate({ to: "/lesson" })}
          />

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.95fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(420px,1fr)]">
            <div className="min-w-0 space-y-5">
              <MySubjectsSection
                lang={lang}
                onSubjectClick={(id) => {
                  try {
                    if (id !== "all")
                      localStorage.setItem("sipnena_selected_subject", id);
                  } catch {}
                  void navigate({ to: "/courses" });
                }}
              />

              <NewCoursesSection
                lang={lang}
                onCourseClick={() => {
                  void navigate({ to: "/course" });
                }}
              />
            </div>

            <aside
              aria-label="Timetable and term progress"
              className="hidden gap-3 sm:grid sm:grid-cols-2 lg:sticky lg:top-5 lg:grid-cols-1 lg:h-[calc(100svh-2.5rem)] lg:overflow-y-auto lg:content-start"
            >
              <TimetableWidget
                lang={lang}
                onJoinSession={() => void navigate({ to: "/lesson" })}
              />
              <StudyTipWidget lang={lang} />
              <div className="sm:col-span-2 lg:col-span-1">
                <TermProgressWidget lang={lang} />
              </div>
            </aside>
          </div>
        </main>
      </div>

      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />

      {statusToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-16 right-4 z-50 flex max-w-sm items-center gap-2 rounded-xl bg-[var(--sn-text-main)] px-4 py-3 text-xs font-semibold text-white shadow-lg sm:bottom-6 sm:right-6"
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--sn-primary)]"
            aria-hidden="true"
          />
          <span>{statusToast}</span>
        </aside>
      )}
    </div>
  );
}
