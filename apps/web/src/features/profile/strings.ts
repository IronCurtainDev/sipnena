import type { AppLanguage } from "@/lib/language";
import { EN_PROFILE_STRINGS } from "./strings.en";
import { SI_PROFILE_STRINGS } from "./strings.si";
import { TA_PROFILE_STRINGS } from "./strings.ta";
import type { ProfileStrings } from "./strings.types";

export type { ProfileStrings };

export const PROFILE_STRINGS: Record<AppLanguage, ProfileStrings> = {
  en: EN_PROFILE_STRINGS,
  si: SI_PROFILE_STRINGS,
  ta: TA_PROFILE_STRINGS,
};
