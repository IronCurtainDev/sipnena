import { CHECKOUT_STRINGS_EN } from "./strings.en";
import { CHECKOUT_STRINGS_SI } from "./strings.si";
import { CHECKOUT_STRINGS_TA } from "./strings.ta";
import type { CheckoutStrings } from "./strings.types";

export const CHECKOUT_STRINGS: Record<"en" | "si" | "ta", CheckoutStrings> = {
  en: CHECKOUT_STRINGS_EN,
  si: CHECKOUT_STRINGS_SI,
  ta: CHECKOUT_STRINGS_TA,
};
