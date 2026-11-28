import type { TeacherAccount, TeacherStatus } from "./course-types";
import {
  loadCourseStoreState,
  updateCourseStore,
} from "./courses-store-core";
import { initialsFromName } from "./courses-store-helpers";

export class TeacherMutationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TeacherMutationError";
  }
}

const MIN_PASSWORD_LEN = 8;

function requirePassword(password: string | undefined, required: boolean): string {
  const value = password?.trim() ?? "";
  if (!value) {
    if (required) throw new TeacherMutationError("Password is required.");
    return "";
  }
  if (value.length < MIN_PASSWORD_LEN) {
    throw new TeacherMutationError(
      `Password must be at least ${MIN_PASSWORD_LEN} characters.`,
    );
  }
  return value;
}

export function listActiveTeachers(): TeacherAccount[] {
  return loadCourseStoreState().teachers.filter((t) => t.status === "active");
}

export function getActiveTeacher(): TeacherAccount | null {
  const store = loadCourseStoreState();
  if (!store.activeTeacherId) return null;
  const teacher = store.teachers.find((t) => t.id === store.activeTeacherId);
  if (!teacher || teacher.status !== "active") return null;
  return teacher;
}

export function requireActiveTeacher(): TeacherAccount {
  const teacher = getActiveTeacher();
  if (!teacher) {
    throw new TeacherMutationError(
      "No active teacher. Sign in with the email and password set by admin.",
    );
  }
  return teacher;
}

export function setActiveTeacherId(teacherId: string | null): void {
  updateCourseStore((prev) => {
    if (teacherId === null) {
      return { ...prev, activeTeacherId: null };
    }
    const teacher = prev.teachers.find((t) => t.id === teacherId);
    if (!teacher || teacher.status !== "active") {
      throw new TeacherMutationError("Teacher is missing or disabled.");
    }
    return { ...prev, activeTeacherId: teacherId };
  });
}

export function createTeacher(input: {
  name: string;
  email: string;
  password: string;
  subjects?: string[];
  bio?: string;
  phone?: string;
  avatarInitials?: string;
}): string {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = requirePassword(input.password, true);
  if (!name) throw new TeacherMutationError("Name is required.");
  if (!email || !email.includes("@")) {
    throw new TeacherMutationError("A valid email is required.");
  }

  const id = `tt-${Date.now()}`;
  const now = new Date().toISOString();
  const teacher: TeacherAccount = {
    id,
    name,
    email,
    password,
    subjects: (input.subjects ?? []).map((s) => s.trim()).filter(Boolean),
    bio: input.bio?.trim() || undefined,
    phone: input.phone?.trim() || undefined,
    avatarInitials:
      input.avatarInitials?.trim() || initialsFromName(name),
    status: "active",
    createdAt: now,
    updatedAt: now,
  };

  updateCourseStore((prev) => {
    const clash = prev.teachers.some(
      (t) => t.email.toLowerCase() === email,
    );
    if (clash) {
      throw new TeacherMutationError("A teacher with this email already exists.");
    }
    return {
      ...prev,
      teachers: [teacher, ...prev.teachers],
    };
  });
  return id;
}

export function updateTeacher(
  teacherId: string,
  patch: {
    name?: string;
    email?: string;
    password?: string;
    subjects?: string[];
    bio?: string;
    phone?: string;
    avatarInitials?: string;
  },
): void {
  updateCourseStore((prev) => {
    const existing = prev.teachers.find((t) => t.id === teacherId);
    if (!existing) throw new TeacherMutationError("Teacher not found.");

    const name = patch.name?.trim() ?? existing.name;
    const email = (patch.email?.trim() ?? existing.email).toLowerCase();
    if (!name) throw new TeacherMutationError("Name is required.");
    if (!email || !email.includes("@")) {
      throw new TeacherMutationError("A valid email is required.");
    }
    const emailTaken = prev.teachers.some(
      (t) => t.id !== teacherId && t.email.toLowerCase() === email,
    );
    if (emailTaken) {
      throw new TeacherMutationError("A teacher with this email already exists.");
    }

    const password =
      patch.password !== undefined && patch.password.trim()
        ? requirePassword(patch.password, true)
        : existing.password;

    const next: TeacherAccount = {
      ...existing,
      name,
      email,
      password,
      subjects:
        patch.subjects !== undefined
          ? patch.subjects.map((s) => s.trim()).filter(Boolean)
          : existing.subjects,
      bio:
        patch.bio !== undefined
          ? patch.bio.trim() || undefined
          : existing.bio,
      phone:
        patch.phone !== undefined
          ? patch.phone.trim() || undefined
          : existing.phone,
      avatarInitials:
        patch.avatarInitials?.trim() ||
        existing.avatarInitials ||
        initialsFromName(name),
      updatedAt: new Date().toISOString(),
    };

    return {
      ...prev,
      teachers: prev.teachers.map((t) => (t.id === teacherId ? next : t)),
      courses:
        next.name !== existing.name
          ? prev.courses.map((c) =>
              c.teacherId === teacherId
                ? { ...c, teacherName: next.name, updatedAt: next.updatedAt }
                : c,
            )
          : prev.courses,
    };
  });
}

export function setTeacherStatus(
  teacherId: string,
  status: TeacherStatus,
): void {
  updateCourseStore((prev) => {
    const existing = prev.teachers.find((t) => t.id === teacherId);
    if (!existing) throw new TeacherMutationError("Teacher not found.");
    const teachers = prev.teachers.map((t) =>
      t.id === teacherId
        ? { ...t, status, updatedAt: new Date().toISOString() }
        : t,
    );
    const activeTeacherId =
      status === "disabled" && prev.activeTeacherId === teacherId
        ? null
        : prev.activeTeacherId;
    return { ...prev, teachers, activeTeacherId };
  });
}

/** Validate email+password against localStorage teachers and set active session. */
export function loginTeacher(email: string, password: string): TeacherAccount {
  const normalized = email.trim().toLowerCase();
  const store = loadCourseStoreState();
  const teacher = store.teachers.find(
    (t) => t.email.toLowerCase() === normalized && t.status === "active",
  );
  if (!teacher || !teacher.password || teacher.password !== password) {
    throw new TeacherMutationError("Invalid email or password.");
  }
  setActiveTeacherId(teacher.id);
  return teacher;
}

export function logoutTeacher(): void {
  setActiveTeacherId(null);
}
