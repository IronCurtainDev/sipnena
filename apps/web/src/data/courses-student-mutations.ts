import type { Grade, Medium, StudentAccount } from "./course-types";
import {
  loadCourseStoreState,
  updateCourseStore,
} from "./courses-store-core";
import { initialsFromName } from "./courses-store-helpers";

export class StudentMutationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StudentMutationError";
  }
}

const MIN_PASSWORD_LEN = 8;

export function getActiveStudent(): StudentAccount | null {
  const store = loadCourseStoreState();
  if (!store.activeStudentId) return null;
  return store.students.find((s) => s.id === store.activeStudentId) ?? null;
}

export function setActiveStudentId(studentId: string | null): void {
  updateCourseStore((prev) => {
    if (studentId === null) return { ...prev, activeStudentId: null };
    const student = prev.students.find((s) => s.id === studentId);
    if (!student) throw new StudentMutationError("Student not found.");
    return { ...prev, activeStudentId: studentId };
  });
}

export function createStudentAccount(input: {
  name: string;
  email: string;
  password: string;
  grade: Grade;
  medium?: Medium;
}): string {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  if (!name) throw new StudentMutationError("Name is required.");
  if (!email || !email.includes("@")) {
    throw new StudentMutationError("A valid email is required.");
  }
  if (password.length < MIN_PASSWORD_LEN) {
    throw new StudentMutationError(
      `Password must be at least ${MIN_PASSWORD_LEN} characters.`,
    );
  }

  const id = `stu-${Date.now()}`;
  const student: StudentAccount = {
    id,
    name,
    email,
    password,
    grade: input.grade,
    medium: input.medium ?? "si",
    avatarInitials: initialsFromName(name),
    xp: 0,
  };

  updateCourseStore((prev) => {
    if (prev.students.some((s) => s.email.toLowerCase() === email)) {
      throw new StudentMutationError("An account with this email already exists.");
    }
    if (prev.teachers.some((t) => t.email.toLowerCase() === email)) {
      throw new StudentMutationError("This email is already used by a teacher.");
    }
    return {
      ...prev,
      students: [student, ...prev.students],
      activeStudentId: id,
    };
  });
  return id;
}

export function loginStudent(email: string, password: string): StudentAccount {
  const normalized = email.trim().toLowerCase();
  const store = loadCourseStoreState();
  const student = store.students.find(
    (s) => s.email.toLowerCase() === normalized,
  );
  if (!student || !student.password || student.password !== password) {
    throw new StudentMutationError("Invalid email or password.");
  }
  setActiveStudentId(student.id);
  return student;
}

export function logoutStudent(): void {
  setActiveStudentId(null);
}

export function enrollActiveStudentInCourse(courseId: string): void {
  const store = loadCourseStoreState();
  const studentId = store.activeStudentId;
  if (!studentId) {
    throw new StudentMutationError("Create an account to enroll in a course.");
  }
  const course = store.courses.find((c) => c.id === courseId);
  if (!course || course.status !== "published") {
    throw new StudentMutationError("Course is not available for enrollment.");
  }
  const already = store.enrollments.some(
    (e) => e.studentId === studentId && e.courseId === courseId,
  );
  if (already) return;

  const now = new Date().toISOString();
  updateCourseStore((prev) => ({
    ...prev,
    enrollments: [
      ...prev.enrollments,
      {
        id: `enr-${Date.now()}`,
        studentId,
        courseId,
        source: course.isFree ? "free" : "purchase",
        enrolledAt: now,
      },
    ],
  }));
}

export function isStudentEnrolled(studentId: string, courseId: string): boolean {
  return loadCourseStoreState().enrollments.some(
    (e) => e.studentId === studentId && e.courseId === courseId,
  );
}
