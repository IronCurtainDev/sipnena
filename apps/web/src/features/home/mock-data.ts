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
    iconBg: "bg-[var(--sn-olive)] text-[var(--sn-primary)]",
    iconColor: "text-[var(--sn-primary)]",
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
    iconBg: "bg-[var(--sn-sage)] text-[var(--sn-primary)]",
    iconColor: "text-[var(--sn-primary)]",
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
    iconBg: "bg-[var(--sn-olive)] text-[var(--sn-primary)]",
    iconColor: "text-[var(--sn-primary)]",
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

export const NEW_COURSES: NewCourse[] = [];

export const TIMETABLE_ITEMS: {
  id: string;
  time: string;
  badgeBg: string;
}[] = [];
