import {
  Calendar,
  CreditCard,
  FileCheck2,
  FolderTree,
  GraduationCap,
  HelpCircle,
  Library,
  MessageCircleQuestion,
  Radio,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { DemoRole } from "@/lib/prototype-state";
import { STUDENT_NAV_GROUPS } from "./student-nav";

export { MOBILE_TABS_BY_ROLE } from "./mobile-tabs";

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
        en: "Children & Progress",
        si: "දරුවන් සහ ප්‍රගතිය",
        ta: "பிள்ளைகள் & முன்னேற்றம்",
      },
      items: [
        {
          to: "/parent",
          icon: Users,
          label: {
            en: "Parent Dashboard",
            si: "දෙමාපිය පුවරුව",
            ta: "பெற்றோர் பலகை",
          },
        },
        {
          to: "/parent/child/kasun",
          icon: GraduationCap,
          label: {
            en: "Kasun (Grade 8)",
            si: "කසුන් (8 ශ්‍රේණිය)",
            ta: "கசுன் (தரம் 8)",
          },
        },
        {
          to: "/parent/child/nethmi",
          icon: GraduationCap,
          label: {
            en: "Nethmi (Grade 11 O/L)",
            si: "නෙත්මි (11 සා/පෙළ)",
            ta: "நெத்மி (தரம் 11 சா/த)",
          },
        },
        {
          to: "/schedule",
          icon: Calendar,
          label: {
            en: "Tuition Timetable",
            si: "පන්ති කාලසටහන",
            ta: "வகுப்பு அட்டவணை",
          },
        },
      ],
    },
    {
      title: {
        en: "Payments & Class Cards",
        si: "ගෙවීම් සහ කාඩ්පත්",
        ta: "கட்டணம் & அட்டைகள்",
      },
      items: [
        {
          to: "/billing",
          icon: CreditCard,
          label: {
            en: "Class Cards & Receipts",
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
            ta: "கட்டணம் / ரசீது",
          },
        },
        {
          to: "/payment-status",
          icon: FileCheck2,
          label: {
            en: "Bank Slip Status",
            si: "ගෙවීම් තත්ත්වය",
            ta: "ரசீது நிலை",
          },
        },
        {
          to: "/help",
          icon: HelpCircle,
          label: { en: "Parent Helpdesk", si: "දෙමාපිය උදව්", ta: "உதவி" },
        },
      ],
    },
  ],
  teacher: [
    {
      title: {
        en: "Tutor Studio",
        si: "ගුරු මැදිරිය",
        ta: "ஆசிரியர் ஸ்டுடியோ",
      },
      items: [
        {
          to: "/teacher",
          icon: GraduationCap,
          label: {
            en: "Studio Overview",
            si: "ගුරු මුල් පිටුව",
            ta: "ஸ்டுடியோ முகப்பு",
          },
        },
        {
          to: "/teacher/courses",
          icon: Library,
          label: {
            en: "Courses",
            si: "පාඨමාලා",
            ta: "பாடநெறிகள்",
          },
        },
        {
          to: "/teacher/doubts",
          icon: MessageCircleQuestion,
          label: {
            en: "Student Doubt Queue",
            si: "සිසු ප්‍රශ්න පෝලිම",
            ta: "மாணவர் கேள்விகள்",
          },
        },
        {
          to: "/teacher/schedule",
          icon: Radio,
          label: {
            en: "My Live Broadcasts",
            si: "මගේ සජීවී පන්ති",
            ta: "எனது நேரலை வகுப்புகள்",
          },
        },
      ],
    },
  ],
  admin: [
    {
      title: {
        en: "Admin Operations",
        si: "පරිපාලක මෙහෙයුම්",
        ta: "நிர்வாகச் செயற்பாடுகள்",
      },
      items: [
        {
          to: "/admin/payments",
          icon: ShieldCheck,
          label: {
            en: "Bank Slip Approval Queue",
            si: "බැංකු රිසිට් පෝලිම",
            ta: "வங்கி ரசீது வரிசை",
          },
        },
        {
          to: "/admin/syllabus",
          icon: FolderTree,
          label: {
            en: "NIE Syllabus Manager",
            si: "විෂය නිර්දේශ කළමනාකරු",
            ta: "NIE பாடத்திட்ட நிர்வாகி",
          },
        },
        {
          to: "/payment-status",
          icon: FileCheck2,
          label: {
            en: "Verification Status View",
            si: "තහවුරු තත්ත්ව පෙරදසුන",
            ta: "சரிபார்ப்பு நிலைப் பார்வை",
          },
        },
        {
          to: "/help",
          icon: HelpCircle,
          label: {
            en: "Policies & Compliance",
            si: "ප්‍රතිපත්ති සහ උදව්",
            ta: "கொள்கைகள் & உதவி",
          },
        },
      ],
    },
  ],
};
