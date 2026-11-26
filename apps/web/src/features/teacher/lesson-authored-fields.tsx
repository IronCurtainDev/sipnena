import type {
  LessonTextBlock,
  TeacherLessonDraft,
} from "@/lib/prototype-state";
import type { CourseContentCopy } from "./course-content-strings";

interface LessonAuthoredFieldsProps {
  copy: CourseContentCopy;
  lesson: TeacherLessonDraft;
  onChange: (lesson: TeacherLessonDraft) => void;
}

function TextRows({
  heading,
  addLabel,
  titlePlaceholder,
  bodyPlaceholder,
  removeLabel,
  rows,
  onChange,
}: {
  heading: string;
  addLabel: string;
  titlePlaceholder: string;
  bodyPlaceholder: string;
  removeLabel: string;
  rows: LessonTextBlock[];
  onChange: (rows: LessonTextBlock[]) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-bold text-[var(--sn-text-main)]">
        {heading}
      </legend>
      {rows.map((row, index) => (
        <div
          key={row.id}
          className="space-y-2 rounded-xl border border-[var(--sn-border)] p-3"
        >
          <label className="block text-base font-bold">
            <span className="mb-1.5 block">{titlePlaceholder}</span>
            <input
              type="text"
              value={row.title}
              onChange={(event) =>
                onChange(
                  rows.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, title: event.target.value }
                      : item,
                  ),
                )
              }
              className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
            />
          </label>
          <label className="block text-base font-bold">
            <span className="mb-1.5 block">{bodyPlaceholder}</span>
            <textarea
              rows={2}
              value={row.body}
              onChange={(event) =>
                onChange(
                  rows.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, body: event.target.value }
                      : item,
                  ),
                )
              }
              className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
            />
          </label>
          <button
            type="button"
            onClick={() => onChange(rows.filter((item) => item.id !== row.id))}
            className="min-h-12 text-base font-bold text-red-700"
          >
            {removeLabel}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...rows,
            { id: `block-${Date.now()}`, title: "", body: "" },
          ])
        }
        className="inline-flex min-h-12 items-center rounded-xl border border-dashed border-[var(--sn-border)] px-3 text-base font-bold text-[var(--sn-primary)]"
      >
        {addLabel}
      </button>
    </fieldset>
  );
}

export function LessonAuthoredFields({
  copy,
  lesson,
  onChange,
}: LessonAuthoredFieldsProps) {
  const patch = (next: Partial<TeacherLessonDraft>) =>
    onChange({ ...lesson, ...next });

  return (
    <div className="space-y-4">
      <fieldset className="space-y-3">
        <legend className="text-base font-bold">{copy.overviewHeading}</legend>
        <label
          className="block text-base font-bold"
          htmlFor={`${lesson.id}-overview-title`}
        >
          <span className="mb-1.5 block">{copy.overviewTitle}</span>
          <input
            id={`${lesson.id}-overview-title`}
            type="text"
            value={lesson.overviewTitle}
            onChange={(event) => patch({ overviewTitle: event.target.value })}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
        <label
          className="block text-base font-bold"
          htmlFor={`${lesson.id}-overview-body`}
        >
          <span className="mb-1.5 block">{copy.overviewBody}</span>
          <textarea
            id={`${lesson.id}-overview-body`}
            rows={3}
            value={lesson.overviewBody}
            onChange={(event) => patch({ overviewBody: event.target.value })}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
        <label
          className="block text-base font-bold"
          htmlFor={`${lesson.id}-formula`}
        >
          <span className="mb-1.5 block">{copy.formulaLabel}</span>
          <input
            id={`${lesson.id}-formula`}
            type="text"
            value={lesson.formula}
            onChange={(event) => patch({ formula: event.target.value })}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
        <label
          className="block text-base font-bold"
          htmlFor={`${lesson.id}-educator`}
        >
          <span className="mb-1.5 block">{copy.educatorNote}</span>
          <textarea
            id={`${lesson.id}-educator`}
            rows={2}
            value={lesson.educatorNote}
            onChange={(event) => patch({ educatorNote: event.target.value })}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
      </fieldset>

      <TextRows
        heading={copy.rulesHeading}
        addLabel={copy.addRule}
        titlePlaceholder={copy.ruleTitle}
        bodyPlaceholder={copy.ruleBody}
        removeLabel={copy.removeRow}
        rows={lesson.rules}
        onChange={(rules) => patch({ rules })}
      />
      <TextRows
        heading={copy.notesHeading}
        addLabel={copy.addNote}
        titlePlaceholder={copy.noteTitle}
        bodyPlaceholder={copy.noteBody}
        removeLabel={copy.removeRow}
        rows={lesson.revisionNotes}
        onChange={(revisionNotes) => patch({ revisionNotes })}
      />

      <fieldset className="space-y-3">
        <legend className="text-base font-bold">{copy.filesHeading}</legend>
        {lesson.files.map((file, index) => (
          <div
            key={file.id}
            className="space-y-2 rounded-xl border border-[var(--sn-border)] p-3"
          >
            <label className="block text-base font-bold">
              <span className="mb-1.5 block">{copy.fileTitle}</span>
              <input
                type="text"
                value={file.title}
                onChange={(event) =>
                  patch({
                    files: lesson.files.map((item, itemIndex) =>
                      itemIndex === index
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  })
                }
                className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
              />
            </label>
            <label className="block text-base font-bold">
              <span className="mb-1.5 block">{copy.fileName}</span>
              <input
                type="text"
                value={file.meta}
                spellCheck={false}
                onChange={(event) =>
                  patch({
                    files: lesson.files.map((item, itemIndex) =>
                      itemIndex === index
                        ? { ...item, meta: event.target.value }
                        : item,
                    ),
                  })
                }
                className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
              />
            </label>
            <button
              type="button"
              onClick={() =>
                patch({
                  files: lesson.files.filter((item) => item.id !== file.id),
                })
              }
              className="min-h-12 text-base font-bold text-red-700"
            >
              {copy.removeRow}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            patch({
              files: [
                ...lesson.files,
                { id: `file-${Date.now()}`, title: "", meta: "" },
              ],
            })
          }
          className="inline-flex min-h-12 items-center rounded-xl border border-dashed border-[var(--sn-border)] px-3 text-base font-bold text-[var(--sn-primary)]"
        >
          {copy.addFile}
        </button>
      </fieldset>
    </div>
  );
}
