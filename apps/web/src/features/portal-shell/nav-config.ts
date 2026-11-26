import {
  Calendar,
  ClipboardList,
  CreditCard,
  FileCheck2,
  FolderTree,
  GraduationCap,
  HelpCircle,
  MessageCircleQuestion,
  NotebookPen,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { DemoRole } from "@/lib/prototype-state";
import { STUDENT_MOBILE_TABS, STUDENT_NAV_GROUPS } from "./student-nav";

export interface PortalNavLink {
  to: string;
  icon: LucideIcon;
  label: Record<AppLanguage, string>;
  matchPrefix?: string;
}

export interface PortalNavGroup {
  title: Record<AppLanguage, string>;
  items: PortalNavLink[];
}

export const ROLE_ENTRY_ROUTE: Record<DemoRole, string> = {
  student: "/home",
  parent: "/parent",
  teacher: "/teacher",
  admin: "/admin/payments",
};

export const ROLE_LABELS: Record<DemoRole, Record<AppLanguage, string>> = {
  student: { en: "Student", si: "ශිෂ්‍ය", ta: "மாணவர்" },
  parent: { en: "Parent", si: "දෙමාපිය", ta: "பெற்றோர்" },
  teacher: { en: "Teacher", si: "ගුරු", ta: "ஆசிரியர்" },
  admin: { en: "Admin", si: "පරිපාලක", ta: "நிர்வாகி" },
};

export const PORTAL_NAV_GROUPS: Record<DemoRole, PortalNavGroup[]> = {
  student: STUDENT_NAV_GROUPS,
  parent: [
    {
      title: {
        en: "Parent Portal",
        si: "දෙමාපිය පුවරුව",
        ta: "பெற்றோர் பகுதி",
      },
      items: [
        {
          to: "/parent",
          icon: Users,
          label: {
            en: "Child Summary",
            si: "දරුවාගේ ප්‍රගතිය",
            ta: "பிள்ளை விபரம்",
          },
          matchPrefix: "/parent",
        },
        {
          to: "/billing",
          icon: CreditCard,
          label: {
            en: "Class Cards",
            si: "පන්ති කාඩ්පත්",
            ta: "வகுப்பு அட்டைகள்",
          },
        },
        {
          to: "/checkout",
          icon: ShieldCheck,
          label: {
            en: "Pay / Upload Slip",
            si: "ගෙවීම් / රිසිට්",
            ta: "கட்டணம்",
          },
        },
        {
          to: "/payment-status",
          icon: FileCheck2,
          label: { en: "Slip Status", si: "ගෙවීම් තත්ත්වය", ta: "கட்டண நிலை" },
        },
        {
          to: "/schedule",
          icon: Calendar,
          label: { en: "Class Timetable", si: "කාලසටහන", ta: "நேர அட்டவணை" },
        },
        {
          to: "/help",
          icon: HelpCircle,
          label: { en: "Parent Help", si: "දෙමාපිය උදව්", ta: "உதவி" },
        },
      ],
    },
  ],
  teacher: [
    {
      title: { en: "Tutor Studio", si: "ගුරු මැදිරිය", ta: "ஆசிரியர் தளம்" },
      items: [
        {
          to: "/teacher",
          icon: GraduationCap,
          label: { en: "Studio Home", si: "ගුරු මුල් පිටුව", ta: "முகப்பு" },
        },
        {
          to: "/teacher/courses",
          icon: NotebookPen,
          label: {
            en: "Lessons & Tutes",
            si: "පාඩම් සහ ටියුට්",
            ta: "பாடங்கள்",
          },
        },
        {
          to: "/teacher/quizzes",
          icon: ClipboardList,
          label: {
            en: "MCQ Quiz Builder",
            si: "ප්‍රශ්න සාදන්න",
            ta: "வினா உருவாக்கி",
          },
        },
        {
          to: "/teacher/doubts",
          icon: MessageCircleQuestion,
          label: {
            en: "Student Doubts",
            si: "සිසු ප්‍රශ්න",
            ta: "மாணவர் கேள்விகள்",
          },
        },
        {
          to: "/schedule",
          icon: Calendar,
          label: { en: "Live Timetable", si: "කාලසටහන", ta: "நேர அட்டவணை" },
        },
        {
          to: "/admin/syllabus",
          icon: FolderTree,
          label: {
            en: "Syllabus Tree",
            si: "විෂය නිර්දේශය",
            ta: "பாடத்திட்டம்",
          },
        },
      ],
    },
  ],
  admin: [
    {
      title: { en: "Operations", si: "පරිපාලනය", ta: "நிர்வாகம்" },
      items: [
        {
          to: "/admin/payments",
          icon: ShieldCheck,
          label: {
            en: "Bank Slip Queue",
            si: "බැංකු රිසිට් පෝලිම",
            ta: "வங்கிச் சீட்டுகள்",
          },
        },
        {
          to: "/admin/syllabus",
          icon: FolderTree,
          label: {
            en: "Syllabus Manager",
            si: "විෂය නිර්දේශ කළමනාකරු",
            ta: "பாடத்திட்ட நிர்வாகி",
          },
        },
        {
          to: "/payment-status",
          icon: FileCheck2,
          label: {
            en: "Status Preview",
            si: "තත්ත්ව පෙරදසුන",
            ta: "கட்டண நிலை",
          },
        },
        {
          to: "/billing",
          icon: CreditCard,
          label: {
            en: "Billing Records",
            si: "බිල්පත්",
            ta: "கட்டணப் பதிவுகள்",
          },
        },
        {
          to: "/help",
          icon: HelpCircle,
          label: { en: "Policies & Legal", si: "නීති සහ උදව්", ta: "உதவி" },
        },
      ],
    },
  ],
};

export const MOBILE_TABS_BY_ROLE: Record<DemoRole, PortalNavLink[]> = {
  student: STUDENT_MOBILE_TABS,
  parent: [
    {
      to: "/parent",
      icon: Users,
      label: { en: "Child", si: "දරුවා", ta: "பிள்ளை" },
    },
    {
      to: "/billing",
      icon: CreditCard,
      label: { en: "Cards", si: "කාඩ්පත්", ta: "அட்டை" },
    },
    {
      to: "/checkout",
      icon: ShieldCheck,
      label: { en: "Pay", si: "ගෙවන්න", ta: "செலுத்து" },
    },
    {
      to: "/payment-status",
      icon: FileCheck2,
      label: { en: "Status", si: "තත්ත්වය", ta: "நிலை" },
    },
  ],
  teacher: [
    {
      to: "/teacher",
      icon: GraduationCap,
      label: { en: "Studio", si: "මැදිරිය", ta: "முகப்பு" },
    },
    {
      to: "/teacher/courses",
      icon: NotebookPen,
      label: { en: "Lessons", si: "පාඩම්", ta: "பாடங்கள்" },
    },
    {
      to: "/teacher/quizzes",
      icon: ClipboardList,
      label: { en: "Quizzes", si: "ප්‍රශ්න", ta: "வினா" },
    },
    {
      to: "/teacher/doubts",
      icon: MessageCircleQuestion,
      label: { en: "Doubts", si: "ගැටලු", ta: "கேள்விகள்" },
    },
  ],
  admin: [
    {
      to: "/admin/payments",
      icon: ShieldCheck,
      label: { en: "Slips", si: "රිසිට්", ta: "சீட்டு" },
    },
    {
      to: "/admin/syllabus",
      icon: FolderTree,
      label: { en: "Syllabus", si: "නිර්දේශය", ta: "பாடத்திட்டம்" },
    },
    {
      to: "/payment-status",
      icon: FileCheck2,
      label: { en: "Status", si: "තත්ත්වය", ta: "நிலை" },
    },
    {
      to: "/help",
      icon: HelpCircle,
      label: { en: "Policies", si: "නීති", ta: "கொள்கை" },
    },
  ],
};
