import { useEffect, useRef, useState } from "react";
import {
  addLessonToUnit,
  addUnitToCourse,
  canRestoreCourseUndo,
  createInlineCourseQuiz,
  deleteLesson,
  deleteUnit,
  duplicateLesson,
  duplicateUnit,
  getCourseById,
  getCourseStatusCounts,
  makeLocalized,
  moveOrReorderLesson,
  pickLocalized,
  reorderCourseUnits,
  restoreLastCourseUndo,
  setLessonStatus,
  setUnitStatus,
  updateCourseFields,
  updateLessonFields,
  updateUnitFields,
  useCoursesStore,
  type Course,
  type ItemKind,
  type Lesson,
  type PublishStatus,
  type Quiz,
  type Unit,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";
import type { NewQuizInput } from "./quiz-create-form";

export type SaveIndicator = "saved" | "saving" | "dirty";

export function useCourseBuilder(
  lang: AppLanguage,
  courseId: string,
  copy: TeacherCourseCopy,
  content: CourseContentCopy,
  showToast: (message: string) => void,
) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const { store } = useCoursesStore();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [pickerUnitId, setPickerUnitId] = useState<string | null>(null);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [undoVisible, setUndoVisible] = useState(false);
  const [saveState, setSaveState] = useState<SaveIndicator>("saved");
  const undoTimerRef = useRef<number | null>(null);

  const course =
    store.courses.find((c) => c.id === courseId) ??
    getCourseById(store, courseId) ??
    null;
  const resolvedCourseId = course?.id ?? courseId;
  const units: Unit[] = store.units
    .filter((u) => u.courseId === resolvedCourseId)
    .sort((a, b) => a.order - b.order);
  const lessons: Lesson[] = store.lessons.filter(
    (l) => l.courseId === resolvedCourseId,
  );
  const counts = getCourseStatusCounts(store, resolvedCourseId);

  const firstLessonId = units.flatMap((u) =>
    lessons.filter((l) => l.unitId === u.id).sort((a, b) => a.order - b.order),
  )[0]?.id;

  const activeLessonId =
    selectedLessonId && lessons.some((l) => l.id === selectedLessonId)
      ? selectedLessonId
      : pickerUnitId
        ? null
        : (firstLessonId ?? null);

  const selectedLesson = lessons.find((l) => l.id === activeLessonId) ?? null;
  const selectedQuiz: Quiz | null =
    (selectedLesson?.quizId
      ? store.quizzes.find((q) => q.id === selectedLesson.quizId)
      : null) ?? null;

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (saveState !== "saved") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveState]);

  const showUndoToast = () => {
    setUndoVisible(canRestoreCourseUndo());
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    undoTimerRef.current = window.setTimeout(() => setUndoVisible(false), 8000);
  };

  const triggerUndo = () => {
    if (restoreLastCourseUndo()) {
      setUndoVisible(false);
      showToast(extra.restoredToast);
    }
  };

  const patchCourse = (patch: Partial<Course>) => {
    if (!course) return;
    updateCourseFields(course.id, patch);
    setSaveState("saved");
    showToast(copy.courseSavedToast);
  };

  const addUnit = () => {
    if (!course) return;
    addUnitToCourse(course.id);
    showToast(copy.sectionAddedToast);
  };

  const moveUnit = (unitId: string, delta: -1 | 1) => {
    const idx = units.findIndex((u) => u.id === unitId);
    const nextIdx = idx + delta;
    if (idx < 0 || nextIdx < 0 || nextIdx >= units.length) return;
    const ids = units.map((u) => u.id);
    const [moved] = ids.splice(idx, 1);
    ids.splice(nextIdx, 0, moved!);
    reorderCourseUnits(resolvedCourseId, ids);
  };

  const addItem = (unitId: string, kind: ItemKind) => {
    if (!course) return;
    const title =
      kind === "lab"
        ? makeLocalized(content.labHeading)
        : kind === "assignment"
          ? { en: "New Assignment", si: "නව පැවරුම", ta: "புதிய ஒப்படைப்பு" }
          : makeLocalized(copy.defaultLectureTitle);
    const id = addLessonToUnit(course.id, unitId, kind, title);
    setCreatingQuiz(false);
    setPickerUnitId(null);
    setSelectedLessonId(id);
    showToast(kind === "lab" ? content.labAdded : content.videoAdded);
  };

  const placeQuiz = (quizId: string) => {
    if (!course || !pickerUnitId) return;
    const quiz = store.quizzes.find((q) => q.id === quizId);
    const title = quiz?.title ?? makeLocalized("Quiz");
    const id = addLessonToUnit(course.id, pickerUnitId, "quiz", title);
    updateLessonFields(id, { quizId, status: quiz?.status ?? "published" });
    setCreatingQuiz(false);
    setPickerUnitId(null);
    setSelectedLessonId(id);
    showToast(content.quizPlaced);
  };

  const moveLesson = (lessonId: string, delta: -1 | 1) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    const unitLessons = lessons
      .filter((l) => l.unitId === lesson.unitId)
      .sort((a, b) => a.order - b.order);
    const idx = unitLessons.findIndex((l) => l.id === lessonId);
    const nextIdx = idx + delta;
    if (idx < 0 || nextIdx < 0 || nextIdx >= unitLessons.length) return;
    const ids = unitLessons.map((l) => l.id);
    const [moved] = ids.splice(idx, 1);
    ids.splice(nextIdx, 0, moved!);
    moveOrReorderLesson(lesson.unitId, ids);
  };

  const moveLessonToOtherUnit = (lessonId: string, targetUnitId: string) => {
    const targetIds = lessons
      .filter((l) => l.unitId === targetUnitId && l.id !== lessonId)
      .sort((a, b) => a.order - b.order)
      .map((l) => l.id);
    moveOrReorderLesson(targetUnitId, [...targetIds, lessonId], lessonId);
    const targetUnit = units.find((u) => u.id === targetUnitId);
    if (targetUnit) {
      showToast(extra.movedAnnouncement(pickLocalized(targetUnit.title, lang)));
    }
  };

  return {
    store,
    course,
    units,
    lessons,
    counts,
    activeLessonId,
    selectedLesson,
    selectedQuiz,
    pickerUnitId,
    creatingQuiz,
    undoVisible,
    saveState,
    setSaveState,
    triggerUndo,
    patchCourse,
    addUnit,
    renameUnit: (unitId: string, titleText: string) => {
      updateUnitFields(unitId, {
        title: makeLocalized(titleText),
      });
    },
    moveUnit,
    reorderUnits: (orderedIds: string[]) =>
      reorderCourseUnits(resolvedCourseId, orderedIds),
    duplicateUnit: (unitId: string) => duplicateUnit(unitId),
    setUnitStatus: (
      unitId: string,
      status: PublishStatus,
      releaseAt?: string,
    ) => setUnitStatus(unitId, status, releaseAt),
    deleteUnitWithUndo: (unitId: string) => {
      deleteUnit(unitId);
      showUndoToast();
    },
    addItem,
    placeQuiz,
    createInlineQuiz: (input: NewQuizInput) => {
      const lessonId = createInlineCourseQuiz({
        ...input,
        unitId: input.sectionId,
      });
      setCreatingQuiz(false);
      setPickerUnitId(null);
      setSelectedLessonId(lessonId);
      showToast(content.quizCreated);
    },
    saveLesson: (lesson: Lesson, silent = false) => {
      updateLessonFields(lesson.id, lesson);
      setSaveState("saved");
      if (!silent) showToast(copy.lessonSavedToast);
    },
    moveLesson,
    reorderUnitLessons: (
      unitId: string,
      orderedIds: string[],
      movingId?: string,
    ) => moveOrReorderLesson(unitId, orderedIds, movingId),
    moveLessonToOtherUnit,
    duplicateLesson: (lessonId: string) => {
      const id = duplicateLesson(lessonId);
      if (id) setSelectedLessonId(id);
    },
    setLessonStatus: (
      lessonId: string,
      status: PublishStatus,
      releaseAt?: string,
    ) => setLessonStatus(lessonId, status, releaseAt),
    deleteLessonWithUndo: (lessonId: string) => {
      deleteLesson(lessonId);
      setSelectedLessonId(null);
      showUndoToast();
    },
    selectLesson: (lessonId: string) => {
      setCreatingQuiz(false);
      setPickerUnitId(null);
      setSelectedLessonId(lessonId);
    },
    clearSelection: () => {
      setCreatingQuiz(false);
      setPickerUnitId(null);
      setSelectedLessonId(null);
    },
    openQuizPicker: (unitId: string) => {
      setCreatingQuiz(false);
      setPickerUnitId(unitId);
      setSelectedLessonId(null);
    },
    startCreateQuiz: () => setCreatingQuiz(true),
    cancelCreateQuiz: () => setCreatingQuiz(false),
  };
}
