import type { LocalizedText } from "@/lib/i18n-common";
import type { StudyMedium } from "@/lib/language-types";
import {
  DEFAULT_MCQS,
  ICT_MCQS,
  MATH_MCQS,
  type McqQuestionItem,
} from "./mcq-data";
import {
  DEFAULT_PART_TWO,
  HIST_PART_TWO,
  MATH_PART_TWO,
  type PartTwoQuestionItem,
} from "./part-two-data";

export type { McqQuestionItem } from "./mcq-data";
export type { PartTwoQuestionItem } from "./part-two-data";

export type PaperType = "Part I MCQ" | "Part II Structured & Essay";

export interface PastPaperItem {
  id: string;
  localizedTitle: LocalizedText;
  subject: string;
  grade: number;
  year: number;
  medium: StudyMedium;
  paperType: PaperType;
  durationMinutes: number;
  totalMarks: number;
  mcqs: McqQuestionItem[];
  partTwo: PartTwoQuestionItem[];
}

export const PAST_PAPERS: PastPaperItem[] = [];
