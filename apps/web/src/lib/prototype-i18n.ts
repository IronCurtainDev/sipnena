import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type {
  PrototypeBankSlip,
  PrototypeDoubt,
  TeacherLessonDraft,
  TeacherQuizDraft,
} from "./prototype-seed";

const SLIP_COURSE_TITLES: Record<string, LocalizedText> = {
  "slip-101": {
    en: "Grade 8 Science: Full Year Masterclass",
    si: "8 ශ්‍රේණිය විද්‍යාව: සම්පූර්ණ වාර්ෂික පන්තිය",
    ta: "தரம் 8 விஞ்ஞானம்: முழு ஆண்டுப் பாடநெறி",
  },
  "slip-102": {
    en: "G.C.E. O/L Mathematics Past Paper Clinic",
    si: "අ.පො.ස. සා/පෙළ ගණිතය පසුගිය ප්‍රශ්න පත්‍ර පන්තිය",
    ta: "க.பொ.த. சா/த கணிதம் கடந்த கால வினாத்தாள் பயிற்சி",
  },
  "slip-103": {
    en: "Grade 9 Term 2 Science + Maths Bundle",
    si: "9 ශ්‍රේණිය 2 වන වාර විද්‍යාව + ගණිතය පැකේජය",
    ta: "தரம் 9 தவணை 2 விஞ்ஞானம் + கணிதம் தொகுப்பு",
  },
};

const BANK_NAMES: Record<string, LocalizedText> = {
  "Bank of Ceylon (BOC)": {
    en: "Bank of Ceylon (BOC)",
    si: "ලංකා බැංකුව (BOC)",
    ta: "இலங்கை வங்கி (BOC)",
  },
  "Commercial Bank of Ceylon": {
    en: "Commercial Bank of Ceylon",
    si: "කොමර්ෂල් බැංකුව",
    ta: "கொமர்ஷல் வங்கி",
  },
  "Sampath Bank": {
    en: "Sampath Bank",
    si: "සම්පත් බැංකුව",
    ta: "சம்பத் வங்கி",
  },
};

const DOUBT_TEXTS: Record<
  string,
  {
    lessonTitle: LocalizedText;
    question: LocalizedText;
    createdAt: LocalizedText;
    replyText?: LocalizedText;
    repliedAt?: LocalizedText;
  }
> = {
  "doubt-1": {
    lessonTitle: {
      en: "Mirrors & Image Formation",
      si: "දර්පණ සහ ප්‍රතිබිම්බ සෑදීම",
      ta: "ஆடிகள் & விம்ப உருவாக்கம்",
    },
    question: {
      en: "If an object is placed between the focal point (F) and pole (P) of a concave mirror, why is the image virtual and upright?",
      si: "අවතල දර්පණයක නාභිය (F) සහ ධ්‍රැවය (P) අතර වස්තුවක් තැබූ විට ප්‍රතිබිම්බය අතථ්‍ය සහ උඩුකුරු වන්නේ ඇයි?",
      ta: "குழிவு ஆடியின் குவியம் (F) மற்றும் முனைவு (P) இடையில் பொருள் வைக்கப்படும்போது விம்பம் ஏன் மாயமாகவும் நேராகவும் உள்ளது?",
    },
    createdAt: {
      en: "2 hours ago",
      si: "පැය 2කට පෙර",
      ta: "2 மணி நேரத்திற்கு முன்",
    },
    replyText: {
      en: "When the object is inside the focal length (between F and P), reflected rays diverge and appear to meet behind the mirror, forming an enlarged upright virtual image.",
      si: "වස්තුව නාභිය ඇතුළත (F හා P අතර) ඇති විට පරාවර්තන කිරණ අපසාරී වී දර්පණය පිටුපසින් හමුවන සේ පෙනේ. එබැවින් විශාලිත උඩුකුරු අතථ්‍ය ප්‍රතිබිම්බයක් සෑදේ.",
      ta: "பொருள் குவியத்தூரத்திற்குள் (F-P இடையில்) இருக்கும்போது தெறிகதிர்கள் விரிந்து ஆடிக்குப் பின்னால் சந்திப்பது போல் தோன்றுவதால் பெரிய நேரான மாய விம்பம் தோன்றும்.",
    },
    repliedAt: { en: "45 mins ago", si: "මිනි. 45කට පෙර", ta: "45 நிமி. முன்" },
  },
  "doubt-2": {
    lessonTitle: {
      en: "Quadratic Equations & Graphs",
      si: "වර්ගජ සමීකරණ සහ ප්‍රස්තාර",
      ta: "இருபடிச் சமன்பாடுகள் & வரைபுகள்",
    },
    question: {
      en: "In 2022 O/L Part II Question 3(b), should we give the roots of x² - 5x + 3 = 0 rounded to 1 decimal place using the graph or formula?",
      si: "2022 සා/පෙළ II කොටස 3(b) ප්‍රශ්නයේදී x² - 5x + 3 = 0 මූල ප්‍රස්තාරයෙන් හෝ සූත්‍රයෙන් දශමස්ථාන 1කට ලියන්නේ කෙසේද?",
      ta: "2022 சா/த பகுதி II வினா 3(b) இல் x² - 5x + 3 = 0 மூலங்களை வரைபிலிருந்து அல்லது சூத்திரத்தால் 1 தசம தானத்திற்கு வழங்கலாமா?",
    },
    createdAt: {
      en: "4 hours ago",
      si: "පැය 4කට පෙර",
      ta: "4 மணி நேரத்திற்கு முன்",
    },
  },
  "doubt-3": {
    lessonTitle: {
      en: "Logic Gates & Truth Tables",
      si: "තර්ක ද්වාර සහ සත්‍යතා වගු",
      ta: "தர்க்க வாயில்கள் & உண்மை அட்டவணைகள்",
    },
    question: {
      en: "How do I quickly draw a NAND gate equivalent of an OR gate for structured essay questions?",
      si: "ව්‍යුහගත රචනා ප්‍රශ්න සඳහා OR ද්වාරයක NAND සමාන පරිපථය ඉක්මනින් අඳින්නේ කෙසේද?",
      ta: "கட்டமைப்பு வினாக்களுக்கு OR வாயிலின் NAND சமான சுற்றை எவ்வாறு விரைவாக வரைவது?",
    },
    createdAt: { en: "Yesterday", si: "ඊයේ", ta: "நேற்று" },
    replyText: {
      en: "Invert both inputs A and B using two single-input NAND gates, then feed those two outputs into a third NAND gate (De Morgan's law).",
      si: "ආදාන A සහ B තනි NAND ද්වාර දෙකකින් ප්‍රතිලෝම කර, එම ප්‍රතිදාන දෙක තෙවන NAND ද්වාරයකට ලබා දෙන්න (ඩි මෝගන් නියමය).",
      ta: "A மற்றும் B உள்ளீடுகளை இரு NAND வாயில்களால் எதிர்மாற்றி, அவ்விரு வெளியீடுகளையும் மூன்றாவது NAND வாயிலுக்கு வழங்கவும்.",
    },
    repliedAt: { en: "Yesterday", si: "ඊයේ", ta: "நேற்று" },
  },
};

