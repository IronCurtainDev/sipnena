import {
  Calculator,
  FlaskConical,
  BookOpen,
  PenTool,
  Landmark,
  Globe,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export interface SubjectConfig {
  id: string;
  icon: LucideIcon;
  scriptLine: string;
  iconBg: string;
  iconColor: string;
  tagBg: string;
  tagColor: string;
}

export const SUBJECTS_CONFIG: SubjectConfig[] = [
  {
    id: "maths",
    icon: Calculator,
    scriptLine: "ගණිතය • கணிதம்",
    iconBg: "bg-blue-50 text-blue-600",
    iconColor: "text-blue-600",
    tagBg: "bg-blue-50 text-blue-700",
    tagColor: "text-blue-700",
  },
  {
    id: "science",
    icon: FlaskConical,
    scriptLine: "විද්‍යාව • விஞ்ஞானம்",
    iconBg: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
    tagBg: "bg-emerald-50 text-emerald-700",
    tagColor: "text-emerald-700",
  },
  {
    id: "english",
    icon: BookOpen,
    scriptLine: "ඉංග්‍රීසි • ஆங்கிலம்",
    iconBg: "bg-purple-50 text-purple-600",
    iconColor: "text-purple-600",
    tagBg: "bg-slate-100 text-slate-700",
    tagColor: "text-slate-700",
  },
  {
    id: "firstLang",
    icon: PenTool,
    scriptLine: "සිංහල • தமிழ்",
    iconBg: "bg-rose-50 text-rose-600",
    iconColor: "text-rose-600",
    tagBg: "bg-slate-100 text-slate-700",
    tagColor: "text-slate-700",
  },
  {
    id: "history",
    icon: Landmark,
    scriptLine: "ඉතිහාසය • வரலாறு",
    iconBg: "bg-amber-50 text-amber-600",
    iconColor: "text-amber-600",
    tagBg: "bg-slate-100 text-slate-700",
    tagColor: "text-slate-700",
  },
  {
    id: "geography",
    icon: Globe,
    scriptLine: "භූගෝල විද්‍යාව • புவியியல்",
    iconBg: "bg-teal-50 text-teal-600",
    iconColor: "text-teal-600",
    tagBg: "bg-slate-100 text-slate-700",
    tagColor: "text-slate-700",
  },
  {
    id: "ict",
    icon: Terminal,
    scriptLine: "තොරතුරු තාක්ෂණය • தகவல் தொழிற்நுட்பம்",
    iconBg: "bg-indigo-50 text-indigo-600",
    iconColor: "text-indigo-600",
    tagBg: "bg-indigo-50 text-indigo-700",
    tagColor: "text-indigo-700",
  },
];

export const DEFAULT_SELECTED_SUBJECTS = ["maths", "science", "ict"];
