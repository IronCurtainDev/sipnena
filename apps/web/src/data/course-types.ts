export type Lang = "si" | "ta" | "en";
export type Localized = Partial<Record<Lang, string>>;
export type Medium = "si" | "ta" | "en";
export type Grade = 6 | 7 | 8 | 9 | 10 | 11;
export type PublishStatus = "draft" | "scheduled" | "published";

export interface Course {
  id: string;
  title: Localized;
  subject: string;
  grade: Grade;
  medium: Medium;
  term: 1 | 2 | 3;
  description: Localized;
  isFree: boolean;
  priceLkr: number | null;
  status: PublishStatus;
  releaseAt?: string;
  teacherId: string;
  teacherName?: string;
  rating?: string;
  reviewsCount?: number;
  hoursLabel?: string;
  syllabusRef?: string;
  /** Data URL or remote URL shown on student catalog cards. */
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  courseId: string;
  title: Localized;
  order: number;
  status: PublishStatus;
  releaseAt?: string;
  nieUnitId?: string;
}

export type ItemKind =
  "video" | "reading" | "pdf" | "quiz" | "lab" | "live" | "assignment";

export type Item =
  | {
      id: string;
      type: "video";
      url: string;
      renditions?: { q: "240p" | "360p" | "720p"; url: string }[];
      captions?: Partial<Record<Lang, string>>;
      estimatedMb?: number;
    }
  | { id: string; type: "text"; heading?: Localized; body: Localized }
  | { id: string; type: "formula"; latexOrText: string }
  | { id: string; type: "rule"; title: Localized; body: Localized }
  | { id: string; type: "note"; title: Localized; body: Localized }
  | {
      id: string;
      type: "file";
      title: Localized;
      fileName: string;
      url: string;
      sizeKb?: number;
    }
  | { id: string; type: "teacherNote"; body: Localized }
  | { id: string; type: "lab"; prompt: Localized }
  | {
      id: string;
      type: "assignment";
      instructions: Localized;
      dueAt?: string;
      maxScore?: number;
      submissionMode?: "both" | "text_only" | "image_only";
    };

export interface Lesson {
  id: string;
  courseId: string;
  unitId: string;
  order: number;
  kind: ItemKind;
  title: Localized;
  durationMin?: number;
  status: PublishStatus;
  releaseAt?: string;
  isFreePreview?: boolean;
  items: Item[];
  quizId?: string;
}

export interface Quiz {
  id: string;
  title: Localized;
  subject?: string;
  grade?: Grade;
  courseId?: string;
  unitId?: string;
  questionIds: string[];
  passMark: number;
  timeLimitMin?: number;
  retriesAllowed: number | "unlimited";
  status: PublishStatus;
}

export interface Question {
  id: string;
  prompt: Localized;
  options: Localized[];
  correctIndex: number;
  explanation: Localized;
  subject: string;
  grade: Grade;
  nieUnitId?: string;
  source?: "teacher" | "past-paper" | "term-test";
  sourceRef?: string;
  difficulty?: 1 | 2 | 3;
  imageUrl?: string;
}

export interface StudentAccount {
  id: string;
  name: string;
  email: string;
  /** Prototype-only plaintext password (localStorage). */
  password: string;
  grade: Grade;
  medium: Medium;
  avatarInitials: string;
  xp: number;
  leaderboardOptIn?: boolean;
}

export type TeacherStatus = "active" | "disabled";

export interface TeacherAccount {
  id: string;
  name: string;
  email: string;
  /** Prototype-only plaintext password (localStorage). */
  password: string;
  subjects: string[];
  bio?: string;
  phone?: string;
  avatarInitials: string;
  status: TeacherStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  grade: Grade;
  medium: Medium;
  year: number;
  teacherId: string;
  studentIds: string[];
  inviteCode?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  classId?: string;
  source: "class-assignment" | "purchase" | "free";
  enrolledAt: string;
}

export interface QuizAttemptRecord {
  quizId: string;
  score: number;
  total: number;
  at: string;
  answers: number[];
}

export interface Progress {
  studentId: string;
  courseId: string;
  lessonId: string;
  status: "not-started" | "in-progress" | "completed";
  watchedSec?: number;
  completedAt?: string;
  quizAttempts?: QuizAttemptRecord[];
}

export interface CourseAssignment {
  id: string;
  courseId: string;
  classId: string;
  startAt?: string;
  dueAt?: string;
  unitDueDates?: Record<string, string>;
}

export interface AssignmentSubmission {
  id: string;
  courseId: string;
  lessonId: string;
  studentId: string;
  studentName: string;
  text: string;
  photoLabel?: string;
  imageDataUrl?: string;
  submittedAt: string;
  score?: number;
  maxScore: number;
  teacherComment?: string;
  gradedAt?: string;
}

export interface ClassAnnouncement {
  id: string;
  classId: string;
  courseId?: string;
  message: Localized;
  createdAt: string;
}

export interface CourseStoreState {
  version: 2;
  activeStudentId: string | null;
  activeTeacherId: string | null;
  teachers: TeacherAccount[];
  courses: Course[];
  units: Unit[];
  lessons: Lesson[];
  quizzes: Quiz[];
  questions: Question[];
  classes: Class[];
  students: StudentAccount[];
  enrollments: Enrollment[];
  progress: Progress[];
  assignments: CourseAssignment[];
  submissions: AssignmentSubmission[];
  announcements: ClassAnnouncement[];
  streakDays: number;
  streakFreezeUsedThisWeek: boolean;
  lastStudyDate: string;
  leaderboardOptIn: boolean;
}

export function pickLocalized(
  value: Localized | string | undefined,
  lang: Lang,
  fallback = "",
): string {
  if (!value) return fallback;
  if (typeof value === "string") return value || fallback;
  return (
    value[lang]?.trim() ||
    value.si?.trim() ||
    value.en?.trim() ||
    value.ta?.trim() ||
    fallback
  );
}

export function makeLocalized(text: string): Localized {
  return { si: text, ta: text, en: text };
}

export function isReleasedToStudent(
  item: { status: PublishStatus; releaseAt?: string },
  nowMs = Date.now(),
): boolean {
  if (item.status === "published") return true;
  if (item.status === "scheduled" && item.releaseAt) {
    const t = Date.parse(item.releaseAt);
    return Number.isFinite(t) && t <= nowMs;
  }
  return false;
}
