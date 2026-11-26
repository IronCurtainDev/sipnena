import {
  CreditCard,
  FileCheck2,
  FolderTree,
  GraduationCap,
  HelpCircle,
  MessageCircleQuestion,
  Library,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { DemoRole } from "@/lib/prototype-state";
import type { PortalNavLink } from "./nav-config";
import { STUDENT_MOBILE_TABS } from "./student-nav";

export function mobileTabGridClass(count: number): string {
  if (count <= 3) return "grid-cols-3";
  if (count === 4) return "grid-cols-4";
  return "grid-cols-5";
}

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
      icon: Library,
      label: { en: "Courses", si: "පාඨමාලා", ta: "பாடநெறி" },
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
