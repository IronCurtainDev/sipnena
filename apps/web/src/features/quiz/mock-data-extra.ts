import type { AppLanguage } from "@/lib/language";

export interface LocalizedQuestionData {
  id: number;
  questionNumber: number;
  diagramType: "plane_reflection" | "concave_focus" | "convex_diverge";
  incidentAngle?: number;
  reflectedAngle?: number;
  showLawBadge?: boolean;
  gradeBadge: Record<AppLanguage, string>;
  subjectBadge: Record<AppLanguage, string>;
  title: Record<AppLanguage, string>;
  options: Array<{
    id: string;
    isCorrect: boolean;
    text: Record<AppLanguage, string>;
    subtext: Record<AppLanguage, string>;
  }>;
  explanation: {
    title: Record<AppLanguage, string>;
    body: Record<AppLanguage, string>;
    formula?: string;
    textbookRef: Record<AppLanguage, string>;
  };
}

export const EXTRA_QUIZ_QUESTIONS: LocalizedQuestionData[] = [
  {
    id: 3,
    questionNumber: 3,
    diagramType: "plane_reflection",
    incidentAngle: 35,
    reflectedAngle: 35,
    showLawBadge: true,
    gradeBadge: {
      en: "Science • Grade 8",
      si: "විද්‍යාව • 8 ශ්‍රේණිය",
      ta: "விஞ்ஞானம் • தரம் 8",
    },
    subjectBadge: { en: "Light", si: "ආලෝකය", ta: "ஒளி" },
    title: {
      en: "When a light ray strikes a smooth flat mirror at 35° to the normal, what is the angle of reflection?",
      si: "ආලෝක කිරණයක් සුමට තල දර්පණයකට අභිලම්භය සමඟ 35° කෝණයකින් පතිත වේ නම් පරාවර්තන කෝණය කීයද?",
      ta: "ஒளிக்கதிர் சமதள ஆடியில் செங்குத்துடன் 35° கோணத்தில் பட்டால், தெறிப்புக்கோணம் என்ன?",
    },
    options: [
      {
        id: "A",
        isCorrect: false,
        text: {
          en: "0° — along the normal",
          si: "0° — අභිලම්භය ඔස්සේ",
          ta: "0° — செங்குத்து வழியாக",
        },
        subtext: {
          en: "Straight up",
          si: "කෙළින්ම ඉහළට",
          ta: "நேராக மேல்நோக்கி",
        },
      },
      {
        id: "B",
        isCorrect: true,
        text: {
          en: "35° — equal to incidence",
          si: "35° — පතන කෝණයට සමාන වේ",
          ta: "35° — படுகோணத்திற்குச் சமம்",
        },
        subtext: {
          en: "Angle of incidence equals angle of reflection",
          si: "පතන කෝණය පරාවර්තන කෝණයට සමාන වේ",
          ta: "படுகோணம் தெறிப்புக்கோணத்திற்குச் சமம்",
        },
      },
      {
        id: "C",
        isCorrect: false,
        text: {
          en: "55° — complementary to mirror",
          si: "55° — දර්පණය සමඟ අනුපූරක කෝණය",
          ta: "55° — ஆடியுடன் நிரப்புக் கோணம்",
        },
        subtext: {
          en: "Measured from mirror surface",
          si: "දර්පණ පෘෂ්ඨයෙන් මනින ලදී",
          ta: "ஆடி மேற்பரப்பிலிருந்து அளக்கப்பட்டது",
        },
      },
      {
        id: "D",
        isCorrect: false,
        text: {
          en: "70° — double the angle",
          si: "70° — කෝණය මෙන් දෙගුණය",
          ta: "70° — கோணத்தின் இரு மடங்கு",
        },
        subtext: {
          en: "Sum of both angles combined",
          si: "කෝණ දෙකේ එකතුව",
          ta: "இரு கோணங்களின் கூட்டுத்தொகை",
        },
      },
    ],
    explanation: {
      title: {
        en: "First Law of Reflection",
        si: "පළමු පරාවර්තන නීතිය",
        ta: "முதல் தெறிப்பு விதி",
      },
      body: {
        en: "According to the Law of Reflection, the angle of incidence (i) equals the angle of reflection (r). Since i = 35°, r = 35°.",
        si: "ආලෝක පරාවර්තන නීතිය අනුව පතන කෝණය (i) සැමවිටම පරාවර්තන කෝණයට (r) සමාන වේ. i = 35° බැවින් r = 35° වේ.",
        ta: "தெறிப்பு விதியின்படி படுகோணம் (i) எப்போதும் தெறிப்புக்கோணத்திற்கு (r) சமமாகும். i = 35° என்பதால் r = 35° ஆகும்.",
      },
      formula: "i = r ⇒ r = 35°",
      textbookRef: {
        en: "Grade 8 Science • Unit 14.2",
        si: "8 ශ්‍රේණිය විද්‍යාව • 14.2 ඒකකය",
        ta: "தரம் 8 விஞ்ஞானம் • அலகு 14.2",
      },
    },
  },
  {
    id: 4,
    questionNumber: 4,
    diagramType: "concave_focus",
    showLawBadge: false,
    gradeBadge: {
      en: "Science • Grade 8",
      si: "විද්‍යාව • 8 ශ්‍රේණිය",
      ta: "விஞ்ஞானம் • தரம் 8",
    },
    subjectBadge: {
      en: "Curved Mirrors",
      si: "වක්‍ර දර්පණ",
      ta: "வளைந்த ஆடிகள்",
    },
    title: {
      en: "Which type of spherical mirror curves inward like the hollow bowl of a spoon?",
      si: "හැන්දක ඇතුළු පැත්ත මෙන් ඇතුළට වක් වූ ගෝලීය දර්පණ වර්ගය කුමක්ද?",
      ta: "கரண்டியின் உட்புறம் போல் உள்நோக்கி வளைந்துள்ள கோள ஆடி வகை எது?",
    },
    options: [
      {
        id: "A",
        isCorrect: true,
        text: {
          en: "Concave mirror",
          si: "අවතල දර්පණය",
          ta: "குழிவு ஆடி",
        },
        subtext: {
          en: "Curves inward, collecting light rays",
          si: "ඇතුළට වක් වී ආලෝක කිරණ එක්රැස් කරයි",
          ta: "உள்நோக்கி வளைந்து ஒளிக்கதிர்களைக் குவிக்கும்",
        },
      },
      {
        id: "B",
        isCorrect: false,
        text: {
          en: "Convex mirror",
          si: "උත්තල දර්පණය",
          ta: "குவிவு ஆடி",
        },
        subtext: {
          en: "Curves outward, spreading rays apart",
          si: "පිටතට වක් වී කිරණ විහිදුවයි",
          ta: "வெளிநோக்கி வளைந்து கதிர்களை விரிக்கும்",
        },
      },
      {
        id: "C",
        isCorrect: false,
        text: {
          en: "Plane mirror",
          si: "තල දර්පණය",
          ta: "சமதள ஆடி",
        },
        subtext: {
          en: "Completely flat silvered surface",
          si: "සම්පූර්ණයෙන්ම පැතලි පෘෂ්ඨය",
          ta: "முழுமையாகத் தட்டையான மேற்பரப்பு",
        },
      },
      {
        id: "D",
        isCorrect: false,
        text: {
          en: "Cylindrical lens",
          si: "සිලින්ඩරාකාර කාචය",
          ta: "உருளை வில்லை",
        },
        subtext: {
          en: "Refracting transparent glass",
          si: "වර්තනය කරන විනිවිද පෙනෙන වීදුරුව",
          ta: "ஒளியை முறிக்கும் கண்ணாடி",
        },
      },
    ],
    explanation: {
      title: {
        en: "Concave vs Convex Mirrors",
        si: "අවතල සහ උත්තල දර්පණ",
        ta: "குழிவு மற்றும் குவிவு ஆடிகள்",
      },
      body: {
        en: "A concave mirror curves inward like a cave and brings incoming parallel light rays together to a focus.",
        si: "අවතල දර්පණයක් ඇතුළට වක් වී ඇති අතර පැමිණෙන සමාන්තර ආලෝක කිරණ නාභියකට එක්රැස් කරයි.",
        ta: "குழிவு ஆடி உள்நோக்கி வளைந்திருக்கும்; வரும் சமாந்தர ஒளிக்கதிர்களை ஒரு குவியத்திற்கு ஒன்றுசேர்க்கும்.",
      },
      textbookRef: {
        en: "Grade 8 Science • Unit 14.3",
        si: "8 ශ්‍රේණිය විද්‍යාව • 14.3 ඒකකය",
        ta: "தரம் 8 விஞ்ஞானம் • அலகு 14.3",
      },
    },
  },
  {
    id: 5,
    questionNumber: 5,
    diagramType: "concave_focus",
    showLawBadge: false,
    gradeBadge: {
      en: "Science • Grade 8",
      si: "විද්‍යාව • 8 ශ්‍රේණිය",
      ta: "விஞ்ஞானம் • தரம் 8",
    },
    subjectBadge: {
      en: "Curved Mirrors",
      si: "වක්‍ර දර්පණ",
      ta: "வளைந்த ஆடிகள்",
    },
    title: {
      en: "For a spherical concave mirror with radius of curvature R = 20 cm, what is its focal length (f)?",
      si: "වක්‍රතා අරය R = 20 cm වන අවතල ගෝලීය දර්පණයක නාභීය දුර (f) කීයද?",
      ta: "வளைவு ஆரை R = 20 cm கொண்ட குழிவு ஆடியின் குவியத் தூரம் (f) யாது?",
    },
    options: [
      {
        id: "A",
        isCorrect: true,
        text: {
          en: "10 cm — half of radius",
          si: "10 cm — අරයෙන් අඩකි",
          ta: "10 cm — ஆரையின் பாதி",
        },
        subtext: { en: "f = R / 2", si: "f = R / 2", ta: "f = R / 2" },
      },
      {
        id: "B",
        isCorrect: false,
        text: {
          en: "20 cm — same as radius",
          si: "20 cm — අරයට සමානයි",
          ta: "20 cm — ஆரைக்குச் சமம்",
        },
        subtext: { en: "f = R", si: "f = R", ta: "f = R" },
      },
      {
        id: "C",
        isCorrect: false,
        text: {
          en: "40 cm — double the radius",
          si: "40 cm — අරය මෙන් දෙගුණය",
          ta: "40 cm — ஆரையின் இரு மடங்கு",
        },
        subtext: { en: "f = 2R", si: "f = 2R", ta: "f = 2R" },
      },
      {
        id: "D",
        isCorrect: false,
        text: {
          en: "5 cm — one quarter",
          si: "5 cm — හතරෙන් එකක්",
          ta: "5 cm — கால் பங்கு",
        },
        subtext: { en: "f = R / 4", si: "f = R / 4", ta: "f = R / 4" },
      },
    ],
    explanation: {
      title: {
        en: "Focal Length Formula (f = R / 2)",
        si: "නාභීය දුර සූත්‍රය (f = R / 2)",
        ta: "குவியத் தூர சூத்திரம் (f = R / 2)",
      },
      body: {
        en: "The principal focus (F) sits midway between the pole (P) and center of curvature (C), so focal length is half of the radius.",
        si: "ප්‍රධාන නාභිය (F) ධ්‍රැවය (P) සහ වක්‍රතා කේන්ද්‍රය (C) අතර හරියටම මැද පිහිටයි. එබැවින් නාභීය දුර වක්‍රතා අරයෙන් අඩකි.",
        ta: "முதன்மை குவியம் (F) முனை (P) மற்றும் வளைவு மையம் (C) இடையே நடுவில் உள்ளது. எனவே குவியத் தூரம் ஆரையின் பாதியாகும்.",
      },
      formula: "f = R / 2 = 20 cm / 2 = 10 cm",
      textbookRef: {
        en: "Grade 8 Science • Unit 14.4",
        si: "8 ශ්‍රේණිය විද්‍යාව • 14.4 ඒකකය",
        ta: "தரம் 8 விஞ்ஞானம் • அலகு 14.4",
      },
    },
  },
];
