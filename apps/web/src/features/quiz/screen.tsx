import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { DesktopQuizView } from "./desktop-quiz-view";
import { MobileQuizView } from "./mobile-quiz-view";
import { SAMPLE_QUIZ_QUESTIONS } from "./mock-data";
import { QUIZ_STRINGS } from "./strings";

export function SipNenaQuizScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);
  const [activeNav, setActiveNav] = useState("courses");
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2); // start on Question 3 to match screenshot
  const [selectedOption, setSelectedOption] = useState<string | null>("B");
  const [isChecked, setIsChecked] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = QUIZ_STRINGS[lang];
  const question =
    SAMPLE_QUIZ_QUESTIONS[currentQuestionIndex] ?? SAMPLE_QUIZ_QUESTIONS[0]!;

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

  const handleSelectOption = (id: string) => {
    if (!isChecked) {
      setSelectedOption(id);
    }
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsChecked(true);
    const correct = question.options.find((o) => o.isCorrect)?.id;
    if (selectedOption === correct) {
      showToast("Correct! Well done! 🎉");
    } else {
      showToast("Check the explanation to learn why!");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < SAMPLE_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      showToast("Quiz completed! Showing your evaluation.");
      void navigate({ to: "/quiz-result" });
    }
  };

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-slate-50 font-sans text-slate-900 antialiased">
      {/* Mobile Screen (< 1024px) */}
      <div className="block lg:hidden">
        <MobileQuizView
          t={t}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          isStarted={isStarted}
          onStart={() => {
            setIsStarted(true);
            setCurrentQuestionIndex(2); // Jump to question 3 matching screenshots
            setSelectedOption("B");
            setIsChecked(false);
          }}
          onReviewNotes={() => void navigate({ to: "/lesson" })}
          question={question}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          isChecked={isChecked}
          onCheck={handleCheck}
          onNext={handleNext}
          onBack={() => {
            if (isStarted) setIsStarted(false);
            else void navigate({ to: "/courses" });
          }}
          onNavTab={handleNavTab}
        />
      </div>

      {/* Desktop Screen (>= 1024px) */}
      <DesktopQuizView
        t={t}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeNav={activeNav}
        onNavTab={handleNavTab}
        isStarted={isStarted}
        onStart={() => {
          setIsStarted(true);
          setCurrentQuestionIndex(2);
          setSelectedOption("B");
          setIsChecked(false);
        }}
        onReviewNotes={() => void navigate({ to: "/lesson" })}
        question={question}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
        isChecked={isChecked}
        onCheck={handleCheck}
        onNext={handleNext}
        onBackToCourse={() => void navigate({ to: "/courses" })}
      />

      {/* Floating Status Toast Feedback */}
      {toastMsg && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2"
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
