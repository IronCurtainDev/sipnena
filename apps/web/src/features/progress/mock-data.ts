import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface SubjectProgressItem {
  subject: string;
  completedUnits: number;
  totalUnits: number;
  pct: number;
}

export interface QuizHistoryItem {
  id: string;
  localizedDate: LocalizedText;
  subject: string;
  localizedTitle: LocalizedText;
  score: string;
  pct: number;
  localizedTrend: LocalizedText;
}

export interface MistakeBankQuestion {
  id: string;
  subject: string;
  localizedSource: LocalizedText;
  localizedPrompt: LocalizedText;
  localizedWrongAnswer: LocalizedText;
  localizedOptions: Record<AppLanguage, [string, string, string, string]>;
  correctIndex: number;
  localizedExplanation: LocalizedText;
}

export const SUBJECT_PROGRESS: SubjectProgressItem[] = [];

export const QUIZ_HISTORY_ITEMS: QuizHistoryItem[] = [];

export const MISTAKE_BANK_ITEMS: MistakeBankQuestion[] = [];
