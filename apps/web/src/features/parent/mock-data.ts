import type { LocalizedText } from "@/lib/i18n-common";
import { PARENT_EXTRA_CHILDREN } from "./mock-children";

export interface ParentChildProfile {
  id: string;
  localizedName: LocalizedText;
  grade: number;
  localizedMedium: LocalizedText;
  localizedSchool: LocalizedText;
  localizedWatchTime: LocalizedText;
  lessonsCompletedWeek: number;
  liveAttendancePct: number;
  localizedCardTitle: LocalizedText;
  localizedRenewalDate: LocalizedText;
  recentQuizzes: Array<{
    id: string;
    subject: string;
    localizedTitle: LocalizedText;
    scorePct: number;
    localizedDate: LocalizedText;
  }>;
  examAlerts: Array<{
    id: string;
    localizedTitle: LocalizedText;
    localizedDateLabel: LocalizedText;
    urgency: "high" | "normal";
  }>;
}

const KASUN_PROFILE: ParentChildProfile = {
  id: "kasun",
  localizedName: {
    en: "Kasun Perera",
    si: "කසුන් පෙරේරා",
    ta: "கசுன் பெரேரா",
  },
  grade: 8,
  localizedMedium: {
    en: "English & Sinhala Medium",
    si: "ඉංග්‍රීසි සහ සිංහල මාධ්‍ය",
    ta: "ஆங்கிலம் & சிங்கள மூலம்",
  },
  localizedSchool: {
    en: "Ananda College, Colombo",
    si: "ආනන්ද විද්‍යාලය, කොළඹ",
    ta: "ஆனந்தா கல்லூரி, கொழும்பு",
  },
  localizedWatchTime: {
    en: "6h 25m",
    si: "පැය 6 මිනි. 25",
    ta: "6 மணி 25 நிமி.",
  },
  lessonsCompletedWeek: 14,
  liveAttendancePct: 92,
  localizedCardTitle: {
    en: "Grade 8 Science + Maths Monthly Card",
    si: "8 ශ්‍රේණිය විද්‍යාව + ගණිතය මාසික කාඩ්පත",
    ta: "தரம் 8 விஞ்ஞானம் + கணிதம் மாதாந்த அட்டை",
  },
  localizedRenewalDate: {
    en: "15 Dec 2026",
    si: "2026 දෙසැ. 15",
    ta: "15 டிச. 2026",
  },
  recentQuizzes: [
    {
      id: "pq-1",
      subject: "Science",
      localizedTitle: {
        en: "Unit 7: Mirrors & Reflection MCQ",
        si: "7 ඒකකය: දර්පණ සහ පරාවර්තනය MCQ",
        ta: "அலகு 7: ஆடிகள் & தெறிப்பு MCQ",
      },
      scorePct: 85,
      localizedDate: { en: "Yesterday", si: "ඊයේ", ta: "நேற்று" },
    },
    {
      id: "pq-2",
      subject: "Mathematics",
      localizedTitle: {
        en: "Geometry & Parallel Lines",
        si: "ජ්‍යාමිතිය සහ සමාන්තර රේඛා",
        ta: "கேத்திரகணிதம் & சமாந்தரக் கோடுகள்",
      },
      scorePct: 78,
      localizedDate: {
        en: "3 days ago",
        si: "දින 3කට පෙර",
        ta: "3 நாட்களுக்கு முன்",
      },
    },
    {
      id: "pq-3",
      subject: "History",
      localizedTitle: {
        en: "Anuradhapura Irrigation Systems",
        si: "අනුරාධපුර වාරි පද්ධති",
        ta: "அனுராதபுர நீர்ப்பாசன முறைமைகள்",
      },
      scorePct: 90,
      localizedDate: {
        en: "5 days ago",
        si: "දින 5කට පෙර",
        ta: "5 நாட்களுக்கு முன்",
      },
    },
  ],
  examAlerts: [
    {
      id: "ea-1",
      localizedTitle: {
        en: "Term 2 Western Province Science Test",
        si: "2 වන වාර බස්නාහිර පළාත් විද්‍යා පරීක්ෂණය",
        ta: "தவணை 2 மேல் மாகாண விஞ்ஞானப் பரீட்சை",
      },
      localizedDateLabel: {
        en: "In 9 days",
        si: "දින 9කින්",
        ta: "9 நாட்களில்",
      },
      urgency: "high",
    },
    {
      id: "ea-2",
      localizedTitle: {
        en: "Maths SBA Practical Assignment Due",
        si: "ගණිතය SBA ප්‍රායෝගික පැවරුම භාර දීම",
        ta: "கணிதம் SBA செய்முறை ஒப்படைப்பு",
      },
      localizedDateLabel: {
        en: "Next Friday",
        si: "ලබන සිකුරාදා",
        ta: "அடுத்த வெள்ளி",
      },
      urgency: "normal",
    },
  ],
};

export const PARENT_CHILDREN: ParentChildProfile[] = [
  KASUN_PROFILE,
  ...PARENT_EXTRA_CHILDREN,
];
