import { useState } from "react";
import type { AppLanguage } from "@/lib/language";
import { VIDEO_LESSON_PLAYLIST } from "./mock-data";
import { PLAYLIST_STATUS } from "./playlist-copy";
import { PlaylistSectionAccordion } from "./playlist-section-accordion";
import type { VideoLessonStrings } from "./strings";

interface MobileLessonPlaylistProps {
  t: VideoLessonStrings;
  lang: AppLanguage;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
}

export function MobileLessonPlaylist({
  t,
  lang,
  activeLessonId,
  onSelectLesson,
}: MobileLessonPlaylistProps) {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>(() => {
    const parent = VIDEO_LESSON_PLAYLIST.find((s) =>
      s.lessons.some((l) => l.id === activeLessonId),
    );
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

  const isAllOpen = openSectionIds.length === VIDEO_LESSON_PLAYLIST.length;

  const toggleAll = () => {
    if (isAllOpen) {
      setOpenSectionIds([]);
    } else {
      setOpenSectionIds(VIDEO_LESSON_PLAYLIST.map((s) => s.id));
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
        {VIDEO_LESSON_PLAYLIST.map((section) => (
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
