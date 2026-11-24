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
    else if (tab === "courses") void navigate({ to: "/courses" });
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
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] font-sans text-[var(--sn-text-main)] antialiased sm:flex-row">
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

      <div className="flex min-w-0 flex-1 flex-col pb-24 sm:pb-8">
        <HomeTopBar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onProfileClick={() => showToast(t.profileAria)}
        />

        <main className="mx-auto w-full max-w-[1200px] flex-1 space-y-8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
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
            onJoinSession={(id) => showToast(`Session ${id}`)}
          />

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 space-y-8">
              <MySubjectsSection
                lang={lang}
                onSubjectClick={(id) =>
                  showToast(`${t.statusOpeningSubject} ${id}`)
                }
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
              className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-1"
            >
              <TimetableWidget
                lang={lang}
                onJoinSession={(id) => showToast(`Session ${id}`)}
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
