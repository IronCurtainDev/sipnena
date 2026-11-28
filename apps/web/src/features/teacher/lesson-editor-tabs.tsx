import type { Item, ItemKind, Lesson, PublishStatus } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { isYoutubeUrl } from "@/lib/youtube";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";
import { LessonNotesAndFilesTabs } from "./lesson-notes-files-tabs";

interface LessonEditorTabsProps {
  lang: AppLanguage;
  editLang: AppLanguage;
  activeTab: "basics" | "video" | "notes" | "files";
  draft: Lesson;
  copy: TeacherCourseCopy;
  content: CourseContentCopy;
  onPatch: (patch: Partial<Lesson>) => void;
}

export function LessonEditorTabs({
  lang,
  editLang,
  activeTab,
  draft,
  copy,
  content,
  onPatch,
}: LessonEditorTabsProps) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const videoItem = draft.items.find((it) => it.type === "video");
  const assignItem = draft.items.find((it) => it.type === "assignment");

  const upsertSingleItem = <T extends Item["type"]>(
    type: T,
    item: Extract<Item, { type: T }>,
  ) => {
    const rest = draft.items.filter((it) => it.type !== type);
    onPatch({ items: [...rest, item] });
  };

  if (activeTab === "notes" || activeTab === "files") {
    return (
      <LessonNotesAndFilesTabs
        editLang={editLang}
        activeTab={activeTab}
        draft={draft}
        content={content}
        onPatch={onPatch}
        upsertSingleItem={upsertSingleItem}
      />
    );
  }

  if (activeTab === "basics") {
    return (
      <div className="space-y-4">
        <label className="block space-y-1 text-sm font-bold">
          <span>
            {copy.titleField} ({editLang.toUpperCase()})
          </span>
          <input
            type="text"
            value={draft.title[editLang] ?? ""}
            onChange={(e) =>
              onPatch({
                title: { ...draft.title, [editLang]: e.target.value },
              })
            }
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="space-y-1 text-sm font-bold">
            <span>Kind</span>
            <select
              value={draft.kind}
              onChange={(e) => onPatch({ kind: e.target.value as ItemKind })}
              className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
            >
              <option value="video">Video</option>
              <option value="reading">Reading</option>
              <option value="pdf">PDF</option>
              <option value="lab">Lab / Activity</option>
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
            </select>
          </label>
          <label className="space-y-1 text-sm font-bold">
            <span>Duration (min)</span>
            <input
              type="number"
              min={1}
              value={draft.durationMin ?? 12}
              onChange={(e) =>
                onPatch({
                  durationMin: Math.max(1, Number(e.target.value) || 12),
                })
              }
              className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
            />
          </label>
          <label className="space-y-1 text-sm font-bold">
            <span>Status</span>
            <select
              value={draft.status}
              onChange={(e) =>
                onPatch({ status: e.target.value as PublishStatus })
              }
              className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
            >
              <option value="draft">{extra.statusDraft}</option>
              <option value="scheduled">{extra.statusScheduled}</option>
              <option value="published">{extra.statusPublished}</option>
            </select>
          </label>
        </div>

        {draft.status === "scheduled" ? (
          <label className="block space-y-1 text-sm font-bold">
            <span>
              {extra.releaseAtLabel} · {extra.colomboHint}
            </span>
            <input
              type="datetime-local"
              value={(draft.releaseAt ?? "").slice(0, 16)}
              onChange={(e) => onPatch({ releaseAt: e.target.value })}
              className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
            />
          </label>
        ) : null}

        <label className="flex min-h-12 cursor-pointer items-center gap-2 text-sm font-bold">
          <input
            type="checkbox"
            checked={Boolean(draft.isFreePreview)}
            onChange={(e) => onPatch({ isFreePreview: e.target.checked })}
            className="h-4 w-4"
          />
          <span>Free preview lesson</span>
        </label>

        {draft.kind === "assignment" ? (
          <div className="space-y-3 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-4">
            <label className="block space-y-1 text-sm font-bold">
              <span>Assignment instructions ({editLang.toUpperCase()})</span>
              <textarea
                rows={3}
                value={
                  assignItem?.type === "assignment"
                    ? (assignItem.instructions[editLang] ?? "")
                    : ""
                }
                onChange={(e) =>
                  upsertSingleItem("assignment", {
                    id: assignItem?.id ?? `assign-${draft.id}`,
                    type: "assignment",
                    instructions: {
                      ...(assignItem?.type === "assignment"
                        ? assignItem.instructions
                        : {}),
                      [editLang]: e.target.value,
                    },
                    dueAt:
                      assignItem?.type === "assignment"
                        ? assignItem.dueAt
                        : undefined,
                    maxScore:
                      assignItem?.type === "assignment"
                        ? assignItem.maxScore
                        : 10,
                  })
                }
                className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-3 text-base"
              />
            </label>
            <label className="block space-y-1 text-sm font-bold">
              <span>Max marks</span>
              <input
                type="number"
                min={1}
                value={
                  assignItem?.type === "assignment" ? assignItem.maxScore : 10
                }
                onChange={(e) =>
                  upsertSingleItem("assignment", {
                    id: assignItem?.id ?? `assign-${draft.id}`,
                    type: "assignment",
                    instructions:
                      assignItem?.type === "assignment"
                        ? assignItem.instructions
                        : {},
                    dueAt:
                      assignItem?.type === "assignment"
                        ? assignItem.dueAt
                        : undefined,
                    maxScore: Math.max(1, Number(e.target.value) || 10),
                  })
                }
                className="min-h-11 w-32 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
              />
            </label>
          </div>
        ) : null}
      </div>
    );
  }

  const vidUrl = videoItem?.type === "video" ? videoItem.url : "";
  const youtubeOk = !vidUrl.trim() || isYoutubeUrl(vidUrl);
  return (
    <div className="space-y-3">
      <label className="block space-y-1 text-sm font-bold">
        <span>YouTube link</span>
        <input
          type="url"
          value={vidUrl}
          onChange={(e) =>
            upsertSingleItem("video", {
              id: videoItem?.id ?? `vid-${draft.id}`,
              type: "video",
              url: e.target.value.trim(),
              estimatedMb: 0,
            })
          }
          placeholder="https://youtube.com/watch?v=… or youtu.be/…"
          className={`min-h-12 w-full rounded-xl border px-3 text-base ${
            youtubeOk
              ? "border-[var(--sn-border)]"
              : "border-amber-400 bg-amber-50"
          }`}
        />
      </label>
      <p className="text-sm text-[var(--sn-text-secondary)]">
        Paste an Unlisted or Public YouTube link. Students see it after you
        publish the lesson.
      </p>
      {!youtubeOk ? (
        <p className="text-sm font-semibold text-amber-800">
          Use a YouTube link only (youtube.com or youtu.be).
        </p>
      ) : null}
    </div>
  );
}
