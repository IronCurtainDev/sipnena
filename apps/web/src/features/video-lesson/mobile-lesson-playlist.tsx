import { useState } from "react";
import type { AppLanguage } from "@/lib/language";
import { VIDEO_LESSON_PLAYLIST } from "./mock-data";
import { PLAYLIST_STATUS } from "./playlist-copy";
import { PlaylistSectionAccordion } from "./playlist-section-accordion";
import type { VideoLessonStrings } from "./strings";
import type { PlaylistSection } from "./types";

interface MobileLessonPlaylistProps {
  t: VideoLessonStrings;
  lang: AppLanguage;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  playlist?: PlaylistSection[];
  emptyLabel?: string;
}

export function MobileLessonPlaylist({
  t,
  lang,
  activeLessonId,
  onSelectLesson,
  playlist = VIDEO_LESSON_PLAYLIST,
  emptyLabel,
}: MobileLessonPlaylistProps) {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>(() => {
    const parent = playlist.find((section) =>
      section.lessons.some((lesson) => lesson.id === activeLessonId),
    );
    if (playlist[0]?.id !== "partA") return parent ? [parent.id] : [];
    const initial = ["partA", "partB"];
    return parent && !initial.includes(parent.id)
      ? [...initial, parent.id]
      : initial;
  });

  const status = PLAYLIST_STATUS[lang];

  const toggleSection = (id: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const isAllOpen = openSectionIds.length === playlist.length;

  const toggleAll = () => {
    if (isAllOpen) {
      setOpenSectionIds([]);
    } else {
      setOpenSectionIds(playlist.map((section) => section.id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 px-1 text-sm">
        <span className="font-bold leading-normal text-[var(--sn-text-main)]">
          {t.playlistTitle}
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="shrink-0 font-semibold text-[var(--sn-primary)]"
        >
          {isAllOpen ? status.hide : status.show}
        </button>
      </div>

      <div className="space-y-1">
        {playlist.length === 0 ? (
          <p className="px-2 py-4 text-base text-[var(--sn-text-secondary)]">
            {emptyLabel}
          </p>
        ) : null}
        {playlist.map((section) => (
          <PlaylistSectionAccordion
            key={section.id}
            section={section}
            isOpen={openSectionIds.includes(section.id)}
            onToggle={() => toggleSection(section.id)}
            activeLessonId={activeLessonId}
            onSelectLesson={onSelectLesson}
            t={t}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}
