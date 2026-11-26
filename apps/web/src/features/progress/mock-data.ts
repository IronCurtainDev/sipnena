import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface SubjectProgressItem {
  subject: string;
  completedUnits: number;
  totalUnits: number;
  pct: number;
}

export interface QuizHistoryItem {
  id: string;
  localizedDate: LocalizedText;
  subject: string;
  localizedTitle: LocalizedText;
  score: string;
  pct: number;
  localizedTrend: LocalizedText;
}

export interface MistakeBankQuestion {
  id: string;
  subject: string;
  localizedSource: LocalizedText;
  localizedPrompt: LocalizedText;
  localizedWrongAnswer: LocalizedText;
  localizedOptions: Record<AppLanguage, [string, string, string, string]>;
  correctIndex: number;
  localizedExplanation: LocalizedText;
}

export const SUBJECT_PROGRESS: SubjectProgressItem[] = [
  { subject: "Science", completedUnits: 8, totalUnits: 12, pct: 67 },
  { subject: "Mathematics", completedUnits: 9, totalUnits: 12, pct: 75 },
  { subject: "ICT", completedUnits: 6, totalUnits: 10, pct: 60 },
  { subject: "History", completedUnits: 5, totalUnits: 9, pct: 56 },
  { subject: "English", completedUnits: 7, totalUnits: 10, pct: 70 },
];

export const QUIZ_HISTORY_ITEMS: QuizHistoryItem[] = [
  {
    id: "qh-1",
    localizedDate: { en: "Yesterday", si: "ඊයේ", ta: "நேற்று" },
    subject: "Science",
    localizedTitle: {
      en: "Mirrors & Spherical Reflection Checkpoint",
      si: "දර්පණ සහ ගෝලීය පරාවර්තන පරීක්ෂණය",
      ta: "ஆடிகள் & கோளத் தெறிப்பு மதிப்பீடு",
    },
    score: "17 / 20",
    pct: 85,
    localizedTrend: { en: "+10%", si: "+10%", ta: "+10%" },
  },
  {
    id: "qh-2",
    localizedDate: {
      en: "3 days ago",
      si: "දින 3කට පෙර",
      ta: "3 நாட்களுக்கு முன்",
    },
    subject: "Mathematics",
    localizedTitle: {
      en: "Geometry: Parallel Lines & Triangles",
      si: "ජ්‍යාමිතිය: සමාන්තර රේඛා සහ ත්‍රිකෝණ",
      ta: "கேத்திரகணிதம்: சமாந்தரக் கோடுகள் & முக்கோணிகள்",
    },
    score: "14 / 20",
    pct: 70,
    localizedTrend: { en: "+5%", si: "+5%", ta: "+5%" },
  },
  {
    id: "qh-3",
    localizedDate: { en: "Last week", si: "පසුගිය සතියේ", ta: "கடந்த வாரம்" },
    subject: "ICT",
    localizedTitle: {
      en: "Binary Conversion & Logic Gates",
      si: "ද්විමය පරිවර්තන සහ තර්ක ද්වාර",
      ta: "இரும மாற்றல் & தர்க்க வாயில்கள்",
    },
    score: "18 / 20",
    pct: 90,
    localizedTrend: { en: "+12%", si: "+12%", ta: "+12%" },
  },
  {
    id: "qh-4",
    localizedDate: {
      en: "2 weeks ago",
      si: "සති 2කට පෙර",
      ta: "2 வாரங்களுக்கு முன்",
    },
    subject: "Science",
    localizedTitle: {
      en: "Microorganisms & Food Preservation",
      si: "ක්ෂුද්‍ර ජීවීන් සහ ආහාර කල් තබා ගැනීම",
      ta: "நுண்ணங்கிகள் & உணவுப் பாதுகாப்பு",
    },
    score: "15 / 20",
    pct: 75,
    localizedTrend: { en: "Baseline", si: "මූලික මට්ටම", ta: "அடிப்படை" },
  },
];

