import {
  emptyLessonContent,
  type LessonFileDraft,
  type LessonTextBlock,
  type QuizQuestionDraft,
  type TeacherCourseDraft,
  type TeacherCourseSection,
  type TeacherItemKind,
  type TeacherLessonDraft,
  type TeacherQuizDraft,
} from "./prototype-teacher-seed";
import { nextSectionOrder, quizCurriculumItem } from "./teacher-curriculum";

function textBlocks(value: unknown): LessonTextBlock[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Partial<LessonTextBlock>;
    return [
      {
        id: typeof row.id === "string" ? row.id : `block-${index}`,
        title: typeof row.title === "string" ? row.title : "",
        body: typeof row.body === "string" ? row.body : "",
      },
    ];
  });
}

function fileDrafts(
  value: unknown,
  tuteName: string,
  filesMissing: boolean,
): LessonFileDraft[] {
  if (filesMissing) {
    const name = tuteName.trim();
    return name
      ? [{ id: "file-tute", title: name, meta: `PDF · ${name}` }]
      : [];
  }
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Partial<LessonFileDraft>;
    return [
      {
        id: typeof row.id === "string" ? row.id : `file-${index}`,
        title: typeof row.title === "string" ? row.title : "",
        meta: typeof row.meta === "string" ? row.meta : "",
      },
    ];
  });
}

function isQuestion(value: unknown): value is QuizQuestionDraft {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<QuizQuestionDraft>;
  return (
    typeof row.id === "string" &&
    typeof row.prompt === "string" &&
    Array.isArray(row.options) &&
    row.options.length === 4 &&
    typeof row.correctIndex === "number"
  );
}

function itemKind(value: unknown): TeacherItemKind {
  return value === "quiz" || value === "lab" || value === "video"
    ? value
    : "video";
}

function normalizeLesson(
  raw: unknown,
  index: number,
  sections: TeacherCourseSection[],
  courses: TeacherCourseDraft[],
): { lesson: TeacherLessonDraft; sections: TeacherCourseSection[] } {
  const legacy = (raw ?? {}) as Partial<TeacherLessonDraft>;
  const courseId =
    typeof legacy.courseId === "string"
      ? legacy.courseId
      : (courses[0]?.id ?? "tc-1");
  let nextSections = sections;
  let sectionId = typeof legacy.sectionId === "string" ? legacy.sectionId : "";
  if (!sectionId) {
    let fallback = nextSections.find(
      (section) => section.courseId === courseId,
    );
    if (!fallback) {
      fallback = {
        id: `ts-migrated-${courseId}`,
        courseId,
        title: "Section 1",
        order: 0,
      };
      nextSections = [...nextSections, fallback];
    }
    sectionId = fallback.id;
  }
  const tuteName = typeof legacy.tuteName === "string" ? legacy.tuteName : "";
  return {
    sections: nextSections,
    lesson: {
      ...emptyLessonContent(),
      id: typeof legacy.id === "string" ? legacy.id : `tl-${index}`,
      courseId,
      sectionId,
      order: typeof legacy.order === "number" ? legacy.order : index,
      kind: itemKind(legacy.kind),
      title: typeof legacy.title === "string" ? legacy.title : "Lesson",
      subject: typeof legacy.subject === "string" ? legacy.subject : "Science",
      grade: typeof legacy.grade === "number" ? legacy.grade : 8,
      term: legacy.term ?? "Term 1",
      videoUrl: typeof legacy.videoUrl === "string" ? legacy.videoUrl : "",
      tuteName,
      duration: typeof legacy.duration === "string" ? legacy.duration : "",
      published: legacy.published !== false,
      quizId: typeof legacy.quizId === "string" ? legacy.quizId : null,
      labPrompt: typeof legacy.labPrompt === "string" ? legacy.labPrompt : "",
      overviewTitle:
        typeof legacy.overviewTitle === "string" ? legacy.overviewTitle : "",
      overviewBody:
        typeof legacy.overviewBody === "string" ? legacy.overviewBody : "",
      formula: typeof legacy.formula === "string" ? legacy.formula : "",
      educatorNote:
        typeof legacy.educatorNote === "string" ? legacy.educatorNote : "",
      rules: textBlocks(legacy.rules),
      revisionNotes: textBlocks(legacy.revisionNotes),
      files: fileDrafts(legacy.files, tuteName, !Array.isArray(legacy.files)),
    },
  };
}

