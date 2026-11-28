import { useState } from "react";
import { GripVertical, Plus } from "lucide-react";
import {
  pickLocalized,
  type Lesson,
  type PublishStatus,
  type Unit,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";
import { CurriculumRowMenu } from "./curriculum-row-menu";
import { CurriculumLessonRow, StatusPill } from "./curriculum-unit-row";

interface CourseCurriculumRailProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  content: CourseContentCopy;
  units: Unit[];
  lessons: Lesson[];
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  onAddUnit: () => void;
  onRenameUnit: (unitId: string, title: string) => void;
  onMoveUnit: (unitId: string, delta: -1 | 1) => void;
  onReorderUnits: (orderedIds: string[]) => void;
  onDuplicateUnit: (unitId: string) => void;
  onUnitStatus: (unitId: string, status: PublishStatus) => void;
  onDeleteUnit: (unitId: string) => void;
  onAddVideo: (unitId: string) => void;
  onAddQuiz: (unitId: string) => void;
  onAddLab: (unitId: string) => void;
  onAddAssignment: (unitId: string) => void;
  onMoveLesson: (lessonId: string, delta: -1 | 1) => void;
  onReorderLessons: (
    unitId: string,
    orderedIds: string[],
    movingId?: string,
  ) => void;
  onMoveLessonToUnit: (lessonId: string, targetUnitId: string) => void;
  onDuplicateLesson: (lessonId: string) => void;
  onLessonStatus: (lessonId: string, status: PublishStatus) => void;
  onDeleteLesson: (lessonId: string) => void;
}

