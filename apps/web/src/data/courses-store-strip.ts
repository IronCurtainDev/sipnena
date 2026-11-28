import type { CourseStoreState } from "./course-types";

/** Legacy demo catalog ids — stripped from localStorage on load. */
const CATALOG_SEED_COURSE_IDS = new Set([
  "tc-1",
  "tc-2",
  "tc-3",
  "human-body",
  "optics-mirrors",
  "plant-nutrition",
  "matter-reactions",
]);

/** Legacy demo student/class ids from the old seed. */
const SEED_STUDENT_IDS = new Set([
  "kasun",
  "nethmi",
  "kavindu",
  "sahan",
  "aaranya",
]);
const SEED_CLASS_IDS = new Set(["class-8a-si", "class-11b-en"]);

/** Remove legacy demo catalog courses and their dependent rows. */
export function stripCatalogSeedCourses(
  store: CourseStoreState,
): CourseStoreState {
  const hasCourseSeed =
    store.courses.some((c) => CATALOG_SEED_COURSE_IDS.has(c.id)) ||
    store.units.some((u) => CATALOG_SEED_COURSE_IDS.has(u.courseId)) ||
    store.lessons.some((l) => CATALOG_SEED_COURSE_IDS.has(l.courseId));
  const hasActorSeed =
    store.students.some((s) => SEED_STUDENT_IDS.has(s.id)) ||
    store.classes.some((c) => SEED_CLASS_IDS.has(c.id));

  if (!hasCourseSeed && !hasActorSeed) return store;

  const keepCourse = (id: string) => !CATALOG_SEED_COURSE_IDS.has(id);
  const courses = hasCourseSeed
    ? store.courses.filter((c) => keepCourse(c.id))
    : store.courses;
  const units = hasCourseSeed
    ? store.units.filter((u) => keepCourse(u.courseId))
    : store.units;
  const lessons = hasCourseSeed
    ? store.lessons.filter((l) => keepCourse(l.courseId))
    : store.lessons;
  const quizzes = hasCourseSeed
    ? store.quizzes.filter((q) => !q.courseId || keepCourse(q.courseId))
    : store.quizzes;
  const removedQuestionIds = new Set(
    store.quizzes
      .filter((q) => q.courseId && !keepCourse(q.courseId))
      .flatMap((q) => q.questionIds),
  );
  const keptQuestionIds = new Set(quizzes.flatMap((q) => q.questionIds));
  const questions = hasCourseSeed
    ? store.questions.filter(
        (q) => keptQuestionIds.has(q.id) || !removedQuestionIds.has(q.id),
      )
    : store.questions;

  const students = store.students.filter((s) => !SEED_STUDENT_IDS.has(s.id));
  const classes = store.classes
    .filter((c) => !SEED_CLASS_IDS.has(c.id))
    .map((c) => ({
      ...c,
      studentIds: c.studentIds.filter((id) => !SEED_STUDENT_IDS.has(id)),
    }));
  const keepStudent = (id: string) => students.some((s) => s.id === id);

  return {
    ...store,
    courses,
    units,
    lessons,
    quizzes,
    questions,
    students,
    classes,
    activeStudentId:
      store.activeStudentId && keepStudent(store.activeStudentId)
        ? store.activeStudentId
        : null,
    enrollments: store.enrollments.filter(
      (e) =>
        (!hasCourseSeed || keepCourse(e.courseId)) && keepStudent(e.studentId),
    ),
    progress: store.progress.filter(
      (p) =>
        (!hasCourseSeed || keepCourse(p.courseId)) && keepStudent(p.studentId),
    ),
    assignments: store.assignments.filter(
      (a) =>
        (!hasCourseSeed || keepCourse(a.courseId)) &&
        !SEED_CLASS_IDS.has(a.classId),
    ),
    submissions: store.submissions.filter(
      (s) =>
        (!hasCourseSeed || keepCourse(s.courseId)) && keepStudent(s.studentId),
    ),
    announcements: store.announcements.filter(
      (a) =>
        (!a.courseId || !hasCourseSeed || keepCourse(a.courseId)) &&
        !SEED_CLASS_IDS.has(a.classId),
    ),
  };
}
