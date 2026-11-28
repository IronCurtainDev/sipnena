import {
  makeLocalized,
  type Class,
  type Grade,
  type Localized,
  type Medium,
  type Progress,
  type PublishStatus,
  type StudentAccount,
  type TeacherAccount,
  type TeacherStatus,
} from "./course-types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export function ensureLocalized(value: unknown, fallback = ""): Localized {
  if (typeof value === "string") return makeLocalized(value || fallback);
  if (!isRecord(value)) return makeLocalized(fallback);
  const hasEn = typeof value.en === "string";
  const hasSi = typeof value.si === "string";
  const hasTa = typeof value.ta === "string";
  if (!hasEn && !hasSi && !hasTa) return makeLocalized(fallback);
  const en = hasEn ? (value.en as string) : "";
  const si = hasSi ? (value.si as string) : "";
  const ta = hasTa ? (value.ta as string) : "";
  // Keep explicit empty strings (teacher cleared the title). Only fill
  // missing locale keys from siblings / fallback — never resurrect cleared text.
  const best = si || en || ta || fallback;
  return {
    si: hasSi ? si : best,
    ta: hasTa ? ta : best,
    en: hasEn ? en : best,
  };
}

export function toGrade(value: unknown): Grade {
  const n = Number(value);
  return n === 6 || n === 7 || n === 8 || n === 9 || n === 10 || n === 11
    ? n
    : 8;
}

export function toMedium(value: unknown): Medium {
  return value === "si" || value === "ta" || value === "en" ? value : "si";
}

export function toStatus(value: unknown): PublishStatus {
  return value === "draft" || value === "scheduled" || value === "published"
    ? value
    : "published";
}

export function toStringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((x): x is string => typeof x === "string")
    : [];
}

export function normalizeStudent(
  raw: Record<string, unknown>,
  idx: number,
): StudentAccount {
  const name =
    typeof raw.name === "string" && raw.name ? raw.name : `Student ${idx + 1}`;
  const email =
    typeof raw.email === "string" && raw.email.trim()
      ? raw.email.trim().toLowerCase()
      : "";
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `stu-${idx}`,
    name,
    email,
    password: typeof raw.password === "string" ? raw.password : "",
    grade: toGrade(raw.grade),
    medium: toMedium(raw.medium),
    avatarInitials:
      typeof raw.avatarInitials === "string" && raw.avatarInitials
        ? raw.avatarInitials
        : name.slice(0, 2).toUpperCase(),
    xp: typeof raw.xp === "number" ? raw.xp : 0,
    leaderboardOptIn: Boolean(raw.leaderboardOptIn),
  };
}

export function normalizeClass(
  raw: Record<string, unknown>,
  idx: number,
): Class {
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `cls-${idx}`,
    name:
      typeof raw.name === "string" && raw.name ? raw.name : `Class ${idx + 1}`,
    grade: toGrade(raw.grade),
    medium: toMedium(raw.medium),
    year: typeof raw.year === "number" ? raw.year : 2026,
    teacherId:
      typeof raw.teacherId === "string" && raw.teacherId ? raw.teacherId : "",
    inviteCode:
      typeof raw.inviteCode === "string" && raw.inviteCode
        ? raw.inviteCode
        : `SN-${100 + idx}`,
    studentIds: toStringList(raw.studentIds),
  };
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase() || "T";
}

export function normalizeTeacher(
  raw: Record<string, unknown>,
  idx: number,
): TeacherAccount {
  const name =
    typeof raw.name === "string" && raw.name.trim()
      ? raw.name.trim()
      : `Teacher ${idx + 1}`;
  const email =
    typeof raw.email === "string" && raw.email.trim()
      ? raw.email.trim().toLowerCase()
      : `teacher${idx}@local`;
  const status: TeacherStatus =
    raw.status === "disabled" ? "disabled" : "active";
  const now = "2026-01-01T00:00:00Z";
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : `tt-${idx}`,
    name,
    email,
    password: typeof raw.password === "string" ? raw.password : "",
    subjects: toStringList(raw.subjects),
    bio: typeof raw.bio === "string" && raw.bio ? raw.bio : undefined,
    phone: typeof raw.phone === "string" && raw.phone ? raw.phone : undefined,
    avatarInitials:
      typeof raw.avatarInitials === "string" && raw.avatarInitials
        ? raw.avatarInitials
        : initialsFromName(name),
    status,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : now,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : now,
  };
}

export function normalizeProgressRows(rawProgress: unknown): Progress[] {
  if (!Array.isArray(rawProgress)) return [];
  const rows: Progress[] = [];
  for (const entry of rawProgress) {
    if (!isRecord(entry)) continue;
    const studentId =
      typeof entry.studentId === "string" ? entry.studentId : "";
    const courseId = typeof entry.courseId === "string" ? entry.courseId : "";
    const attempts = Array.isArray(entry.quizAttempts)
      ? entry.quizAttempts.filter(isRecord)
      : [];
    if (!studentId || !courseId) continue;
    if (typeof entry.lessonId === "string") {
      rows.push({
        studentId,
        courseId,
        lessonId: entry.lessonId,
        status: entry.status === "in-progress" ? "in-progress" : "completed",
        watchedSec:
          typeof entry.watchedSec === "number" ? entry.watchedSec : undefined,
        completedAt:
          typeof entry.completedAt === "string" ? entry.completedAt : undefined,
        quizAttempts: attempts as unknown as Progress["quizAttempts"],
      });
    } else if (Array.isArray(entry.completedLessonIds)) {
      const legacyAt =
        typeof entry.lastActiveAt === "string" ? entry.lastActiveAt : undefined;
      entry.completedLessonIds.forEach((lid, idx) => {
        if (typeof lid !== "string") return;
        rows.push({
          studentId,
          courseId,
          lessonId: lid,
          status: "completed",
          completedAt: legacyAt,
          quizAttempts:
            idx === 0
              ? (attempts as unknown as Progress["quizAttempts"])
              : undefined,
        });
      });
    }
  }
  return rows;
}
