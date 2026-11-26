import {
  BarChart3,
  Bell,
  Bookmark,
  BookOpen,
  Calendar,
  CreditCard,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Home,
  MessageCircleQuestion,
  Radio,
  Search,
  User,
} from "lucide-react";
import type { PortalNavGroup, PortalNavLink } from "./nav-config";

export const STUDENT_NAV_GROUPS: PortalNavGroup[] = [
  {
    title: { en: "Learn", si: "ඉගෙනුම", ta: "கற்றல்" },
    items: [
      {
        to: "/home",
        icon: Home,
        label: { en: "Home", si: "මුල් පිටුව", ta: "முகப்பு" },
      },
      {
        to: "/courses",
        icon: BookOpen,
        label: { en: "My Courses", si: "මගේ පාඩම්", ta: "பாடங்கள்" },
        matchPrefix: "/course",
      },
      {
        to: "/live",
        icon: Radio,
        label: { en: "Live Classes", si: "සජීවී පන්ති", ta: "நேரலை" },
      },
      {
        to: "/schedule",
        icon: Calendar,
        label: { en: "Timetable", si: "කාලසටහන", ta: "நேர அட்டவணை" },
      },
      {
        to: "/doubts",
        icon: MessageCircleQuestion,
        label: { en: "Ask Doubts", si: "ප්‍රශ්න අහන්න", ta: "சந்தேகங்கள்" },
      },
    ],
  },
  {
    title: { en: "Exam Prep", si: "විභාග සූදානම", ta: "பரீட்சை" },
    items: [
      {
        to: "/past-papers",
        icon: FileCheck2,
        label: { en: "Past Papers", si: "පසුගිය ප්‍රශ්න", ta: "கடந்த வினா" },
        matchPrefix: "/past-papers",
      },
      {
        to: "/term-tests",
        icon: FileSpreadsheet,
        label: { en: "Term Tests", si: "වාර විභාග", ta: "தவணைப் பரீட்சை" },
      },
      {
        to: "/notes",
        icon: FileText,
        label: {
          en: "Tutes & Notes",
          si: "ටියුට් සහ සටහන්",
          ta: "குறிப்புகள்",
        },
      },
      {
        to: "/progress",
        icon: BarChart3,
        label: { en: "Progress & Mistakes", si: "ප්‍රගතිය", ta: "முன்னேற்றம்" },
        matchPrefix: "/quiz-history",
      },
    ],
  },
  {
    title: { en: "My Space", si: "මගේ අවකාශය", ta: "எனது இடம்" },
    items: [
      {
        to: "/search",
        icon: Search,
        label: { en: "Search", si: "සොයන්න", ta: "தேடுக" },
      },
      {
        to: "/saved",
        icon: Bookmark,
        label: { en: "Saved", si: "සුරැකි දෑ", ta: "சேமித்தவை" },
      },
      {
        to: "/downloads",
        icon: Download,
        label: { en: "Downloads & Data", si: "බාගැනීම්", ta: "பதிவிறக்கம்" },
      },
      {
        to: "/billing",
        icon: CreditCard,
        label: { en: "Class Cards", si: "පන්ති කාඩ්පත්", ta: "அட்டைகள்" },
        matchPrefix: "/payment-status",
      },
      {
        to: "/notifications",
        icon: Bell,
        label: { en: "Alerts", si: "දැනුම්දීම්", ta: "அறிவிப்பு" },
      },
      {
        to: "/me",
        icon: User,
        label: { en: "Profile & Setup", si: "ගිණුම", ta: "கணக்கு" },
        matchPrefix: "/select-",
      },
      {
        to: "/help",
        icon: HelpCircle,
        label: { en: "Help & Legal", si: "උදව්", ta: "உதவி" },
      },
    ],
  },
];

export const STUDENT_MOBILE_TABS: PortalNavLink[] = [
  {
    to: "/home",
    icon: Home,
    label: { en: "Home", si: "මුල් පිටුව", ta: "முகப்பு" },
  },
  {
    to: "/courses",
    icon: BookOpen,
    label: { en: "Courses", si: "පාඩම්", ta: "பாடங்கள்" },
  },
  {
    to: "/past-papers",
    icon: FileCheck2,
    label: { en: "Papers", si: "ප්‍රශ්න පත්‍ර", ta: "வினாத்தாள்" },
  },
  {
    to: "/saved",
    icon: Bookmark,
    label: { en: "Saved", si: "සුරැකි", ta: "சேமித்தவை" },
  },
];
