import type { AppLanguage } from "@/lib/language";
import {
  EXTRA_RESULT_QUESTIONS,
  type LocalizedResultItem,
} from "./result-mock-data-extra";
import type { QuestionResultItem, QuizResultSummary } from "./result-types";

const BASE_RESULT_QUESTIONS: LocalizedResultItem[] = [
  {
    id: 1,
    questionNumber: 1,
    isCorrect: true,
    marks: 1,
    title: {
      en: "What is a normal line in reflection?",
      si: "පරාවර්තනයේදී අභිලම්භ රේඛාව යනු කුමක්ද?",
      ta: "தெறிப்பில் செங்குத்துக் கோடு என்றால் என்ன?",
    },
    topicTitle: {
      en: "Rectilinear Propagation & Normal",
      si: "සරල රේඛීය ප්‍රචාරණය සහ අභිලම්භය",
      ta: "நேர்கோட்டுப் பரவல் & செங்குத்து",
    },
    userAnswer: {
      en: "A dashed line perpendicular (90°) to mirror surface",
      si: "දර්පණ පෘෂ්ඨයට ලම්බක (90°) කඩ ඉරි රේඛාවක්",
      ta: "ஆடி மேற்பரப்பிற்கு செங்குத்தான (90°) கோடு",
    },
    correctAnswer: {
      en: "A dashed line perpendicular (90°) to mirror surface",
      si: "දර්පණ පෘෂ්ඨයට ලම්බක (90°) කඩ ඉරි රේඛාවක්",
      ta: "ஆடி மேற்பரப்பிற்கு செங்குத்தான (90°) கோடு",
    },
    teacherTip: {
      en: "Normal is drawn perpendicular (90°) at the point of incidence.",
      si: "අභිලම්භය පතන ලක්ෂ්‍යයේදී 90° කින් ලම්බකව අඳිනු ලැබේ.",
      ta: "படும் புள்ளியில் செங்குத்துக் கோடு 90° கோணத்தில் வரையப்படும்.",
    },
    lessonRef: {
      en: "Lesson 1: Introduction to Light",
      si: "1 වන පාඩම: ආලෝකය හැඳින්වීම",
      ta: "பாடம் 1: ஒளி அறிமுகம்",
    },
  },
  {
    id: 2,
    questionNumber: 2,
    isCorrect: true,
    marks: 1,
    title: {
      en: "Angle of incidence equals angle of reflection",
      si: "පතන කෝණය පරාවර්තන කෝණයට සමාන වීම",
      ta: "படுகோணம் தெறிப்புக்கோணத்திற்குச் சமம்",
    },
    topicTitle: {
      en: "First Law of Regular Reflection",
      si: "පළමු පරාවර්තන නීතිය",
      ta: "முதல் தெறிப்பு விதி",
    },
    userAnswer: {
      en: "Angle of incidence equals angle of reflection (i = r)",
      si: "පතන කෝණය පරාවර්තන කෝණයට සමානයි (i = r)",
      ta: "படுகோணம் தெறிப்புக்கோணத்திற்குச் சமம் (i = r)",
    },
    correctAnswer: {
      en: "Angle of incidence equals angle of reflection (i = r)",
      si: "පතන කෝණය පරාවර්තන කෝණයට සමානයි (i = r)",
      ta: "படுகோணம் தெறிப்புக்கோணத்திற்குச் சமம் (i = r)",
    },
    teacherTip: {
      en: "Always measure both angles starting from the normal line.",
      si: "සැමවිටම කෝණ දෙකම අභිලම්භ රේඛාවේ සිට මනින්න.",
      ta: "எப்போதும் இரு கோணங்களையும் செங்குத்துக் கோட்டிலிருந்தே அளக்கவும்.",
    },
    lessonRef: {
      en: "Lesson 2: Plane Mirrors",
      si: "2 වන පාඩම: තල දර්පණ",
      ta: "பாடம் 2: சமதள ஆடிகள்",
    },
  },
  {
    id: 3,
    questionNumber: 3,
    isCorrect: false,
    marks: 0,
    title: {
      en: "When incident ray is 35°, angle of reflection is?",
      si: "පතන කිරණය 35° නම්, පරාවර්තන කෝණය කීයද?",
      ta: "படுகதிர் 35° எனில், தெறிப்புக்கோணம் என்ன?",
    },
    topicTitle: {
      en: "First Law Angle Calculation",
      si: "පළමු නීතියෙන් කෝණ ගණනය",
      ta: "முதல் விதி கோணக் கணக்கீடு",
    },
    userAnswer: {
      en: "At 55° (angle with mirror surface)",
      si: "55° (දර්පණ පෘෂ්ඨය සමඟ කෝණය)",
      ta: "55° (ஆடி மேற்பரப்புடன் கோணம்)",
    },
    correctAnswer: {
      en: "35° (equal to incidence, measured from normal)",
      si: "35° (පතන කෝණයට සමානයි, අභිලම්භයෙන් මනින ලදී)",
      ta: "35° (படுகோணத்திற்குச் சமம், செங்குத்திலிருந்து அளக்கப்பட்டது)",
    },
    teacherTip: {
      en: "Don't measure against the mirror! Always measure from the 90° normal line.",
      si: "දර්පණයෙන් මනින්න එපා! සැමවිටම 90° අභිලම්භයේ සිට මනින්න.",
      ta: "ஆடியிலிருந்து அளக்காதீர்கள்! எப்போதும் 90° செங்குத்திலிருந்து அளக்கவும்.",
    },
    lessonRef: {
      en: "Lesson 2: Plane Mirrors",
      si: "2 වන පාඩම: තල දර්පණ",
      ta: "பாடம் 2: சமதள ஆடிகள்",
    },
  },
  {
    id: 4,
    questionNumber: 4,
    isCorrect: true,
    marks: 1,
    title: {
      en: "Reflection from a smooth polished plane mirror",
      si: "සුමට ඔප දැමූ තල දර්පණයකින් පරාවර්තනය",
      ta: "மிருதுவான சமதள ஆடியில் தெறிப்பு",
    },
    topicTitle: {
      en: "Virtual Image Formation",
      si: "අතථ්‍ය ප්‍රතිබිම්බ සෑදීම",
      ta: "மாய பிம்ப உருவாக்கம்",
    },
    userAnswer: {
      en: "Forms an erect, virtual image with lateral inversion",
      si: "උඩුකුරු, අතථ්‍ය හා පාර්ශ්විකව අපවර්තිත ප්‍රතිබිම්බයක් සාදයි",
      ta: "நேரான, மாய மற்றும் பக்கவாட்டு மாற்றமுள்ள பிம்பத்தை உருவாக்கும்",
    },
    correctAnswer: {
      en: "Forms an erect, virtual image with lateral inversion",
      si: "උඩුකුරු, අතථ්‍ය හා පාර්ශ්විකව අපවර්තිත ප්‍රතිබිම්බයක් සාදයි",
      ta: "நேரான, மாய மற்றும் பக்கவாட்டு மாற்றமுள்ள பிம்பத்தை உருவாக்கும்",
    },
    teacherTip: {
      en: "Plane mirror images are virtual because rays only appear to meet behind.",
      si: "කිරණ දර්පණය පිටුපස හමුවන බව පෙනෙන නිසා ප්‍රතිබිම්බය අතථ්‍ය වේ.",
      ta: "கதிர்கள் பின்னால் சந்திப்பதாகத் தோன்றுவதால் பிம்பம் மாயமானது.",
    },
    lessonRef: {
      en: "Lesson 2: Plane Mirrors",
      si: "2 වන පාඩම: තල දර්පණ",
      ta: "பாடம் 2: சமதள ஆடிகள்",
    },
  },
  {
    id: 5,
    questionNumber: 5,
    isCorrect: false,
    marks: 0,
    title: {
      en: "Identify principal axis on a concave mirror",
      si: "අවතල දර්පණයක ප්‍රධාන අක්ෂය හඳුනාගන්න",
      ta: "குழிவு ஆடியின் முதன்மை அச்சைக் கண்டறியவும்",
    },
    topicTitle: {
      en: "Curved Mirror Terminology",
      si: "වක්‍ර දර්පණ පද මාලාව",
      ta: "வளைந்த ஆடி கலைச்சொற்கள்",
    },
    userAnswer: {
      en: "The tangent line at the mirror edge",
      si: "දර්පණ කෙළවරේ ස්පර්ශක රේඛාව",
      ta: "ஆடியின் விளிம்பில் உள்ள தொடுகோடு",
    },
    correctAnswer: {
      en: "Straight line passing through C and P",
      si: "වක්‍රතා කේන්ද්‍රය (C) සහ ධ්‍රැවය (P) හරහා යන සරල රේඛාව",
      ta: "வளைவு மையம் (C) மற்றும் முனை (P) வழியாகச் செல்லும் நேர்கோடு",
    },
    teacherTip: {
      en: "The principal axis passes straight through C and P.",
      si: "ප්‍රධාන අක්ෂය C සහ P හරහා කෙළින්ම ගමන් කරයි.",
      ta: "முதன்மை அச்சு C மற்றும் P வழியாக நேராகச் செல்லும்.",
    },
    lessonRef: {
      en: "Lesson 3: Spherical Mirrors",
      si: "3 වන පාඩම: ගෝලීය දර්පණ",
      ta: "பாடம் 3: கோள ஆடிகள்",
    },
  },
];

