import type { AppLanguage } from "@/lib/language";
import { EN_QUIZ_RESULT_STRINGS } from "./result-strings.en";
import { SI_QUIZ_RESULT_STRINGS } from "./result-strings.si";
import { TA_QUIZ_RESULT_STRINGS } from "./result-strings.ta";
import type { QuizResultStrings } from "./result-strings.types";

export type { QuizResultStrings };

export const QUIZ_RESULT_STRINGS: Record<AppLanguage, QuizResultStrings> = {
  en: EN_QUIZ_RESULT_STRINGS,
  si: SI_QUIZ_RESULT_STRINGS,
  ta: TA_QUIZ_RESULT_STRINGS,
};