export function CourseCurriculumRail(props: CourseCurriculumRailProps) {
  const {
    lang,
    copy,
    content,
    units,
    lessons,
    selectedLessonId,
    onSelectLesson,
    onAddUnit,
    onRenameUnit,
  } = props;
  const extra = BUILDER_EXTRA_COPY[lang];
  const [dragPayload, setDragPayload] = useState<{
    kind: "unit" | "lesson";
    id: string;
    unitId: string;
  } | null>(null);
  const [announcement, setAnnouncement] = useState("");

  return (
    <aside
      className="flex flex-col space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 lg:sticky lg:top-4"
      data-testid="teacher-curriculum-rail"
    >
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
          {copy.tabCurriculum}
        </h3>
        <button
          type="button"
          onClick={onAddUnit}
          className="inline-flex min-h-12 items-center gap-1 rounded-xl bg-[var(--sn-primary)] px-3 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          <span>{copy.addSectionBtn}</span>
        </button>
      </div>

      {units.length === 0 ? (
        <p className="text-base text-[var(--sn-text-muted)]">
          {copy.noSections}
        </p>
      ) : (
        units.map((unit, unitIndex) => {
          const unitTitle =
            typeof unit.title === "object"
              ? (unit.title[lang] ?? "")
              : pickLocalized(unit.title, lang);
          const unitLessons = lessons
            .filter((l) => l.unitId === unit.id)
            .sort((a, b) => a.order - b.order);

          return (
            <div
              key={unit.id}
              draggable
              onDragStart={() =>
                setDragPayload({ kind: "unit", id: unit.id, unitId: unit.id })
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (!dragPayload) return;
                if (dragPayload.kind === "unit" && dragPayload.id !== unit.id) {
                  const ids = units
                    .map((u) => u.id)
                    .filter((id) => id !== dragPayload.id);
                  ids.splice(unitIndex, 0, dragPayload.id);
                  props.onReorderUnits(ids);
                  setAnnouncement(extra.movedAnnouncement(unitTitle));
                } else if (dragPayload.kind === "lesson") {
                  const ids = unitLessons
                    .map((l) => l.id)
                    .filter((id) => id !== dragPayload.id);
                  props.onReorderLessons(
                    unit.id,
                    [...ids, dragPayload.id],
                    dragPayload.id,
                  );
                  setAnnouncement(extra.movedAnnouncement(unitTitle));
                }
                setDragPayload(null);
              }}
              className="space-y-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)]/40 p-2.5"
            >
              <div className="flex items-center gap-1">
                <span
                  aria-label={extra.dragHandleLabel}
                  className="flex h-11 w-8 shrink-0 cursor-grab items-center justify-center text-[var(--sn-text-muted)]"
                >
                  <GripVertical className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={unitTitle}
                  onChange={(e) => onRenameUnit(unit.id, e.target.value)}
                  aria-label={copy.sectionTitlePlaceholder}
                  placeholder={copy.sectionTitlePlaceholder}
                  className="min-w-0 flex-1 rounded-lg bg-[var(--sn-olive)]/70 px-2.5 py-2 text-sm font-bold text-[var(--sn-primary)] outline-none focus:ring-2 focus:ring-[var(--sn-primary)]"
                />
                <StatusPill lang={lang} status={unit.status} />
                <CurriculumRowMenu
                  lang={lang}
                  kind="unit"
                  itemTitle={unitTitle}
                  status={unit.status}
                  canMoveUp={unitIndex > 0}
                  canMoveDown={unitIndex < units.length - 1}
                  lessonCountInUnit={unitLessons.length}
                  onMoveUp={() => props.onMoveUnit(unit.id, -1)}
                  onMoveDown={() => props.onMoveUnit(unit.id, 1)}
                  onDuplicate={() => props.onDuplicateUnit(unit.id)}
                  onStatusChange={(s) => props.onUnitStatus(unit.id, s)}
                  onDelete={() => props.onDeleteUnit(unit.id)}
                />
              </div>

              <ul className="space-y-1">
                {unitLessons.map((lesson, lessonIndex) => (
                  <CurriculumLessonRow
                    key={lesson.id}
                    lang={lang}
                    lesson={lesson}
                    lessonIndex={lessonIndex}
                    totalInUnit={unitLessons.length}
                    selected={selectedLessonId === lesson.id}
                    units={units}
                    unitId={unit.id}
                    onSelect={() => onSelectLesson(lesson.id)}
                    onDragStart={() =>
                      setDragPayload({
                        kind: "lesson",
                        id: lesson.id,
                        unitId: unit.id,
                      })
                    }
                    onDropOnRow={() => {
                      if (
                        !dragPayload ||
                        dragPayload.kind !== "lesson" ||
                        dragPayload.id === lesson.id
                      ) {
                        return;
                      }
                      const ids = unitLessons
                        .map((l) => l.id)
                        .filter((id) => id !== dragPayload.id);
                      ids.splice(lessonIndex, 0, dragPayload.id);
                      props.onReorderLessons(unit.id, ids, dragPayload.id);
                      setAnnouncement(
                        extra.movedAnnouncement(
                          pickLocalized(lesson.title, lang),
                        ),
                      );
                      setDragPayload(null);
                    }}
                    onMoveLesson={props.onMoveLesson}
                    onDuplicateLesson={props.onDuplicateLesson}
                    onMoveLessonToUnit={props.onMoveLessonToUnit}
                    onLessonStatus={props.onLessonStatus}
                    onDeleteLesson={props.onDeleteLesson}
                  />
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {(
                  [
                    [content.addVideo, () => props.onAddVideo(unit.id)],
                    [
                      content.addQuiz,
                      () => props.onAddQuiz(unit.id),
                      "teacher-add-quiz",
                    ],
                    [
                      content.addLab,
                      () => props.onAddLab(unit.id),
                      "teacher-add-lab",
                    ],
                    [extra.addAssignment, () => props.onAddAssignment(unit.id)],
                  ] as const
                ).map(([label, handler, testId]) => (
                  <button
                    key={label}
                    type="button"
                    data-testid={testId}
                    onClick={handler}
                    className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-xs font-bold text-[var(--sn-primary)]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
    </aside>
  );
}
