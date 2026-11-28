import type { StudyMedium } from "./language-types";

export type TeacherCourseTerm = "Term 1" | "Term 2" | "Term 3";

export interface TeacherCourseDraft {
  id: string;
  title: string;
  subject: string;
  grade: number;
  medium: StudyMedium;
  term: TeacherCourseTerm;
  description: string;
  isFree: boolean;
  price: string | null;
  published: boolean;
  createdAt: string;
}

export interface TeacherCourseSection {
  id: string;
  courseId: string;
  title: string;
  order: number;
}

export type TeacherItemKind = "video" | "quiz" | "lab";

export interface LessonTextBlock {
  id: string;
  title: string;
  body: string;
}

export interface LessonFileDraft {
  id: string;
  title: string;
  meta: string;
}

export interface TeacherLessonDraft {
  id: string;
  courseId: string;
  sectionId: string;
  order: number;
  kind: TeacherItemKind;
  title: string;
  subject: string;
  grade: number;
  term: TeacherCourseTerm;
  videoUrl: string;
  tuteName: string;
  duration: string;
  published: boolean;
  quizId: string | null;
  labPrompt: string;
  overviewTitle: string;
  overviewBody: string;
  formula: string;
  educatorNote: string;
  rules: LessonTextBlock[];
  revisionNotes: LessonTextBlock[];
  files: LessonFileDraft[];
}

export interface QuizQuestionDraft {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface TeacherQuizDraft {
  id: string;
  title: string;
  subject: string;
  grade: number;
  courseId: string | null;
  sectionId: string | null;
  questions: QuizQuestionDraft[];
}

export type TeacherLiveDay =
  "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type TeacherLiveChannel = "Zoom Live" | "YouTube Live";

export interface TeacherLiveSession {
  id: string;
  day: TeacherLiveDay;
  time: string;
  subject: string;
  grade: number;
  topic: string;
  mediumLabel: string;
  channel: TeacherLiveChannel;
  meetingUrl: string;
  materialsReady: boolean;
  streamKey: string;
}

export function emptyLessonContent(): Pick<
  TeacherLessonDraft,
  | "kind"
  | "quizId"
  | "labPrompt"
  | "overviewTitle"
  | "overviewBody"
  | "formula"
  | "educatorNote"
  | "rules"
  | "revisionNotes"
  | "files"
> {
  return {
    kind: "video",
    quizId: null,
    labPrompt: "",
    overviewTitle: "",
    overviewBody: "",
    formula: "",
    educatorNote: "",
    rules: [],
    revisionNotes: [],
    files: [],
  };
}
