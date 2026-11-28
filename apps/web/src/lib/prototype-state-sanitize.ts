import type { StudyMedium } from "./language-types";
import { normalizeStoredTeacherDrafts } from "./normalize-teacher-drafts";
import {
  INITIAL_PROTOTYPE_STATE,
  type DemoRole,
  type PrototypeState,
  type TeacherLiveDay,
  type TeacherLiveSession,
} from "./prototype-seed";

const VALID_ROLES = new Set<DemoRole>([
  "student",
  "parent",
  "teacher",
  "admin",
]);
const VALID_MEDIUMS = new Set<StudyMedium>(["si", "ta", "en"]);
const VALID_DAYS = new Set<TeacherLiveDay>([
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
]);

function safeStringArray(value: unknown, fallback: string[]): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : fallback;
}

export function sanitizePrototypeState(
  parsed: Partial<PrototypeState>,
): PrototypeState {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return INITIAL_PROTOTYPE_STATE;
  }
  const merged = { ...INITIAL_PROTOTYPE_STATE, ...parsed };
  const courses = Array.isArray(parsed.teacherCourses)
    ? parsed.teacherCourses
    : [];
  const sections = Array.isArray(parsed.teacherCourseSections)
    ? [...parsed.teacherCourseSections]
    : [];
  const drafts = normalizeStoredTeacherDrafts({
    courses,
    sections,
    lessons: parsed.teacherLessons,
    quizzes: parsed.teacherQuizzes,
    fallbackLessons: [],
    fallbackQuizzes: [],
  });
  const teacherLiveSessions = Array.isArray(parsed.teacherLiveSessions)
    ? parsed.teacherLiveSessions
        .filter((s): s is TeacherLiveSession =>
          Boolean(s && typeof s === "object"),
        )
        .map((session) => ({
          ...session,
          day: VALID_DAYS.has(session.day) ? session.day : "Mon",
          meetingUrl:
            typeof session.meetingUrl === "string" ? session.meetingUrl : "",
        }))
    : [];
  const rawGrade = Number(merged.grade);
  const grade =
    Number.isFinite(rawGrade) && rawGrade >= 6 && rawGrade <= 11
      ? rawGrade
      : INITIAL_PROTOTYPE_STATE.grade;

  return {
    ...merged,
    role: VALID_ROLES.has(merged.role)
      ? merged.role
      : INITIAL_PROTOTYPE_STATE.role,
    medium: VALID_MEDIUMS.has(merged.medium)
      ? merged.medium
      : INITIAL_PROTOTYPE_STATE.medium,
    grade,
    studentName:
      typeof parsed.studentName === "string" ? parsed.studentName : "",
    activeChildId:
      typeof parsed.activeChildId === "string" ? parsed.activeChildId : "",
    selectedSubjects: safeStringArray(parsed.selectedSubjects, []),
    bookmarkedIds: safeStringArray(parsed.bookmarkedIds, []),
    downloadedIds: safeStringArray(parsed.downloadedIds, []),
    recentSearches: safeStringArray(parsed.recentSearches, []),
    readNotificationIds: safeStringArray(parsed.readNotificationIds, []),
    bankSlips: Array.isArray(parsed.bankSlips)
      ? parsed.bankSlips.filter((s) => Boolean(s && typeof s === "object"))
      : [],
    doubts: Array.isArray(parsed.doubts)
      ? parsed.doubts.filter((d) => Boolean(d && typeof d === "object"))
      : [],
    teacherCourses: courses,
    teacherCourseSections: drafts.sections,
    teacherLessons: drafts.lessons,
    teacherQuizzes: drafts.quizzes,
    teacherLiveSessions,
  };
}
