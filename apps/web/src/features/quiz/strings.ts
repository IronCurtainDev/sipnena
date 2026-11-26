import type { AppLanguage } from "@/lib/language";
import { EN_QUIZ_STRINGS } from "./strings.en";
import { SI_QUIZ_STRINGS } from "./strings.si";
import { TA_QUIZ_STRINGS } from "./strings.ta";
import type { QuizStrings } from "./strings.types";

export type { QuizStrings };

export const QUIZ_STRINGS: Record<AppLanguage, QuizStrings> = {
  en: EN_QUIZ_STRINGS,
  si: SI_QUIZ_STRINGS,
  ta: TA_QUIZ_STRINGS,
};
