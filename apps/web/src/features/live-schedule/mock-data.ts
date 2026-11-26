import type { LocalizedText } from "@/lib/i18n-common";

export interface TimetableSession {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string;
  subject: string;
  grade: number;
  localizedTopic: LocalizedText;
  teacher: string;
  localizedMedium: LocalizedText;
  channel: "Zoom Live" | "YouTube Live";
  isLiveNow?: boolean;
}

export interface RecordedSession {
  id: string;
  localizedTitle: LocalizedText;
  subject: string;
  teacher: string;
  grade: number;
  localizedRecordedOn: LocalizedText;
  localizedDuration: LocalizedText;
}

export const WEEKLY_TIMETABLE: TimetableSession[] = [
  {
    id: "live-mon-sci",
    day: "Mon",
    time: "04:30 PM",
    subject: "Science",
    grade: 8,
    localizedTopic: {
      en: "Mirrors, Ray Diagrams & Focal Length Lab",
      si: "දර්පණ, කිරණ සටහන් සහ නාභි දුර පරීක්ෂණාගාරය",
      ta: "ஆடிகள், கதிர் வரைபடங்கள் & குவியத்தூர ஆய்வுகூடம்",
    },
    teacher: "Ms. Menaka Jayawardena",
    localizedMedium: {
      en: "Sinhala & English",
      si: "සිංහල සහ ඉංග්‍රීසි මාධ්‍ය",
      ta: "சிங்களம் & ஆங்கில மூலம்",
    },
    channel: "Zoom Live",
    isLiveNow: true,
  },
  {
    id: "live-tue-math",
    day: "Tue",
    time: "06:00 PM",
    subject: "Mathematics",
    grade: 11,
    localizedTopic: {
      en: "O/L Circle Theorems & Past Paper Walkthrough",
      si: "සා/පෙළ වෘත්ත ප්‍රමේය සහ පසුගිය ප්‍රශ්න පත්‍ර සාකච්ඡාව",
      ta: "சா/த வட்டத் தேற்றங்கள் & கடந்த கால வினாத்தாள் விளக்கம்",
    },
    teacher: "Mr. Anura Perera",
    localizedMedium: {
      en: "Sinhala Medium",
      si: "සිංහල මාධ්‍යය",
      ta: "சிங்கள மொழி மூலம்",
    },
    channel: "YouTube Live",
  },
  {
    id: "live-wed-ict",
    day: "Wed",
    time: "05:00 PM",
    subject: "ICT",
    grade: 10,
    localizedTopic: {
      en: "Logic Gates & Truth Tables Revision",
      si: "තර්ක ද්වාර සහ සත්‍යතා වගු පුනරීක්ෂණය",
      ta: "தர்க்க வாயில்கள் & உண்மை அட்டவணை மீள்பார்வை",
    },
    teacher: "Ms. Dilani Silva",
    localizedMedium: {
      en: "English Medium",
      si: "ඉංග්‍රීසි මාධ්‍යය",
      ta: "ஆங்கில மொழி மூலம்",
    },
    channel: "Zoom Live",
  },
  {
    id: "live-thu-eng",
    day: "Thu",
    time: "04:00 PM",
    subject: "English",
    grade: 9,
    localizedTopic: {
      en: "Formal Letter Writing & Grammar Clinic",
      si: "රාජකාරි ලිපි ලිවීම සහ ව්‍යාකරණ පන්තිය",
      ta: "அலுவலகக் கடிதம் எழுதுதல் & இலக்கணப் பயிற்சி",
    },
    teacher: "Mrs. Fathima Nazeer",
    localizedMedium: {
      en: "English Medium",
      si: "ඉංග්‍රීසි මාධ්‍යය",
      ta: "ஆங்கில மொழி மூலம்",
    },
    channel: "YouTube Live",
  },
  {
    id: "live-fri-hist",
    day: "Fri",
    time: "06:30 PM",
    subject: "History",
    grade: 11,
    localizedTopic: {
      en: "Sri Lanka Map Marking & Ancient Kingdoms",
      si: "ශ්‍රී ලංකා සිතියම් ලකුණු කිරීම සහ පැරණි රාජධානි",
      ta: "இலங்கை வரைபடம் குறித்தல் & பண்டைய இராச்சியங்கள்",
    },
    teacher: "Mr. K. Rajaratnam",
    localizedMedium: {
      en: "Tamil & Sinhala",
      si: "දෙමළ සහ සිංහල මාධ්‍ය",
      ta: "தமிழ் & சிங்கள மூலம்",
    },
    channel: "Zoom Live",
  },
  {
    id: "live-sat-ol",
    day: "Sat",
    time: "08:30 AM",
    subject: "Science",
    grade: 11,
    localizedTopic: {
      en: "G.C.E. O/L 2024 Part II Timed Workshop",
      si: "අ.පො.ස. සා/පෙළ 2024 II කොටස කාලසීමා වැඩමුළුව",
      ta: "க.பொ.த. சா/த 2024 பகுதி II நேரப் பயிற்சிப் பட்டறை",
    },
    teacher: "Ms. Menaka Jayawardena",
    localizedMedium: {
      en: "All Mediums",
      si: "සියලු මාධ්‍ය",
      ta: "அனைத்து ஊடகங்களும்",
    },
    channel: "YouTube Live",
  },
  {
    id: "live-sun-math",
    day: "Sun",
    time: "09:30 AM",
    subject: "Mathematics",
    grade: 8,
    localizedTopic: {
      en: "Term 2 Geometry & Parallel Lines Quiz",
      si: "2 වන වාර ජ්‍යාමිතිය සහ සමාන්තර රේඛා ප්‍රශ්නාවලිය",
      ta: "2ஆம் தவணை கேத்திரகணிதம் & சமாந்தரக் கோடுகள் வினாடி-வினா",
    },
    teacher: "Mr. Anura Perera",
    localizedMedium: {
      en: "Sinhala & English",
      si: "සිංහල සහ ඉංග්‍රීසි මාධ්‍ය",
      ta: "சிங்களம் & ஆங்கில மூலம்",
    },
    channel: "Zoom Live",
  },
];

