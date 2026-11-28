import {
  getActiveTeacher,
  loadCourseStoreState,
  loginStudent,
  loginTeacher,
  logoutStudent,
  logoutTeacher,
  StudentMutationError,
  TeacherMutationError,
} from "@/data/courses";
import { updatePrototypeState } from "@/lib/prototype-state";

export type LocalLoginResult =
  | { kind: "teacher"; redirectTo: "/teacher" }
  | { kind: "student"; redirectTo: string };

/**
 * Prototype login: match localStorage teacher, then student.
 * Returns null when neither matches so Better Auth can try.
 */
export function tryLocalPortalLogin(
  email: string,
  password: string,
  redirectAfterStudent?: string,
): LocalLoginResult | null {
  try {
    loginTeacher(email, password);
    logoutStudent();
    updatePrototypeState((prev) => ({ ...prev, role: "teacher" }));
    return { kind: "teacher", redirectTo: "/teacher" };
  } catch (err) {
    if (!(err instanceof TeacherMutationError)) throw err;
  }

  try {
    loginStudent(email, password);
    logoutTeacher();
    updatePrototypeState((prev) => ({ ...prev, role: "student" }));
    const dest =
      redirectAfterStudent && redirectAfterStudent.startsWith("/")
        ? redirectAfterStudent
        : "/courses";
    return { kind: "student", redirectTo: dest };
  } catch (err) {
    if (!(err instanceof StudentMutationError)) throw err;
  }

  return null;
}

export function requireTeacherLocalSession(): boolean {
  return getActiveTeacher() !== null;
}

export function hasTeacherLocalSession(): boolean {
  const store = loadCourseStoreState();
  if (!store.activeTeacherId) return false;
  return store.teachers.some(
    (t) => t.id === store.activeTeacherId && t.status === "active",
  );
}
