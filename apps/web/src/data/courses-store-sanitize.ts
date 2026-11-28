import {
  makeLocalized,
  type Course,
  type CourseStoreState,
  type Lesson,
  type Question,
  type Quiz,
  type Unit,
} from "./course-types";
import { INITIAL_COURSE_STORE } from "./courses-seed-extra";
import {
  ensureLocalized,
  isRecord,
  normalizeClass,
  normalizeProgressRows,
  normalizeStudent,
  normalizeTeacher,
  toGrade,
  toMedium,
  toStatus,
  toStringList,
} from "./courses-store-helpers";

export { isRecord };

function normalizeCourse(raw: Record<string, unknown>, idx: number): Course {
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `c-migrated-${idx}`,
    title: ensureLocalized(raw.title, "Course"),
    subject:
      typeof raw.subject === "string" && raw.subject ? raw.subject : "Science",
    grade: toGrade(raw.grade),
    medium: toMedium(raw.medium),
    term: raw.term === 1 || raw.term === 3 ? raw.term : 2,
    description: ensureLocalized(raw.description, ""),
    isFree: typeof raw.isFree === "boolean" ? raw.isFree : raw.priceLkr == null,
    priceLkr: typeof raw.priceLkr === "number" ? raw.priceLkr : null,
    status: toStatus(raw.status),
    releaseAt: typeof raw.releaseAt === "string" ? raw.releaseAt : undefined,
    teacherId:
      typeof raw.teacherId === "string" && raw.teacherId ? raw.teacherId : "",
    teacherName:
      typeof raw.teacherName === "string" && raw.teacherName
        ? raw.teacherName
        : undefined,
    syllabusRef:
      typeof raw.syllabusRef === "string" ? raw.syllabusRef : undefined,
    coverImageUrl:
      typeof raw.coverImageUrl === "string" && raw.coverImageUrl
        ? raw.coverImageUrl
        : undefined,
    createdAt:
      typeof raw.createdAt === "string"
        ? raw.createdAt
        : "2026-01-01T00:00:00Z",
    updatedAt:
      typeof raw.updatedAt === "string"
        ? raw.updatedAt
        : "2026-01-01T00:00:00Z",
  };
}

function normalizeUnit(raw: Record<string, unknown>, idx: number): Unit {
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `u-migrated-${idx}`,
    courseId:
      typeof raw.courseId === "string" && raw.courseId ? raw.courseId : "tc-1",
    title: ensureLocalized(raw.title, `Unit ${idx + 1}`),
    order: typeof raw.order === "number" ? raw.order : idx,
    status: toStatus(raw.status),
    releaseAt: typeof raw.releaseAt === "string" ? raw.releaseAt : undefined,
    nieUnitId: typeof raw.nieUnitId === "string" ? raw.nieUnitId : undefined,
  };
}

function normalizeLesson(raw: Record<string, unknown>, idx: number): Lesson {
  const kind =
    raw.kind === "video" ||
    raw.kind === "quiz" ||
    raw.kind === "lab" ||
    raw.kind === "assignment"
      ? raw.kind
      : "video";
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `l-migrated-${idx}`,
    courseId:
      typeof raw.courseId === "string" && raw.courseId ? raw.courseId : "tc-1",
    unitId: typeof raw.unitId === "string" && raw.unitId ? raw.unitId : "u-1",
    order: typeof raw.order === "number" ? raw.order : idx,
    kind,
    title: ensureLocalized(raw.title, `Lesson ${idx + 1}`),
    durationMin: typeof raw.durationMin === "number" ? raw.durationMin : 15,
    status: toStatus(raw.status),
    releaseAt: typeof raw.releaseAt === "string" ? raw.releaseAt : undefined,
    isFreePreview: Boolean(raw.isFreePreview),
    items: Array.isArray(raw.items)
      ? (raw.items.filter(isRecord) as unknown as Lesson["items"])
      : [],
    quizId: typeof raw.quizId === "string" ? raw.quizId : undefined,
  };
}

function normalizeQuiz(raw: Record<string, unknown>, idx: number): Quiz {
  const qIds = toStringList(raw.questionIds);
  const legacyIds =
    qIds.length === 0 && Array.isArray(raw.questions)
      ? raw.questions
          .filter(isRecord)
          .map((q) => (typeof q.id === "string" ? q.id : ""))
          .filter(Boolean)
      : [];
  const questionIds = qIds.length > 0 ? qIds : legacyIds;
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `q-migrated-${idx}`,
    title: ensureLocalized(raw.title, `Quiz ${idx + 1}`),
    subject: typeof raw.subject === "string" ? raw.subject : "Science",
    grade: toGrade(raw.grade),
    courseId:
      typeof raw.courseId === "string" && raw.courseId.trim()
        ? raw.courseId
        : "tc-1",
    unitId: typeof raw.unitId === "string" ? raw.unitId : undefined,
    questionIds,
    passMark: typeof raw.passMark === "number" ? raw.passMark : 1,
    timeLimitMin:
      typeof raw.timeLimitMin === "number" ? raw.timeLimitMin : undefined,
    retriesAllowed:
      typeof raw.retriesAllowed === "number" ||
      raw.retriesAllowed === "unlimited"
        ? raw.retriesAllowed
        : "unlimited",
    status: toStatus(raw.status),
  };
}

