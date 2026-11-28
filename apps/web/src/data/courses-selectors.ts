import type {
  Course,
  CourseStoreState,
  Lesson,
  Progress,
  Question,
  Quiz,
  QuizAttemptRecord,
  Unit,
} from "./course-types";
import { isReleasedToStudent } from "./course-types";

/** Resolve only an exact course id — never remap to another course. */
export function resolveCourseId(
  state: CourseStoreState,
  rawCourseId: string | undefined,
): string {
  if (!rawCourseId) return "";
  return state.courses.some((c) => c.id === rawCourseId) ? rawCourseId : "";
}

export function getCourseById(
  state: CourseStoreState,
  rawCourseId: string | undefined,
): Course | undefined {
  if (!rawCourseId) return undefined;
  return state.courses.find((c) => c.id === rawCourseId);
}

export function getUnitsForCourse(
  state: CourseStoreState,
  courseId: string,
  options?: { includeDrafts?: boolean; nowMs?: number },
): Unit[] {
  const includeDrafts = options?.includeDrafts ?? false;
  const nowMs = options?.nowMs ?? Date.now();
  return state.units
    .filter((u) => {
      if (u.courseId !== courseId) return false;
      if (includeDrafts) return true;
      return isReleasedToStudent(u, nowMs);
    })
    .sort((a, b) => a.order - b.order);
}

export function getLessonsForUnit(
  state: CourseStoreState,
  unitId: string,
  options?: { includeDrafts?: boolean; nowMs?: number },
): Lesson[] {
  const includeDrafts = options?.includeDrafts ?? false;
  const nowMs = options?.nowMs ?? Date.now();
  return state.lessons
    .filter((l) => {
      if (l.unitId !== unitId) return false;
      if (includeDrafts) return true;
      return isReleasedToStudent(l, nowMs);
    })
    .sort((a, b) => a.order - b.order);
}

export function getLessonsForCourse(
  state: CourseStoreState,
  courseId: string,
  options?: { includeDrafts?: boolean; nowMs?: number },
): Lesson[] {
  const units = getUnitsForCourse(state, courseId, options);
  return units.flatMap((u) => getLessonsForUnit(state, u.id, options));
}

export function getCourseStatusCounts(
  state: CourseStoreState,
  courseId: string,
) {
  const lessons = state.lessons.filter((l) => l.courseId === courseId);
  const units = state.units.filter((u) => u.courseId === courseId);
  let published = 0;
  let scheduled = 0;
  let draft = 0;
  for (const lesson of lessons) {
    if (lesson.status === "published") published += 1;
    else if (lesson.status === "scheduled") scheduled += 1;
    else draft += 1;
  }
  return {
    unitCount: units.length,
    totalLessons: lessons.length,
    publishedLessons: published,
    scheduledLessons: scheduled,
    draftLessons: draft,
  };
}

export function getCourseTotalMinutes(
  state: CourseStoreState,
  courseId: string,
  includeDrafts = false,
): number {
  const lessons = getLessonsForCourse(state, courseId, { includeDrafts });
  return lessons.reduce((sum, l) => sum + (l.durationMin ?? 0), 0);
}

export function getStudentEnrollments(
  state: CourseStoreState,
  studentId: string,
) {
  const studentClasses = new Set(
    state.classes
      .filter((c) => c.studentIds.includes(studentId))
      .map((c) => c.id),
  );
  return state.enrollments.filter(
    (e) =>
      e.studentId === studentId ||
      (e.classId !== undefined && studentClasses.has(e.classId)),
  );
}

export function isCourseAssignedToStudent(
  state: CourseStoreState,
  courseId: string,
  studentId: string,
): boolean {
  return getStudentEnrollments(state, studentId).some(
    (e) => e.courseId === courseId && e.source === "class-assignment",
  );
}

export function getStudentProgressEntries(
  state: CourseStoreState,
  studentId: string,
  courseId?: string,
): Progress[] {
  return state.progress.filter(
    (p) => p.studentId === studentId && (!courseId || p.courseId === courseId),
  );
}

export function getCompletedLessonIds(
  state: CourseStoreState,
  studentId: string,
  courseId?: string,
): string[] {
  return getStudentProgressEntries(state, studentId, courseId)
    .filter((p) => p.status === "completed")
    .map((p) => p.lessonId);
}

export function getStudentQuizAttempts(
  state: CourseStoreState,
  studentId: string,
  courseId?: string,
): QuizAttemptRecord[] {
  return getStudentProgressEntries(state, studentId, courseId).flatMap(
    (p) => p.quizAttempts ?? [],
  );
}

export function isQuizAttemptPassed(
  attempt: QuizAttemptRecord,
  quiz?: Quiz,
): boolean {
  const passMark = quiz?.passMark ?? Math.max(1, Math.ceil(attempt.total / 2));
  return attempt.score >= passMark;
}

export function getStudentLastActiveAt(
  state: CourseStoreState,
  studentId: string,
): string | undefined {
  const dates: string[] = [];
  for (const row of getStudentProgressEntries(state, studentId)) {
    if (row.completedAt) dates.push(row.completedAt);
    for (const att of row.quizAttempts ?? []) {
      if (att.at) dates.push(att.at);
    }
  }
  return dates.sort().reverse()[0];
}

export function getCourseProgressPercent(
  state: CourseStoreState,
  studentId: string,
  courseId: string,
): { completed: number; total: number; percent: number } {
  const lessons = getLessonsForCourse(state, courseId, {
    includeDrafts: false,
  });
  const total = lessons.length;
  if (total === 0) return { completed: 0, total: 0, percent: 0 };
  const completedSet = new Set(
    getCompletedLessonIds(state, studentId, courseId),
  );
  const completed = lessons.filter((l) => completedSet.has(l.id)).length;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
  };
}

export function getQuizWithQuestions(
  state: CourseStoreState,
  quizId: string | undefined,
): { quiz: Quiz | undefined; questions: Question[] } {
  const quiz = quizId
    ? state.quizzes.find((q) => q.id === quizId)
    : undefined;
  if (!quiz) return { quiz: undefined, questions: [] };
  const byId = new Map(state.questions.map((q) => [q.id, q]));
  const questions = quiz.questionIds
    .map((id) => byId.get(id))
    .filter((q): q is Question => Boolean(q));
  return { quiz, questions };
}

export function computeStudentLearningStats(
  state: CourseStoreState,
  studentId: string,
) {
  const completedLessons = getCompletedLessonIds(state, studentId).length;
  const quizAttempts = getStudentQuizAttempts(state, studentId);
  const quizById = new Map(state.quizzes.map((q) => [q.id, q]));
  const passedQuizzes = quizAttempts.filter((a) =>
    isQuizAttemptPassed(a, quizById.get(a.quizId)),
  ).length;
  const student = state.students.find((s) => s.id === studentId);
  const xp = (student?.xp ?? 0) + completedLessons * 25 + passedQuizzes * 40;
  const streakDays = Math.min(
    14,
    Math.max(state.streakDays || 1, completedLessons + quizAttempts.length),
  );
  return {
    completedLessons,
    quizAttemptsCount: quizAttempts.length,
    passedQuizzes,
    xp,
    streakDays,
    freezeAvailable: !state.streakFreezeUsedThisWeek && streakDays >= 3,
  };
}
