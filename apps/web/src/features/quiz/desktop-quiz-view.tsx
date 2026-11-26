import { ArrowLeft, User } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import type { AppLanguage } from "@/lib/language";
import { OverviewView } from "./overview-view";
import { QuizCardView } from "./quiz-card-view";
import type { QuizStrings } from "./strings";
import type { QuizQuestion } from "./types";

interface DesktopQuizViewProps {
  t: QuizStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  activeNav: string;
  onNavTab: (tab: string) => void;
  isStarted: boolean;
  onStart: () => void;
  onReviewNotes: () => void;
  question: QuizQuestion;
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
  isChecked: boolean;
  onCheck: () => void;
  onNext: () => void;
  onBackToCourse: () => void;
}

export function DesktopQuizView({
  t,
  lang,
  onLanguageChange,
  activeNav,
  onNavTab,
  isStarted,
  onStart,
  onReviewNotes,
  question,
  selectedOption,
  onSelectOption,
  isChecked,
  onCheck,
  onNext,
  onBackToCourse,
}: DesktopQuizViewProps) {
  return (
    <div className="hidden lg:flex min-h-svh flex-row bg-slate-50">
      <DesktopSidebar
        activeTab={activeNav}
        onTabChange={onNavTab}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-16">
        {/* Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
            {t.topContext}
          </div>

          <div className="flex items-center gap-3">
            <CompactLanguageSwitcher
              selectedLang={lang}
              onLanguageChange={onLanguageChange}
            />
            <button
              type="button"
              onClick={() => onNavTab("me")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-xs hover:bg-[var(--sn-primary-hover)] transition"
              aria-label="Profile (Me)"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-[1340px] flex-1 space-y-6 px-8 py-6">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={onBackToCourse}
                className="inline-flex items-center gap-1.5 font-bold text-[var(--sn-primary)] hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t.breadcrumbBack}</span>
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onNavTab("courses")}
                className="text-slate-600 hover:text-[var(--sn-primary)] hover:underline transition"
              >
                {t.breadcrumbSubject}
              </button>
              <span>&gt;</span>
              <button
                type="button"
                onClick={onBackToCourse}
                className="text-slate-600 hover:text-[var(--sn-primary)] hover:underline transition"
              >
                {t.breadcrumbTopic}
              </button>
              <span>&gt;</span>
              <button
                type="button"
                onClick={onReviewNotes}
                className="text-slate-600 hover:text-[var(--sn-primary)] hover:underline transition"
              >
                {t.breadcrumbUnit}
              </button>
              <span>&gt;</span>
              <span className="font-bold text-slate-900">
                {t.breadcrumbCheckpoint}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[var(--sn-primary)]" />
                <span>{t.badgeGrade}</span>
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {t.badgeTerm}
              </span>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          {!isStarted ? (
            <OverviewView
              t={t}
              onStart={onStart}
              onReviewNotes={onReviewNotes}
            />
          ) : (
            <QuizCardView
              t={t}
              question={question}
              selectedOption={selectedOption}
              onSelectOption={onSelectOption}
              isChecked={isChecked}
              onCheck={onCheck}
              onNext={onNext}
            />
          )}
        </main>
      </div>
    </div>
  );
}
