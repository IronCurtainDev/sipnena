import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  Star,
  User,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import type { AppLanguage } from "@/lib/language";
import { CompletionIllustration } from "./completion-illustration";
import { CompletionSidebarWidgets } from "./completion-sidebar-widgets";
import type { CompletionStrings } from "./strings.types";

interface DesktopCompletionViewProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  strings: CompletionStrings;
  activeNav: string;
  onNavTab: (tab: string) => void;
  onBack: () => void;
  onOpenCertificate: () => void;
  onOpenRating: () => void;
  onFindNextCourse: () => void;
}

export function DesktopCompletionView({
  lang,
  onLanguageChange,
  strings,
  activeNav,
  onNavTab,
  onBack,
  onOpenCertificate,
  onOpenRating,
  onFindNextCourse,
}: DesktopCompletionViewProps) {
  return (
    <div className="hidden lg:flex min-h-svh flex-row bg-slate-50">
      <DesktopSidebar
        activeTab={activeNav}
        onTabChange={onNavTab}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-20">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
            Sri Lankan General Education • Grades 6–11
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

        {/* Main Content */}
        <main className="w-full flex-1 space-y-6 px-6 py-6 xl:px-8">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 font-bold text-[var(--sn-primary)] hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Course</span>
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onNavTab("courses")}
                className="text-slate-600 hover:text-[var(--sn-primary)] hover:underline transition"
              >
                Science (Grades 6–11)
              </button>
              <span>&gt;</span>
              <button
                type="button"
                onClick={onBack}
                className="text-slate-600 hover:text-[var(--sn-primary)] hover:underline transition"
              >
                Light, Reflection & Spherical Mirrors
              </button>
              <span>&gt;</span>
              <button
                type="button"
                onClick={onBack}
                className="text-slate-600 hover:text-[var(--sn-primary)] hover:underline transition"
              >
                Unit 1: Fundamentals
              </button>
              <span>&gt;</span>
              <span className="font-bold text-slate-900">Course Completed</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Course Completed • 100%</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
                <FlaskConical className="h-3.5 w-3.5" />
                <span>Science • Grade 8</span>
              </span>
            </div>
          </div>

          {/* 2-Column Responsive Body */}
          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
            {/* Left Column: Big Celebration Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <CompletionIllustration />
                </div>

                <p className="mt-2 text-sm font-bold text-amber-800">
                  {strings.greetingBilingual}
                </p>

                <h1 className="mt-1 font-bold text-slate-900 text-3xl">
                  {strings.finishTitle}
                </h1>

                <div className="mt-3 inline-block rounded-2xl bg-[var(--sn-olive)]/80 px-6 py-2.5">
                  <span className="text-base font-bold text-[var(--sn-text-main)]">
                    {strings.courseTitle}
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                  {strings.finishDesc}
                </p>

                {/* 3 Stat Chips */}
                <div className="mt-6 grid w-full max-w-lg grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="mt-1.5 text-sm font-bold text-slate-900">
                      {strings.statCompletedNum}
                    </span>
                    <span className="text-xs text-slate-500">
                      {strings.statCompletedLabel}
                    </span>
                  </div>

                  <div className="flex flex-col items-center border-x border-slate-200 px-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sn-sage)] text-[var(--sn-primary)]">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <span className="mt-1.5 text-sm font-bold text-slate-900">
                      {strings.statNieBadge}
                    </span>
                    <span className="text-xs text-slate-500">
                      {strings.statNieLabel}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="mt-1.5 text-sm font-bold text-slate-900">
                      {strings.statCertReady}
                    </span>
                    <span className="text-xs text-slate-500">
                      {strings.statCertLabel}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onOpenCertificate}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-4 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
                  >
                    <Award className="h-4 w-4" />
                    <span>{strings.getCertificateBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenRating}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-[var(--sn-text-main)] shadow-xs hover:bg-slate-50 active:scale-[0.99]"
                  >
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>{strings.rateCourseBtn}</span>
                  </button>
                </div>

                <div className="mt-3 w-full max-w-lg">
                  <button
                    type="button"
                    onClick={onFindNextCourse}
                    className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[var(--sn-olive)]/80 py-3 text-xs font-semibold text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)] active:scale-[0.99]"
                  >
                    <span>{strings.findNextCourseBtn}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Widgets */}
            <CompletionSidebarWidgets
              strings={strings}
              onFindNextCourse={onFindNextCourse}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
