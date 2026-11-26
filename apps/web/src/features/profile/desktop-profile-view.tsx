import React from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import { TabletRail } from "@/features/home/nav-bars";
import type { AppLanguage } from "@/lib/language";
import { AcademicPreferencesCard } from "./academic-preferences-card";
import { AvatarIcon } from "./avatar-icon";
import { AvatarPicker } from "./avatar-picker";
import { DesktopSidebarWidgets } from "./desktop-sidebar-widgets";
import type { ProfileStrings } from "./strings.types";

interface DesktopProfileViewProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  strings: ProfileStrings;
  avatarId: string;
  onSelectAvatar: (id: string) => void;
  currentGrade: string;
  onOpenGradeDialog: () => void;
  onOpenPasswordDialog: () => void;
  onOpenReceiptsDialog: () => void;
  onDownloadReceipt: (title: string) => void;
  onOpenWhatsApp: () => void;
  onLogout: () => void;
  activeNavTab: string;
  onNavTab: (tab: string) => void;
}

export function DesktopProfileView({
  lang,
  onLanguageChange,
  strings,
  avatarId,
  onSelectAvatar,
  currentGrade,
  onOpenGradeDialog,
  onOpenPasswordDialog,
  onOpenReceiptsDialog,
  onDownloadReceipt,
  onOpenWhatsApp,
  onLogout,
  activeNavTab,
  onNavTab,
}: DesktopProfileViewProps) {
  return (
    <div className="sipnena-onboarding flex min-h-svh flex-row bg-[var(--sn-page-bg)] text-[var(--sn-text-main)]">
      <DesktopSidebar
        activeTab={activeNavTab}
        onTabChange={onNavTab}
        lang={lang}
      />
      <TabletRail activeTab={activeNavTab} onTabChange={onNavTab} lang={lang} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-surface)] px-6 xl:px-8">
          <div className="inline-flex items-center rounded-full bg-[var(--sn-olive)] px-3.5 py-1.5 text-xs font-semibold text-[var(--sn-primary)]">
            {strings.academicYearBadge}
          </div>

          <div className="flex items-center gap-3">
            <CompactLanguageSwitcher
              selectedLang={lang}
              onLanguageChange={onLanguageChange}
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sn-primary)] text-[var(--sn-cream)]">
              <AvatarIcon
                id={avatarId}
                size={40}
                className="h-full w-full rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="w-full flex-1 space-y-4 px-6 py-5 xl:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavTab("home")}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{strings.breadcrumbHome}</span>
            </button>
            <span className="text-sm font-semibold text-[var(--sn-text-secondary)]">
              {strings.breadcrumbMe}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold leading-normal text-[var(--sn-text-main)]">
              {strings.pageTitle}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{strings.studentBadge}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.95fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(400px,1fr)]">
            <div className="min-w-0 space-y-4">
              <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <div className="relative shrink-0">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-[var(--sn-olive)] bg-[var(--sn-olive)]">
                      <AvatarIcon
                        id={avatarId}
                        size={80}
                        className="h-full w-full"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sn-primary)] text-[var(--sn-cream)] ring-4 ring-[var(--sn-surface)]">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                      <h2 className="text-xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-2xl">
                        {strings.studentName}
                      </h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sn-primary)]" />
                        <span>{strings.activeStatus}</span>
                      </span>
                    </div>

                    <p className="text-sm font-medium text-[var(--sn-text-secondary)]">
                      {strings.studentSubtitleDesktop}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-[var(--sn-text-muted)] sm:justify-start">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{strings.educationalZone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{strings.enrolledModulesDesktop}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2.5 border-t border-[var(--sn-border)] pt-4">
                  <div className="rounded-xl bg-[var(--sn-olive)]/70 p-3 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 text-[var(--sn-primary)] sm:justify-start">
                      <FileCheck2 className="h-4 w-4" />
                      <span className="text-base font-bold sm:text-xl">18</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[var(--sn-text-secondary)]">
                      {strings.statLessonsCompleted}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[var(--sn-cream)] p-3 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 text-[var(--sn-primary)] sm:justify-start">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-base font-bold sm:text-xl">8</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[var(--sn-text-secondary)]">
                      {strings.statQuizzesTaken}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[var(--sn-surface-muted)] p-3 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 text-[var(--sn-primary)] sm:justify-start">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-base font-bold sm:text-xl">92%</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[var(--sn-text-secondary)]">
                      {strings.statAttendance}
                    </p>
                  </div>
                </div>
              </div>

              <AvatarPicker
                currentAvatarId={avatarId}
                onSelectAvatar={onSelectAvatar}
                strings={strings}
                isDesktop={true}
              />

              <AcademicPreferencesCard
                lang={lang}
                onLanguageChange={onLanguageChange}
                strings={strings}
                currentGrade={currentGrade}
                onOpenGradeDialog={onOpenGradeDialog}
              />
            </div>

            <div className="lg:sticky lg:top-5 lg:h-[calc(100svh-2.5rem)] lg:overflow-y-auto">
              <DesktopSidebarWidgets
                strings={strings}
                onOpenPasswordDialog={onOpenPasswordDialog}
                onOpenReceiptsDialog={onOpenReceiptsDialog}
                onDownloadReceipt={onDownloadReceipt}
                onOpenWhatsApp={onOpenWhatsApp}
                onLogout={onLogout}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
