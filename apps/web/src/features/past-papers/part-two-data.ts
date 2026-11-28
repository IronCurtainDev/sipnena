import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface PartTwoQuestionItem {
  id: string;
  numberLabel: LocalizedText;
  title: LocalizedText;
  marks: number;
  prompt: LocalizedText;
  markingScheme: Record<AppLanguage, string[]>;
}

export const DEFAULT_PART_TWO: PartTwoQuestionItem[] = [];

export const MATH_PART_TWO: PartTwoQuestionItem[] = [];

export const HIST_PART_TWO: PartTwoQuestionItem[] = [];
