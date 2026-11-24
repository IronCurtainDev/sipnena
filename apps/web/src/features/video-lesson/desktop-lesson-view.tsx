import {
  ArrowLeft,
  Bookmark,
  Check,
  Download,
  HelpCircle,
  User,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import type { AppLanguage } from "@/lib/language";
import { LessonOverviewTab } from "./lesson-overview-tab";
import { LessonPlaylistSidebar } from "./lesson-playlist-sidebar";
import type { VideoLessonStrings } from "./strings";
import { VideoPlayer } from "./video-player";

interface DesktopLessonViewProps {
  t: VideoLessonStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  activeNav: string;
  onNavTab: (tab: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isDone: boolean;
  onToggleDone: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  activeTab: "overview" | "notes" | "discussion" | "downloads";
  setActiveTab: (
    tab: "overview" | "notes" | "discussion" | "downloads",
  ) => void;
  onBackToCourse: () => void;
  onToast: (msg: string) => void;
}

export function DesktopLessonView({
  t,
  lang,
  onLanguageChange,
  activeNav,
  onNavTab,
  isPlaying,
  onTogglePlay,
  isDone,
  onToggleDone,
  isSaved,
  onToggleSave,
  activeLessonId,
  onSelectLesson,
  activeTab,
  setActiveTab,
  onBackToCourse,
  onToast,
}: DesktopLessonViewProps) {
  return (
    <div className="hidden lg:flex min-h-svh flex-row">
      <DesktopSidebar
        activeTab={activeNav}
        onTabChange={onNavTab}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-16">
        {/* Desktop Top Header Bar */}
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
              onClick={() => onToast(t.helpAria)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white shadow-xs"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Desktop Container */}
        <main className="mx-auto w-full max-w-[1340px] flex-1 space-y-6 px-8 py-6">
          {/* Breadcrumbs & Term Badge */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={onBackToCourse}
                className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t.breadcrumbBack}</span>
              </button>
              <span>/</span>
              <span className="text-slate-600">{t.breadcrumbSubject}</span>
              <span>&gt;</span>
              <span className="text-slate-600">{t.breadcrumbTopic}</span>
              <span>&gt;</span>
              <span className="font-bold text-slate-900">
                {t.breadcrumbUnit}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>{t.termBadge}</span>
              </div>

              <button
                type="button"
                onClick={onToggleSave}
                className={`rounded-xl border p-2 transition ${
                  isSaved
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
                aria-label="Bookmark"
              >
                <Bookmark
                  className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_370px]">
            {/* Left Column: Player & Tab Content */}
            <div className="min-w-0 space-y-6">
              <VideoPlayer
                t={t}
                isPlaying={isPlaying}
                onTogglePlay={onTogglePlay}
                onToast={onToast}
              />

              {/* Lesson Title & Action Bar */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-500">
                    {t.lessonPill} • {t.unitSubtitle}
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    {t.lessonTitle}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.lessonSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={onToggleDone}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-bold shadow-xs transition ${
                      isDone
                        ? "bg-emerald-700 text-white"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                    <span>{isDone ? t.markedDone : t.markAsDone}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToast(t.downloadSuccess)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    <span>{t.notePdf}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToast("Help & Ray Diagram Cheat-sheet")}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    aria-label="Help"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="flex border-b border-slate-200 text-sm font-bold text-slate-600">
                {(
                  ["overview", "notes", "discussion", "downloads"] as const
                ).map((tab) => {
                  const label =
                    tab === "overview"
                      ? t.tabOverview
                      : tab === "notes"
                        ? t.tabNotes
                        : tab === "discussion"
                          ? t.tabDiscussion
                          : t.tabDownloads;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-4 border-b-2 transition ${
                        activeTab === tab
                          ? "border-blue-700 text-blue-700"
                          : "border-transparent hover:text-slate-900"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Body */}
              <LessonOverviewTab t={t} />
            </div>

            {/* Right Column: Playlist Sidebar */}
            <LessonPlaylistSidebar
              t={t}
              activeLessonId={activeLessonId}
              onSelectLesson={onSelectLesson}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
