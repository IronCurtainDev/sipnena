import type { LucideIcon } from "lucide-react";

export type LessonType = "video" | "note" | "quiz" | "assignment" | "lab";

export interface LessonItem {
  id: string;
  type: LessonType;
  isFreePreview: boolean;
  /** Student can open without paying (free course, assigned, or preview). */
  accessible: boolean;
  mins: number;
  title?: string;
  meta?: string;
  quizId?: string;
  status?: "draft" | "scheduled" | "published";
}

export interface CourseModule {
  id: string;
  number: number;
  locked: boolean;
  lessons: LessonItem[];
  title?: string;
  meta?: string;
  status?: "draft" | "scheduled" | "published";
}

export interface CourseInstructor {
  name: string;
  initials: string;
  rating: string;
  studentsTaught: string;
  yearsTeaching: string;
}

export interface StudentReview {
  id: string;
  studentName: string;
  initials: string;
  districtMobile: string;
  districtDesktop: string;
  timeAgo: string;
}

export interface CourseInclusion {
  id: "inc1" | "inc2" | "inc3" | "inc4" | "inc5";
  icon: LucideIcon;
}

export interface CourseDetailData {
  id: string;
  grade: string;
  rating: string;
  reviewsCount: number;
  duration: string;
  lessonsTotal: number;
  studentsEnrolled: string;
  trailerLength: string;
  priceCurrent: string;
  priceOriginal: string;
  discountLabel: string;
  outcomes: string[];
  modules: CourseModule[];
  instructor: CourseInstructor;
  reviews: StudentReview[];
  inclusions: CourseInclusion[];
  title?: string;
  description?: string;
  subjectGradePill?: string;
  mediumPill?: string;
  isFree?: boolean;
  isAssigned?: boolean;
  coverImageUrl?: string;
}
