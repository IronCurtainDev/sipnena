import {
  FileText,
  FlaskConical,
  GripVertical,
  Radio,
  Video,
  ClipboardList,
} from "lucide-react";
import {
  pickLocalized,
  type Lesson,
  type PublishStatus,
  type Unit,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import { CurriculumRowMenu } from "./curriculum-row-menu";

const ICONS = {
  video: Video,
  quiz: ClipboardList,
  lab: FlaskConical,
  reading: FileText,
  pdf: FileText,
  assignment: FileText,
  live: Radio,
} as const;

export function StatusPill({
  lang,
  status,
}: {
  lang: AppLanguage;
  status: PublishStatus;
}) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const tone =
    status === "published"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : status === "scheduled"
        ? "bg-amber-50 text-amber-800 border-amber-200"
        : "bg-slate-100 text-slate-700 border-slate-200";
  const label =
    status === "published"
      ? extra.statusPublished
      : status === "scheduled"
        ? extra.statusScheduled
        : extra.statusDraft;
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs font-bold ${tone}`}
    >
      {label}
    </span>
  );
}

export function CurriculumLessonRow({
  lang,
  lesson,
  lessonIndex,
  totalInUnit,
  selected,
  units,
  unitId,
  onSelect,
  onDragStart,
  onDropOnRow,
  onMoveLesson,
  onDuplicateLesson,
  onMoveLessonToUnit,
  onLessonStatus,
  onDeleteLesson,
}: {
  lang: AppLanguage;
  lesson: Lesson;
  lessonIndex: number;
  totalInUnit: number;
  selected: boolean;
  units: Unit[];
  unitId: string;
  onSelect: () => void;
  onDragStart: () => void;
  onDropOnRow: () => void;
  onMoveLesson: (lessonId: string, delta: -1 | 1) => void;
  onDuplicateLesson: (lessonId: string) => void;
  onMoveLessonToUnit: (lessonId: string, targetUnitId: string) => void;
  onLessonStatus: (lessonId: string, status: PublishStatus) => void;
  onDeleteLesson: (lessonId: string) => void;
}) {
  const Icon = ICONS[lesson.kind] ?? FileText;
  const lessonTitle = pickLocalized(lesson.title, lang);

  return (
    <li
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onDragStart();
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDropOnRow();
      }}
      className={`flex items-center gap-1 rounded-xl ${
        selected ? "bg-[var(--sn-surface-selected)]" : "bg-[var(--sn-surface)]"
      }`}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-7 shrink-0 cursor-grab items-center justify-center text-[var(--sn-text-muted)]"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </span>
      <button
        type="button"
        onClick={onSelect}
        className={`flex min-h-12 min-w-0 flex-1 items-center gap-2 py-2 text-left text-sm ${
          selected
            ? "font-bold text-[var(--sn-primary)]"
            : "font-semibold text-[var(--sn-text-main)]"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="line-clamp-2 flex-1">{lessonTitle}</span>
        {lesson.status !== "published" ? (
          <StatusPill lang={lang} status={lesson.status} />
        ) : null}
      </button>
      <CurriculumRowMenu
        lang={lang}
        kind="lesson"
        itemTitle={lessonTitle}
        status={lesson.status}
        canMoveUp={lessonIndex > 0}
        canMoveDown={lessonIndex < totalInUnit - 1}
        units={units}
        currentUnitId={unitId}
        onMoveUp={() => onMoveLesson(lesson.id, -1)}
        onMoveDown={() => onMoveLesson(lesson.id, 1)}
        onDuplicate={() => onDuplicateLesson(lesson.id)}
        onMoveToUnit={(targetUnitId) =>
          onMoveLessonToUnit(lesson.id, targetUnitId)
        }
        onStatusChange={(s) => onLessonStatus(lesson.id, s)}
        onDelete={() => onDeleteLesson(lesson.id)}
      />
    </li>
  );
}