const LESSON_TITLES: Record<string, LocalizedText> = {
  "tl-1": {
    en: "Unit 7.1 — Laws of Reflection & Plane Mirrors",
    si: "7.1 ඒකකය — පරාවර්තන නියම සහ තල දර්පණ",
    ta: "அலகு 7.1 — தெறிப்பு விதிகளும் தள ஆடிகளும்",
  },
  "tl-2": {
    en: "O/L Circle Theorems — Angle at the Centre",
    si: "සා/පෙළ වෘත්ත ප්‍රමේය — කේන්ද්‍රයේ කෝණය",
    ta: "சா/த வட்டத் தேற்றங்கள் — மையக் கோணம்",
  },
};

const QUIZ_TITLES: Record<string, LocalizedText> = {
  "tq-1": {
    en: "Term 2 Checkpoint — Light & Mirrors",
    si: "2 වන වාර පරීක්ෂණය — ආලෝකය සහ දර්පණ",
    ta: "2ஆம் தவணை மதிப்பீடு — ஒளி & ஆடிகள்",
  },
};

const RELATIVE_TIME_LABELS: Record<string, LocalizedText> = {
  "Just now": { en: "Just now", si: "දැන්", ta: "இப்போது" },
  "Today, 10:42 AM": {
    en: "Today, 10:42 AM",
    si: "අද, පෙ.ව. 10:42",
    ta: "இன்று, மு.ப. 10:42",
  },
  "Yesterday, 4:15 PM": {
    en: "Yesterday, 4:15 PM",
    si: "ඊයේ, ප.ව. 4:15",
    ta: "நேற்று, பி.ப. 4:15",
  },
  "2 days ago": {
    en: "2 days ago",
    si: "දින 2කට පෙර",
    ta: "2 நாட்களுக்கு முன்",
  },
  Yesterday: { en: "Yesterday", si: "ඊයේ", ta: "நேற்று" },
};

export function localizeSlipCourseTitle(
  slip: PrototypeBankSlip,
  lang: AppLanguage,
): string {
  return SLIP_COURSE_TITLES[slip.id]?.[lang] ?? slip.courseTitle;
}

export function localizeBankName(bankName: string, lang: AppLanguage): string {
  return BANK_NAMES[bankName]?.[lang] ?? bankName;
}

export function localizeTimestamp(value: string, lang: AppLanguage): string {
  return RELATIVE_TIME_LABELS[value]?.[lang] ?? value;
}

export function localizeDoubt(d: PrototypeDoubt, lang: AppLanguage) {
  const entry = DOUBT_TEXTS[d.id];
  return {
    lessonTitle: entry ? entry.lessonTitle[lang] : d.lessonTitle,
    question: entry ? entry.question[lang] : d.question,
    createdAt: entry
      ? entry.createdAt[lang]
      : localizeTimestamp(d.createdAt, lang),
    replyText: entry?.replyText?.[lang] ?? d.reply?.text ?? "",
    repliedAt:
      entry?.repliedAt?.[lang] ??
      (d.reply ? localizeTimestamp(d.reply.repliedAt, lang) : ""),
  };
}

export function localizeTeacherLessonTitle(
  lesson: TeacherLessonDraft,
  lang: AppLanguage,
): string {
  return LESSON_TITLES[lesson.id]?.[lang] ?? lesson.title;
}

export function localizeTeacherQuizTitle(
  quiz: TeacherQuizDraft,
  lang: AppLanguage,
): string {
  return QUIZ_TITLES[quiz.id]?.[lang] ?? quiz.title;
}
