import { LANDING_STRINGS_EN } from "./strings.en";
import { LANDING_STRINGS_SI } from "./strings.si";
import { LANDING_STRINGS_TA } from "./strings.ta";
import type { LandingStrings } from "./strings.types";

export const LANDING_STRINGS: Record<"en" | "si" | "ta", LandingStrings> = {
  en: LANDING_STRINGS_EN,
  si: LANDING_STRINGS_SI,
  ta: LANDING_STRINGS_TA,
};