export const PAST_RECORDINGS: RecordedSession[] = [
  {
    id: "rec-1",
    localizedTitle: {
      en: "Unit 7: Concave & Convex Mirror Image Rules (Full Replay)",
      si: "7 ඒකකය: අවතල සහ උත්තල දර්පණ ප්‍රතිබිම්බ නීති (සම්පූර්ණ පටිගත කිරීම)",
      ta: "அலகு 7: குழிவு & குவிவு ஆடி விம்ப விதிகள் (முழுப் பதிவு)",
    },
    subject: "Science",
    teacher: "Ms. Menaka Jayawardena",
    grade: 8,
    localizedRecordedOn: {
      en: "2 days ago",
      si: "දින 2කට පෙර",
      ta: "2 நாட்களுக்கு முன்",
    },
    localizedDuration: { en: "52 mins", si: "මිනි. 52", ta: "52 நிமி." },
  },
  {
    id: "rec-2",
    localizedTitle: {
      en: "O/L Quadratic Graphs & Symmetry Axis Clinic",
      si: "සා/පෙළ වර්ගජ ප්‍රස්තාර සහ සමමිති අක්ෂ පුනරීක්ෂණය",
      ta: "சா/த இருபடி வரைபுகள் & சமச்சீர் அச்சுப் பயிற்சி",
    },
    subject: "Mathematics",
    teacher: "Mr. Anura Perera",
    grade: 11,
    localizedRecordedOn: {
      en: "5 days ago",
      si: "දින 5කට පෙර",
      ta: "5 நாட்களுக்கு முன்",
    },
    localizedDuration: {
      en: "1 hr 08 mins",
      si: "පැය 1 මිනි. 08",
      ta: "1 மணி 08 நிமி.",
    },
  },
  {
    id: "rec-3",
    localizedTitle: {
      en: "Binary Hexadecimal Conversion & Logic Circuits",
      si: "ද්විමය ෂඩ්දශමය පරිවර්තන සහ තර්ක පරිපථ",
      ta: "இரும பதின்அறும மாற்றல் & தர்க்கச் சுற்றுகள்",
    },
    subject: "ICT",
    teacher: "Ms. Dilani Silva",
    grade: 10,
    localizedRecordedOn: {
      en: "Last week",
      si: "පසුගිය සතියේ",
      ta: "கடந்த வாரம்",
    },
    localizedDuration: { en: "46 mins", si: "මිනි. 46", ta: "46 நிமி." },
  },
];
