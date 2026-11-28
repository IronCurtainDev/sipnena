import type {
  AssignmentSubmission,
  Course,
  CourseStoreState,
  Grade,
  Lesson,
  StudentAccount,
} from "./course-types";
import { getStudentEnrollments } from "./courses-selectors";

export const ASSIGNMENT_GRADES: Grade[] = [6, 7, 8, 9, 10, 11];

export type StudentAssignmentStatus =
  | "todo"
  | "submitted"
  | "graded"
  | "overdue";

export function getAssignmentItem(lesson: Lesson) {
  const item = lesson.items.find((it) => it.type === "assignment");
  return item?.type === "assignment" ? item : undefined;
}

export function getLatestSubmission(
  state: CourseStoreState,
  lessonId: string,
  studentId: string,
): AssignmentSubmission | undefined {
  return state.submissions
    .filter((s) => s.lessonId === lessonId && s.studentId === studentId)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0];
}

export function isAssignmentOverdue(dueAt: string | undefined, nowMs = Date.now()) {
  if (!dueAt) return false;
  return new Date(dueAt).getTime() < nowMs;
}

export function assignmentStatusForStudent(
  state: CourseStoreState,
  lesson: Lesson,
  studentId: string,
  nowMs = Date.now(),
): StudentAssignmentStatus {
  const item = getAssignmentItem(lesson);
  const latest = getLatestSubmission(state, lesson.id, studentId);
  if (latest?.gradedAt) return "graded";
  if (latest) return "submitted";
  if (isAssignmentOverdue(item?.dueAt, nowMs)) return "overdue";
  return "todo";
}

export function listPublishedAssignmentLessons(
  state: CourseStoreState,
  options?: { grade?: Grade | "all"; paidOnly?: boolean },
): { lesson: Lesson; course: Course; item: NonNullable<ReturnType<typeof getAssignmentItem>> }[] {
  const grade = options?.grade ?? "all";
  const paidOnly = options?.paidOnly ?? false;
  const rows: {
    lesson: Lesson;
    course: Course;
    item: NonNullable<ReturnType<typeof getAssignmentItem>>;
  }[] = [];
  for (const lesson of state.lessons) {
    if (lesson.status !== "published") continue;
    const item = getAssignmentItem(lesson);
    if (!item) continue;
    const course = state.courses.find((c) => c.id === lesson.courseId);
    if (!course || course.status !== "published") continue;
    if (!course.grade) continue;
    if (paidOnly && course.isFree) continue;
    if (grade !== "all" && course.grade !== grade) continue;
    rows.push({ lesson, course, item });
  }
  return rows.sort((a, b) => {
    const aDue = a.item.dueAt ?? "9999";
    const bDue = b.item.dueAt ?? "9999";
    return aDue.localeCompare(bDue);
  });
}

export function enrolledStudentIdsForCourse(
  state: CourseStoreState,
  courseId: string,
): string[] {
  const ids = new Set<string>();
  for (const enr of state.enrollments) {
    if (enr.courseId !== courseId) continue;
    if (enr.studentId) ids.add(enr.studentId);
    if (enr.classId) {
      const cls = state.classes.find((c) => c.id === enr.classId);
      for (const sid of cls?.studentIds ?? []) ids.add(sid);
    }
  }
  return [...ids];
}

export function countSubmissionsForLesson(
  state: CourseStoreState,
  lessonId: string,
): { submitted: number; pendingMark: number; graded: number } {
  const byStudent = new Map<string, AssignmentSubmission>();
  for (const sub of state.submissions) {
    if (sub.lessonId !== lessonId) continue;
    const prev = byStudent.get(sub.studentId);
    if (!prev || sub.submittedAt > prev.submittedAt) {
      byStudent.set(sub.studentId, sub);
    }
  }
  let pendingMark = 0;
  let graded = 0;
  for (const sub of byStudent.values()) {
    if (sub.gradedAt) graded += 1;
    else pendingMark += 1;
  }
  return { submitted: byStudent.size, pendingMark, graded };
}

export function missingStudentsForLesson(
  state: CourseStoreState,
  lessonId: string,
  courseId: string,
): StudentAccount[] {
  const expected = enrolledStudentIdsForCourse(state, courseId);
  const submitted = new Set(
    state.submissions
      .filter((s) => s.lessonId === lessonId)
      .map((s) => s.studentId),
  );
  return expected
    .filter((id) => !submitted.has(id))
    .map((id) => state.students.find((s) => s.id === id))
    .filter((s): s is StudentAccount => Boolean(s));
}

export function studentAssignmentEntries(
  state: CourseStoreState,
  studentId: string,
  nowMs = Date.now(),
) {
  const student = state.students.find((s) => s.id === studentId);
  const enrolledIds = new Set(
    getStudentEnrollments(state, studentId).map((e) => e.courseId),
  );
  const preferEnrolled = enrolledIds.size > 0;
  const rows = listPublishedAssignmentLessons(state).filter(({ course }) => {
    if (preferEnrolled) return enrolledIds.has(course.id);
    if (!student?.grade) return true;
    return course.grade === student.grade;
  });
  return rows
    .map((row) => ({
      ...row,
      status: assignmentStatusForStudent(state, row.lesson, studentId, nowMs),
      submission: getLatestSubmission(state, row.lesson.id, studentId),
    }))
    .sort((a, b) => {
      const rank = (s: StudentAssignmentStatus) =>
        s === "overdue" ? 0 : s === "todo" ? 1 : s === "submitted" ? 2 : 3;
      const diff = rank(a.status) - rank(b.status);
      if (diff !== 0) return diff;
      const aDue = a.item.dueAt ?? "9999";
      const bDue = b.item.dueAt ?? "9999";
      return aDue.localeCompare(bDue);
    });
}
