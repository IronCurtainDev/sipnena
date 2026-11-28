import type { PrototypeState } from "./prototype-seed";

/** Known legacy demo ids from the old populated prototype seed. */
const SEED_SLIP_IDS = new Set(["slip-101", "slip-102", "slip-103"]);
const SEED_DOUBT_IDS = new Set(["doubt-1", "doubt-2", "doubt-3"]);
const SEED_TEACHER_COURSE_IDS = new Set(["tc-1", "tc-2", "tc-3"]);
const SEED_STUDENT_NAMES = new Set([
  "Kasun Perera",
  "Nethmi Fernando",
  "Kavindu Silva",
  "Sahan Bandara",
]);
const SEED_BOOKMARK_IDS = new Set([
  "les-light-4",
  "note-light-short",
  "pp-2023-sci-mcq-12",
  "note-algebra-formula",
]);
const SEED_DOWNLOAD_IDS = new Set([
  "tute-light-pdf",
  "textbook-sci-g8",
  "video-mirrors-4",
]);
const SEED_SEARCHES = new Set([
  "Alokaya",
  "Quadratic equations",
  "ගණිතය 2023",
  "Newton",
]);

/** Remove legacy demo rows from an already-persisted prototype state. */
export function stripPrototypeSeedData(
  state: PrototypeState,
): PrototypeState {
  const hasSeed =
    SEED_STUDENT_NAMES.has(state.studentName) ||
    state.activeChildId === "kasun" ||
    state.activeChildId === "nethmi" ||
    state.bankSlips.some(
      (s) =>
        SEED_SLIP_IDS.has(s.id) || SEED_STUDENT_NAMES.has(s.studentName),
    ) ||
    state.doubts.some(
      (d) =>
        SEED_DOUBT_IDS.has(d.id) || SEED_STUDENT_NAMES.has(d.studentName),
    ) ||
    state.teacherCourses.some((c) => SEED_TEACHER_COURSE_IDS.has(c.id)) ||
    state.bookmarkedIds.some((id) => SEED_BOOKMARK_IDS.has(id)) ||
    state.downloadedIds.some((id) => SEED_DOWNLOAD_IDS.has(id)) ||
    state.recentSearches.some((s) => SEED_SEARCHES.has(s));

  if (!hasSeed) return state;

  const teacherCourses = state.teacherCourses.filter(
    (c) => !SEED_TEACHER_COURSE_IDS.has(c.id),
  );
  const keepCourse = (id: string) => teacherCourses.some((c) => c.id === id);

  return {
    ...state,
    studentName: SEED_STUDENT_NAMES.has(state.studentName)
      ? ""
      : state.studentName,
    activeChildId:
      state.activeChildId === "kasun" || state.activeChildId === "nethmi"
        ? ""
        : state.activeChildId,
    bookmarkedIds: state.bookmarkedIds.filter(
      (id) => !SEED_BOOKMARK_IDS.has(id),
    ),
    downloadedIds: state.downloadedIds.filter(
      (id) => !SEED_DOWNLOAD_IDS.has(id),
    ),
    recentSearches: state.recentSearches.filter((s) => !SEED_SEARCHES.has(s)),
    bankSlips: state.bankSlips.filter(
      (s) =>
        !SEED_SLIP_IDS.has(s.id) && !SEED_STUDENT_NAMES.has(s.studentName),
    ),
    doubts: state.doubts.filter(
      (d) =>
        !SEED_DOUBT_IDS.has(d.id) && !SEED_STUDENT_NAMES.has(d.studentName),
    ),
    teacherCourses,
    teacherCourseSections: state.teacherCourseSections.filter((s) =>
      Boolean(s.courseId) && keepCourse(s.courseId),
    ),
    teacherLessons: state.teacherLessons.filter(
      (l) => Boolean(l.courseId) && keepCourse(l.courseId),
    ),
    teacherQuizzes: state.teacherQuizzes.filter((q) => {
      if (!q.courseId) return !SEED_TEACHER_COURSE_IDS.has(q.id);
      return keepCourse(q.courseId);
    }),
    // Live sessions are not course-scoped in the prototype model.
    teacherLiveSessions: state.teacherLiveSessions,
  };
}
