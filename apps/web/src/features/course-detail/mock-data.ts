import {
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type LessonType = "video" | "note" | "quiz";

export interface LessonItem {
  id: string;
  type: LessonType;
  isFreePreview: boolean;
  mins: number;
}

export interface CourseModule {
  id: string;
  number: number;
  locked: boolean;
  lessons: LessonItem[];
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
}

export const COURSE_DETAIL_MOCK: CourseDetailData = {
  id: "optics-mirrors-g8",
  grade: "8",
  rating: "4.8",
  reviewsCount: 94,
  duration: "3h 15m",
  lessonsTotal: 8,
  studentsEnrolled: "1,240",
  trailerLength: "3:15",
  priceCurrent: "Rs. 1,200",
  priceOriginal: "Rs. 2,000",
  discountLabel: "40% OFF",
  outcomes: ["o1", "o2", "o3", "o4"],
  modules: [
    {
      id: "mod1",
      number: 1,
      locked: false,
      lessons: [
        { id: "l1", type: "video", isFreePreview: true, mins: 18 },
        { id: "l2", type: "video", isFreePreview: true, mins: 24 },
        { id: "l3", type: "note", isFreePreview: false, mins: 10 },
        { id: "l4", type: "quiz", isFreePreview: false, mins: 15 },
      ],
    },
    {
      id: "mod2",
      number: 2,
      locked: true,
      lessons: [
        { id: "l5", type: "video", isFreePreview: false, mins: 28 },
        { id: "l6", type: "video", isFreePreview: false, mins: 32 },
        { id: "l7", type: "note", isFreePreview: false, mins: 15 },
        { id: "l8", type: "quiz", isFreePreview: false, mins: 20 },
      ],
    },
  ],
  instructor: {
    name: "Ms. Menaka Jayawardena",
    initials: "MJ",
    rating: "4.9",
    studentsTaught: "8,400+",
    yearsTeaching: "12+",
  },
  reviews: [
    {
      id: "rev1",
      studentName: "Dineth P.",
      initials: "DP",
      districtMobile: "Kandy",
      districtDesktop: "Kandy District",
      timeAgo: "3 days ago",
    },
    {
      id: "rev2",
      studentName: "Rashmi M.",
      initials: "RM",
      districtMobile: "Kurunegala",
      districtDesktop: "Kurunegala District",
      timeAgo: "1 week ago",
    },
  ],
  inclusions: [
    { id: "inc1", icon: ShieldCheck },
    { id: "inc2", icon: CheckCircle2 },
    { id: "inc3", icon: ClipboardCheck },
    { id: "inc4", icon: Smartphone },
    { id: "inc5", icon: MessageCircle },
  ],
};
