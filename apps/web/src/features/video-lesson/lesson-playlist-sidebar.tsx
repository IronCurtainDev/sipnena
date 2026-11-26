import { useState } from "react";
import type { AppLanguage } from "@/lib/language";
import { VIDEO_LESSON_PLAYLIST } from "./mock-data";
import { PlaylistNotesTab } from "./playlist-notes-tab";
import { PlaylistQuizzesTab } from "./playlist-quizzes-tab";
import { PlaylistSectionAccordion } from "./playlist-section-accordion";
import type { VideoLessonStrings } from "./strings";

interface LessonPlaylistSidebarProps {
  t: VideoLessonStrings;
  lang: AppLanguage;
  activeLessonId: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  onToast?: (msg: string) => void;
}

export function LessonPlaylistSidebar({
  t,
  lang,
  activeLessonId,
  onSelectLesson,
  onToast,
}: LessonPlaylistSidebarProps) {
  const [playlistTab, setPlaylistTab] = useState<
    "lessons" | "notes" | "quizzes"
  >("lessons");
  const [openSectionIds, setOpenSectionIds] = useState<string[]>(() => {
    const parent = VIDEO_LESSON_PLAYLIST.find((s) =>
      s.lessons.some((l) => l.id === activeLessonId),
    );
    const initial = ["partA", "partB"];
    return parent && !initial.includes(parent.id)
      ? [...initial, parent.id]
      : initial;
  });

  const toggleSection = (id: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const tabs = [
    { id: "lessons" as const, label: t.playlistTabLessons },
    { id: "notes" as const, label: t.playlistTabNotes },
    { id: "quizzes" as const, label: t.playlistTabQuizzes },
  ];

  return (
    <aside
      aria-label="Course playlist"
      className="flex flex-col rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] lg:sticky lg:top-5 lg:h-[calc(100svh-2.5rem)]"
    >
      <div className="shrink-0 space-y-3 border-b border-[var(--sn-border)] p-5 pb-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold leading-normal text-[var(--sn-text-main)]">
            {t.playlistTitle}
          </h3>
          <p className="text-sm leading-normal text-[var(--sn-text-secondary)]">
            {t.playlistRemaining}
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={25}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--sn-olive)]"
        >
          <div className="h-full w-1/4 rounded-full bg-[var(--sn-primary)]" />
        </div>
        <p className="text-sm font-semibold text-[var(--sn-primary)]">
          {t.playlistProgress}
        </p>

        <div className="flex gap-1 border-b border-[var(--sn-border)] text-sm font-bold text-[var(--sn-text-secondary)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPlaylistTab(tab.id)}
              className={`min-h-[48px] flex-1 border-b-2 px-1 leading-normal transition ${
                playlistTab === tab.id
                  ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                  : "border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {playlistTab === "lessons" && (
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
        )}

        {playlistTab === "notes" && <PlaylistNotesTab onToast={onToast} />}
        {playlistTab === "quizzes" && (
          <PlaylistQuizzesTab
            onSelectLesson={onSelectLesson}
            onToast={onToast}
          />
        )}
      </div>

      <p className="shrink-0 border-t border-[var(--sn-border)] px-5 py-3 text-sm leading-normal text-[var(--sn-text-muted)]">
        {t.curriculumBadge}
      </p>
    </aside>
  );
}
