import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

export const SEEDED_QUIZ_PROMPTS: Record<
  string,
  { prompt: LocalizedText; options?: Record<AppLanguage, string[]> }
> = {
  q1: {
    prompt: {
      en: "If the angle of incidence on a plane mirror is 35°, what is the angle between the incident ray and reflected ray?",
      si: "තල දර්පණයක් මත පතන කෝණය 35° නම්, පතන කිරණය සහ පරාවර්තන කිරණය අතර කෝණය කීයද?",
      ta: "தள ஆடியில் படுகோணம் 35° எனில், படுகதிருக்கும் தெறிகதிருக்கும் இடைப்பட்ட கோணம் யாது?",
    },
  },
  q2: {
    prompt: {
      en: "Which mirror is used as a vehicle side rear-view mirror?",
      si: "වාහනවල පැති කණ්ණාඩි ලෙස භාවිතා කරන්නේ කුමන දර්පණයද?",
      ta: "வாகனங்களின் பக்கவாட்டுக் கண்ணாடியாகப் பயன்படுத்தப்படும் ஆடி எது?",
    },
    options: {
      en: [
        "Concave mirror",
        "Convex mirror",
        "Plane mirror",
        "Parabolic mirror",
      ],
      si: ["අවතල දර්පණය", "උත්තල දර්පණය", "තල දර්පණය", "පරාවලයික දර්පණය"],
      ta: ["குழிவு ஆடி", "குவிவு ஆடி", "தள ஆடி", "பரவளைய ஆடி"],
    },
  },
};
