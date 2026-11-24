import { useState } from "react";
import {
  ArrowLeft,
  Check,
  FileText,
  ListChecks,
  Paperclip,
  ShieldCheck,
  User,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import { LessonOverviewTab } from "./lesson-overview-tab";
import { MobileLessonPlaylist } from "./mobile-lesson-playlist";
import type { VideoLessonStrings } from "./strings";
import { VideoPlayer } from "./video-player";

interface MobileLessonViewProps {
  t: VideoLessonStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  isDone: boolean;
  onToggleDone: () => void;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

export function MobileLessonView({
  t,
  lang,
  onLanguageChange,
  isDone,
  onToggleDone,
  activeLessonId,
  onSelectLesson,
  isPlaying,
  onTogglePlay,
  onBack,
  onToast,
}: MobileLessonViewProps) {
  const [mobileTab, setMobileTab] = useState<"lessons" | "notes" | "files">(
    "lessons",
  );

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 pb-20 text-slate-900">
      {/* Mobile Sticky Top Navigation Bar */}
      <header className="backdrop-blur-xs sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="truncate text-sm font-bold text-slate-900">
            Video Less...
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
          />
          <button
            type="button"
            onClick={() => onToast(t.helpAria)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-white"
            aria-label="Profile"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Embedded Video Player */}
      <VideoPlayer
        t={t}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onToast={onToast}
        compact
      />

      {/* Meta & Action Section */}
      <div className="space-y-4 border-b border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-500">
            {t.unitSubtitle}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            {t.lessonPill}
          </span>
        </div>

        <h1 className="text-xl font-bold leading-tight text-slate-900">
          {t.lessonTitle}
        </h1>

        {/* Mark as Done Full-Width CTA */}
        <button
          type="button"
          onClick={onToggleDone}
          className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-xs transition ${
            isDone
              ? "bg-emerald-700 text-white"
              : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]"
          }`}
        >
          <Check className="h-4 w-4" />
          <span>{isDone ? t.markedDone : t.markAsDone}</span>
        </button>

        {/* Mobile Tab Switcher */}
        <div className="flex border-b border-slate-200 pt-2 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setMobileTab("lessons")}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 pb-2.5 ${
              mobileTab === "lessons"
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500"
            }`}
          >
            <ListChecks className="h-4 w-4" />
            <span>{t.mobileTabLessons}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("notes")}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 pb-2.5 ${
              mobileTab === "notes"
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>{t.mobileTabNotes}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("files")}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 pb-2.5 ${
              mobileTab === "files"
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500"
            }`}
          >
            <Paperclip className="h-4 w-4" />
            <span>{t.mobileTabFiles}</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="space-y-4 p-4">
        {mobileTab === "notes" && <LessonOverviewTab t={t} />}

        {mobileTab === "files" && (
          <div className="space-y-3">
            {[
              "Lesson_3_Ray_Optics_Notes.pdf",
              "Concave_Mirror_Handout.pdf",
              "Quiz_Preparation_Guide.pdf",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>{f}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onToast(t.downloadSuccess)}
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {mobileTab === "lessons" && (
          <MobileLessonPlaylist
            t={t}
            activeLessonId={activeLessonId}
            onSelectLesson={onSelectLesson}
          />
        )}

        {/* Bottom Curriculum accreditation */}
        <div className="flex items-center justify-center gap-1.5 pt-4 text-center text-xs font-medium text-slate-500">
          <ShieldCheck className="h-4 w-4 shrink-0 text-slate-500" />
          <span>{t.curriculumBadge}</span>
        </div>
      </div>
    </div>
  );
}
