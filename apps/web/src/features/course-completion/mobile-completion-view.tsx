import React from "react";
import {
  ArrowLeft,
  User,
  FlaskConical,
  CheckCircle2,
  BookOpen,
  Award,
  BookMarked,
  Star,
  ArrowRight,
} from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { CompletionStrings } from "./strings.types";
import { CompletionIllustration } from "./completion-illustration";

interface MobileCompletionViewProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  strings: CompletionStrings;
  onBack: () => void;
  onProfileClick?: () => void;
  onOpenCertificate: () => void;
  onOpenRating: () => void;
  onFindNextCourse: () => void;
}

export function MobileCompletionView({
  lang,
  onLanguageChange,
  strings,
  onBack,
  onProfileClick,
  onOpenCertificate,
  onOpenRating,
  onFindNextCourse,
}: MobileCompletionViewProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] pb-[max(2.5rem,env(safe-area-inset-bottom))] text-slate-800">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="max-w-[110px] truncate">{strings.headerTitle}</span>
        </button>

        {/* Trilingual Pill Switcher */}
        <div className="flex items-center rounded-full bg-slate-100 p-0.5 text-xs font-medium text-slate-600 shadow-inner">
          <button
            type="button"
            onClick={() => onLanguageChange("si")}
            className={`rounded-full px-2.5 py-1 transition-all ${
              lang === "si"
                ? "bg-white font-semibold text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            සිංහල
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("ta")}
            className={`rounded-full px-2 py-1 transition-all ${
              lang === "ta"
                ? "bg-white font-semibold text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            தமிழ்
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={`rounded-full px-2 py-1 transition-all ${
              lang === "en"
                ? "bg-white font-semibold text-slate-900 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            En
          </button>
        </div>

        {/* User Profile Avatar */}
        <button
          type="button"
          onClick={onProfileClick}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-sm hover:bg-[var(--sn-primary-hover)] transition"
          aria-label="Profile (Me)"
        >
          <User className="h-4 w-4" />
        </button>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto flex w-full max-w-md flex-col px-4 pt-4">
        {/* Badges Row */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{strings.pillCourseCompleted}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3.5 py-1 text-xs font-medium text-[var(--sn-primary)]">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>{strings.pillSubjectGrade}</span>
          </div>
        </div>

        {/* Celebration White Card */}
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          {/* Kasun Celebration Illustration */}
          <CompletionIllustration />

          {/* Bilingual Greeting */}
          <p className="mt-2 text-center text-xs font-bold text-amber-800 sm:text-sm">
            {strings.greetingBilingual}
          </p>

          {/* Finish Title */}
          <h1 className="mt-1 text-center font-bold text-slate-900 text-xl sm:text-2xl">
            {strings.finishTitle}
          </h1>

          {/* Course Title Banner */}
          <div className="mt-3 w-full rounded-2xl bg-[var(--sn-olive)]/70 px-4 py-2.5 text-center">
            <span className="text-sm font-bold text-[var(--sn-text-main)] sm:text-base">
              {strings.courseTitle}
            </span>
          </div>

          {/* Body Description */}
          <p className="mt-3 text-center text-xs leading-relaxed text-slate-600 sm:text-sm">
            {strings.finishDesc}
          </p>

          {/* 3 Stat Chips */}
          <div className="mt-5 grid w-full grid-cols-3 gap-2 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="mt-1 text-xs font-bold text-slate-900">
                {strings.statCompletedNum}
              </span>
              <span className="text-xs text-slate-500">
                {strings.statCompletedLabel}
              </span>
            </div>

            <div className="flex flex-col items-center text-center border-x border-slate-200/60 px-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sn-sage)] text-[var(--sn-primary)]">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="mt-1 text-xs font-bold text-slate-900">
                {strings.statNieBadge}
              </span>
              <span className="text-xs text-slate-500">
                {strings.statNieLabel}
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Award className="h-4 w-4" />
              </div>
              <span className="mt-1 text-xs font-bold text-slate-900">
                {strings.statCertReady}
              </span>
              <span className="text-xs text-slate-500">
                {strings.statCertLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Your Notebook is Updated Card */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <BookMarked className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800">
              {strings.notebookUpdatedTitle}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-1">
              {strings.notebookUpdatedDesc}
            </p>
          </div>
        </div>

        {/* CTA Stack */}
        <div className="mt-5 flex flex-col gap-2.5">
          {/* Primary: Get certificate */}
          <button
            type="button"
            onClick={onOpenCertificate}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
          >
            <Award className="h-4 w-4" />
            <span>{strings.getCertificateBtn}</span>
          </button>

          {/* Secondary: Rate this course */}
          <button
            type="button"
            onClick={onOpenRating}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-[var(--sn-text-main)] shadow-sm transition-all hover:bg-slate-50 active:scale-[0.99]"
          >
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{strings.rateCourseBtn}</span>
          </button>

          {/* Tertiary: Find next course */}
          <button
            type="button"
            onClick={onFindNextCourse}
            className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[var(--sn-olive)]/80 py-3 text-xs font-semibold text-[var(--sn-text-main)] transition-all hover:bg-[var(--sn-sage)] active:scale-[0.99]"
          >
            <span>{strings.findNextCourseBtn}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
}
