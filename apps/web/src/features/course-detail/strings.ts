import type { AppLanguage } from "@/lib/language";
import { STRINGS_EN } from "./strings.en";
import { STRINGS_SI } from "./strings.si";
import { STRINGS_TA } from "./strings.ta";
import type { CourseDetailStrings } from "./strings.types";

export const COURSE_DETAIL_STRINGS: Record<AppLanguage, CourseDetailStrings> = {
  en: STRINGS_EN,
  si: STRINGS_SI,
  ta: STRINGS_TA,
};

export function formatCourseDetailString(
  template: string,
  vars: Record<string, string | number> = {},
): string {
  let out = template || "";
  Object.entries(vars).forEach(([k, v]) => {
    out = out.replace(`{${k}}`, String(v));
  });
  return out;
}
