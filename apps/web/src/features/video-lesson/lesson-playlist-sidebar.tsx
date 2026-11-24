import { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  HelpCircle,
  Lock,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { VIDEO_LESSON_PLAYLIST } from "./mock-data";
import type { VideoLessonStrings } from "./strings";

interface LessonPlaylistSidebarProps {
  t: VideoLessonStrings;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
}

export function LessonPlaylistSidebar({
  t,
  activeLessonId,
  onSelectLesson,
}: LessonPlaylistSidebarProps) {
  const [playlistTab, setPlaylistTab] = useState<
    "lessons" | "notes" | "quizzes"
  >("lessons");

  return (
    <aside
      aria-label="Course playlist"
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-5"
    >
      {/* Playlist Top Stats */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            {t.playlistTitle}
          </h3>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
            {t.playlistProgress}
          </span>
        </div>

        <p className="text-xs text-slate-500">{t.playlistRemaining}</p>

        <div
          role="progressbar"
          aria-valuenow={25}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        >
          <div className="h-full w-1/4 rounded-full bg-blue-600" />
        </div>
      </div>

      {/* Playlist Inner Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setPlaylistTab("lessons")}
          className={`flex-1 rounded-lg py-1.5 transition ${
            playlistTab === "lessons"
              ? "bg-white text-slate-900 shadow-xs"
              : "hover:text-slate-900"
          }`}
        >
          {t.playlistTabLessons}
        </button>
        <button
          type="button"
          onClick={() => setPlaylistTab("notes")}
          className={`flex-1 rounded-lg py-1.5 transition ${
            playlistTab === "notes"
              ? "bg-white text-slate-900 shadow-xs"
              : "hover:text-slate-900"
          }`}
        >
          {t.playlistTabNotes}
        </button>
        <button
          type="button"
          onClick={() => setPlaylistTab("quizzes")}
          className={`flex-1 rounded-lg py-1.5 transition ${
            playlistTab === "quizzes"
              ? "bg-white text-slate-900 shadow-xs"
              : "hover:text-slate-900"
          }`}
        >
          {t.playlistTabQuizzes}
        </button>
      </div>

      {/* Playlist Scrollable Sections */}
      <div className="space-y-5 max-h-[560px] overflow-y-auto pr-1">
        {VIDEO_LESSON_PLAYLIST.map((section) => (
          <div key={section.id} className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              <span>{t[section.titleKey as keyof VideoLessonStrings]}</span>
              <span
                className={
                  section.statusColor === "green"
                    ? "text-emerald-700 font-bold"
                    : section.statusColor === "blue"
                      ? "text-blue-700 font-bold"
                      : "text-slate-400"
                }
              >
                {t[section.statusBadgeKey as keyof VideoLessonStrings]}
              </span>
            </div>

            <div className="space-y-1.5">
              {section.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onSelectLesson(lesson.id, lesson.isLocked)}
                    className={`w-full text-left rounded-xl p-2.5 transition flex items-center justify-between gap-3 border ${
                      isActive
                        ? "bg-blue-50/80 border-blue-300 ring-1 ring-blue-400/40"
                        : lesson.isCompleted
                          ? "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100"
                          : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {lesson.isCompleted ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      ) : isActive ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                          <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                        </div>
                      ) : lesson.iconType === "quiz" ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <HelpCircle className="h-4 w-4" />
                        </div>
                      ) : lesson.iconType === "lab" ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                          <FlaskConical className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Play className="h-3.5 w-3.5 ml-0.5" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-bold truncate ${
                            isActive ? "text-blue-900" : "text-slate-800"
                          }`}
                        >
                          {lesson.titleKey}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {isActive
                            ? `${t.nowPlaying} • 08:42 / 18:30`
                            : `${lesson.duration} • ${lesson.typeKey}`}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {lesson.isLocked ? (
                        <Lock className="h-4 w-4 text-slate-400" />
                      ) : lesson.isCompleted ? (
                        <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum Accreditation Footer Badge */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center gap-2.5 text-[11px] font-semibold text-slate-600">
        <ShieldCheck className="h-4 w-4 text-blue-700 shrink-0" />
        <span className="leading-snug">{t.curriculumBadge}</span>
      </div>
    </aside>
  );
}
