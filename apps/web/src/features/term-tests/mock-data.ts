import type { LocalizedText } from "@/lib/i18n-common";

export interface TermTestPack {
  id: string;
  term: "Term 1" | "Term 2" | "Term 3";
  localizedTitle: LocalizedText;
  subject: string;
  grade: number;
  province: string;
  school: string;
  localizedDuration: LocalizedText;
  difficulty: "Easy" | "Standard" | "Challenging";
  completed: boolean;
  paperLinkId: string;
}

export const PROVINCES = [
  "All Provinces",
  "Western Province",
  "Southern Province",
  "Central Province",
  "North Western Province",
  "Sabaragamuwa Province",
  "Northern Province",
];

export const LEADING_SCHOOLS = [
  "All Schools",
  "Royal College, Colombo",
  "Visakha Vidyalaya, Colombo",
  "Richmond College, Galle",
  "Dharmaraja College, Kandy",
  "Jaffna Hindu College",
  "Maliyadeva College, Kurunegala",
];

export const TERM_TEST_PACKS: TermTestPack[] = [
  {
    id: "tt-t1-western-royal",
    term: "Term 1",
    localizedTitle: {
      en: "Term 1 Mathematics Model & School Paper",
      si: "1 වන වාර ගණිතය ආදර්ශ සහ පාසල් ප්‍රශ්න පත්‍රය",
      ta: "1ஆம் தவணை கணிதம் மாதிரி & பாடசாலை வினாத்தாள்",
    },
    subject: "Mathematics",
    grade: 11,
    province: "Western Province",
    school: "Royal College, Colombo",
    localizedDuration: { en: "2 hrs", si: "පැය 2", ta: "2 மணி நேரம்" },
    difficulty: "Challenging",
    completed: true,
    paperLinkId: "ol-2023-maths-p2",
  },
  {
    id: "tt-t1-southern-richmond",
    term: "Term 1",
    localizedTitle: {
      en: "Term 1 Science Structured & MCQ Pack",
      si: "1 වන වාර විද්‍යාව ව්‍යුහගත සහ MCQ ප්‍රශ්න එකතුව",
      ta: "1ஆம் தவணை விஞ்ஞானம் கட்டமைப்பு & MCQ தொகுப்பு",
    },
    subject: "Science",
    grade: 8,
    province: "Southern Province",
    school: "Richmond College, Galle",
    localizedDuration: {
      en: "1 hr 30 mins",
      si: "පැය 1 මිනි. 30",
      ta: "1 மணி 30 நிமி.",
    },
    difficulty: "Standard",
    completed: false,
    paperLinkId: "g8-2021-science-p1",
  },
  {
    id: "tt-t2-western-visakha",
    term: "Term 2",
    localizedTitle: {
      en: "Term 2 Science — Light, Heat & Chemical Reactions",
      si: "2 වන වාර විද්‍යාව — ආලෝකය, තාපය සහ රසායනික ප්‍රතික්‍රියා",
      ta: "2ஆம் தவணை விஞ்ஞானம் — ஒளி, வெப்பம் & இரசாயனத் தாக்கங்கள்",
    },
    subject: "Science",
    grade: 11,
    province: "Western Province",
    school: "Visakha Vidyalaya, Colombo",
    localizedDuration: { en: "2 hrs", si: "පැය 2", ta: "2 மணி நேரம்" },
    difficulty: "Challenging",
    completed: false,
    paperLinkId: "ol-2024-science-p1",
  },
  {
    id: "tt-t2-central-dharmaraja",
    term: "Term 2",
    localizedTitle: {
      en: "Term 2 History & Map Marking Test",
      si: "2 වන වාර ඉතිහාසය සහ සිතියම් ලකුණු කිරීමේ පරීක්ෂණය",
      ta: "2ஆம் தவணை வரலாறு & வரைபடம் குறிக்கும் பரீட்சை",
    },
    subject: "History",
    grade: 11,
    province: "Central Province",
    school: "Dharmaraja College, Kandy",
    localizedDuration: {
      en: "1 hr 45 mins",
      si: "පැය 1 මිනි. 45",
      ta: "1 மணி 45 நிமி.",
    },
    difficulty: "Standard",
    completed: true,
    paperLinkId: "ol-2025-history-p2",
  },
  {
    id: "tt-t2-northern-jaffna",
    term: "Term 2",
    localizedTitle: {
      en: "Term 2 ICT — Logic Gates & Flowcharts",
      si: "2 වන වාර ICT — තර්ක ද්වාර සහ ගැලීම් සටහන්",
      ta: "2ஆம் தவணை ICT — தர்க்க வாயில்கள் & பாய்ச்சல் படங்கள்",
    },
    subject: "ICT",
    grade: 11,
    province: "Northern Province",
    school: "Jaffna Hindu College",
    localizedDuration: {
      en: "1 hr 30 mins",
      si: "පැය 1 මිනි. 30",
      ta: "1 மணி 30 நிமி.",
    },
    difficulty: "Standard",
    completed: false,
    paperLinkId: "ol-2022-ict-p1",
  },
  {
    id: "tt-t3-nw-maliyadeva",
    term: "Term 3",
    localizedTitle: {
      en: "Year-End Provincial Final Practice Pack",
      si: "වසර අවසාන පළාත් අවසන් පුහුණු ප්‍රශ්න පත්‍ර එකතුව",
      ta: "ஆண்டிறுதி மாகாண இறுதிப் பயிற்சித் தொகுப்பு",
    },
    subject: "Mathematics",
    grade: 11,
    province: "North Western Province",
    school: "Maliyadeva College, Kurunegala",
    localizedDuration: { en: "3 hrs", si: "පැය 3", ta: "3 மணி நேரம்" },
    difficulty: "Challenging",
    completed: false,
    paperLinkId: "ol-2016-maths-p1",
  },
  {
    id: "tt-t3-sabaragamuwa",
    term: "Term 3",
    localizedTitle: {
      en: "Term 3 English Essay & Comprehension Pack",
      si: "3 වන වාර ඉංග්‍රීසි රචනා සහ අවබෝධ පරීක්ෂණ එකතුව",
      ta: "3ஆம் தவணை ஆங்கிலக் கட்டுரை & கிரகித்தல் தொகுப்பு",
    },
    subject: "English",
    grade: 10,
    province: "Sabaragamuwa Province",
    school: "All Schools",
    localizedDuration: { en: "2 hrs", si: "පැය 2", ta: "2 மணி நேரம்" },
    difficulty: "Easy",
    completed: false,
    paperLinkId: "ol-2019-english-p2",
  },
];
