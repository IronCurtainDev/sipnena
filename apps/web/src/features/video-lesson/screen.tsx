import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { DesktopLessonView } from "./desktop-lesson-view";
import { MobileLessonView } from "./mobile-lesson-view";
import { MobileBottomNav } from "@/features/home/nav-bars";
import { VIDEO_LESSON_STRINGS } from "./strings";

export function SipNenaVideoLessonScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);
  const [activeTab, setActiveTab] = useState<
    "overview" | "notes" | "discussion" | "downloads"
  >("overview");
  const [activeNav, setActiveNav] = useState("courses");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState("les3");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = VIDEO_LESSON_STRINGS[lang];

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

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    const timer = setTimeout(() => setToastMsg(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavTab = (tab: string) => {
    setActiveNav(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses" || tab === "saved")
      void navigate({ to: "/courses" });
    else if (tab === "me" || tab === "profile") void navigate({ to: "/me" });
    else showToast(tab.toUpperCase());
  };

  const handleSelectLesson = (id: string, isLocked?: boolean) => {
    if (id === "course-completed") {
      void navigate({ to: "/course-completed" });
      return;
    }
    if (isLocked) {
      showToast(
        "This lesson is locked. Complete previous unit quizzes to unlock.",
      );
      return;
    }
    setActiveLessonId(id);
    if (id.startsWith("quiz")) {
      setIsPlaying(false);
      showToast(`Started Section Checkpoint Quiz`);
    } else {
      setIsPlaying(true);
      showToast("Lesson loaded");
    }
  };

  const handleToggleDone = () => {
    setIsDone(!isDone);
    showToast(isDone ? "Marked as incomplete" : "Marked as completed! 🎉");
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    showToast(isSaved ? "Removed from bookmarks" : t.savedToBookmarks);
  };

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased">
      {/* Mobile Screen (< 1024px) */}
      <div className="block lg:hidden">
        <MobileLessonView
          t={t}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          isDone={isDone}
          onToggleDone={handleToggleDone}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          activeLessonId={activeLessonId}
          onSelectLesson={handleSelectLesson}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onBack={() => void navigate({ to: "/course" })}
          onNavTab={handleNavTab}
          onToast={showToast}
        />
        <MobileBottomNav
          activeTab={activeNav}
          onTabChange={handleNavTab}
          lang={lang}
        />
      </div>

      {/* Desktop Screen (>= 1024px) */}
      <DesktopLessonView
        t={t}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeNav={activeNav}
        onNavTab={handleNavTab}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        isDone={isDone}
        onToggleDone={handleToggleDone}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        activeLessonId={activeLessonId}
        onSelectLesson={handleSelectLesson}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBackToCourse={() => void navigate({ to: "/course" })}
        onToast={showToast}
      />

      {/* Floating Status Toast Feedback */}
      {toastMsg && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--sn-primary)]"
          />
          <span>{toastMsg}</span>
        </aside>
      )}
    </div>
  );
}
