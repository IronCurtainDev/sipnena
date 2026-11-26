import type { PrototypeState } from "./prototype-seed";
import {
  emptyLessonContent,
  type LessonFileDraft,
  type TeacherCourseDraft,
  type TeacherCourseSection,
  type TeacherLessonDraft,
  type TeacherQuizDraft,
} from "./prototype-teacher-seed";

export function nextSectionOrder(
  lessons: TeacherLessonDraft[],
  sectionId: string,
): number {
  return (
    lessons
      .filter((lesson) => lesson.sectionId === sectionId)
      .reduce((max, lesson) => Math.max(max, lesson.order), -1) + 1
  );
}

export function lessonFiles(lesson: TeacherLessonDraft): LessonFileDraft[] {
  const name = lesson.tuteName.trim();
  const files = lesson.files ?? [];
  if (!name) return files;
  const listed = files.some(
    (file) => file.title === name || file.meta.includes(name),
  );
  if (listed) return files;
  return [
    { id: `${lesson.id}-tute`, title: name, meta: `PDF · ${name}` },
    ...files,
  ];
}

export function quizCurriculumItem(input: {
  id: string;
  quiz: TeacherQuizDraft;
  course: TeacherCourseDraft | undefined;
  sectionId: string;
  order: number;
}): TeacherLessonDraft {
  return {
    ...emptyLessonContent(),
    id: input.id,
    courseId: input.quiz.courseId ?? input.course?.id ?? "",
    sectionId: input.sectionId,
    order: input.order,
    kind: "quiz",
    title: input.quiz.title,
    subject: input.quiz.subject,
    grade: input.quiz.grade,
    term: input.course?.term ?? "Term 1",
    videoUrl: "",
    tuteName: "",
    duration: "",
    published: true,
    quizId: input.quiz.id,
  };
}

export function createCurriculumItem(input: {
  id: string;
  course: TeacherCourseDraft;
  sectionId: string;
  order: number;
  kind: "video" | "lab";
  title: string;
  duration: string;
  labPrompt?: string;
}): TeacherLessonDraft {
  return {
    ...emptyLessonContent(),
    id: input.id,
    courseId: input.course.id,
    sectionId: input.sectionId,
    order: input.order,
    kind: input.kind,
    title: input.title,
    subject: input.course.subject,
    grade: input.course.grade,
    term: input.course.term,
    videoUrl:
      input.kind === "video"
        ? "https://media.sipnena.lk/g8-new-lesson.mp4"
        : "",
    tuteName: input.kind === "video" ? "Lesson_Tute_Handout.pdf" : "",
    duration: input.duration,
    published: true,
    labPrompt: input.labPrompt ?? "",
  };
}

export function placeQuizInSection(
  state: PrototypeState,
  quizId: string,
  courseId: string,
  sectionId: string,
  itemId: string,
): PrototypeState {
  const quiz = state.teacherQuizzes.find((item) => item.id === quizId);
  const course = state.teacherCourses.find((item) => item.id === courseId);
  if (!quiz || !course) return state;
  const placed = { ...quiz, courseId, sectionId };
  const existing = state.teacherLessons.find(
    (lesson) => lesson.kind === "quiz" && lesson.quizId === quizId,
  );
  const without = state.teacherLessons.filter(
    (lesson) => !(lesson.kind === "quiz" && lesson.quizId === quizId),
  );
  const order =
    existing && existing.sectionId === sectionId
      ? existing.order
      : nextSectionOrder(without, sectionId);
  return {
    ...state,
    teacherQuizzes: state.teacherQuizzes.map((item) =>
      item.id === quizId ? placed : item,
    ),
    teacherLessons: [
      ...without,
      quizCurriculumItem({
        id: existing?.id ?? itemId,
        quiz: placed,
        course,
        sectionId,
        order,
      }),
    ],
  };
}

export function removeCurriculumItem(
  state: PrototypeState,
  lessonId: string,
): PrototypeState {
  const item = state.teacherLessons.find((lesson) => lesson.id === lessonId);
  return {
    ...state,
    teacherLessons: state.teacherLessons.filter(
      (lesson) => lesson.id !== lessonId,
    ),
    teacherQuizzes:
      item?.kind === "quiz" && item.quizId
        ? state.teacherQuizzes.map((quiz) =>
            quiz.id === item.quizId
              ? { ...quiz, courseId: null, sectionId: null }
              : quiz,
          )
        : state.teacherQuizzes,
  };
}

export function patchTeacherCourse(
  state: PrototypeState,
  courseId: string,
  patch: Partial<TeacherCourseDraft>,
): PrototypeState {
  return {
    ...state,
    teacherCourses: state.teacherCourses.map((course) =>
      course.id === courseId ? { ...course, ...patch } : course,
    ),
  };
}

export function addCourseSection(
  state: PrototypeState,
  section: TeacherCourseSection,
): PrototypeState {
  return {
    ...state,
    teacherCourseSections: [...state.teacherCourseSections, section],
  };
}

export function renameCourseSection(
  state: PrototypeState,
  sectionId: string,
  title: string,
): PrototypeState {
  return {
    ...state,
    teacherCourseSections: state.teacherCourseSections.map((section) =>
      section.id === sectionId ? { ...section, title } : section,
    ),
  };
}

export function appendCurriculumItem(
  state: PrototypeState,
  item: TeacherLessonDraft,
): PrototypeState {
  return { ...state, teacherLessons: [...state.teacherLessons, item] };
}

export function saveCurriculumLesson(
  state: PrototypeState,
  lesson: TeacherLessonDraft,
): PrototypeState {
  return {
    ...state,
    teacherLessons: state.teacherLessons.map((item) =>
      item.id === lesson.id ? lesson : item,
    ),
  };
}

export function deleteTeacherCourse(
  state: PrototypeState,
  courseId: string,
): PrototypeState {
  return {
    ...state,
    teacherCourses: state.teacherCourses.filter(
      (course) => course.id !== courseId,
    ),
    teacherCourseSections: state.teacherCourseSections.filter(
      (section) => section.courseId !== courseId,
    ),
    teacherLessons: state.teacherLessons.filter(
      (lesson) => lesson.courseId !== courseId,
    ),
    teacherQuizzes: state.teacherQuizzes.map((quiz) =>
      quiz.courseId === courseId
        ? { ...quiz, courseId: null, sectionId: null }
        : quiz,
    ),
  };
}
