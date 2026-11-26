import React from "react";
import { BookMarked, Edit3, Globe } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { ProfileStrings } from "./strings.types";

interface AcademicPreferencesCardProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  strings: ProfileStrings;
  currentGrade: string;
  onOpenGradeDialog: () => void;
}

export function AcademicPreferencesCard({
  lang,
  onLanguageChange,
  strings,
  currentGrade,
  onOpenGradeDialog,
}: AcademicPreferencesCardProps) {
  return (
    <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--sn-border)] pb-4">
        <div className="flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-[var(--sn-primary)]" />
          <h3 className="font-bold text-[var(--sn-text-main)] text-base sm:text-lg">
            {strings.academicCardTitle}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          {strings.syncedBadge}
        </span>
      </div>

      <div className="divide-y divide-[var(--sn-border)]">
        {/* Row 1: Display Language */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5">
          <div>
            <h4 className="text-sm font-bold text-[var(--sn-text-main)]">
              {strings.displayLangTitle}
            </h4>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {strings.displayLangSub}
            </p>
          </div>
          <div className="flex items-center rounded-xl bg-[var(--sn-surface-muted)] p-1 text-xs font-bold text-[var(--sn-text-secondary)]">
            <button
              type="button"
              onClick={() => onLanguageChange("si")}
              className={`rounded-lg px-3 py-1.5 transition ${
                lang === "si"
                  ? "bg-[var(--sn-surface)] text-[var(--sn-primary)] shadow-xs"
                  : ""
              }`}
            >
              සිංහල
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("ta")}
              className={`rounded-lg px-3 py-1.5 transition ${
                lang === "ta"
                  ? "bg-[var(--sn-surface)] text-[var(--sn-primary)] shadow-xs"
                  : ""
              }`}
            >
              தமிழ்
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-lg px-3 py-1.5 transition ${
                lang === "en"
                  ? "bg-[var(--sn-surface)] text-[var(--sn-primary)] shadow-xs"
                  : ""
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Row 2: Enrolled Grade */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5">
          <div>
            <h4 className="text-sm font-bold text-[var(--sn-text-main)]">
              {strings.settingGradeTitle}
            </h4>
            <p className="text-xs text-[var(--sn-text-muted)]">
              National Curriculum G.C.E. Ordinary Level Foundation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-[var(--sn-surface-selected)] px-3 py-1.5 text-xs font-bold text-[var(--sn-primary)]">
              Grade {currentGrade} (Junior Secondary)
            </span>
            <button
              type="button"
              onClick={onOpenGradeDialog}
              className="text-xs font-bold text-[var(--sn-primary)] hover:underline"
            >
              {strings.changeGradeBtn}
            </button>
          </div>
        </div>

        {/* Row 3: Medium of Instruction */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5">
          <div>
            <h4 className="text-sm font-bold text-[var(--sn-text-main)]">
              {strings.mediumTitle}
            </h4>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {strings.mediumSub}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 py-1.5 text-xs font-bold text-[var(--sn-text-main)]">
            <Globe className="h-3.5 w-3.5 text-[var(--sn-primary)]" />
            <span>{strings.mediumValue}</span>
          </div>
        </div>

        {/* Row 4: Daily Homework Goal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5">
          <div>
            <h4 className="text-sm font-bold text-[var(--sn-text-main)]">
              {strings.studyGoalTitle}
            </h4>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {strings.studyGoalSub}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-[var(--sn-surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--sn-text-main)]">
            <span>{strings.studyGoalValue}</span>
            <Edit3 className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
