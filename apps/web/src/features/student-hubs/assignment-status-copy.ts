import type { StudentAssignmentStatus } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

export const STUDENT_ASSIGN_COPY: Record<
  AppLanguage,
  {
    title: string;
    subtitle: string;
    empty: string;
    all: string;
    todo: string;
    submitted: string;
    graded: string;
    overdue: string;
    dueLabel: string;
    marksLabel: string;
  }
> = {
  en: {
    title: "Assignments",
    subtitle:
      "See what to do, submit your answer or notebook photo, then check your teacher’s marks.",
    empty: "No assignments in this list yet.",
    all: "All",
    todo: "To do",
    submitted: "Submitted",
    graded: "Graded",
    overdue: "Overdue",
    dueLabel: "Due",
    marksLabel: "Marks",
  },
  si: {
    title: "පැවරුම්",
    subtitle:
      "කළ යුතු දේ බලන්න, පිළිතුර හෝ අභ්‍යාස පොතේ ඡායාරූපය භාර දෙන්න, ඉන්පසු ලකුණු බලන්න.",
    empty: "මෙම ලැයිස්තුවේ පැවරුම් නැත.",
    all: "සියල්ල",
    todo: "කළ යුතුයි",
    submitted: "භාර දුන්",
    graded: "ලකුණු දී ඇත",
    overdue: "කල් ඉකුත්",
    dueLabel: "භාරදිය යුතු දිනය",
    marksLabel: "ලකුණු",
  },
  ta: {
    title: "ஒப்படைப்புகள்",
    subtitle:
      "செய்ய வேண்டியதைப் பார்த்து பதில் அல்லது புத்தகப் படம் சமர்ப்பித்து மதிப்பெண்ணைப் பாருங்கள்.",
    empty: "இந்தப் பட்டியலில் ஒப்படைப்புகள் இல்லை.",
    all: "அனைத்தும்",
    todo: "செய்ய வேண்டியவை",
    submitted: "சமர்ப்பித்தவை",
    graded: "மதிப்பிட்டவை",
    overdue: "காலந்தவறியவை",
    dueLabel: "கடைசித் திகதி",
    marksLabel: "மதிப்பெண்கள்",
  },
};

export function statusLabel(
  lang: AppLanguage,
  status: StudentAssignmentStatus,
): string {
  const t = STUDENT_ASSIGN_COPY[lang];
  if (status === "todo") return t.todo;
  if (status === "submitted") return t.submitted;
  if (status === "graded") return t.graded;
  return t.overdue;
}

export function statusBadgeClass(status: StudentAssignmentStatus): string {
  if (status === "graded")
    return "bg-emerald-100 text-emerald-900";
  if (status === "submitted")
    return "bg-[var(--sn-olive)] text-[var(--sn-primary)]";
  if (status === "overdue") return "bg-amber-100 text-amber-950";
  return "bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)]";
}
