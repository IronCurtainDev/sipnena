import { Calculator, Landmark, Terminal, type LucideIcon } from "lucide-react";

export type CourseMedium = "si" | "ta" | "en";
export type PriceFilter = "all" | "free" | "paid";
export type SortOption = "popular" | "lessons";

export interface CourseItem {
  id: string;
  key: "humanBody" | "opticsMirrors" | "plantNutrition" | "matterReactions";
  grade: string;
  medium: CourseMedium;
  isFree: boolean;
  price: string | null;
  videosCount: number;
  lessonsCount: number;
  hours: string;
  rating: string;
  reviews: number;
  teacher: string;
  teacherInitials: string;
  avatarClass: string;
  unitKey:
    | "unit_lifeProcesses"
    | "unit_wavesOptics"
    | "unit_plantBiology"
    | "unit_chemistryMatter";
  mediumBadgeKey: "mediumSinhala" | "mediumTamil" | "mediumEnglish";
  popularRank: number;
}

export interface PopularSubject {
  id: "maths" | "history" | "ict";
  icon: LucideIcon;
  unitsCount: number;
  coursesCount: number;
  iconClass: string;
  bilingualSub: string;
}

export interface CurriculumUnit {
  id: string;
  done: boolean;
}

export interface CurriculumTerm {
  id: "term1" | "term2" | "term3";
  statusType: "active" | "upcoming";
  units: CurriculumUnit[];
}

export const GRADES = ["6", "7", "8", "9", "10", "11"] as const;

export const COURSES_DATA: CourseItem[] = [
  {
    id: "human-body",
    key: "humanBody",
    grade: "8",
    medium: "si",
    isFree: true,
    price: null,
    videosCount: 14,
    lessonsCount: 14,
    hours: "5.5",
    rating: "4.9",
    reviews: 128,
    teacher: "Dr. Rohana Senanayake",
    teacherInitials: "RS",
    avatarClass: "bg-blue-100 text-blue-800",
    unitKey: "unit_lifeProcesses",
    mediumBadgeKey: "mediumSinhala",
    popularRank: 1,
  },
  {
    id: "optics-mirrors",
    key: "opticsMirrors",
    grade: "8",
    medium: "en",
    isFree: false,
    price: "Rs. 1,200",
    videosCount: 8,
    lessonsCount: 8,
    hours: "3.0",
    rating: "4.8",
    reviews: 94,
    teacher: "Ms. Menaka Jayawardena",
    teacherInitials: "MJ",
    avatarClass: "bg-indigo-100 text-indigo-800",
    unitKey: "unit_wavesOptics",
    mediumBadgeKey: "mediumEnglish",
    popularRank: 2,
  },
  {
    id: "plant-nutrition",
    key: "plantNutrition",
    grade: "8",
    medium: "ta",
    isFree: true,
    price: null,
    videosCount: 10,
    lessonsCount: 10,
    hours: "4.0",
    rating: "4.9",
    reviews: 210,
    teacher: "Mr. S. Sivakumaran",
    teacherInitials: "SS",
    avatarClass: "bg-emerald-100 text-emerald-800",
    unitKey: "unit_plantBiology",
    mediumBadgeKey: "mediumTamil",
    popularRank: 3,
  },
  {
    id: "matter-reactions",
    key: "matterReactions",
    grade: "8",
    medium: "si",
    isFree: false,
    price: "Rs. 1,500",
    videosCount: 16,
    lessonsCount: 16,
    hours: "6.0",
    rating: "4.7",
    reviews: 76,
    teacher: "Ms. Dilhani Silva",
    teacherInitials: "DS",
    avatarClass: "bg-amber-100 text-amber-800",
    unitKey: "unit_chemistryMatter",
    mediumBadgeKey: "mediumSinhala",
    popularRank: 4,
  },
];

export const POPULAR_SUBJECTS: PopularSubject[] = [
  {
    id: "maths",
    icon: Calculator,
    unitsCount: 14,
    coursesCount: 32,
    iconClass: "bg-blue-50 text-blue-700",
    bilingualSub: "ගණිතය • கணிதம்",
  },
  {
    id: "history",
    icon: Landmark,
    unitsCount: 9,
    coursesCount: 18,
    iconClass: "bg-orange-50 text-orange-700",
    bilingualSub: "ඉතිහාසය • வரலாறு",
  },
  {
    id: "ict",
    icon: Terminal,
    unitsCount: 12,
    coursesCount: 24,
    iconClass: "bg-indigo-50 text-indigo-700",
    bilingualSub: "තොරතුරු තාක්ෂණය • ICT",
  },
];

export const CURRICULUM_TERMS: CurriculumTerm[] = [
  {
    id: "term1",
    statusType: "active",
    units: [
      { id: "u1", done: false },
      { id: "u2", done: true },
      { id: "u3", done: false },
      { id: "u4", done: true },
    ],
  },
  {
    id: "term2",
    statusType: "active",
    units: [
      { id: "u7", done: true },
      { id: "u8", done: true },
      { id: "u9", done: false },
    ],
  },
  {
    id: "term3",
    statusType: "upcoming",
    units: [],
  },
];
