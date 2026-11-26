import { useState } from "react";
import {
  usePrototypeState,
  type TeacherLessonDraft,
  type TeacherQuizDraft,
} from "@/lib/prototype-state";
import {
  addCourseSection,
  appendCurriculumItem,
  createCurriculumItem,
  nextSectionOrder,
  patchTeacherCourse,
  placeQuizInSection,
  removeCurriculumItem,
  renameCourseSection,
  saveCurriculumLesson,
} from "@/lib/teacher-curriculum";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";
import type { NewQuizInput } from "./quiz-create-form";

export function useCourseBuilder(
  courseId: string,
  copy: TeacherCourseCopy,
  content: CourseContentCopy,
  showToast: (message: string) => void,
) {
  const { state, update } = usePrototypeState();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [pickerSectionId, setPickerSectionId] = useState<string | null>(null);
  const [creatingQuiz, setCreatingQuiz] = useState(false);

  const course =
    state.teacherCourses.find((item) => item.id === courseId) ?? null;
  const sections = state.teacherCourseSections.filter(
    (section) => section.courseId === courseId,
  );
  const lessons = state.teacherLessons.filter(
    (lesson) => lesson.courseId === courseId,
  );
  const firstLessonId = [...lessons].sort((a, b) => a.order - b.order)[0]?.id;
  const activeLessonId =
    selectedLessonId && lessons.some((lesson) => lesson.id === selectedLessonId)
      ? selectedLessonId
      : pickerSectionId
        ? null
        : (firstLessonId ?? null);
  const selectedLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) ?? null;

  const patchCourse = (patch: Parameters<typeof patchTeacherCourse>[2]) => {
    if (!course) return;
    update((prev) => patchTeacherCourse(prev, course.id, patch));
    showToast(copy.courseSavedToast);
  };

  const addItem = (sectionId: string, kind: "video" | "lab") => {
    if (!course) return;
    const id = `tl-${Date.now()}`;
    update((prev) =>
      appendCurriculumItem(
        prev,
        createCurriculumItem({
          id,
          course,
          sectionId,
          order: nextSectionOrder(prev.teacherLessons, sectionId),
          kind,
          title: kind === "lab" ? content.labHeading : copy.defaultLectureTitle,
          duration: copy.defaultDuration,
          labPrompt: kind === "lab" ? content.defaultLabPrompt : "",
        }),
      ),
    );
    setCreatingQuiz(false);
    setPickerSectionId(null);
    setSelectedLessonId(id);
    showToast(kind === "lab" ? content.labAdded : content.videoAdded);
  };

  const placeQuiz = (quizId: string) => {
    if (!course || !pickerSectionId) return;
    const existing = state.teacherLessons.find(
      (lesson) => lesson.kind === "quiz" && lesson.quizId === quizId,
    );
    const id = existing?.id ?? `tlq-${Date.now()}`;
    update((prev) =>
      placeQuizInSection(prev, quizId, course.id, pickerSectionId, id),
    );
    setCreatingQuiz(false);
    setPickerSectionId(null);
    setSelectedLessonId(id);
    showToast(content.quizPlaced);
  };

  const createQuiz = (input: NewQuizInput) => {
    if (!course) return;
    const quizId = `tq-${Date.now()}`;
    const lessonId = `tlq-${Date.now()}`;
    update((prev) => {
      const withQuiz = {
        ...prev,
        teacherQuizzes: [
          {
            id: quizId,
            title: input.title,
            subject: input.subject,
            grade: input.grade,
            courseId: input.courseId,
            sectionId: input.sectionId,
            questions: [
              {
                id: `q-${Date.now()}`,
                prompt: input.prompt,
                options: input.options,
                correctIndex: input.correctIndex,
                explanation: input.explanation,
              },
            ],
          },
          ...prev.teacherQuizzes,
        ],
      };
      return placeQuizInSection(
        withQuiz,
        quizId,
        input.courseId,
        input.sectionId,
        lessonId,
      );
    });
    setCreatingQuiz(false);
    setPickerSectionId(null);
    setSelectedLessonId(lessonId);
    showToast(content.quizCreated);
  };

  const saveQuiz = (quiz: TeacherQuizDraft) => {
    update((prev) => ({
      ...prev,
      teacherQuizzes: prev.teacherQuizzes.map((item) =>
        item.id === quiz.id ? quiz : item,
      ),
    }));
    showToast(content.quizUpdated);
  };

  const saveLesson = (lesson: TeacherLessonDraft) => {
    update((prev) => saveCurriculumLesson(prev, lesson));
    showToast(copy.lessonSavedToast);
  };

  const addSection = () => {
    if (!course) return;
    const order =
      sections.reduce((max, section) => Math.max(max, section.order), -1) + 1;
    update((prev) =>
      addCourseSection(prev, {
        id: `ts-${Date.now()}`,
        courseId: course.id,
        title: `${copy.defaultSectionTitle}${order > 0 ? ` ${order + 1}` : ""}`,
        order,
      }),
    );
    showToast(copy.sectionAddedToast);
  };

  return {
    state,
    course,
    sections,
    lessons,
    activeLessonId,
    selectedLesson,
    selectedQuiz:
      state.teacherQuizzes.find((quiz) => quiz.id === selectedLesson?.quizId) ??
      null,
    pickerSectionId,
    creatingQuiz,
    patchCourse,
    addItem,
    placeQuiz,
    createQuiz,
    saveQuiz,
    saveLesson,
    addSection,
    selectLesson: (lessonId: string) => {
      setCreatingQuiz(false);
      setPickerSectionId(null);
      setSelectedLessonId(lessonId);
    },
    openQuizPicker: (sectionId: string) => {
      setCreatingQuiz(false);
      setPickerSectionId(sectionId);
      setSelectedLessonId(null);
    },
    startCreateQuiz: () => setCreatingQuiz(true),
    cancelCreateQuiz: () => setCreatingQuiz(false),
    renameSection: (sectionId: string, title: string) =>
      update((prev) => renameCourseSection(prev, sectionId, title)),
    removeLesson: (lessonId: string) => {
      update((prev) => removeCurriculumItem(prev, lessonId));
      setSelectedLessonId(null);
      showToast(copy.lessonDeletedToast);
    },
  };
}
