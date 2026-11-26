import type { AppLanguage } from "./language";
import type { StudyMedium } from "./language-types";

export interface LocalizedText {
  en: string;
  si: string;
  ta: string;
}

export function tText(lang: AppLanguage, item: LocalizedText): string {
  return item[lang] || item.en;
}

export function formatGrade(lang: AppLanguage, grade: number): string {
  if (lang === "si") return `${grade} ශ්‍රේණිය`;
  if (lang === "ta") return `தரம் ${grade}`;
  return `Grade ${grade}`;
}

export function formatGradeShort(lang: AppLanguage, grade: number): string {
  if (lang === "si") return `${grade} ශ්‍රේ.`;
  if (lang === "ta") return `த.${grade}`;
  return `G${grade}`;
}

export function formatMedium(lang: AppLanguage, medium: StudyMedium): string {
  if (lang === "si") {
    return medium === "si"
      ? "සිංහල මාධ්‍යය"
      : medium === "ta"
        ? "දෙමළ මාධ්‍යය"
        : "ඉංග්‍රීසි මාධ්‍යය";
  }
  if (lang === "ta") {
    return medium === "si"
      ? "சிங்கள மொழி மூலம்"
      : medium === "ta"
        ? "தமிழ் மொழி மூலம்"
        : "ஆங்கில மொழி மூலம்";
  }
  return medium === "si"
    ? "Sinhala Medium"
    : medium === "ta"
      ? "Tamil Medium"
      : "English Medium";
}

export const SUBJECT_NAME_MAP: Record<string, LocalizedText> = {
  All: { en: "All Subjects", si: "සියලු විෂයයන්", ta: "அனைத்துப் பாடங்களும்" },
  Science: { en: "Science", si: "විද්‍යාව", ta: "விஞ்ஞானம்" },
  Mathematics: { en: "Mathematics", si: "ගණිතය", ta: "கணிதம்" },
  Maths: { en: "Maths", si: "ගණිතය", ta: "கணிதம்" },
  ICT: {
    en: "ICT",
    si: "තොරතුරු තාක්ෂණය (ICT)",
    ta: "தகவல் தொழிற்நுட்பம் (ICT)",
  },
  English: { en: "English", si: "ඉංග්‍රීසි", ta: "ஆங்கிலம்" },
  History: { en: "History", si: "ඉතිහාසය", ta: "வரலாறு" },
  Sinhala: { en: "Sinhala", si: "සිංහල", ta: "சிங்களம்" },
  Tamil: { en: "Tamil", si: "දෙමළ", ta: "தமிழ்" },
};

export function formatSubject(lang: AppLanguage, subject: string): string {
  const entry = SUBJECT_NAME_MAP[subject];
  return entry ? entry[lang] : subject;
}

export const TERM_NAME_MAP: Record<
  "Term 1" | "Term 2" | "Term 3",
  LocalizedText
> = {
  "Term 1": { en: "Term 1", si: "1 වන වාරය", ta: "1ஆம் தவணை" },
  "Term 2": { en: "Term 2", si: "2 වන වාරය", ta: "2ஆம் தவணை" },
  "Term 3": { en: "Term 3", si: "3 වන වාරය", ta: "3ஆம் தவணை" },
};
