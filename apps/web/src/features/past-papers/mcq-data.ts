import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface McqQuestionItem {
  id: string;
  number: number;
  prompt: LocalizedText;
  options: Record<AppLanguage, [string, string, string, string]>;
  correctIndex: number;
  explanation: LocalizedText;
}

export const DEFAULT_MCQS: McqQuestionItem[] = [
  {
    id: "pp-2023-sci-mcq-12",
    number: 1,
    prompt: {
      en: "Which lens always produces a virtual, upright, and diminished image of a real object placed anywhere in front of it?",
      si: "ඕනෑම දුරකින් තබන ලද සැබෑ වස්තුවක සෑම විටම අතථ්‍ය, උඩුකුරු සහ කුඩා ප්‍රතිබිම්බයක් සාදන්නේ කුමන කාචයද?",
      ta: "முன்னால் எந்தத் தொலைவிலும் வைக்கப்படும் மெய்ப் பொருளுக்கு எப்போதும் மாயமான, நேரான, சிறிய விம்பத்தைத் தரும் வில்லை எது?",
    },
    options: {
      en: [
        "Convex lens",
        "Concave lens",
        "Plano-convex lens",
        "Cylindrical lens",
      ],
      si: ["උත්තල කාචය", "අවතල කාචය", "සමතල-උත්තල කාචය", "සිලින්ඩරාකාර කාචය"],
      ta: [
        "குவிவு வில்லை",
        "குழிவு வில்லை",
        "தளக்-குவிவு வில்லை",
        "உருளை வில்லை",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "A concave (diverging) lens always forms a virtual, upright, and diminished image between F and the optical centre.",
      si: "අවතල (අපසාරී) කාචයක් සෑම විටම F සහ ප්‍රකාශ කේන්ද්‍රය අතර අතථ්‍ය, උඩුකුරු සහ කුඩා ප්‍රතිබිම්බයක් සාදයි.",
      ta: "குழிவு (விரி) வில்லை எப்போதும் F க்கும் ஒளியியல் மையத்திற்கும் இடையில் மாய, நேரான, சிறிய விம்பத்தை உருவாக்கும்.",
    },
  },
  {
    id: "pp-mcq-2",
    number: 2,
    prompt: {
      en: "What is the SI unit of electric current?",
      si: "විද්‍යුත් ධාරාව මැනීමේ SI ඒකකය කුමක්ද?",
      ta: "மின்னோட்டத்தின் SI அலகு யாது?",
    },
    options: {
      en: ["Volt (V)", "Ohm (Ω)", "Ampere (A)", "Watt (W)"],
      si: ["වෝල්ට් (V)", "ඕම් (Ω)", "ඇම්පියර් (A)", "වොට් (W)"],
      ta: ["வோல்ட் (V)", "ஓம் (Ω)", "அம்பியர் (A)", "வாட் (W)"],
    },
    correctIndex: 2,
    explanation: {
      en: "Electric current is measured in Amperes (A). Volt measures potential difference and Ohm measures resistance.",
      si: "විද්‍යුත් ධාරාව ඇම්පියර් (A) වලින් මනිනු ලැබේ. වෝල්ට් විභව අන්තරයද ඕම් ප්‍රතිරෝධයද මනියි.",
      ta: "மின்னோட்டம் அம்பியரில் (A) அளவிடப்படும். வோல்ட் மின்னழுத்த வேறுபாட்டையும் ஓம் தடையையும் அளவிடும்.",
    },
  },
  {
    id: "pp-mcq-3",
    number: 3,
    prompt: {
      en: "In the periodic table, which element belongs to Group VII (Halogens)?",
      si: "ආවර්තිතා වගුවේ VII කාණ්ඩයට (හැලජන) අයත් මූලද්‍රව්‍යය කුමක්ද?",
      ta: "ஆவர்த்தன அட்டவணையில் கூட்டம் VII (அலசன்கள்) இற்கு உரிய மூலகம் எது?",
    },
    options: {
      en: ["Sodium (Na)", "Chlorine (Cl)", "Argon (Ar)", "Magnesium (Mg)"],
      si: ["සෝඩියම් (Na)", "ක්ලෝරීන් (Cl)", "ආගන් (Ar)", "මැග්නීසියම් (Mg)"],
      ta: ["சோடியம் (Na)", "குளோரின் (Cl)", "ஆர்கன் (Ar)", "மக்னீசியம் (Mg)"],
    },
    correctIndex: 1,
    explanation: {
      en: "Chlorine has 7 valence electrons (2,8,7), placing it in Group VII.",
      si: "ක්ලෝරීන් සතුව සංයුජතා ඉලෙක්ට්‍රෝන 7ක් (2,8,7) ඇති බැවින් එය VII කාණ්ඩයට අයත් වේ.",
      ta: "குளோரினில் 7 வலுவளவு இலத்திரன்கள் (2,8,7) உள்ளதால் அது கூட்டம் VII இல் உள்ளது.",
    },
  },
  {
    id: "pp-mcq-4",
    number: 4,
    prompt: {
      en: "Which cell organelle is responsible for aerobic cellular respiration to release ATP energy?",
      si: "ATP ශක්තිය නිපදවීම සඳහා ස්වායු සෛලීය ශ්වසනය සිදු කරන සෛල ඉන්ද්‍රියිකාව කුමක්ද?",
      ta: "ATP சக்தியை விடுவிக்க காற்றுள்ள கலச் சுவாசத்தை மேற்கொள்ளும் கலப் புன்னங்கம் எது?",
    },
    options: {
      en: ["Chloroplast", "Ribosome", "Mitochondrion", "Golgi body"],
      si: ["හරිතලවය", "රයිබසෝමය", "මයිටොකොන්ඩ්‍රියාව", "ගොල්ගි දේහය"],
      ta: ["பச்சையவுருமணி", "ரைபோசோம்", "மைற்றோகொன்றியா", "கொல்கிச் சிக்கல்"],
    },
    correctIndex: 2,
    explanation: {
      en: "Mitochondria carry out aerobic respiration and generate ATP for cell activities.",
      si: "මයිටොකොන්ඩ්‍රියා ස්වායු ශ්වසනය සිදු කර සෛල ක්‍රියාකාරකම් සඳහා ATP නිපදවයි.",
      ta: "மைற்றோகொன்றியா காற்றுள்ள சுவாசத்தை மேற்கொண்டு கலச் செயற்பாடுகளுக்கு ATP ஐ உருவாக்குகிறது.",
    },
  },
];

export const MATH_MCQS: McqQuestionItem[] = [
  {
    id: "math-mcq-1",
    number: 1,
    prompt: {
      en: "If 3x + 5 = 20, what is the value of x?",
      si: "3x + 5 = 20 නම්, x හි අගය කීයද?",
      ta: "3x + 5 = 20 எனில், x இன் பெறுமதி என்ன?",
    },
    options: {
      en: ["3", "5", "7", "15"],
      si: ["3", "5", "7", "15"],
      ta: ["3", "5", "7", "15"],
    },
    correctIndex: 1,
    explanation: {
      en: "3x = 20 - 5 = 15, therefore x = 5.",
      si: "3x = 20 - 5 = 15, එබැවින් x = 5 වේ.",
      ta: "3x = 20 - 5 = 15, எனவே x = 5 ஆகும்.",
    },
  },
  {
    id: "math-mcq-2",
    number: 2,
    prompt: {
      en: "What is the area of a triangle with base 12 cm and height 7 cm?",
      si: "ආධාරකය 12 cm සහ උස 7 cm වූ ත්‍රිකෝණයක වර්ගඵලය කීයද?",
      ta: "அடி 12 cm மற்றும் உயரம் 7 cm கொண்ட முக்கோணியின் பரப்பளவு யாது?",
    },
    options: {
      en: ["19 cm²", "38 cm²", "42 cm²", "84 cm²"],
      si: ["19 cm²", "38 cm²", "42 cm²", "84 cm²"],
      ta: ["19 cm²", "38 cm²", "42 cm²", "84 cm²"],
    },
    correctIndex: 2,
    explanation: {
      en: "Area = ½ × base × height = ½ × 12 × 7 = 42 cm².",
      si: "වර්ගඵලය = ½ × ආධාරකය × උස = ½ × 12 × 7 = 42 cm².",
      ta: "பரப்பளவு = ½ × அடி × உயரம் = ½ × 12 × 7 = 42 cm².",
    },
  },
];

export const ICT_MCQS: McqQuestionItem[] = [
  {
    id: "ict-mcq-1",
    number: 1,
    prompt: {
      en: "What is the binary equivalent of decimal number 13?",
      si: "දශමය සංඛ්‍යාව 13 හි ද්විමය සමානකම කුමක්ද?",
      ta: "தசம எண் 13 இன் இரும (Binary) பெறுமதி யாது?",
    },
    options: {
      en: ["1011", "1101", "1110", "1001"],
      si: ["1011", "1101", "1110", "1001"],
      ta: ["1011", "1101", "1110", "1001"],
    },
    correctIndex: 1,
    explanation: {
      en: "13 = 8 + 4 + 0 + 1 = 1101 in base 2.",
      si: "13 = 8 + 4 + 0 + 1 = 1101 (පාදය 2).",
      ta: "13 = 8 + 4 + 0 + 1 = 1101 (அடி 2).",
    },
  },
  {
    id: "ict-mcq-2",
    number: 2,
    prompt: {
      en: "Which HTML tag creates a hyperlink to another web page?",
      si: "වෙනත් වෙබ් පිටුවකට අධිසබැඳියක් (hyperlink) සෑදීමට භාවිතා කරන HTML ටැගය කුමක්ද?",
      ta: "மற்றொரு இணையப் பக்கத்திற்கான இணைப்பை (hyperlink) உருவாக்கும் HTML குறி எது?",
    },
    options: {
      en: ["<link>", "<a>", "<href>", "<url>"],
      si: ["<link>", "<a>", "<href>", "<url>"],
      ta: ["<link>", "<a>", "<href>", "<url>"],
    },
    correctIndex: 1,
    explanation: {
      en: "The anchor tag <a href='...'> defines a hyperlink.",
      si: "<a href='...'> ටැගය මඟින් වෙබ් අධිසබැඳියක් නිර්මාණය කෙරේ.",
      ta: "<a href='...'> என்ற anchor குறி இணைய இணைப்பை உருவாக்கும்.",
    },
  },
];
