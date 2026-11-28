import { useState } from "react";
import { ArrowLeft, Bookmark, Check, User } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import { AssignmentLessonPanel } from "./assignment-panel";
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
import { LessonDiscussionTab } from "./lesson-discussion-tab";
import { LessonDownloadsTab } from "./lesson-downloads-tab";
import { LessonNotesTab } from "./lesson-notes-tab";
import { LessonOverviewTab } from "./lesson-overview-tab";
import { MobileLessonPlaylist } from "./mobile-lesson-playlist";
import { lessonCounter, lessonTitle } from "./playlist-copy";
import type { VideoLessonStrings } from "./strings";
import { VideoPlayer } from "./video-player";

interface MobileLessonViewProps {
  t: VideoLessonStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  isDone: boolean;
  onToggleDone: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onBack: () => void;
  onNavTab?: (tab: string) => void;
  onQuizCompleted?: (
    score: number,
    total: number,
    passed: boolean,
    answers: Record<number, string>,
  ) => void;
  onToast: (msg: string) => void;
  bundle?: CourseLessonBundle;
  lessonCopy?: CourseLessonCopy;
}

export function MobileLessonView({
  t,
  lang,
  onLanguageChange,
  isDone,
  onToggleDone,
  isSaved = false,
  onToggleSave,
  activeLessonId,
  onSelectLesson,
  isPlaying,
  onTogglePlay,
  onBack,
  onNavTab,
  onQuizCompleted,
  onToast,
  bundle,
  lessonCopy,
}: MobileLessonViewProps) {
  const [mobileTab, setMobileTab] = useState<
    "lessons" | "notes" | "discussion" | "files"
  >("lessons");

  const playlist = bundle?.playlist ?? [];
  const lessons = flatLessons(playlist);
  const currentLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const authored = bundle?.byId[activeLessonId];
  const isQuiz = bundle
    ? authored?.kind === "quiz"
    : activeLessonId.startsWith("quiz");
  const followQuiz = bundle ? nextQuizItem(playlist, activeLessonId) : null;
  const currentTitle = currentLesson
    ? lessonTitle(lang, currentLesson.id, currentLesson.titleKey)
    : t.lessonTitle;
  const currentNumber = currentLesson?.number ?? 4;
  const quizDetail =
    lang === "si"
      ? "ප්‍රශ්න 10 · මිනිත්තු 15 පමණ"
      : lang === "ta"
        ? "10 கேள்விகள் · சுமார் 15 நிமிடங்கள்"
        : "10 questions · about 15 minutes";

  const tabs = [
    { id: "lessons" as const, label: t.mobileTabLessons },
    { id: "notes" as const, label: t.mobileTabNotes },
    { id: "discussion" as const, label: t.tabDiscussion },
    { id: "files" as const, label: t.mobileTabFiles },
  ];

  return (
    <div className="sipnena-onboarding flex min-h-screen flex-col bg-[var(--sn-page-bg)] pb-24 text-[var(--sn-text-main)]">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-cream)]/95 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[var(--sn-text-main)]"
          aria-label="Back to course"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="max-w-[9rem] truncate sm:max-w-none">
            {t.breadcrumbBack}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
          />
          <button
            type="button"
            onClick={() => onNavTab?.("me")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sn-primary)] text-[var(--sn-cream)]"
            aria-label="Profile (Me)"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      {bundle && !authored ? (
        <p className="p-4 text-base text-[var(--sn-text-secondary)]">
          {lessonCopy?.emptyPlaylist}
        </p>
      ) : isQuiz ? (
        <div className="p-4">
          <CourseInlineQuiz
            activeLessonId={activeLessonId}
            lang={lang}
            authored={authored}
            bundle={bundle}
            playlist={playlist}
            lessonCopy={lessonCopy}
            onSelectLesson={onSelectLesson}
            onQuizCompleted={onQuizCompleted}
            onToast={onToast}
          />
        </div>
      ) : (
        <>
          {authored?.kind === "assignment" && authored.assignment ? (
            <div className="p-4">
              <AssignmentLessonPanel
                lessonId={activeLessonId}
                courseId={bundle?.resolvedCourseId ?? ""}
                title={authored.title}
                instructions={authored.assignment.instructions}
                dueAt={authored.assignment.dueAt}
                maxScore={authored.assignment.maxScore}
                lang={lang}
                onToast={onToast}
              />
            </div>
          ) : authored?.kind === "lab" ? (
            <LabPanel
              kicker={lessonCopy?.labKicker}
              title={authored.title}
              prompt={authored.labPrompt}
              className="space-y-2 border-b border-[var(--sn-border)] bg-[var(--sn-surface)] p-4"
            />
          ) : (
            <VideoPlayer
              key={`${activeLessonId}:${authored?.videoItem?.url ?? ""}`}
              t={t}
              isPlaying={isPlaying}
              onTogglePlay={onTogglePlay}
              onToast={onToast}
              src={authored?.videoItem?.url}
              compact
            />
          )}

          <div className="space-y-4 border-b border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold leading-normal text-[var(--sn-text-secondary)]">
                  {lessonCounter(lang, currentNumber, lessons.length || 12)}
                  {authored ? "" : ` · ${t.unitSubtitle}`}
                </p>
                <h1 className="text-lg font-bold leading-normal text-[var(--sn-text-main)] sm:text-xl">
                  {currentTitle}
                </h1>
              </div>
              {onToggleSave && (
                <button
                  type="button"
                  onClick={onToggleSave}
                  className={`rounded-xl border p-2.5 transition ${
                    isSaved
                      ? "border-[var(--sn-border)] bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                      : "border-[var(--sn-border)] text-[var(--sn-text-secondary)]"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark
                    className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                  />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleDone}
              className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold transition active:scale-[0.99] ${
                isDone
                  ? "bg-[var(--sn-primary)] text-[var(--sn-cream)]"
                  : "bg-[var(--sn-primary)] text-[var(--sn-cream)] hover:bg-[var(--sn-primary-hover)]"
              }`}
            >
              <Check className="h-4 w-4" />
              <span>{isDone ? t.markedDone : t.markAsDone}</span>
            </button>

            <FollowQuizBanner
              t={t}
              bundle={bundle}
              followQuiz={followQuiz}
              sampleDetail={quizDetail}
              onSelectLesson={onSelectLesson}
            />

            <div className="flex border-b border-[var(--sn-border)] text-sm font-bold text-[var(--sn-text-secondary)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMobileTab(tab.id)}
                  className={`flex min-h-[48px] flex-1 items-center justify-center border-b-2 px-1 ${
                    mobileTab === tab.id
                      ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                      : "border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 p-4">
            {mobileTab === "notes" && (
              <div className="space-y-6">
                <LessonOverviewTab
                  t={t}
                  authored={authored}
                  emptyLabel={lessonCopy?.emptyOverview}
                />
                <LessonNotesTab
                  onToast={onToast}
                  revisionNotes={authored?.revisionNotes}
                  emptyLabel={lessonCopy?.emptyNotes}
                />
              </div>
            )}
            {mobileTab === "discussion" && (
              <LessonDiscussionTab onToast={onToast} />
            )}
            {mobileTab === "files" && (
              <LessonDownloadsTab
                onToast={onToast}
                items={authored?.files}
                emptyLabel={lessonCopy?.emptyFiles}
              />
            )}
            {mobileTab === "lessons" && (
              <MobileLessonPlaylist
                t={t}
                lang={lang}
                activeLessonId={activeLessonId}
                onSelectLesson={onSelectLesson}
                playlist={bundle ? playlist : undefined}
                emptyLabel={lessonCopy?.emptyPlaylist}
              />
            )}
            <p className="pt-2 text-center text-sm text-[var(--sn-text-muted)]">
              {t.curriculumBadge}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
