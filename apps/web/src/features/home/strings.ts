import type { HomeStrings } from "./strings.types";
import { EN_HOME_STRINGS } from "./strings.en";
import { SI_HOME_STRINGS } from "./strings.si";
import { TA_HOME_STRINGS } from "./strings.ta";

export type { HomeStrings };

export const HOME_STRINGS: Record<"en" | "si" | "ta", HomeStrings> = {
  en: EN_HOME_STRINGS,
  si: SI_HOME_STRINGS,
  ta: TA_HOME_STRINGS,
};
