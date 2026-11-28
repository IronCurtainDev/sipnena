import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export type MaterialCategory =
  | "Lesson Tutes"
  | "Short Notes"
  | "Formula Sheets"
  | "Mind Maps"
  | "NIE Textbooks";

export interface StudyMaterialItem {
  id: string;
  category: MaterialCategory;
  localizedTitle: LocalizedText;
  subject: string;
  grade: number;
  localizedMedium: LocalizedText;
  courseId: string;
  sizeLabel: string;
  pages: number;
  localizedSummary: LocalizedText;
  localizedBullets: Record<AppLanguage, string[]>;
}

export const MATERIAL_CATEGORIES: Array<"All" | MaterialCategory> = [
  "All",
  "Lesson Tutes",
  "Short Notes",
  "Formula Sheets",
  "Mind Maps",
  "NIE Textbooks",
];

export const STUDY_MATERIALS: StudyMaterialItem[] = [];
