import type {
  Class,
  ClassAnnouncement,
  CourseAssignment,
  Enrollment,
  Grade,
  Medium,
  QuizAttemptRecord,
} from "./course-types";
import { makeLocalized } from "./course-types";
import { updateCourseStore } from "./courses-store-core";
import { requireActiveTeacher } from "./courses-teacher-mutations";

export function createTeacherClass(input: {
  name: string;
  grade: Grade;
  medium: Medium;
  year: number;
  teacherId?: string;
}): string {
  const activeTeacher = requireActiveTeacher();
  const id = `class-${Date.now()}`;
  const inviteCode = `SN-${input.grade}${input.medium.toUpperCase()}-${String(Date.now()).slice(-4)}`;
  const cls: Class = {
    id,
    name: input.name.trim(),
    grade: input.grade,
    medium: input.medium,
    year: input.year,
    teacherId: input.teacherId ?? activeTeacher.id,
    studentIds: [],
    inviteCode,
  };
  updateCourseStore((prev) => ({
    ...prev,
    classes: [cls, ...prev.classes],
  }));
  return id;
}

export function addStudentToClass(
  classId: string,
  studentInput: { name: string; grade: Grade; medium: Medium },
): string {
  const studentId = `stu-${Date.now()}`;
  const parts = studentInput.name.trim().split(/\s+/);
  const avatarInitials =
    parts.length >= 2
      ? `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase()
      : studentInput.name.slice(0, 2).toUpperCase();

  updateCourseStore((prev) => ({
    ...prev,
    students: [
      ...prev.students,
      {
        id: studentId,
        name: studentInput.name.trim(),
        email: `${studentId}@local.class`,
        password: "",
        grade: studentInput.grade,
        medium: studentInput.medium,
        avatarInitials: avatarInitials || "ST",
        xp: 0,
      },
    ],
    classes: prev.classes.map((c) =>
      c.id === classId ? { ...c, studentIds: [...c.studentIds, studentId] } : c,
    ),
  }));
  return studentId;
}

export function removeStudentFromClass(classId: string, studentId: string) {
  updateCourseStore((prev) => ({
    ...prev,
    classes: prev.classes.map((c) =>
      c.id === classId
        ? { ...c, studentIds: c.studentIds.filter((id) => id !== studentId) }
        : c,
    ),
  }));
}

export function assignCourseToClasses(input: {
  courseId: string;
  classIds: string[];
  startAt: string;
  unitDueDates: Record<string, string>;
}) {
  const now = new Date().toISOString();
  updateCourseStore((prev) => {
    const newAssignments: CourseAssignment[] = input.classIds.map(
      (classId) => ({
        id: `assign-${Date.now()}-${classId}`,
        courseId: input.courseId,
        classId,
        startAt: input.startAt,
        unitDueDates: input.unitDueDates,
      }),
    );
    const existingKeys = new Set(
      prev.enrollments.map((e) => `${e.courseId}:${e.studentId}`),
    );
    const newEnrollments: Enrollment[] = [];
    for (const classId of input.classIds) {
      const cls = prev.classes.find((c) => c.id === classId);
      for (const studentId of cls?.studentIds ?? []) {
        const key = `${input.courseId}:${studentId}`;
        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          newEnrollments.push({
            id: `enr-${Date.now()}-${classId}-${studentId}`,
            studentId,
            courseId: input.courseId,
            classId,
            source: "class-assignment",
            enrolledAt: now,
          });
        }
      }
    }
    return {
      ...prev,
      assignments: [...prev.assignments, ...newAssignments],
      enrollments: [...prev.enrollments, ...newEnrollments],
    };
  });
}

export function markLessonCompleted(
  studentId: string,
  courseId: string,
  lessonId: string,
) {
  const now = new Date().toISOString();
  updateCourseStore((prev) => {
    const idx = prev.progress.findIndex(
      (p) =>
        p.studentId === studentId &&
        p.courseId === courseId &&
        p.lessonId === lessonId,
    );
    if (idx === -1) {
      return {
        ...prev,
        progress: [
          ...prev.progress,
          {
            studentId,
            courseId,
            lessonId,
            status: "completed",
            completedAt: now,
          },
        ],
      };
    }
    return {
      ...prev,
      progress: prev.progress.map((p, i) =>
        i === idx ? { ...p, status: "completed", completedAt: now } : p,
      ),
    };
  });
}

export function recordStudentQuizAttempt(
  studentId: string,
  courseId: string,
  lessonId: string,
  attempt: Omit<QuizAttemptRecord, "at">,
) {
  const now = new Date().toISOString();
  const fullAttempt: QuizAttemptRecord = { ...attempt, at: now };
  updateCourseStore((prev) => {
    const idx = prev.progress.findIndex(
      (p) =>
        p.studentId === studentId &&
        p.courseId === courseId &&
        p.lessonId === lessonId,
    );
    if (idx === -1) {
      return {
        ...prev,
        progress: [
          ...prev.progress,
          {
            studentId,
            courseId,
            lessonId,
            status: "completed",
            completedAt: now,
            quizAttempts: [fullAttempt],
          },
        ],
      };
    }
    const existing = prev.progress[idx]!;
    return {
      ...prev,
      progress: prev.progress.map((p, i) =>
        i === idx
          ? {
              ...p,
              status: "completed",
              completedAt: now,
              quizAttempts: [fullAttempt, ...(existing.quizAttempts ?? [])],
            }
          : p,
      ),
    };
  });
}

export function addClassAnnouncement(
  classId: string,
  message: string,
  courseId?: string,
) {
  const item: ClassAnnouncement = {
    id: `ann-${Date.now()}`,
    classId,
    courseId,
    message: makeLocalized(message.trim()),
    createdAt: new Date().toISOString(),
  };
  updateCourseStore((prev) => ({
    ...prev,
    announcements: [item, ...prev.announcements],
  }));
}

export function toggleStudentLeaderboardOptIn(studentId: string) {
  updateCourseStore((prev) => ({
    ...prev,
    leaderboardOptIn: !prev.leaderboardOptIn,
    students: prev.students.map((s) =>
      s.id === studentId ? { ...s, leaderboardOptIn: !s.leaderboardOptIn } : s,
    ),
  }));
}