function normalizeQuestion(
  raw: Record<string, unknown>,
  idx: number,
): Question {
  const opts = Array.isArray(raw.options)
    ? raw.options.map((o) => ensureLocalized(o, ""))
    : [makeLocalized("A"), makeLocalized("B")];
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `qu-migrated-${idx}`,
    prompt: ensureLocalized(raw.prompt, "Question"),
    options: opts.length >= 2 ? opts : [makeLocalized("A"), makeLocalized("B")],
    correctIndex: typeof raw.correctIndex === "number" ? raw.correctIndex : 0,
    explanation: ensureLocalized(raw.explanation, ""),
    subject:
      typeof raw.subject === "string" && raw.subject ? raw.subject : "Science",
    grade: toGrade(raw.grade),
    nieUnitId: typeof raw.nieUnitId === "string" ? raw.nieUnitId : undefined,
    source:
      raw.source === "past-paper" ||
      raw.source === "term-test" ||
      raw.source === "teacher"
        ? raw.source
        : "teacher",
    sourceRef: typeof raw.sourceRef === "string" ? raw.sourceRef : undefined,
    difficulty:
      raw.difficulty === 1 || raw.difficulty === 2 || raw.difficulty === 3
        ? raw.difficulty
        : 2,
  };
}

function toRecords(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

export function normalizeCourseStore(raw: CourseStoreState): CourseStoreState {
  const rawCourses = toRecords(raw.courses);
  const rawUnits = toRecords(raw.units);
  const rawLessons = toRecords(raw.lessons);
  const rawQuizzes = toRecords(raw.quizzes);
  const rawQuestions = toRecords(raw.questions);
  const rawStudents = toRecords(raw.students);
  const rawClasses = toRecords(raw.classes);
  const rawTeachers = toRecords(raw.teachers);
  const teachers = Array.isArray(raw.teachers)
    ? rawTeachers.map(normalizeTeacher)
    : INITIAL_COURSE_STORE.teachers;
  const activeTeacherId =
    typeof raw.activeTeacherId === "string" &&
    teachers.some((t) => t.id === raw.activeTeacherId)
      ? raw.activeTeacherId
      : null;

  return {
    ...INITIAL_COURSE_STORE,
    ...raw,
    activeTeacherId,
    teachers,
    // Preserve empty arrays — do not re-seed catalog demos when user clears courses.
    courses: Array.isArray(raw.courses)
      ? rawCourses.map(normalizeCourse)
      : INITIAL_COURSE_STORE.courses,
    units: Array.isArray(raw.units)
      ? rawUnits.map(normalizeUnit)
      : INITIAL_COURSE_STORE.units,
    lessons: Array.isArray(raw.lessons)
      ? rawLessons.map(normalizeLesson)
      : INITIAL_COURSE_STORE.lessons,
    quizzes: Array.isArray(raw.quizzes)
      ? rawQuizzes.map(normalizeQuiz)
      : INITIAL_COURSE_STORE.quizzes,
    questions: Array.isArray(raw.questions)
      ? rawQuestions.map(normalizeQuestion)
      : INITIAL_COURSE_STORE.questions,
    students: Array.isArray(raw.students)
      ? rawStudents.map(normalizeStudent)
      : INITIAL_COURSE_STORE.students,
    classes: Array.isArray(raw.classes)
      ? rawClasses.map(normalizeClass)
      : INITIAL_COURSE_STORE.classes,
    activeStudentId:
      typeof raw.activeStudentId === "string" &&
      rawStudents.some((s) => s.id === raw.activeStudentId)
        ? raw.activeStudentId
        : null,
    enrollments: Array.isArray(raw.enrollments)
      ? raw.enrollments.filter(isRecord)
      : INITIAL_COURSE_STORE.enrollments,
    progress: normalizeProgressRows(raw.progress),
    assignments: Array.isArray(raw.assignments)
      ? raw.assignments.filter(isRecord)
      : INITIAL_COURSE_STORE.assignments,
    submissions: Array.isArray(raw.submissions)
      ? raw.submissions.filter(isRecord)
      : INITIAL_COURSE_STORE.submissions,
    announcements: Array.isArray(raw.announcements)
      ? raw.announcements.filter(isRecord).map((a) => ({
          ...a,
          message: ensureLocalized(a.message, ""),
        }))
      : INITIAL_COURSE_STORE.announcements,
  };
}
