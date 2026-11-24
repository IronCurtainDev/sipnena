import {
  Calculator,
  FlaskConical,
  BookOpen,
  PenTool,
  Terminal,
  Languages,
  Home,
  Bookmark,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItemConfig {
  id: string;
  icon: LucideIcon;
  labelKey: "nav_home" | "nav_courses" | "nav_saved" | "nav_me";
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: "home", icon: Home, labelKey: "nav_home" },
  { id: "courses", icon: BookOpen, labelKey: "nav_courses" },
  { id: "saved", icon: Bookmark, labelKey: "nav_saved" },
  { id: "me", icon: User, labelKey: "nav_me" },
];

export interface HomeSubject {
  id: string;
  icon: LucideIcon;
  nativeScript: string;
  mobileLabel: string;
  iconBg: string;
  iconColor: string;
}

export const HOME_SUBJECTS: HomeSubject[] = [
  {
    id: "maths",
    icon: Calculator,
    nativeScript: "ගණිතය",
    mobileLabel: "Maths",
    iconBg: "bg-blue-50 text-blue-600",
    iconColor: "text-blue-600",
  },
  {
    id: "science",
    icon: FlaskConical,
    nativeScript: "විද්‍යාව",
    mobileLabel: "Science",
    iconBg: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
  },
  {
    id: "english",
    icon: Languages,
    nativeScript: "ඉංග්‍රීසි",
    mobileLabel: "English",
    iconBg: "bg-purple-50 text-purple-600",
    iconColor: "text-purple-600",
  },
  {
    id: "sinhala",
    icon: PenTool,
    nativeScript: "සාහිත්‍යය",
    mobileLabel: "සිංහල",
    iconBg: "bg-rose-50 text-rose-600",
    iconColor: "text-rose-600",
  },
  {
    id: "ict",
    icon: Terminal,
    nativeScript: "තොරතුරු තාක්ෂණය",
    mobileLabel: "ICT",
    iconBg: "bg-sky-50 text-sky-700",
    iconColor: "text-sky-700",
  },
];

export interface NewCourse {
  id: string;
  subjectTagId: string;
  teacher: string;
  lessonsCount: number;
  hours: string;
  mediumKey: "mediumSinhala" | "mediumEnglish" | "mediumTamilSinhala";
  isFree: boolean;
  price: string | null;
  tagBg: string;
  tagColor: string;
}

export const NEW_COURSES: NewCourse[] = [
  {
    id: "geometry",
    subjectTagId: "maths",
    teacher: "Mr. Anura Perera",
    lessonsCount: 12,
    hours: "4.5",
    mediumKey: "mediumSinhala",
    isFree: true,
    price: null,
    tagBg: "bg-blue-50 text-blue-700",
    tagColor: "text-blue-700",
  },
  {
    id: "python",
    subjectTagId: "ict",
    teacher: "Ms. Dilani Silva",
    lessonsCount: 16,
    hours: "6",
    mediumKey: "mediumEnglish",
    isFree: false,
    price: "Rs. 1,500",
    tagBg: "bg-sky-50 text-sky-700",
    tagColor: "text-sky-700",
  },
  {
    id: "history",
    subjectTagId: "history",
    teacher: "Mr. K. Rajaratnam",
    lessonsCount: 9,
    hours: "3",
    mediumKey: "mediumTamilSinhala",
    isFree: true,
    price: null,
    tagBg: "bg-amber-50 text-amber-800",
    tagColor: "text-amber-800",
  },
];

export const TIMETABLE_ITEMS = [
  {
    id: "tt-1",
    time: "09:00 AM",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
  },
  {
    id: "tt-2",
    time: "02:30 PM",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200/60",
  },
];
