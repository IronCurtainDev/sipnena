import type { AppLanguage } from "@/lib/language";
import { COURSES_STRINGS_EN } from "./strings.en";
import { COURSES_STRINGS_SI } from "./strings.si";
import { COURSES_STRINGS_TA } from "./strings.ta";
import type { CourseStrings } from "./strings.types";

export const COURSES_STRINGS: Record<AppLanguage, CourseStrings> = {
  en: COURSES_STRINGS_EN,
  si: COURSES_STRINGS_SI,
  ta: COURSES_STRINGS_TA,
};

export function formatCourseString(
  template: string,
  vars: Record<string, string | number> = {},
): string {
  let out = template || "";
  Object.entries(vars).forEach(([k, v]) => {
    out = out.replace(`{${k}}`, String(v));
  });
  return out;
}
