import {
  BookOpen,
  ClipboardList,
  FileCheck2,
  Home,
  Radio,
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
        label: { en: "Today", si: "අද", ta: "இன்று" },
      },
      {
        to: "/courses",
        icon: BookOpen,
        label: { en: "Subjects", si: "විෂයන්", ta: "பாடங்கள்" },
        matchPrefix: "/course",
      },
      {
        to: "/exam-prep",
        icon: FileCheck2,
        label: { en: "Exam prep", si: "විභාග සූදානම", ta: "பரீட்சை" },
        matchPrefix: "/past-papers",
      },
      {
        to: "/assignments",
        icon: ClipboardList,
        label: { en: "Assignments", si: "පැවරුම්", ta: "ஒப்படைப்புகள்" },
      },
      {
        to: "/live-ask",
        icon: Radio,
        label: {
          en: "Live & Ask",
          si: "සජීවී සහ ප්‍රශ්න",
          ta: "நேரலை & கேள்வி",
        },
        matchPrefix: "/live",
      },
      {
        to: "/me",
        icon: User,
        label: { en: "Me", si: "මම", ta: "நான்" },
        matchPrefix: "/profile",
      },
    ],
  },
];

export const STUDENT_MOBILE_TABS: PortalNavLink[] = [
  {
    to: "/home",
    icon: Home,
    label: { en: "Today", si: "අද", ta: "இன்று" },
  },
  {
    to: "/courses",
    icon: BookOpen,
    label: { en: "Subjects", si: "විෂයන්", ta: "பாடங்கள்" },
  },
  {
    to: "/exam-prep",
    icon: FileCheck2,
    label: { en: "Exams", si: "විභාග", ta: "பரீட்சை" },
  },
  {
    to: "/live-ask",
    icon: Radio,
    label: { en: "Live", si: "සජීවී", ta: "நேரலை" },
  },
];