export const MISTAKE_BANK_ITEMS: MistakeBankQuestion[] = [
  {
    id: "mb-1",
    subject: "Science",
    localizedSource: {
      en: "Unit 7 Light Quiz • Q4",
      si: "7 ඒකකය ආලෝකය • ප්‍රශ්න 4",
      ta: "அலகு 7 ஒளி • வினா 4",
    },
    localizedPrompt: {
      en: "When an object is placed at the centre of curvature (C) of a concave mirror, where is the image formed?",
      si: "අවතල දර්පණයක වක්‍රතා කේන්ද්‍රයේ (C) වස්තුවක් තැබූ විට ප්‍රතිබිම්බය සෑදෙන්නේ කොතැනද?",
      ta: "குழிவு ஆடியின் வளைவு மையத்தில் (C) பொருள் வைக்கப்படும்போது விம்பம் எங்கே உருவாகும்?",
    },
    localizedWrongAnswer: {
      en: "Between F and P",
      si: "F සහ P අතර",
      ta: "F க்கும் P க்கும் இடையில்",
    },
    localizedOptions: {
      en: [
        "At infinity",
        "At C, real & inverted, same size",
        "Behind the mirror",
        "Between F and P",
      ],
      si: [
        "අනන්තයේදී",
        "C හිදී, සැබෑ, යටිකුරු සහ සමාන ප්‍රමාණයේ",
        "දර්පණය පිටුපස",
        "F සහ P අතර",
      ],
      ta: [
        "முடிவிலியில்",
        "C இல், மெய், தலைகீழான, சம அளவு விம்பம்",
        "ஆடிக்குப் பின்னால்",
        "F க்கும் P க்கும் இடையில்",
      ],
    },
    correctIndex: 1,
    localizedExplanation: {
      en: "At C (2f), reflected rays converge back at C forming a real, inverted image of the exact same size.",
      si: "C (2f) හිදී පරාවර්තන කිරණ නැවත C හි අභිසාරී වී සැබෑ, යටිකුරු සහ සමාන විශාලත්වයෙන් යුත් ප්‍රතිබිම්බයක් සාදයි.",
      ta: "C (2f) இல் தெறிகதிர்கள் மீண்டும் C இல் குவிந்து மெய், தலைகீழான, அதே அளவான விம்பத்தை உருவாக்கும்.",
    },
  },
  {
    id: "mb-2",
    subject: "Mathematics",
    localizedSource: {
      en: "Term 2 Geometry • Q7",
      si: "2 වන වාර ජ්‍යාමිතිය • ප්‍රශ්න 7",
      ta: "தவணை 2 கேத்திரகணிதம் • வினா 7",
    },
    localizedPrompt: {
      en: "The interior angles of a pentagon add up to how many degrees?",
      si: "පංචාස්‍රයක අභ්‍යන්තර කෝණවල ඓක්‍යය අංශක කීයද?",
      ta: "ஐங்கோணியின் அகக்கோணங்களின் கூட்டுத்தொகை எத்தனை பாகைகள்?",
    },
    localizedWrongAnswer: { en: "360°", si: "360°", ta: "360°" },
    localizedOptions: {
      en: ["360°", "540°", "720°", "180°"],
      si: ["360°", "540°", "720°", "180°"],
      ta: ["360°", "540°", "720°", "180°"],
    },
    correctIndex: 1,
    localizedExplanation: {
      en: "Sum of interior angles = (n - 2) × 180° = (5 - 2) × 180° = 540°.",
      si: "අභ්‍යන්තර කෝණවල ඓක්‍යය = (n - 2) × 180° = (5 - 2) × 180° = 540°.",
      ta: "அகக்கோணங்களின் கூட்டுத்தொகை = (n - 2) × 180° = (5 - 2) × 180° = 540°.",
    },
  },
  {
    id: "mb-3",
    subject: "ICT",
    localizedSource: {
      en: "O/L 2022 Paper • Q11",
      si: "සා/පෙළ 2022 ප්‍රශ්න පත්‍රය • ප්‍රශ්න 11",
      ta: "சா/த 2022 வினாத்தாள் • வினா 11",
    },
    localizedPrompt: {
      en: "Which logic gate outputs 0 ONLY when both inputs are 1?",
      si: "ආදාන දෙකම 1 වන විට පමණක් 0 ප්‍රතිදානය ලබා දෙන තර්ක ද්වාරය කුමක්ද?",
      ta: "இரு உள்ளீடுகளும் 1 ஆக இருக்கும்போது மட்டுமே 0 ஐ வெளியிடும் தர்க்க வாயில் எது?",
    },
    localizedWrongAnswer: {
      en: "NOR gate",
      si: "NOR ද්වාරය",
      ta: "NOR வாயில்",
    },
    localizedOptions: {
      en: ["XOR gate", "NAND gate", "NOR gate", "AND gate"],
      si: ["XOR ද්වාරය", "NAND ද්වාරය", "NOR ද්වාරය", "AND ද්වාරය"],
      ta: ["XOR வாயில்", "NAND வாயில்", "NOR வாயில்", "AND வாயில்"],
    },
    correctIndex: 1,
    localizedExplanation: {
      en: "NAND is NOT-AND: 1 AND 1 = 1, inverted gives 0. All other input pairs produce 1.",
      si: "NAND යනු NOT-AND වේ: 1 AND 1 = 1 වන අතර එය ප්‍රතිලෝම කළ විට 0 ලැබේ.",
      ta: "NAND என்பது NOT-AND: 1 AND 1 = 1, அதன் எதிர் 0 ஆகும்.",
    },
  },
];
