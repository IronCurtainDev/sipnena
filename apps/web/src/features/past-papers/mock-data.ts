import type { LocalizedText } from "@/lib/i18n-common";
import type { StudyMedium } from "@/lib/language-types";
import {
  DEFAULT_MCQS,
  ICT_MCQS,
  MATH_MCQS,
  type McqQuestionItem,
} from "./mcq-data";
import {
  DEFAULT_PART_TWO,
  HIST_PART_TWO,
  MATH_PART_TWO,
  type PartTwoQuestionItem,
} from "./part-two-data";

export type { McqQuestionItem } from "./mcq-data";
export type { PartTwoQuestionItem } from "./part-two-data";

export type PaperType = "Part I MCQ" | "Part II Structured & Essay";

export interface PastPaperItem {
  id: string;
  localizedTitle: LocalizedText;
  subject: string;
  grade: number;
  year: number;
  medium: StudyMedium;
  paperType: PaperType;
  durationMinutes: number;
  totalMarks: number;
  mcqs: McqQuestionItem[];
  partTwo: PartTwoQuestionItem[];
}

export const PAST_PAPERS: PastPaperItem[] = [
  {
    id: "ol-2024-science-p1",
    localizedTitle: {
      en: "G.C.E. O/L Science — 2024 Part I",
      si: "අ.පො.ස. සා/පෙළ විද්‍යාව — 2024 I කොටස",
      ta: "க.பொ.த. சா/த விஞ்ஞானம் — 2024 பகுதி I",
    },
    subject: "Science",
    grade: 11,
    year: 2024,
    medium: "en",
    paperType: "Part I MCQ",
    durationMinutes: 60,
    totalMarks: 40,
    mcqs: DEFAULT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2023-maths-p2",
    localizedTitle: {
      en: "G.C.E. O/L Mathematics — 2023 Part II",
      si: "අ.පො.ස. සා/පෙළ ගණිතය — 2023 II කොටස",
      ta: "க.பொ.த. சா/த கணிதம் — 2023 பகுதி II",
    },
    subject: "Mathematics",
    grade: 11,
    year: 2023,
    medium: "si",
    paperType: "Part II Structured & Essay",
    durationMinutes: 180,
    totalMarks: 100,
    mcqs: MATH_MCQS,
    partTwo: MATH_PART_TWO,
  },
  {
    id: "ol-2022-ict-p1",
    localizedTitle: {
      en: "G.C.E. O/L ICT — 2022 Part I & II",
      si: "අ.පො.ස. සා/පෙළ ICT — 2022 I සහ II කොටස්",
      ta: "க.பொ.த. சா/த ICT — 2022 பகுதி I & II",
    },
    subject: "ICT",
    grade: 11,
    year: 2022,
    medium: "ta",
    paperType: "Part I MCQ",
    durationMinutes: 60,
    totalMarks: 40,
    mcqs: ICT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2025-history-p2",
    localizedTitle: {
      en: "G.C.E. O/L History — 2025 Model & Past Paper",
      si: "අ.පො.ස. සා/පෙළ ඉතිහාසය — 2025 ආදර්ශ සහ පසුගිය ප්‍රශ්න පත්‍රය",
      ta: "க.பொ.த. சா/த வரலாறு — 2025 மாதிரி & கடந்த கால வினாத்தாள்",
    },
    subject: "History",
    grade: 11,
    year: 2025,
    medium: "si",
    paperType: "Part II Structured & Essay",
    durationMinutes: 120,
    totalMarks: 60,
    mcqs: DEFAULT_MCQS.slice(0, 2),
    partTwo: HIST_PART_TWO,
  },
  {
    id: "g8-2021-science-p1",
    localizedTitle: {
      en: "Grade 8 National Science — 2021 Assessment",
      si: "8 ශ්‍රේණිය ජාතික විද්‍යාව — 2021 ඇගයීම",
      ta: "தரம் 8 தேசிய விஞ்ஞானம் — 2021 மதிப்பீடு",
    },
    subject: "Science",
    grade: 8,
    year: 2021,
    medium: "en",
    paperType: "Part I MCQ",
    durationMinutes: 45,
    totalMarks: 30,
    mcqs: DEFAULT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2019-english-p2",
    localizedTitle: {
      en: "G.C.E. O/L English Language — 2019 Part II",
      si: "අ.පො.ස. සා/පෙළ ඉංග්‍රීසි භාෂාව — 2019 II කොටස",
      ta: "க.பொ.த. சா/த ஆங்கில மொழி — 2019 பகுதி II",
    },
    subject: "English",
    grade: 11,
    year: 2019,
    medium: "en",
    paperType: "Part II Structured & Essay",
    durationMinutes: 120,
    totalMarks: 60,
    mcqs: DEFAULT_MCQS.slice(0, 2),
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2016-maths-p1",
    localizedTitle: {
      en: "G.C.E. O/L Mathematics — 2016 Classic Revision",
      si: "අ.පො.ස. සා/පෙළ ගණිතය — 2016 පුනරීක්ෂණ ප්‍රශ්න පත්‍රය",
      ta: "க.பொ.த. சா/த கணிதம் — 2016 மீள்பார்வை வினாத்தாள்",
    },
    subject: "Mathematics",
    grade: 11,
    year: 2016,
    medium: "si",
    paperType: "Part I MCQ",
    durationMinutes: 120,
    totalMarks: 50,
    mcqs: DEFAULT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
];
