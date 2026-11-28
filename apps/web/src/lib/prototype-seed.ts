import type { StudyMedium } from "./language-types";
import type {
  TeacherCourseDraft,
  TeacherCourseSection,
  TeacherLessonDraft,
  TeacherLiveSession,
  TeacherQuizDraft,
} from "./prototype-teacher-seed";

export type DemoRole = "student" | "parent" | "teacher" | "admin";
export type DataSaverQuality = "low" | "medium" | "high";
export type PaymentVerificationStatus = "pending" | "approved" | "rejected";

export interface PrototypeBankSlip {
  id: string;
  studentName: string;
  grade: number;
  courseTitle: string;
  bankName: string;
  referenceCode: string;
  amount: number;
  uploadedAt: string;
  status: PaymentVerificationStatus;
  reason?: string;
  slipFileName: string;
}

export interface PrototypeDoubt {
  id: string;
  studentName: string;
  grade: number;
  subject: string;
  courseId: string;
  lessonTitle: string;
  timestampTag?: string;
  question: string;
  photoLabel?: string;
  createdAt: string;
  status: "answered" | "pending";
  upvotes: number;
  upvoted?: boolean;
  reply?: {
    teacherName: string;
    text: string;
    repliedAt: string;
  };
}

export type {
  LessonFileDraft,
  LessonTextBlock,
  QuizQuestionDraft,
  TeacherCourseDraft,
  TeacherCourseSection,
  TeacherCourseTerm,
  TeacherItemKind,
  TeacherLessonDraft,
  TeacherLiveChannel,
  TeacherLiveDay,
  TeacherLiveSession,
  TeacherQuizDraft,
} from "./prototype-teacher-seed";

export interface PrototypeState {
  role: DemoRole;
  grade: number;
  medium: StudyMedium;
  studentName: string;
  selectedSubjects: string[];
  olBaskets: {
    basket1: string;
    basket2: string;
    basket3: string;
  };
  bookmarkedIds: string[];
  downloadedIds: string[];
  dataSaverQuality: DataSaverQuality;
  wifiOnlyDownloads: boolean;
  recentSearches: string[];
  readNotificationIds: string[];
  bankSlips: PrototypeBankSlip[];
  doubts: PrototypeDoubt[];
  teacherCourses: TeacherCourseDraft[];
  teacherCourseSections: TeacherCourseSection[];
  teacherLessons: TeacherLessonDraft[];
  teacherQuizzes: TeacherQuizDraft[];
  teacherLiveSessions: TeacherLiveSession[];
  activeChildId: string;
}

/** Empty defaults — no invented students, payments, doubts, or teacher drafts. */
export const INITIAL_PROTOTYPE_STATE: PrototypeState = {
  role: "student",
  grade: 8,
  medium: "si",
  studentName: "",
  selectedSubjects: [],
  olBaskets: {
    basket1: "",
    basket2: "",
    basket3: "",
  },
  bookmarkedIds: [],
  downloadedIds: [],
  dataSaverQuality: "medium",
  wifiOnlyDownloads: true,
  recentSearches: [],
  readNotificationIds: [],
  activeChildId: "",
  bankSlips: [],
  doubts: [],
  teacherCourses: [],
  teacherCourseSections: [],
  teacherLessons: [],
  teacherQuizzes: [],
  teacherLiveSessions: [],
};
