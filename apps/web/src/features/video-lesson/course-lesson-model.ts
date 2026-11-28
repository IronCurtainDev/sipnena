import type { Item, PublishStatus } from "@/data/courses";
import type { PrototypeState } from "@/lib/prototype-state";
import type { QuizQuestion } from "@/features/quiz/types";
import type {
  QuestionResultItem,
  QuizResultSummary,
} from "@/features/quiz/result-types";
import { lessonFiles } from "@/lib/teacher-curriculum";
import type { LessonPlaylistItem, PlaylistSection } from "./types";

const LETTERS = ["A", "B", "C", "D"] as const;

export interface LessonFileItem {
  id: string;
  title: string;
  meta: string;
}

export interface AuthoredLessonView {
  kind: "video" | "quiz" | "lab" | "assignment";
  title: string;
  labPrompt: string;
  overviewTitle: string;
  overviewBody: string;
  formula: string;
  educatorNote: string;
  rules: { title: string; body: string }[];
  revisionNotes: { title: string; body: string }[];
  files: LessonFileItem[];
  questions: QuizQuestion[] | null;
  quizTitle: string;
  quizId?: string;
  quizQuestionIds?: string[];
  assignment?: {
    instructions: string;
    dueAt?: string;
    maxScore: number;
  };
  videoItem?: Extract<Item, { type: "video" }>;
  status?: PublishStatus;
}

export interface CourseLessonBundle {
  playlist: PlaylistSection[];
  byId: Record<string, AuthoredLessonView>;
  sidebarFiles: LessonFileItem[];
  sidebarQuizzes: { id: string; title: string; questionCount: number }[];
  firstId: string | null;
  resolvedCourseId?: string;
}

export function toPlayableQuestions(quiz: {
  grade: number;
  subject: string;
  questions: {
    prompt: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
  }[];
}): QuizQuestion[] {
  return quiz.questions.map((question, index) => ({
    id: index + 1,
    questionNumber: index + 1,
    totalQuestions: quiz.questions.length,
    gradeBadge: `Grade ${quiz.grade}`,
    subjectBadge: quiz.subject,
    title: question.prompt,
    diagramType: "plane_reflection",
    showDiagram: false,
    options: question.options.map((text, optionIndex) => ({
      id: LETTERS[optionIndex] ?? "A",
      text,
      isCorrect: optionIndex === question.correctIndex,
    })),
    explanation: { title: "Explanation", body: question.explanation },
  }));
}

export function scorePlayableQuiz(
  questions: QuizQuestion[],
  answers: Record<number, string>,
): QuizResultSummary {
  const items: QuestionResultItem[] = questions.map((question) => {
    const correct = question.options.find((option) => option.isCorrect);
    const chosen = question.options.find(
      (option) => option.id === answers[question.id],
    );
    const isCorrect = Boolean(chosen && chosen.id === correct?.id);
    return {
      id: question.id,
      questionNumber: question.questionNumber,
      title: question.title,
      topicTitle: question.subjectBadge,
      isCorrect,
      userAnswer: chosen?.text ?? "",
      correctAnswer: correct?.text ?? "",
      teacherTip: question.explanation.body,
      lessonRef: "",
      marks: isCorrect ? 1 : 0,
    };
  });
  const score = items.filter((item) => item.isCorrect).length;
  const passScore = Math.max(1, Math.ceil(questions.length / 2));
  return {
    score,
    totalQuestions: questions.length,
    passScore,
    isPassed: score >= passScore,
    timeSpent: "",
    attemptsUsed: 1,
    unitTitle: "",
    scienceTip: "",
    questions: items,
  };
}

export function flatLessons(playlist: PlaylistSection[]): LessonPlaylistItem[] {
  return playlist.flatMap((section) => section.lessons);
}

export function nextItemId(
  playlist: PlaylistSection[],
  id: string,
): string | null {
  const items = flatLessons(playlist);
  const index = items.findIndex((item) => item.id === id);
  return items[index + 1]?.id ?? null;
}

export function nextQuizItem(
  playlist: PlaylistSection[],
  id: string,
): LessonPlaylistItem | null {
  const items = flatLessons(playlist);
  const index = items.findIndex((item) => item.id === id);
  return (
    items.slice(index + 1).find((item) => item.iconType === "quiz") ?? null
  );
}

export function buildCourseLessonModel(
  state: PrototypeState,
  courseId: string,
): CourseLessonBundle | null {
  const course = state.teacherCourses.find((item) => item.id === courseId);
  if (!course) return null;
  const sections = state.teacherCourseSections
    .filter((section) => section.courseId === courseId)
    .sort((a, b) => a.order - b.order);
  const lessons = state.teacherLessons.filter(
    (lesson) => lesson.courseId === courseId,
  );
  const byId: Record<string, AuthoredLessonView> = {};
  const sidebarFiles: LessonFileItem[] = [];
  const sidebarQuizzes: CourseLessonBundle["sidebarQuizzes"] = [];
  let number = 1;

  const playlist: PlaylistSection[] = sections.map((section) => {
    const items = lessons
      .filter((lesson) => lesson.sectionId === section.id)
      .sort((a, b) => a.order - b.order);
    return {
      id: section.id,
      titleKey: section.title,
      statusBadgeKey: section.title,
      statusColor: "blue",
      totalDuration: String(items.length),
      lessons: items.map((lesson) => {
        const quiz = lesson.quizId
          ? (state.teacherQuizzes.find((item) => item.id === lesson.quizId) ??
            null)
          : null;
        const files = lesson.kind === "quiz" ? [] : lessonFiles(lesson);
        byId[lesson.id] = {
          kind: lesson.kind,
          title: lesson.title,
          labPrompt: lesson.labPrompt,
          overviewTitle: lesson.overviewTitle,
          overviewBody: lesson.overviewBody,
          formula: lesson.formula,
          educatorNote: lesson.educatorNote,
          rules: lesson.rules,
          revisionNotes: lesson.revisionNotes,
          files,
          questions:
            lesson.kind === "quiz"
              ? quiz
                ? toPlayableQuestions(quiz)
                : []
              : null,
          quizTitle: quiz?.title ?? lesson.title,
        };
        sidebarFiles.push(...files);
        if (lesson.kind === "quiz") {
          sidebarQuizzes.push({
            id: lesson.id,
            title: quiz?.title ?? lesson.title,
            questionCount: quiz?.questions.length ?? 0,
          });
        }
        const item: LessonPlaylistItem = {
          id: lesson.id,
          number: number,
          titleKey: lesson.title,
          duration: lesson.duration,
          typeKey: lesson.kind,
          iconType: lesson.kind,
        };
        number += 1;
        return item;
      }),
    };
  });

  return {
    playlist,
    byId,
    sidebarFiles,
    sidebarQuizzes,
    firstId: flatLessons(playlist)[0]?.id ?? null,
  };
}
