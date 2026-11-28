import { Trash2, Upload } from "lucide-react";
import type { Item, Lesson } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { CourseContentCopy } from "./course-content-strings";

export function LessonNotesAndFilesTabs({
  editLang,
  activeTab,
  draft,
  content,
  onPatch,
  upsertSingleItem,
}: {
  editLang: AppLanguage;
  activeTab: "notes" | "files";
  draft: Lesson;
  content: CourseContentCopy;
  onPatch: (patch: Partial<Lesson>) => void;
  upsertSingleItem: <T extends Item["type"]>(
    type: T,
    item: Extract<Item, { type: T }>,
  ) => void;
}) {
  const textItem = draft.items.find((it) => it.type === "text");
  const formulaItem = draft.items.find((it) => it.type === "formula");
  const noteItem = draft.items.find((it) => it.type === "teacherNote");
  const fileItems = draft.items.filter((it) => it.type === "file");

  if (activeTab === "notes") {
    return (
      <div className="space-y-4">
        <label className="block space-y-1 text-sm font-bold">
          <span>
            {content.overviewBody} ({editLang.toUpperCase()})
          </span>
          <textarea
            rows={4}
            value={
              textItem?.type === "text" ? (textItem.body[editLang] ?? "") : ""
            }
            onChange={(e) =>
              upsertSingleItem("text", {
                id: textItem?.id ?? `txt-${draft.id}`,
                type: "text",
                heading:
                  textItem?.type === "text" ? textItem.heading : draft.title,
                body: {
                  ...(textItem?.type === "text" ? textItem.body : {}),
                  [editLang]: e.target.value,
                },
              })
            }
            className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
          />
        </label>

        <label className="block space-y-1 text-sm font-bold">
          <span>{content.formulaLabel}</span>
          <input
            type="text"
            value={
              formulaItem?.type === "formula" ? formulaItem.latexOrText : ""
            }
            onChange={(e) =>
              upsertSingleItem("formula", {
                id: formulaItem?.id ?? `frm-${draft.id}`,
                type: "formula",
                latexOrText: e.target.value,
              })
            }
            placeholder="e.g. i = r"
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>

        <label className="block space-y-1 text-sm font-bold">
          <span>
            {content.educatorNote} ({editLang.toUpperCase()})
          </span>
          <textarea
            rows={2}
            value={
              noteItem?.type === "teacherNote"
                ? (noteItem.body[editLang] ?? "")
                : ""
            }
            onChange={(e) =>
              upsertSingleItem("teacherNote", {
                id: noteItem?.id ?? `tn-${draft.id}`,
                type: "teacherNote",
                body: {
                  ...(noteItem?.type === "teacherNote" ? noteItem.body : {}),
                  [editLang]: e.target.value,
                },
              })
            }
            className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
          />
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {fileItems.map((file) =>
        file.type === "file" ? (
          <div
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-xl border border-[var(--sn-border)] px-3 py-2 text-sm"
          >
            <div>
              <p className="font-bold text-[var(--sn-text-main)]">
                {file.title[editLang] ?? file.fileName}
              </p>
              <p className="text-xs text-[var(--sn-text-muted)]">
                {file.fileName}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onPatch({
                  items: draft.items.filter((it) => it.id !== file.id),
                })
              }
              aria-label="Remove file"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : null,
      )}
      <label className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[var(--sn-border)] px-4 text-sm font-bold text-[var(--sn-primary)]">
        <Upload className="h-4 w-4" />
        <span>Add PDF / Tute</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            onPatch({
              items: [
                ...draft.items,
                {
                  id: `file-${Date.now()}`,
                  type: "file",
                  title: { en: f.name, si: f.name, ta: f.name },
                  fileName: f.name,
                  url: `/files/${encodeURIComponent(f.name)}`,
                  sizeKb: Math.max(10, Math.round(f.size / 1024)),
                },
              ],
            });
          }}
          className="sr-only"
        />
      </label>
    </div>
  );
}