const ALL_RESULT_ITEMS = [...BASE_RESULT_QUESTIONS, ...EXTRA_RESULT_QUESTIONS];

function buildQuestions(lang: AppLanguage): QuestionResultItem[] {
  return ALL_RESULT_ITEMS.map((item) => ({
    id: item.id,
    questionNumber: item.questionNumber,
    isCorrect: item.isCorrect,
    marks: item.marks,
    title: item.title[lang],
    topicTitle: item.topicTitle[lang],
    userAnswer: item.userAnswer[lang],
    correctAnswer: item.correctAnswer[lang],
    teacherTip: item.teacherTip[lang],
    lessonRef: item.lessonRef[lang],
  }));
}

export function getQuizResultMock(
  lang: AppLanguage,
  isPassed: boolean,
): QuizResultSummary {
  const unitTitle =
    lang === "si"
      ? "ප්‍රශ්නාවලි ප්‍රතිඵලය"
      : lang === "ta"
        ? "வினாடி வினா முடிவு"
        : "Quiz result";
  return {
    score: 0,
    totalQuestions: 0,
    passScore: 0,
    isPassed,
    timeSpent: "—",
    attemptsUsed: 0,
    unitTitle,
    scienceTip:
      lang === "si"
        ? "පාඩම් තුළ ප්‍රශ්නාවලි උත්සාහ කරන්න."
        : lang === "ta"
          ? "பாடங்களில் உள்ள வினாடி வினாக்களை முயற்சிக்கவும்."
          : "Take quizzes inside your published lessons.",
    questions: [],
  };
}

export const MOCK_FAIL_RESULT: QuizResultSummary = getQuizResultMock(
  "en",
  false,
);
export const MOCK_PASS_RESULT: QuizResultSummary = getQuizResultMock(
  "en",
  true,
);
