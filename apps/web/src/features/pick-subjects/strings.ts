import type { PickSubjectsStrings } from "./strings.types";
import { EN_STRINGS } from "./strings.en";
import { SI_STRINGS } from "./strings.si";
import { TA_STRINGS } from "./strings.ta";

export type { PickSubjectsStrings };

export const PICK_SUBJECTS_STRINGS: Record<
  "en" | "si" | "ta",
  PickSubjectsStrings
> = {
  en: EN_STRINGS,
  si: SI_STRINGS,
  ta: TA_STRINGS,
};
