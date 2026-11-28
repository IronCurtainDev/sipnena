import {
  getCompletedLessonIds,
  getCourseById,
  getLessonsForUnit,
  getQuizWithQuestions,
  getUnitsForCourse,
  pickLocalized,
  resolveActiveStudentId,
  type CourseStoreState,
  type Question,
  type Quiz,
} from "@/data/courses";
import type { QuizQuestion } from "@/features/quiz/types";
import type { AppLanguage } from "@/lib/language";
import type {
  AuthoredLessonView,
  CourseLessonBundle,
  LessonFileItem,
} from "./course-lesson-model";
import type { LessonPlaylistItem, PlaylistSection } from "./types";

const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

export function toStorePlayableQuestions(
  quiz: Quiz,
  questions: Question[],
  lang: AppLanguage,
): QuizQuestion[] {
  const gradeLabel =
    lang === "si"
      ? `${quiz.grade} ශ්‍රේණිය`
      : lang === "ta"
        ? `தரம் ${quiz.grade}`
        : `Grade ${quiz.grade}`;
  const explanationTitle =
    lang === "si"
      ? "පැහැදිලි කිරීම"
      : lang === "ta"
        ? "விளக்கம்"
        : "Explanation";

  return questions.map((q, index) => ({
    id: index + 1,
    questionNumber: index + 1,
    totalQuestions: questions.length,
    gradeBadge: gradeLabel,
    subjectBadge: quiz.subject ?? "Science",
    title: pickLocalized(q.prompt, lang),
    diagramType: "plane_reflection",
    showDiagram: false,
    options: q.options.map((opt, optionIndex) => ({
      id: LETTERS[optionIndex] ?? "A",
      text: pickLocalized(opt, lang),
      isCorrect: optionIndex === q.correctIndex,
    })),
    explanation: {
      title: explanationTitle,
      body: pickLocalized(q.explanation, lang),
    },
  }));
}

export function buildStoreCourseLessonBundle(
  state: CourseStoreState,
  rawCourseId: string | undefined,
  lang: AppLanguage,
  options?: { includeDrafts?: boolean },
): CourseLessonBundle | null {
  const course = getCourseById(state, rawCourseId);
  if (!course) return null;

  const includeDrafts = options?.includeDrafts ?? false;
  const units = getUnitsForCourse(state, course.id, { includeDrafts });
  const studentId = resolveActiveStudentId(state.activeStudentId);
  const completedSet = new Set(
    getCompletedLessonIds(state, studentId, course.id),
  );

  const byId: Record<string, AuthoredLessonView> = {};
  const sidebarFiles: LessonFileItem[] = [];
  const sidebarQuizzes: CourseLessonBundle["sidebarQuizzes"] = [];
  let number = 1;

  const playlist: PlaylistSection[] = units.map((unit, uIdx) => {
    const lessons = getLessonsForUnit(state, unit.id, { includeDrafts });
    const unitTitle = pickLocalized(unit.title, lang, `Unit ${uIdx + 1}`);
    return {
      id: unit.id,
      titleKey: unitTitle,
      statusBadgeKey: unitTitle,
      statusColor: "blue",
      status: unit.status,
      totalDuration: String(lessons.length),
      lessons: lessons.map((lesson) => {
        const title = pickLocalized(lesson.title, lang);
        const textItem = lesson.items.find((it) => it.type === "text");
        const formulaItem = lesson.items.find((it) => it.type === "formula");
        const teacherNoteItem = lesson.items.find(
          (it) => it.type === "teacherNote",
        );
        const videoItem = lesson.items.find((it) => it.type === "video");
        const assignItem = lesson.items.find((it) => it.type === "assignment");
        const ruleItems = lesson.items
          .filter((it) => it.type === "rule")
          .map((it) => ({
            title: pickLocalized(it.title, lang),
            body: pickLocalized(it.body, lang),
          }));
        const noteItems = lesson.items
          .filter((it) => it.type === "note")
          .map((it) => ({
            title: pickLocalized(it.title, lang),
            body: pickLocalized(it.body, lang),
          }));
        const files: LessonFileItem[] = lesson.items
          .filter((it) => it.type === "file")
          .map((it) => ({
            id: it.id,
            title: pickLocalized(it.title, lang, it.fileName),
            meta: it.sizeKb
              ? `PDF · ${(it.sizeKb / 1024).toFixed(1)} MB`
              : it.fileName,
          }));

        const { quiz, questions } =
          lesson.kind === "quiz"
            ? getQuizWithQuestions(state, lesson.quizId)
            : { quiz: undefined, questions: [] };

        const viewKind: AuthoredLessonView["kind"] =
          lesson.kind === "quiz"
            ? "quiz"
            : lesson.kind === "lab"
              ? "lab"
              : lesson.kind === "assignment"
                ? "assignment"
                : "video";

        byId[lesson.id] = {
          kind: viewKind,
          title,
          labPrompt:
            textItem?.type === "text" ? pickLocalized(textItem.body, lang) : "",
          overviewTitle:
            textItem?.type === "text"
              ? pickLocalized(textItem.heading, lang, title)
              : title,
          overviewBody:
            textItem?.type === "text" ? pickLocalized(textItem.body, lang) : "",
          formula:
            formulaItem?.type === "formula" ? formulaItem.latexOrText : "",
          educatorNote:
            teacherNoteItem?.type === "teacherNote"
              ? pickLocalized(teacherNoteItem.body, lang)
              : "",
          rules: ruleItems,
          revisionNotes: noteItems,
          files,
          questions:
            lesson.kind === "quiz" && quiz
              ? toStorePlayableQuestions(quiz, questions, lang)
              : null,
          quizTitle: quiz ? pickLocalized(quiz.title, lang) : title,
          quizId: quiz?.id,
          quizQuestionIds: quiz?.questionIds,
          assignment:
            assignItem?.type === "assignment"
              ? {
                  instructions: pickLocalized(assignItem.instructions, lang),
                  dueAt: assignItem.dueAt,
                  maxScore: assignItem.maxScore ?? 10,
                }
              : undefined,
          videoItem: videoItem?.type === "video" ? videoItem : undefined,
          status: lesson.status,
        };

        sidebarFiles.push(...files);
        if (lesson.kind === "quiz") {
          sidebarQuizzes.push({
            id: lesson.id,
            title: quiz ? pickLocalized(quiz.title, lang) : title,
            questionCount: questions.length,
          });
        }

        const playlistItem: LessonPlaylistItem = {
          id: lesson.id,
          number,
          titleKey: title,
          duration: `${lesson.durationMin ?? 12} min`,
          typeKey: lesson.kind,
          iconType: lesson.kind,
          isCompleted: completedSet.has(lesson.id),
          status: lesson.status,
        };
        number += 1;
        return playlistItem;
      }),
    };
  });

  const allLessons = playlist.flatMap((s) => s.lessons);
  return {
    playlist,
    byId,
    sidebarFiles,
    sidebarQuizzes,
    firstId: allLessons[0]?.id ?? null,
    resolvedCourseId: course.id,
  };
}
