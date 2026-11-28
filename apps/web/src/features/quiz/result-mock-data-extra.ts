import type { AppLanguage } from "@/lib/language";

export interface LocalizedResultItem {
  id: number;
  questionNumber: number;
  isCorrect: boolean;
  marks: number;
  title: Record<AppLanguage, string>;
  topicTitle: Record<AppLanguage, string>;
  userAnswer: Record<AppLanguage, string>;
  correctAnswer: Record<AppLanguage, string>;
  teacherTip: Record<AppLanguage, string>;
  lessonRef: Record<AppLanguage, string>;
}

export const EXTRA_RESULT_QUESTIONS: LocalizedResultItem[] = [
  {
    id: 6,
    questionNumber: 6,
    isCorrect: false,
    marks: 0,
    title: {
      en: "Parallel rays converge at focal point F",
      si: "සමාන්තර කිරණ නාභීය ලක්ෂ්‍යය F වෙත එක්රැස් වීම",
      ta: "சமாந்தரக் கதிர்கள் குவியப் புள்ளி F இல் குவிகின்றன",
    },
    topicTitle: {
      en: "Principal Focus of Concave Mirrors",
      si: "අවතල දර්පණයේ ප්‍රධාන නාභිය",
      ta: "குழிவு ஆடியின் முதன்மைக் குவியம்",
    },
    userAnswer: {
      en: "Rays diverge away toward infinity",
      si: "කිරණ අනන්තය දෙසට අපසරණය වේ",
      ta: "கதிர்கள் முடிவிலியை நோக்கி விரிவடைகின்றன",
    },
    correctAnswer: {
      en: "Incoming parallel rays bounce inward and meet at Principal Focus (F)",
      si: "සමාන්තර කිරණ පරාවර්තනය වී ප්‍රධාන නාභිය (F) තුළ හමුවේ",
      ta: "வரும் சமாந்தரக் கதிர்கள் உள்நோக்கித் தெறித்து முதன்மைக் குவியத்தில் (F) சந்திக்கும்",
    },
    teacherTip: {
      en: "Concave mirrors are converging mirrors—they gather light rays.",
      si: "අවතල දර්පණ අභිසාරී දර්පණ වේ — ඒවා ආලෝක කිරණ එක්රැස් කරයි.",
      ta: "குழிவு ஆடிகள் குவிக்கும் ஆடிகள் — அவை ஒளிக்கதிர்களை ஒன்றுசேர்க்கும்.",
    },
    lessonRef: {
      en: "Lesson 3: Spherical Mirrors",
      si: "3 වන පාඩම: ගෝලීය දර්පණ",
      ta: "பாடம் 3: கோள ஆடிகள்",
    },
  },
  {
    id: 7,
    questionNumber: 7,
    isCorrect: true,
    marks: 1,
    title: {
      en: "Nature of image formed in a plane mirror",
      si: "තල දර්පණයකින් සාදන ප්‍රතිබිම්බයේ ස්වභාවය",
      ta: "சமதள ஆடியில் உருவாகும் பிம்பத்தின் இயல்பு",
    },
    topicTitle: {
      en: "Plane Mirror Characteristics",
      si: "තල දර්පණ ලක්ෂණ",
      ta: "சமதள ஆடிப் பண்புகள்",
    },
    userAnswer: {
      en: "Virtual, upright, same size, laterally inverted",
      si: "අතථ්‍ය, උඩුකුරු, සමාන ප්‍රමාණයේ, පාර්ශ්විකව අපවර්තිත",
      ta: "மாய, நேரான, சம அளவு, பக்கவாட்டு மாற்றமுடைய",
    },
    correctAnswer: {
      en: "Virtual, upright, same size, laterally inverted",
      si: "අතථ්‍ය, උඩුකුරු, සමාන ප්‍රමාණයේ, පාර්ශ්විකව අපවර්තිත",
      ta: "மாய, நேரான, சம அளவு, பக்கவாட்டு மாற்றமுடைய",
    },
    teacherTip: {
      en: "Left and right are swapped; distance in front equals distance behind.",
      si: "වම සහ දකුණ මාරු වේ; ඉදිරි දුර පිටුපස දුරට සමාන වේ.",
      ta: "இடது-வலது மாறும்; முன்னால் உள்ள தூரம் பின்னால் உள்ள தூரத்திற்குச் சமம்.",
    },
    lessonRef: {
      en: "Lesson 2: Plane Mirrors",
      si: "2 වන පාඩම: තල දර්පණ",
      ta: "பாடம் 2: சமதள ஆடிகள்",
    },
  },
  {
    id: 8,
    questionNumber: 8,
    isCorrect: false,
    marks: 0,
    title: {
      en: "Relationship between radius R and focal length f",
      si: "වක්‍රතා අරය R සහ නාභීය දුර f අතර සම්බන්ධය",
      ta: "ஆரை R மற்றும் குவியத் தூரம் f இடையிலான தொடர்பு",
    },
    topicTitle: {
      en: "Focal Formula (f = R / 2)",
      si: "නාභීය සූත්‍රය (f = R / 2)",
      ta: "குவியச் சூத்திரம் (f = R / 2)",
    },
    userAnswer: {
      en: "f = 2 * R (focal length is double the radius)",
      si: "f = 2 * R (නාභීය දුර අරය මෙන් දෙගුණයකි)",
      ta: "f = 2 * R (குவியத் தூரம் ஆரையின் இரு மடங்கு)",
    },
    correctAnswer: {
      en: "f = R / 2 (focal length is half of the radius)",
      si: "f = R / 2 (නාභීය දුර අරයෙන් අඩකි)",
      ta: "f = R / 2 (குவியத் தூரம் ஆரையின் பாதி)",
    },
    teacherTip: {
      en: "Principal focus (F) sits midway between Pole (P) and Center (C).",
      si: "ප්‍රධාන නාභිය (F) ධ්‍රැවය (P) සහ කේන්ද්‍රය (C) අතර හරියටම මැද පිහිටයි.",
      ta: "முதன்மைக் குவியம் (F) முனை (P) மற்றும் மையம் (C) இடையே நடுவில் உள்ளது.",
    },
    lessonRef: {
      en: "Lesson 3: Spherical Mirrors",
      si: "3 වන පාඩම: ගෝලීය දර්පණ",
      ta: "பாடம் 3: கோள ஆடிகள்",
    },
  },
  {
    id: 9,
    questionNumber: 9,
    isCorrect: false,
    marks: 0,
    title: {
      en: "Law of coplanar rays in reflection",
      si: "පරාවර්තනයේදී කිරණ එකම තලයේ පිහිටීමේ නීතිය",
      ta: "தெறிப்பில் கதிர்கள் ஒரே தளத்தில் இருக்கும் விதி",
    },
    topicTitle: {
      en: "Second Law of Reflection",
      si: "දෙවන පරාවර්තන නීතිය",
      ta: "இரண்டாவது தெறிப்பு விதி",
    },
    userAnswer: {
      en: "Rays travel on separate 3D planes after bounce",
      si: "පරාවර්තනයෙන් පසු කිරණ වෙනස් තලවල ගමන් කරයි",
      ta: "தெறிப்பின் பின் கதிர்கள் வேறு தளங்களில் செல்கின்றன",
    },
    correctAnswer: {
      en: "Incident ray, reflected ray, and normal lie on the same plane",
      si: "පතන කිරණය, පරාවර්තිත කිරණය සහ අභිලම්භය එකම තලයේ පිහිටයි",
      ta: "படுகதிர், தெறிப்புக்கதிர், செங்குத்து மூன்றும் ஒரே தளத்தில் அமையும்",
    },
    teacherTip: {
      en: "Imagine all three lines drawn on one flat sheet of paper.",
      si: "රේඛා තුනම එකම සමතල කඩදාසියක ඇඳ ඇති බව සිතන්න.",
      ta: "மூன்று கோடுகளும் ஒரே தட்டையான தாளில் வரையப்பட்டுள்ளதாக நினைத்துப் பாருங்கள்.",
    },
    lessonRef: {
      en: "Lesson 2: Plane Mirrors",
      si: "2 වන පාඩම: තල දර්පණ",
      ta: "பாடம் 2: சமதள ஆடிகள்",
    },
  },
  {
    id: 10,
    questionNumber: 10,
    isCorrect: false,
    marks: 0,
    title: {
      en: "Real vs virtual image characteristics",
      si: "තාත්වික හා අතථ්‍ය ප්‍රතිබිම්බ ලක්ෂණ",
      ta: "மெய் மற்றும் மாய பிம்ப இயல்புகள்",
    },
    topicTitle: {
      en: "Optical Ray Tracing Principles",
      si: "කිරණ සටහන් මූලධර්ම",
      ta: "ஒளிக்கதிர் வரைபடக் கோட்பாடுகள்",
    },
    userAnswer: {
      en: "Virtual images can be caught on a screen",
      si: "අතථ්‍ය ප්‍රතිබිම්බ තිරයක් මත ලබාගත හැක",
      ta: "மாய பிம்பங்களைத் திரையில் பெற முடியும்",
    },
    correctAnswer: {
      en: "Real images can be cast on a screen; virtual images cannot",
      si: "තාත්වික ප්‍රතිබිම්බ තිරයක ලබාගත හැකි අතර අතථ්‍ය ප්‍රතිබිම්බ එසේ කළ නොහැක",
      ta: "மெய் பிம்பங்களைத் திரையில் பெறலாம்; மாய பிம்பங்களைப் பெற முடியாது",
    },
    teacherTip: {
      en: "Real rays converge to form real images; virtual rays only appear to diverge.",
      si: "තාත්වික කිරණ හමුවීමෙන් තාත්වික ප්‍රතිබිම්බ සෑදේ.",
      ta: "உண்மைக் கதிர்கள் சந்திப்பதால் மெய் பிம்பங்கள் உருவாகின்றன.",
    },
    lessonRef: {
      en: "Lesson 3: Spherical Mirrors",
      si: "3 වන පාඩම: ගෝලීය දර්පණ",
      ta: "பாடம் 3: கோள ஆடிகள்",
    },
  },
];
