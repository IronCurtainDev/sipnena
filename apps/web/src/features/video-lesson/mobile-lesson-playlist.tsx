import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  HelpCircle,
  Lock,
  Play,
  RotateCcw,
} from "lucide-react";
import { VIDEO_LESSON_PLAYLIST } from "./mock-data";
import type { VideoLessonStrings } from "./strings";

interface MobileLessonPlaylistProps {
  t: VideoLessonStrings;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
}

export function MobileLessonPlaylist({
  t,
  activeLessonId,
  onSelectLesson,
}: MobileLessonPlaylistProps) {
  return (
    <div className="space-y-4">
      {VIDEO_LESSON_PLAYLIST.map((section) => (
        <div key={section.id} className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span>{t[section.titleKey as keyof VideoLessonStrings]}</span>
            <span
              className={
                section.statusColor === "green"
                  ? "font-bold text-emerald-700"
                  : section.statusColor === "blue"
                    ? "font-bold text-blue-700"
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
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition ${
                    isActive
                      ? "border-blue-300 bg-blue-50 ring-1 ring-blue-400/40"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {lesson.isCompleted ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    ) : isActive ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                        <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
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
                        <Play className="ml-0.5 h-3.5 w-3.5" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-xs font-bold ${
                          isActive ? "text-blue-900" : "text-slate-800"
                        }`}
                      >
                        {lesson.titleKey}
                      </div>
                      <div className="truncate text-[11px] text-slate-500">
                        {isActive
                          ? `${t.nowPlaying} • 08:42 / 18:30`
                          : `${lesson.duration} • ${lesson.typeKey}`}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isActive ? (
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                    ) : lesson.isLocked ? (
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
  );
}

