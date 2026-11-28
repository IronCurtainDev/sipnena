import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface McqQuestionItem {
  id: string;
  number: number;
  prompt: LocalizedText;
  options: Record<AppLanguage, [string, string, string, string]>;
  correctIndex: number;
  explanation: LocalizedText;
}

export const DEFAULT_MCQS: McqQuestionItem[] = [];

export const MATH_MCQS: McqQuestionItem[] = [];

export const ICT_MCQS: McqQuestionItem[] = [];
