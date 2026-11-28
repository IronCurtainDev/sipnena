import type { AppLanguage } from "@/lib/language";
import {
  EXTRA_QUIZ_QUESTIONS,
  type LocalizedQuestionData,
} from "./mock-data-extra";
import type { QuizQuestion } from "./types";

const BASE_QUESTIONS: LocalizedQuestionData[] = [
  {
    id: 1,
    questionNumber: 1,
    diagramType: "plane_reflection",
    incidentAngle: 45,
    reflectedAngle: 45,
    showLawBadge: false,
    gradeBadge: {
      en: "Science • Grade 8",
      si: "විද්‍යාව • 8 ශ්‍රේණිය",
      ta: "விஞ்ஞானம் • தரம் 8",
    },
    subjectBadge: { en: "Light", si: "ආලෝකය", ta: "ஒளி" },
    title: {
      en: "Light travels in straight lines until it meets a surface. What is this property of light called?",
      si: "ආලෝකය පෘෂ්ඨයකට හමුවන තෙක් සරල රේඛීයව ගමන් කරයි. මෙම ගුණය කුමක් ලෙස හැඳින්වේද?",
      ta: "ஒரு மேற்பரப்பைச் சந்திக்கும் வரை ஒளி நேர்கோட்டில் பயணம் செய்கிறது. இந்தப் பண்பு எவ்வாறு அழைக்கப்படுகிறது?",
    },
    options: [
      {
        id: "A",
        isCorrect: true,
        text: {
          en: "Rectilinear propagation",
          si: "සරල රේඛීය ප්‍රචාරණය",
          ta: "நேர்கோட்டுப் பரவல்",
        },
        subtext: {
          en: "Light moving along a straight line path",
          si: "සරල රේඛීය මාර්ගයක ආලෝකය ගමන් කිරීම",
          ta: "நேர்கோட்டுப் பாதையில் ஒளி செல்லுதல்",
        },
      },
      {
        id: "B",
        isCorrect: false,
        text: {
          en: "Circular dispersion",
          si: "වෘත්තාකාර අපසරණය",
          ta: "வட்டச் சிதறல்",
        },
        subtext: {
          en: "Light bending in loops",
          si: "වළලු ලෙස ආලෝකය නැමීම",
          ta: "வளையங்களாக ஒளி வளைதல்",
        },
      },
      {
        id: "C",
        isCorrect: false,
        text: {
          en: "Diffraction wave",
          si: "විවර්තන තරංගය",
          ta: "விளிம்பு விளைவு அலை",
        },
        subtext: {
          en: "Spreading around corners",
          si: "මුළු වටා පැතිරීම",
          ta: "மூலைகளைச் சுற்றிப் பரவுதல்",
        },
      },
      {
        id: "D",
        isCorrect: false,
        text: {
          en: "Lateral inversion",
          si: "පාර්ශ්වික අපවර්තනය",
          ta: "பக்கவாட்டு மாற்றம்",
        },
        subtext: {
          en: "Left-to-right flipping in a mirror",
          si: "දර්පණයක වම සහ දකුණ මාරු වීම",
          ta: "ஆடியில் இடது-வலது மாறுதல்",
        },
      },
    ],
    explanation: {
      title: {
        en: "Rectilinear Propagation",
        si: "ආලෝකයේ සරල රේඛීය ප්‍රචාරණය",
        ta: "ஒளியின் நேர்கோட்டுப் பரவல்",
      },
      body: {
        en: "In a uniform medium like air or empty space, light always travels along straight paths. This is why sharp shadows form behind opaque objects.",
        si: "වාතය වැනි ඒකාකාර මාධ්‍යයක ආලෝකය සැමවිටම සරල රේඛීයව ගමන් කරයි. පාරාන්ධ වස්තු පිටුපස තියුණු සෙවණැලි ඇතිවීමට හේතුව මෙයයි.",
        ta: "காற்று போன்ற சீரான ஊடகத்தில் ஒளி எப்போதும் நேர்கோட்டில் பயணிக்கும். ஒளிபுகாப் பொருட்களுக்குப் பின்னால் நிழல் ஏற்படுவதற்கு இதுவே காரணம்.",
      },
      textbookRef: {
        en: "Grade 8 Science • Unit 14.1",
        si: "8 ශ්‍රේණිය විද්‍යාව • 14.1 ඒකකය",
        ta: "தரம் 8 விஞ்ஞானம் • அலகு 14.1",
      },
    },
  },
  {
    id: 2,
    questionNumber: 2,
    diagramType: "plane_reflection",
    incidentAngle: 30,
    reflectedAngle: 30,
    showLawBadge: true,
    gradeBadge: {
      en: "Science • Grade 8",
      si: "විද්‍යාව • 8 ශ්‍රේණිය",
      ta: "விஞ்ஞானம் • தரம் 8",
    },
    subjectBadge: { en: "Light", si: "ආලෝකය", ta: "ஒளி" },
    title: {
      en: "When measuring the angle of incidence (i), from which reference line must you always measure?",
      si: "පතන කෝණය (i) මැනීමේදී, ඔබ සැමවිටම මැනිය යුත්තේ කුමන රේඛාවේ සිටද?",
      ta: "படுகோணத்தை (i) அளக்கும்போது எப்போதும் எந்தக் கோட்டிலிருந்து அளக்க வேண்டும்?",
    },
    options: [
      {
        id: "A",
        isCorrect: false,
        text: {
          en: "From the mirror's flat glass surface",
          si: "දර්පණයේ පැතලි වීදුරු පෘෂ්ඨයේ සිට",
          ta: "ஆடியின் சமதள மேற்பரப்பிலிருந்து",
        },
        subtext: {
          en: "Surface horizontal plane",
          si: "පෘෂ්ඨයේ තිරස් තලය",
          ta: "கிடைமட்ட மேற்பரப்பு",
        },
      },
      {
        id: "B",
        isCorrect: true,
        text: {
          en: "From the normal line (90° perpendicular)",
          si: "අභිලම්භ රේඛාවේ සිට (90° ලම්බකය)",
          ta: "செங்குத்துக் கோட்டிலிருந்து (90° செங்குத்து)",
        },
        subtext: {
          en: "Always measured relative to the normal",
          si: "සැමවිටම අභිලම්භයට සාපේක්ෂව මනිනු ලැබේ",
          ta: "எப்போதும் செங்குத்துக்கேற்ப அளக்கப்படும்",
        },
      },
      {
        id: "C",
        isCorrect: false,
        text: {
          en: "From the bottom silvered back layer",
          si: "පිටුපස රිදී ආලේපිත ස්තරයේ සිට",
          ta: "பின்பக்க வெள்ளிப் பூச்சிலிருந்து",
        },
        subtext: {
          en: "Underneath the mirror",
          si: "දර්පණය යටින්",
          ta: "ஆடியின் கீழ்ப்புறம்",
        },
      },
      {
        id: "D",
        isCorrect: false,
        text: {
          en: "From the reflected ray itself",
          si: "පරාවර්තිත කිරණයේ සිට",
          ta: "தெறிப்புக்கதிரிலிருந்து",
        },
        subtext: {
          en: "Between both light rays",
          si: "කිරණ දෙක අතර",
          ta: "இரு கதிர்களுக்கும் இடையில்",
        },
      },
    ],
    explanation: {
      title: {
        en: "Teacher's Golden Rule",
        si: "ගුරු උපදෙස (අභිලම්භය)",
        ta: "ஆசிரியரின் பொன்மொழி (செங்குத்து)",
      },
      body: {
        en: "Angles in reflection are NEVER measured from the mirror surface. Both incidence (i) and reflection (r) are measured from the 90° normal line.",
        si: "පරාවර්තන කෝණ කිසිවිටෙක දර්පණ පෘෂ්ඨයේ සිට මනින්නේ නැත. පතන කෝණය (i) සහ පරාවර්තන කෝණය (r) යන දෙකම 90° අභිලම්භ රේඛාවේ සිට මනිනු ලැබේ.",
        ta: "தெறிப்புக் கோணங்கள் ஒருபோதும் ஆடி மேற்பரப்பிலிருந்து அளக்கப்படாது. படுகோணம் (i) மற்றும் தெறிப்புக்கோணம் (r) இரண்டும் 90° செங்குத்துக் கோட்டிலிருந்தே அளக்கப்படும்.",
      },
      formula: "90° - i",
      textbookRef: {
        en: "Grade 8 Science • Unit 14.2",
        si: "8 ශ්‍රේණිය විද්‍යාව • 14.2 ඒකකය",
        ta: "தரம் 8 விஞ்ஞானம் • அலகு 14.2",
      },
    },
  },
];

const ALL_QUESTIONS = [...BASE_QUESTIONS, ...EXTRA_QUIZ_QUESTIONS];

/** Prototype: no invented quiz bank — use store-authored quizzes in lessons. */
export function getSampleQuizQuestions(_lang: AppLanguage): QuizQuestion[] {
  return [];
}

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [];
