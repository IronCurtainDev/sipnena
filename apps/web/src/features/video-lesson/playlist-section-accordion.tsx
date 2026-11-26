import { Check, Lock, Play } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import {
  formatDuration,
  lessonTitle,
  PLAYLIST_STATUS,
} from "./playlist-copy";
import type { VideoLessonStrings } from "./strings";
import type { PlaylistSection } from "./types";

interface PlaylistSectionAccordionProps {
  section: PlaylistSection;
  isOpen: boolean;
  onToggle: () => void;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  t: VideoLessonStrings;
  lang: AppLanguage;
}

export function PlaylistSectionAccordion({
  section,
  isOpen,
  onToggle,
  activeLessonId,
  onSelectLesson,
  t,
  lang,
}: PlaylistSectionAccordionProps) {
  const title =
    t[section.titleKey as keyof VideoLessonStrings] || section.titleKey;
  const status = PLAYLIST_STATUS[lang];

  return (
    <div className="border-b border-[var(--sn-border)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 py-3 text-left"
      >
        <span className="text-sm font-bold leading-normal text-[var(--sn-text-main)]">
          {title}
        </span>
        <span className="shrink-0 text-sm text-[var(--sn-text-muted)]">
          {isOpen ? status.hide : status.show}
        </span>
      </button>

      {isOpen && (
        <ul className="pb-2">
          {section.lessons.map((lesson) => {
            const isActive = lesson.id === activeLessonId;
            const localizedTitle = lessonTitle(
              lang,
              lesson.id,
              lesson.titleKey,
            );
            const statusLabel = lesson.isLocked
              ? status.locked
              : lesson.isCompleted
                ? status.done
                : isActive
                  ? status.nowPlaying
                  : lesson.iconType === "quiz"
                    ? status.quiz
                    : formatDuration(lang, lesson.duration);

            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onSelectLesson(lesson.id, lesson.isLocked)}
                  className={`flex min-h-[56px] w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition ${
                    isActive
                      ? "bg-[var(--sn-olive)]"
                      : "hover:bg-[var(--sn-cream)]"
                  } ${lesson.isLocked ? "opacity-60" : ""}`}
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-[var(--sn-primary)]">
                    {lesson.isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : lesson.isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : isActive ? (
                      <Play className="h-4 w-4 fill-current" />
                    ) : (
                      lesson.number
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-normal text-[var(--sn-text-main)]">
                      {localizedTitle}
                    </span>
                    <span className="mt-0.5 block text-sm leading-normal text-[var(--sn-text-muted)]">
                      {statusLabel}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
