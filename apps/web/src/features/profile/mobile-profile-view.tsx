import React from "react";
import { BookOpen, LogOut, ShieldCheck } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { MobileBottomNav } from "@/features/home/nav-bars";
import type { AppLanguage } from "@/lib/language";
import { AvatarIcon } from "./avatar-icon";
import { AvatarPicker } from "./avatar-picker";
import { ProfileQuickLinks } from "./quick-links";
import { SettingsList } from "./settings-list";
import type { ProfileStrings } from "./strings.types";

interface MobileProfileViewProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  strings: ProfileStrings;
  avatarId: string;
  onSelectAvatar: (id: string) => void;
  currentGrade: string;
  onOpenGradeDialog: () => void;
  onOpenPasswordDialog: () => void;
  onOpenReceiptsDialog: () => void;
  onOpenHelpDialog: () => void;
  onLogout: () => void;
  activeNavTab: string;
  onNavTab: (tab: string) => void;
}

export function MobileProfileView({
  lang,
  onLanguageChange,
  strings,
  avatarId,
  onSelectAvatar,
  currentGrade,
  onOpenGradeDialog,
  onOpenPasswordDialog,
  onOpenReceiptsDialog,
  onOpenHelpDialog,
  onLogout,
  activeNavTab,
  onNavTab,
}: MobileProfileViewProps) {
  return (
    <div className="sipnena-onboarding flex min-h-screen flex-col bg-[var(--sn-page-bg)] pb-24 text-[var(--sn-text-main)]">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-4 py-3 backdrop-blur-md">
        <h1 className="text-xl font-bold leading-normal text-[var(--sn-text-main)]">
          {strings.pageTitle}
        </h1>

        <div className="flex items-center gap-2.5">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
          />

          {/* Current Avatar Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-2xs ring-2 ring-white">
            <AvatarIcon
              id={avatarId}
              size={36}
              className="h-full w-full rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-lg flex-col gap-3 px-4 pt-3">
        <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-sm bg-[var(--sn-surface-selected)]">
                <AvatarIcon id={avatarId} size={64} className="h-full w-full" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs ring-2 ring-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--sn-text-main)] truncate">
                  Kasun
                </h2>
                <span className="rounded-full bg-[var(--sn-surface-selected)] px-2 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                  {strings.activeStatus}
                </span>
              </div>
              <p className="text-xs font-semibold text-[var(--sn-text-secondary)]">
                Student • Grade {currentGrade}
              </p>
              <p className="text-[11px] text-[var(--sn-text-muted)]">
                National Curriculum (English Medium)
              </p>
            </div>
          </div>

          {/* Quick Info Chips */}
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-[var(--sn-surface-muted)] p-2.5">
            <div className="flex items-center gap-2 rounded-xl bg-[var(--sn-surface)] p-2 shadow-2xs border border-[var(--sn-border)]">
              <BookOpen className="h-4 w-4 text-[var(--sn-primary)]" />
              <div>
                <p className="text-[10px] text-[var(--sn-text-muted)] font-medium">
                  Enrolled
                </p>
                <p className="text-xs font-bold text-[var(--sn-text-main)]">
                  {strings.enrolledSubjectsMobile}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-[var(--sn-surface)] p-2 shadow-2xs border border-[var(--sn-border)]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-[10px] text-[var(--sn-text-muted)] font-medium">
                  Child-Safe
                </p>
                <p className="text-xs font-bold text-[var(--sn-text-main)]">
                  {strings.childSafeVerified}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Choose Your Avatar Picker */}
        <AvatarPicker
          currentAvatarId={avatarId}
          onSelectAvatar={onSelectAvatar}
          strings={strings}
        />

        {/* Academic & App Settings List */}
        <div>
          <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            {strings.settingsSectionTitle}
          </h3>

          <SettingsList
            lang={lang}
            onLanguageChange={onLanguageChange}
            strings={strings}
            currentGrade={currentGrade}
            onOpenGradeDialog={onOpenGradeDialog}
            onOpenPasswordDialog={onOpenPasswordDialog}
            onOpenReceiptsDialog={onOpenReceiptsDialog}
            onOpenHelpDialog={onOpenHelpDialog}
          />
        </div>

        <ProfileQuickLinks />

        {/* Log Out Button */}
        <button
          type="button"
          onClick={onLogout}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50/80 py-3.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 active:scale-[0.99]"
        >
          <LogOut className="h-4 w-4" />
          <span>{strings.logoutBtnMobile}</span>
        </button>

        {/* Footer */}
        <p className="mt-1 text-center text-[11px] font-medium text-slate-400">
          {strings.footerVersion}
        </p>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeNavTab}
        onTabChange={onNavTab}
        lang={lang}
      />
    </div>
  );
}
