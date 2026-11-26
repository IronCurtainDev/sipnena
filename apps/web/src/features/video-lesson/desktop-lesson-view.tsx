import { ArrowLeft, Bookmark, User } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import type { AppLanguage } from "@/lib/language";
import type { CourseLessonCopy } from "./course-lesson-copy";
import {
  flatLessons,
  nextQuizItem,
  type CourseLessonBundle,
} from "./course-lesson-model";
import {
  CourseInlineQuiz,
  FollowQuizBanner,
  LabPanel,
} from "./lesson-activity";
import { LessonActionBar } from "./lesson-action-bar";
import { LessonDiscussionTab } from "./lesson-discussion-tab";
import { LessonDownloadsTab } from "./lesson-downloads-tab";
import { LessonNotesTab } from "./lesson-notes-tab";
import { LessonOverviewTab } from "./lesson-overview-tab";
import { LessonPlaylistSidebar } from "./lesson-playlist-sidebar";
import { VIDEO_LESSON_PLAYLIST } from "./mock-data";
import { lessonCounter, lessonTitle } from "./playlist-copy";
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
  bundle?: CourseLessonBundle;
  lessonCopy?: CourseLessonCopy;
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
  bundle,
  lessonCopy,
}: DesktopLessonViewProps) {
  const playlist = bundle?.playlist ?? VIDEO_LESSON_PLAYLIST;
  const lessons = flatLessons(playlist);
  const currentLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const authored = bundle?.byId[activeLessonId];
  const isQuiz = bundle
    ? authored?.kind === "quiz"
    : activeLessonId.startsWith("quiz");
  const followQuiz = bundle ? nextQuizItem(playlist, activeLessonId) : null;
  const currentLessonTitle = currentLesson
    ? lessonTitle(lang, currentLesson.id, currentLesson.titleKey)
    : t.lessonTitle;
  const currentLessonNumber = currentLesson?.number ?? 4;
  const quizDetail =
    lang === "si"
      ? "ප්‍රශ්න 10 · මිනිත්තු 15 පමණ"
      : lang === "ta"
        ? "10 கேள்விகள் · சுமார் 15 நிமிடங்கள்"
        : "10 questions · about 15 minutes";

  return (
    <div className="sipnena-onboarding hidden min-h-svh flex-row bg-[var(--sn-page-bg)] lg:flex">
      <DesktopSidebar
        activeTab={activeNav}
        onTabChange={onNavTab}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-cream)]/95 px-6 xl:px-8">
          <button
            type="button"
            onClick={onBackToCourse}
            className="inline-flex min-h-[48px] items-center gap-2 text-sm font-bold text-[var(--sn-primary)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.breadcrumbBack}</span>
          </button>

          <div className="flex items-center gap-3">
            <CompactLanguageSwitcher
              selectedLang={lang}
              onLanguageChange={onLanguageChange}
            />
            <button
              type="button"
              onClick={onToggleSave}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                isSaved
                  ? "border-[var(--sn-border)] bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                  : "border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-secondary)]"
              }`}
              aria-label="Bookmark"
            >
              <Bookmark
                className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
              />
            </button>
            <button
              type="button"
              onClick={() => onNavTab("me")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sn-primary)] text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)]"
              aria-label="Profile (Me)"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="w-full flex-1 px-6 py-5 xl:px-8">
          <div className="grid h-full grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.95fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(420px,1fr)] 2xl:gap-6">
            <div className="min-w-0 space-y-4">
              {bundle && !authored ? (
                <p className="text-base text-[var(--sn-text-secondary)]">
                  {lessonCopy?.emptyPlaylist}
                </p>
              ) : isQuiz ? (
                <CourseInlineQuiz
                  activeLessonId={activeLessonId}
                  lang={lang}
                  authored={authored}
                  bundle={bundle}
                  playlist={playlist}
                  lessonCopy={lessonCopy}
                  onSelectLesson={onSelectLesson}
                  onToast={onToast}
                />
              ) : (
                <>
                  {authored?.kind === "lab" ? (
                    <LabPanel
                      kicker={lessonCopy?.labKicker}
                      title={authored.title}
                      prompt={authored.labPrompt}
                      className="space-y-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6"
                    />
                  ) : (
                    <VideoPlayer
                      t={t}
                      isPlaying={isPlaying}
                      onTogglePlay={onTogglePlay}
                      onToast={onToast}
                    />
                  )}

                  <LessonActionBar
                    t={t}
                    lessonTitle={currentLessonTitle}
                    lessonCounter={lessonCounter(
                      lang,
                      currentLessonNumber,
                      lessons.length || 12,
                    )}
                    isDone={isDone}
                    onToggleDone={onToggleDone}
                    onDownloadNotes={() => onToast(t.downloadSuccess)}
                    onHelp={() => onToast("Help")}
                    courseMode={Boolean(bundle)}
                  />

                  <FollowQuizBanner
                    t={t}
                    bundle={bundle}
                    followQuiz={followQuiz}
                    sampleDetail={quizDetail}
                    onSelectLesson={onSelectLesson}
                  />

                  <div className="flex gap-1 border-b border-[var(--sn-border)] text-sm font-bold text-[var(--sn-text-secondary)]">
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
                          className={`min-h-[48px] px-4 border-b-2 transition ${
                            activeTab === tab
                              ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                              : "border-transparent hover:text-[var(--sn-text-main)]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {activeTab === "overview" && (
                    <LessonOverviewTab
                      t={t}
                      authored={authored}
                      emptyLabel={lessonCopy?.emptyOverview}
                    />
                  )}
                  {activeTab === "notes" && (
                    <LessonNotesTab
                      onToast={onToast}
                      revisionNotes={authored?.revisionNotes}
                      emptyLabel={lessonCopy?.emptyNotes}
                    />
                  )}
                  {activeTab === "discussion" && (
                    <LessonDiscussionTab onToast={onToast} />
                  )}
                  {activeTab === "downloads" && (
                    <LessonDownloadsTab
                      onToast={onToast}
                      items={authored?.files}
                      emptyLabel={lessonCopy?.emptyFiles}
                    />
                  )}
                </>
              )}
            </div>

            <LessonPlaylistSidebar
              t={t}
              lang={lang}
              activeLessonId={activeLessonId}
              onSelectLesson={onSelectLesson}
              onToast={onToast}
              playlist={bundle ? playlist : undefined}
              files={bundle ? bundle.sidebarFiles : undefined}
              quizzes={
                bundle
                  ? bundle.sidebarQuizzes.map((quiz) => ({
                      id: quiz.id,
                      title: quiz.title,
                      meta: `${quiz.questionCount}`,
                    }))
                  : undefined
              }
              lessonCopy={lessonCopy}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