function normalizeQuiz(raw: unknown): TeacherQuizDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const quiz = raw as Partial<TeacherQuizDraft>;
  if (typeof quiz.id !== "string") return null;
  return {
    id: quiz.id,
    title: typeof quiz.title === "string" ? quiz.title : "Quiz",
    subject: typeof quiz.subject === "string" ? quiz.subject : "Science",
    grade: typeof quiz.grade === "number" ? quiz.grade : 8,
    courseId: typeof quiz.courseId === "string" ? quiz.courseId : null,
    sectionId: typeof quiz.sectionId === "string" ? quiz.sectionId : null,
    questions: Array.isArray(quiz.questions)
      ? quiz.questions.filter(isQuestion)
      : [],
  };
}

function syncQuizRows(
  lessons: TeacherLessonDraft[],
  quizzes: TeacherQuizDraft[],
  sections: TeacherCourseSection[],
  courses: TeacherCourseDraft[],
): { lessons: TeacherLessonDraft[]; quizzes: TeacherQuizDraft[] } {
  const kept: TeacherLessonDraft[] = [];
  const seenQuizIds = new Set<string>();
  for (const lesson of lessons) {
    if (lesson.kind === "quiz" && lesson.quizId) {
      if (seenQuizIds.has(lesson.quizId)) continue;
      seenQuizIds.add(lesson.quizId);
    }
    kept.push(lesson);
  }

  const nextQuizzes = quizzes.map((quiz) => ({ ...quiz }));
  for (const lesson of kept) {
    if (lesson.kind !== "quiz" || !lesson.quizId) continue;
    const quiz = nextQuizzes.find((item) => item.id === lesson.quizId);
    if (!quiz) continue;
    quiz.courseId = lesson.courseId;
    quiz.sectionId = lesson.sectionId;
    if (!lesson.title) lesson.title = quiz.title;
  }

  for (const quiz of nextQuizzes) {
    const placed = kept.some(
      (lesson) => lesson.kind === "quiz" && lesson.quizId === quiz.id,
    );
    const section = sections.find(
      (item) => item.id === quiz.sectionId && item.courseId === quiz.courseId,
    );
    if (!quiz.courseId || !quiz.sectionId || !section) {
      if (!placed) {
        quiz.courseId = null;
        quiz.sectionId = null;
      }
      continue;
    }
    if (placed) continue;
    kept.push(
      quizCurriculumItem({
        id: `tlq-${quiz.id}`,
        quiz,
        course: courses.find((item) => item.id === quiz.courseId),
        sectionId: section.id,
        order: nextSectionOrder(kept, section.id),
      }),
    );
  }

  return { lessons: kept, quizzes: nextQuizzes };
}

export function normalizeStoredTeacherDrafts(input: {
  courses: TeacherCourseDraft[];
  sections: TeacherCourseSection[];
  lessons: unknown;
  quizzes: unknown;
  fallbackLessons: TeacherLessonDraft[];
  fallbackQuizzes: TeacherQuizDraft[];
}): {
  sections: TeacherCourseSection[];
  lessons: TeacherLessonDraft[];
  quizzes: TeacherQuizDraft[];
} {
  let sections = input.sections;
  const lessons: TeacherLessonDraft[] = [];
  if (Array.isArray(input.lessons)) {
    input.lessons.forEach((raw, index) => {
      const normalized = normalizeLesson(raw, index, sections, input.courses);
      sections = normalized.sections;
      lessons.push(normalized.lesson);
    });
  } else {
    lessons.push(...input.fallbackLessons);
  }

  const quizzes = Array.isArray(input.quizzes)
    ? input.quizzes.flatMap((raw) => {
        const quiz = normalizeQuiz(raw);
        return quiz ? [quiz] : [];
      })
    : input.fallbackQuizzes;

  const synced = syncQuizRows(lessons, quizzes, sections, input.courses);
  return { sections, ...synced };
}
