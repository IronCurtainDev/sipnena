import type { AppLanguage } from "@/lib/language";
import { EN_COMPLETION_STRINGS } from "./strings.en";
import { SI_COMPLETION_STRINGS } from "./strings.si";
import { TA_COMPLETION_STRINGS } from "./strings.ta";
import type { CompletionStrings } from "./strings.types";

export type { CompletionStrings };

export const COMPLETION_STRINGS: Record<AppLanguage, CompletionStrings> = {
  en: EN_COMPLETION_STRINGS,
  si: SI_COMPLETION_STRINGS,
  ta: TA_COMPLETION_STRINGS,
};
