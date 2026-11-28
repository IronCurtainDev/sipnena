import type {
  Grade,
  Item,
  ItemKind,
  Lesson,
  Localized,
  PublishStatus,
  Question,
  Quiz,
} from "./course-types";
import { makeLocalized } from "./course-types";
import { updateCourseStore } from "./courses-store-core";

export function addLessonToUnit(
  courseId: string,
  unitId: string,
  kind: ItemKind = "video",
  title?: Localized,
): string {
  const lessonId = `tl-${Date.now()}`;
  updateCourseStore((prev) => {
    const existing = prev.lessons.filter((l) => l.unitId === unitId);
    const items: Item[] =
      kind === "assignment"
        ? [
            {
              id: `item-${lessonId}-a`,
              type: "assignment",
              instructions: {
                en: "Complete the task and upload a photo or typed answer.",
                si: "පැවරුම සම්පූර්ණ කර ඡායාරූපයක් හෝ පිළිතුරක් යොමු කරන්න.",
                ta: "பணியை முடித்து படம் அல்லது பதிலைச் சமர்ப்பிக்கவும்.",
              },
              maxScore: 10,
            },
          ]
        : [];
    const lesson: Lesson = {
      id: lessonId,
      courseId,
      unitId,
      order: existing.length,
      kind,
      title: title ?? {
        en: `Lesson ${existing.length + 1}`,
        si: `පාඩම ${existing.length + 1}`,
        ta: `பாடம் ${existing.length + 1}`,
      },
      durationMin: 12,
      status: "draft",
      items,
      quizId: kind === "quiz" ? prev.quizzes[0]?.id : undefined,
    };
    return { ...prev, lessons: [...prev.lessons, lesson] };
  });
  return lessonId;
}

export function updateLessonFields(lessonId: string, patch: Partial<Lesson>) {
  updateCourseStore((prev) => ({
    ...prev,
    lessons: prev.lessons.map((l) =>
      l.id === lessonId ? { ...l, ...patch } : l,
    ),
  }));
}

export function moveOrReorderLesson(
  unitId: string,
  orderedLessonIds: string[],
  movingLessonId?: string,
) {
  updateCourseStore((prev) => {
    const orderMap = new Map(orderedLessonIds.map((id, i) => [id, i]));
    return {
      ...prev,
      lessons: prev.lessons.map((l) => {
        if (l.id === movingLessonId) {
          return { ...l, unitId, order: orderMap.get(l.id) ?? 0 };
        }
        if (l.unitId === unitId && orderMap.has(l.id)) {
          return { ...l, order: orderMap.get(l.id)! };
        }
        return l;
      }),
    };
  });
}

export function duplicateLesson(lessonId: string): string | null {
  const newId = `tl-${Date.now()}`;
  let ok = false;
  updateCourseStore((prev) => {
    const src = prev.lessons.find((l) => l.id === lessonId);
    if (!src) return prev;
    ok = true;
    const siblingCount = prev.lessons.filter(
      (l) => l.unitId === src.unitId,
    ).length;
    const copy: Lesson = {
      ...src,
      id: newId,
      order: siblingCount,
      status: "draft",
      title: {
        en: `${src.title.en ?? ""} (Copy)`,
        si: `${src.title.si ?? ""} (පිටපත)`,
        ta: `${src.title.ta ?? ""} (நகல்)`,
      },
    };
    return { ...prev, lessons: [...prev.lessons, copy] };
  });
  return ok ? newId : null;
}

export function deleteLesson(lessonId: string) {
  updateCourseStore(
    (prev) => ({
      ...prev,
      lessons: prev.lessons.filter((l) => l.id !== lessonId),
    }),
    { recordUndo: true },
  );
}

export function setLessonStatus(
  lessonId: string,
  status: PublishStatus,
  releaseAt?: string,
) {
  updateLessonFields(lessonId, { status, releaseAt });
}

export function upsertQuestionInBank(question: Question): Question {
  updateCourseStore((prev) => {
    const exists = prev.questions.some((q) => q.id === question.id);
    const questions = exists
      ? prev.questions.map((q) => (q.id === question.id ? question : q))
      : [question, ...prev.questions];
    return { ...prev, questions };
  });
  return question;
}

export function saveQuizRecord(
  quiz: Quiz,
  extraQuestions: Question[] = [],
  cloneModifiedQuestionIds?: Record<string, Question>,
) {
  updateCourseStore((prev) => {
    const questionMap = new Map(prev.questions.map((q) => [q.id, q]));
    for (const q of extraQuestions) {
      questionMap.set(q.id, q);
    }
    if (cloneModifiedQuestionIds) {
      for (const q of Object.values(cloneModifiedQuestionIds)) {
        questionMap.set(q.id, q);
      }
    }
    const exists = prev.quizzes.some((q) => q.id === quiz.id);
    const quizzes = exists
      ? prev.quizzes.map((q) => (q.id === quiz.id ? quiz : q))
      : [quiz, ...prev.quizzes];
    return {
      ...prev,
      questions: Array.from(questionMap.values()),
      quizzes,
    };
  });
}

export function createInlineCourseQuiz(input: {
  title: Localized;
  subject: string;
  grade: number;
  courseId: string;
  unitId: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  status?: PublishStatus;
}): string {
  const safeGrade = (
    [6, 7, 8, 9, 10, 11].includes(input.grade) ? input.grade : 8
  ) as Grade;
  const status: PublishStatus = input.status ?? "draft";
  const qId = `q-${Date.now()}`;
  const quizId = `tq-${Date.now()}`;
  const question: Question = {
    id: qId,
    prompt: makeLocalized(input.prompt),
    options: input.options.map((opt) => makeLocalized(opt)),
    correctIndex: input.correctIndex,
    explanation: makeLocalized(input.explanation),
    subject: input.subject,
    grade: safeGrade,
    source: "teacher",
    difficulty: 2,
  };
  const newQuiz: Quiz = {
    id: quizId,
    title: input.title,
    subject: input.subject,
    grade: safeGrade,
    courseId: input.courseId,
    unitId: input.unitId,
    questionIds: [qId],
    passMark: 1,
    retriesAllowed: "unlimited",
    status,
  };
  saveQuizRecord(newQuiz, [question]);
  const lessonId = addLessonToUnit(
    input.courseId,
    input.unitId,
    "quiz",
    input.title,
  );
  updateLessonFields(lessonId, { quizId, status });
  return lessonId;
}
