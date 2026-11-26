import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export type MaterialCategory =
  | "Lesson Tutes"
  | "Short Notes"
  | "Formula Sheets"
  | "Mind Maps"
  | "NIE Textbooks";

export interface StudyMaterialItem {
  id: string;
  category: MaterialCategory;
  localizedTitle: LocalizedText;
  subject: string;
  grade: number;
  localizedMedium: LocalizedText;
  courseId: string;
  sizeLabel: string;
  pages: number;
  localizedSummary: LocalizedText;
  localizedBullets: Record<AppLanguage, string[]>;
}

export const MATERIAL_CATEGORIES: Array<"All" | MaterialCategory> = [
  "All",
  "Lesson Tutes",
  "Short Notes",
  "Formula Sheets",
  "Mind Maps",
  "NIE Textbooks",
];

export const STUDY_MATERIALS: StudyMaterialItem[] = [
  {
    id: "tute-light-pdf",
    category: "Lesson Tutes",
    localizedTitle: {
      en: "Unit 7: Light, Mirrors & Ray Diagrams Tute (PDF)",
      si: "7 ඒකකය: ආලෝකය, දර්පණ සහ කිරණ සටහන් ටියුට් (PDF)",
      ta: "அலகு 7: ஒளி, ஆடிகள் & கதிர் வரைபட டியூட் (PDF)",
    },
    subject: "Science",
    grade: 8,
    localizedMedium: {
      en: "Sinhala & English",
      si: "සිංහල සහ ඉංග්‍රීසි මාධ්‍ය",
      ta: "சிங்களம் & ஆங்கில மூலம்",
    },
    courseId: "sci-g8-full",
    sizeLabel: "1.8 MB",
    pages: 14,
    localizedSummary: {
      en: "Complete printable tuition tute covering Plane, Concave & Convex mirrors with 12 step-by-step ray diagrams.",
      si: "තල, අවතල සහ උත්තල දර්පණ ආවරණය කරන පියවරෙන් පියවර කිරණ සටහන් 12ක් සහිත සම්පූර්ණ මුද්‍රණය කළ හැකි ටියුට් පත්‍රය.",
      ta: "தள, குழிவு மற்றும் குவிவு ஆடிகளை உள்ளடக்கிய 12 படிப்படியான கதிர் வரைபடங்களுடன் கூடிய முழுமையான டியூட்.",
    },
    localizedBullets: {
      en: [
        "Laws of reflection: Angle of incidence (i) = Angle of reflection (r)",
        "Concave mirror image cases: Beyond C, at C, between C & F, and F & P",
        "5 structured exam questions with grid spaces for notebook drawing",
      ],
      si: [
        "පරාවර්තන නියම: පතන කෝණය (i) = පරාවර්තන කෝණය (r)",
        "අවතල දර්පණ ප්‍රතිබිම්බ අවස්ථා: C ට ඔබ්බෙන්, C හිදී, C හා F අතර",
        "පොතෙහි ඇඳීම සඳහා කොටු සටහන් සහිත ව්‍යුහගත ප්‍රශ්න 5ක්",
      ],
      ta: [
        "தெறிப்பு விதிகள்: படுகோணம் (i) = தெறிகோணம் (r)",
        "குழிவு ஆடி விம்ப நிலைகள்: C க்கு அப்பால், C இல், C-F இடையில்",
        "பயிற்சிப் புத்தக வரைபட இடங்களுடன் 5 கட்டமைப்பு வினாக்கள்",
      ],
    },
  },
  {
    id: "note-light-short",
    category: "Short Notes",
    localizedTitle: {
      en: "O/L Science — Electricity & Ohm's Law One-Page Note",
      si: "සා/පෙළ විද්‍යාව — විදුලිය සහ ඕම්ගේ නියමය කෙටි සටහන",
      ta: "சா/த விஞ்ஞானம் — மின்னியல் & ஓமின் விதி ஒரு பக்கக் குறிப்பு",
    },
    subject: "Science",
    grade: 11,
    localizedMedium: {
      en: "English & Tamil",
      si: "ඉංග්‍රීසි සහ දෙමළ මාධ්‍ය",
      ta: "ஆங்கிலம் & தமிழ் மூலம்",
    },
    courseId: "sci-g8-full",
    sizeLabel: "640 KB",
    pages: 2,
    localizedSummary: {
      en: "High-yield revision summary designed for night-before term test cramming.",
      si: "වාර විභාගයට පෙර රාත්‍රියේ ඉක්මන් පුනරීක්ෂණය සඳහා සැකසූ සාරාංශ සටහන.",
      ta: "தவணைப் பரீட்சைக்கு முதல் நாள் விரைவு மீள்பார்வைக்காகத் தயாரிக்கப்பட்ட சுருக்கக் குறிப்பு.",
    },
    localizedBullets: {
      en: [
        "V = IR (Potential Difference = Current × Resistance)",
        "Series circuit: Same current (I), voltage divides (V = V1 + V2)",
        "Parallel circuit: Same voltage (V), current divides (I = I1 + I2)",
      ],
      si: [
        "V = IR (විභව අන්තරය = ධාරාව × ප්‍රතිරෝධය)",
        "ශ්‍රේණිගත පරිපථය: සමාන ධාරාව (I), වෝල්ටීයතාව බෙදේ (V = V1 + V2)",
        "සමාන්තරගත පරිපථය: සමාන වෝල්ටීයතාව (V), ධාරාව බෙදේ (I = I1 + I2)",
      ],
      ta: [
        "V = IR (மின்னழுத்த வேறுபாடு = மின்னோட்டம் × தடை)",
        "தொடர் சுற்று: ஒரே மின்னோட்டம் (I), மின்னழுத்தம் பிரியும்",
        "சமாந்தர சுற்று: ஒரே மின்னழுத்தம் (V), மின்னோட்டம் பிரியும்",
      ],
    },
  },
  {
    id: "note-algebra-formula",
    category: "Formula Sheets",
    localizedTitle: {
      en: "G.C.E. O/L Mathematics Master Formula Sheet (All 3 Terms)",
      si: "අ.පො.ස. සා/පෙළ ගණිතය ප්‍රධාන සූත්‍ර පත්‍රය (වාර 3ම)",
      ta: "க.பொ.த. சா/த கணிதம் முதன்மை சூத்திரத் தாள் (3 தவணைகளும்)",
    },
    subject: "Mathematics",
    grade: 11,
    localizedMedium: {
      en: "Sinhala Medium",
      si: "සිංහල මාධ්‍යය",
      ta: "சிங்கள மொழி மூலம்",
    },
    courseId: "math-ol-rev",
    sizeLabel: "920 KB",
    pages: 4,
    localizedSummary: {
      en: "Every perimeter, area, volume, quadratic, trigonometry, and circle theorem formula tested in O/L Part I & II.",
      si: "සා/පෙළ I සහ II කොටස්වල පරීක්ෂා කෙරෙන පරිමිතිය, වර්ගඵලය, පරිමාව, වර්ගජ සහ වෘත්ත ප්‍රමේය සූත්‍ර සියල්ල.",
      ta: "சா/த பகுதி I & II இல் கேட்கப்படும் சுற்றளவு, பரப்பளவு, கனவளவு, இருபடி மற்றும் வட்டத் தேற்றச் சூத்திரங்கள் அனைத்தும்.",
    },
    localizedBullets: {
      en: [
        "Cylinder TSA = 2πr(r + h) | Volume = πr²h",
        "Cone Curved Surface = πrl | Volume = ⅓πr²h",
        "Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a",
      ],
      si: [
        "සිලින්ඩරයේ මුළු පෘෂ්ඨ වර්ගඵලය = 2πr(r + h) | පරිමාව = πr²h",
        "කේතුවේ වක්‍ර පෘෂ්ඨ වර්ගඵලය = πrl | පරිමාව = ⅓πr²h",
        "වර්ගජ සමීකරණ සූත්‍රය: x = (-b ± √(b² - 4ac)) / 2a",
      ],
      ta: [
        "உருளை மொத்தப் பரப்பளவு = 2πr(r + h) | கனவளவு = πr²h",
        "கூம்பு வளைபரப்பளவு = πrl | கனவளவு = ⅓πr²h",
        "இருபடிச் சமன்பாட்டுச் சூத்திரம்: x = (-b ± √(b² - 4ac)) / 2a",
      ],
    },
  },
  {
    id: "mindmap-history-anuradhapura",
    category: "Mind Maps",
    localizedTitle: {
      en: "Anuradhapura Kingdom & Irrigation Kings Visual Mind Map",
      si: "අනුරාධපුර රාජධානිය සහ වාරි රජවරු දෘශ්‍ය මනෝ සිතියම",
      ta: "அனுராதபுர இராச்சியம் & நீர்ப்பாசன மன்னர்கள் மன வரைபடம்",
    },
    subject: "History",
    grade: 8,
    localizedMedium: {
      en: "Sinhala & Tamil",
      si: "සිංහල සහ දෙමළ මාධ්‍ය",
      ta: "சிங்களம் & தமிழ் மூலம்",
    },
    courseId: "hist-g8-anu",
    sizeLabel: "1.1 MB",
    pages: 1,
    localizedSummary: {
      en: "Color-coded memory branch linking King Pandukabhaya, Devanampiya Tissa, Dutugemunu, Vasabha, and Mahasen.",
      si: "පණ්ඩුකාභය, දේවානම්පියතිස්ස, දුටුගැමුණු, වසභ සහ මහසෙන් රජවරුන් සම්බන්ධ කරන වර්ණවත් මතක සටහන.",
      ta: "பண்டுகாபயன், தேவநம்பியதிஸ்ஸன், துட்டகைமுனு, வசபன் மற்றும் மகாசேனன் ஆகிய மன்னர்களை இணைக்கும் வண்ண நினைவுக் கிளை.",
    },
    localizedBullets: {
      en: [
        "King Vasabha: 11 tanks & 12 canals (Elahera canal)",
        "King Mahasen: Minneriya Wewa (Minneri Deviyo)",
        "King Dhatusena: Kala Wewa & Yoda Ela (6 inches/mile slope)",
      ],
      si: [
        "වසභ රජු: වැව් 11ක් සහ ඇළ මාර්ග 12ක් (ඇලහැර ඇළ)",
        "මහසෙන් රජු: මින්නේරිය වැව (මින්නේරි දෙවියෝ)",
        "ධාතුසේන රජු: කලා වැව සහ යෝධ ඇළ",
      ],
      ta: [
        "வசப மன்னன்: 11 குளங்கள் & 12 கால்வாய்கள் (எலஹெர கால்வாய்)",
        "மகாசேன மன்னன்: மின்னேரியா குளம் (மின்னேரி தெய்வம்)",
        "தாதுசேன மன்னன்: கலாவாவ & யோத எல",
      ],
    },
  },
  {
    id: "textbook-sci-g8",
    category: "NIE Textbooks",
    localizedTitle: {
      en: "NIE Official Grade 8 Science Part II Textbook",
      si: "NIE නිල 8 ශ්‍රේණිය විද්‍යාව II කොටස පෙළපොත",
      ta: "NIE உத்தியோகபூர்வ தரம் 8 விஞ்ஞானம் பகுதி II பாடநூல்",
    },
    subject: "Science",
    grade: 8,
    localizedMedium: {
      en: "Sinhala / Tamil / English",
      si: "සිංහල / දෙමළ / ඉංග්‍රීසි",
      ta: "சிங்களம் / தமிழ் / ஆங்கிலம்",
    },
    courseId: "sci-g8-full",
    sizeLabel: "14.2 MB",
    pages: 168,
    localizedSummary: {
      en: "Official Department of Educational Publications school textbook compressed for fast Sri Lankan 4G mobile download.",
      si: "ජංගම දුරකථන දත්ත ඉතිරි කරමින් ඉක්මනින් බාගත කිරීමට සැකසූ අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තු නිල පෙළපොත.",
      ta: "வேகமான மொபைல் பதிவிறக்கத்திற்காகச் சுருக்கப்பட்ட கல்வி வெளியீட்டுத் திணைக்கள உத்தியோகபூர்வ பாடநூல்.",
    },
    localizedBullets: {
      en: [
        "Unit 7: Light & Reflection (Page 42–67)",
        "Unit 8: Human Organ Systems & Nervous Coordination",
        "Unit 9: Changes in Matter & Everyday Chemical Reactions",
      ],
      si: [
        "7 ඒකකය: ආලෝකය සහ පරාවර්තනය (පිටු 42–67)",
        "8 ඒකකය: මානව ඉන්ද්‍රිය පද්ධති සහ ස්නායු සමායෝජනය",
        "9 ඒකකය: පදාර්ථයේ විපර්යාස සහ රසායනික ප්‍රතික්‍රියා",
      ],
      ta: [
        "அலகு 7: ஒளியும் தெறிப்பும் (பக்கம் 42–67)",
        "அலகு 8: மனித உறுப்புத் தொகுதிகளும் நரம்பு ஒருங்கிணைப்பும்",
        "அலகு 9: சடப்பொருளின் மாற்றங்களும் இரசாயனத் தாக்கங்களும்",
      ],
    },
  },
  {
    id: "tute-ict-logic",
    category: "Lesson Tutes",
    localizedTitle: {
      en: "Grade 10–11 ICT Logic Gates & Truth Tables Workbook",
      si: "10–11 ශ්‍රේණි ICT තර්ක ද්වාර සහ සත්‍යතා වගු වැඩපොත",
      ta: "தரம் 10–11 ICT தர்க்க வாயில்கள் & உண்மை அட்டவணைப் பயிற்சிநூல்",
    },
    subject: "ICT",
    grade: 10,
    localizedMedium: {
      en: "English Medium",
      si: "ඉංග්‍රීසි මාධ්‍යය",
      ta: "ஆங்கில மொழி மூலம்",
    },
    courseId: "ict-g10-logic",
    sizeLabel: "1.3 MB",
    pages: 10,
    localizedSummary: {
      en: "AND, OR, NOT, NAND, NOR gate symbols, Boolean algebra identities, and 15 past O/L exercises.",
      si: "AND, OR, NOT, NAND, NOR ද්වාර සංකේත, බූලියන් වීජ ගණිත නීති සහ සා/පෙළ අභ්‍යාස 15ක්.",
      ta: "AND, OR, NOT, NAND, NOR வாயில் குறியீடுகள், பூலியன் இயற்கணித விதிகள் & 15 சா/த பயிற்சிகள்.",
    },
    localizedBullets: {
      en: [
        "Universal gates: Building NOT, AND, OR purely from NAND gates",
        "De Morgan's Laws: (A + B)' = A' · B' and (A · B)' = A' + B'",
        "3-input truth table step verification checklist",
      ],
      si: [
        "සාර්ව ද්වාර: NAND ද්වාර වලින් පමණක් NOT, AND, OR සෑදීම",
        "ඩි මෝගන් නියම: (A + B)' = A' · B' සහ (A · B)' = A' + B'",
        "ආදාන 3 සත්‍යතා වගු පියවර පරීක්ෂණ ලැයිස්තුව",
      ],
      ta: [
        "பொது வாயில்கள்: NAND வாயில்களிலிருந்து மட்டும் NOT, AND, OR உருவாக்கல்",
        "டி மோர்கன் விதிகள்: (A + B)' = A' · B' மற்றும் (A · B)' = A' + B'",
        "3-உள்ளீட்டு உண்மை அட்டவணை சரிபார்ப்புப் பட்டியல்",
      ],
    },
  },
];
