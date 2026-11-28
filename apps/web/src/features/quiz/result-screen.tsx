import { useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { DesktopQuizResultView } from "./desktop-quiz-result-view";
import { MobileQuizResultView } from "./mobile-quiz-result-view";
import { getQuizResultMock } from "./result-mock-data";
import { QUIZ_RESULT_STRINGS } from "./result-strings";

export function SipNenaQuizResultScreen() {
  const navigate = useNavigate();
  const [lang, handleLanguageChange] = useSipNenaLanguage();
  const [activeNav, setActiveNav] = useState("courses");
  const [isPassedState, setIsPassedState] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = QUIZ_RESULT_STRINGS[lang];
  const result = getQuizResultMock(lang, isPassedState);

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

  const handleTryAgain = () => {
    setIsPassedState(!isPassedState);
    void navigate({ to: "/quiz" });
  };

  const handleNextLesson = () => {
    if (isPassedState) {
      void navigate({ to: "/course-completed" });
    } else {
      showToast(t.nextSectionToast);
      void navigate({ to: "/lesson" });
    }
  };

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-slate-50 font-sans text-slate-900 antialiased">
      {/* Mobile Screen (< 1024px) */}
      <div className="block lg:hidden">
        <MobileQuizResultView
          t={t}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          result={result}
          onTryAgain={handleTryAgain}
          onNextLesson={handleNextLesson}
          onReviewLesson={(ref) => {
            showToast(`${t.reviewLessonToastPrefix} ${ref}`);
            void navigate({ to: "/lesson" });
          }}
          onBack={() => void navigate({ to: "/quiz" })}
          onNavTab={handleNavTab}
        />
      </div>

      {/* Desktop Screen (>= 1024px) */}
      <DesktopQuizResultView
        t={t}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeNav={activeNav}
        onNavTab={handleNavTab}
        result={result}
        onTryAgain={handleTryAgain}
        onNextLesson={handleNextLesson}
        onReviewLesson={(ref) => {
          showToast(`${t.reviewLessonToastPrefix} ${ref}`);
          void navigate({ to: "/lesson" });
        }}
        onBackToCourse={() => void navigate({ to: "/course" })}
        onToast={showToast}
      />

      {/* Toast Feedback */}
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
