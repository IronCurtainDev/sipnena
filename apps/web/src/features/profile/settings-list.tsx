import React from "react";
import {
  ChevronRight,
  Globe,
  GraduationCap,
  HelpCircle,
  KeyRound,
  Receipt,
} from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { ProfileStrings } from "./strings.types";

interface SettingsListProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  strings: ProfileStrings;
  currentGrade: string;
  onOpenGradeDialog: () => void;
  onOpenPasswordDialog: () => void;
  onOpenReceiptsDialog: () => void;
  onOpenHelpDialog: () => void;
}

export function SettingsList({
  lang,
  onLanguageChange,
  strings,
  currentGrade,
  onOpenGradeDialog,
  onOpenPasswordDialog,
  onOpenReceiptsDialog,
  onOpenHelpDialog,
}: SettingsListProps) {
  return (
    <div className="divide-y divide-[var(--sn-border)] rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-xs">
      {/* Setting 1: Language */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
              {strings.settingLanguageTitle}
            </h4>
            <p className="text-[11px] text-[var(--sn-text-muted)]">
              {strings.settingLanguageSub}
            </p>
          </div>
        </div>

        <select
          aria-label="Language selector"
          value={lang}
          onChange={(e) => onLanguageChange(e.target.value as AppLanguage)}
          className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-2.5 py-1 text-xs font-bold text-[var(--sn-text-main)] focus:outline-none"
        >
          <option value="si">සිං (SI)</option>
          <option value="ta">த (TA)</option>
          <option value="en">EN</option>
        </select>
      </div>

      {/* Setting 2: Grade */}
      <button
        type="button"
        onClick={onOpenGradeDialog}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-[var(--sn-surface-muted)] active:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
              {strings.settingGradeTitle}
            </h4>
            <p className="text-[11px] text-[var(--sn-text-muted)]">
              Grade {currentGrade} • Change to 6, 7, 9, 10 ...
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-[var(--sn-primary)]">
          <span>Grade {currentGrade}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </button>

      {/* Setting 3: Change Password */}
      <button
        type="button"
        onClick={onOpenPasswordDialog}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-[var(--sn-surface-muted)] active:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
              {strings.settingPasswordTitle}
            </h4>
            <p className="text-[11px] text-[var(--sn-text-muted)]">
              {strings.settingPasswordSub}
            </p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>

      {/* Setting 4: My Receipts */}
      <button
        type="button"
        onClick={onOpenReceiptsDialog}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-[var(--sn-surface-muted)] active:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
              {strings.settingReceiptsTitle}
            </h4>
            <p className="text-[11px] text-[var(--sn-text-muted)]">
              {strings.settingReceiptsSub}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded-full bg-[var(--sn-surface-selected)] px-2 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
            {strings.receiptsPaidBadge}
          </span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>
      </button>

      {/* Setting 5: Help & Support */}
      <button
        type="button"
        onClick={onOpenHelpDialog}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-[var(--sn-surface-muted)] active:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
              {strings.settingHelpTitle}
            </h4>
            <p className="text-[11px] text-[var(--sn-text-muted)]">
              {strings.settingHelpSub}
            </p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>
    </div>
  );
}
