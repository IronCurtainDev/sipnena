import type { ParentChildProfile } from "./mock-data";

export const PARENT_EXTRA_CHILDREN: ParentChildProfile[] = [
  {
    id: "nethmi",
    localizedName: {
      en: "Nethmi Perera",
      si: "නෙත්මි පෙරේරා",
      ta: "நெத்மி பெரேரா",
    },
    grade: 11,
    localizedMedium: {
      en: "Sinhala Medium",
      si: "සිංහල මාධ්‍යය",
      ta: "சிங்கள மொழி மூலம்",
    },
    localizedSchool: {
      en: "Visakha Vidyalaya, Colombo",
      si: "විශාඛා විද්‍යාලය, කොළඹ",
      ta: "விசாகா வித்தியாலயம், கொழும்பு",
    },
    localizedWatchTime: {
      en: "11h 40m",
      si: "පැය 11 මිනි. 40",
      ta: "11 மணி 40 நிமி.",
    },
    lessonsCompletedWeek: 22,
    liveAttendancePct: 96,
    localizedCardTitle: {
      en: "G.C.E. O/L 2026 All-Subject Revision Pass",
      si: "අ.පො.ස. සා/පෙළ 2026 සියලු විෂය පුනරීක්ෂණ අවසරපත",
      ta: "க.பொ.த. சா/த 2026 அனைத்துப் பாட மீள்பார்வை அட்டை",
    },
    localizedRenewalDate: {
      en: "02 Dec 2026",
      si: "2026 දෙසැ. 02",
      ta: "02 டிச. 2026",
    },
    recentQuizzes: [
      {
        id: "pq-4",
        subject: "Mathematics",
        localizedTitle: {
          en: "2023 O/L Past Paper Part I",
          si: "2023 සා/පෙළ පසුගිය ප්‍රශ්න පත්‍රය I කොටස",
          ta: "2023 சா/த கடந்த கால வினாத்தாள் பகுதி I",
        },
        scorePct: 92,
        localizedDate: { en: "Today", si: "අද", ta: "இன்று" },
      },
      {
        id: "pq-5",
        subject: "Science",
        localizedTitle: {
          en: "Electrochemistry & Acids Quiz",
          si: "විද්‍යුත් රසායනය සහ අම්ල ප්‍රශ්නාවලිය",
          ta: "மின்இரசாயனம் & அமிலங்கள் வினாடி-வினா",
        },
        scorePct: 88,
        localizedDate: {
          en: "2 days ago",
          si: "දින 2කට පෙර",
          ta: "2 நாட்களுக்கு முன்",
        },
      },
      {
        id: "pq-6",
        subject: "ICT",
        localizedTitle: {
          en: "Logic Gates & SQL Checkpoint",
          si: "තර්ක ද්වාර සහ SQL ඇගයීම",
          ta: "தர்க்க வாயில்கள் & SQL மதிப்பீடு",
        },
        scorePct: 95,
        localizedDate: {
          en: "4 days ago",
          si: "දින 4කට පෙර",
          ta: "4 நாட்களுக்கு முன்",
        },
      },
    ],
    examAlerts: [
      {
        id: "ea-3",
        localizedTitle: {
          en: "G.C.E. O/L Final Mock Examination",
          si: "අ.පො.ස. සා/පෙළ අවසන් ආදර්ශ විභාගය",
          ta: "க.பொ.த. சா/த இறுதி மாதிரிப் பரீட்சை",
        },
        localizedDateLabel: {
          en: "In 18 days",
          si: "දින 18කින්",
          ta: "18 நாட்களில்",
        },
        urgency: "high",
      },
    ],
  },
  {
    id: "kavindu",
    localizedName: {
      en: "Kavindu Perera",
      si: "කවිඳු පෙරේරා",
      ta: "கவிந்து பெரேரா",
    },
    grade: 6,
    localizedMedium: {
      en: "English Medium",
      si: "ඉංග්‍රීසි මාධ්‍යය",
      ta: "ஆங்கில மொழி மூலம்",
    },
    localizedSchool: {
      en: "Ananda College, Colombo",
      si: "ආනන්ද විද්‍යාලය, කොළඹ",
      ta: "ஆனந்தா கல்லூரி, கொழும்பு",
    },
    localizedWatchTime: {
      en: "4h 10m",
      si: "පැය 4 මිනි. 10",
      ta: "4 மணி 10 நிமி.",
    },
    lessonsCompletedWeek: 9,
    liveAttendancePct: 88,
    localizedCardTitle: {
      en: "Grade 6 Foundation Bundle",
      si: "6 ශ්‍රේණිය මූලික පැකේජය",
      ta: "தரம் 6 அடிப்படைத் தொகுப்பு",
    },
    localizedRenewalDate: {
      en: "28 Dec 2026",
      si: "2026 දෙසැ. 28",
      ta: "28 டிச. 2026",
    },
    recentQuizzes: [
      {
        id: "pq-7",
        subject: "Science",
        localizedTitle: {
          en: "Living Things & Energy Sources",
          si: "ජීවීන් සහ බලශක්ති ප්‍රභව",
          ta: "உயிரினங்கள் & சக்தி மூலங்கள்",
        },
        scorePct: 80,
        localizedDate: {
          en: "2 days ago",
          si: "දින 2කට පෙර",
          ta: "2 நாட்களுக்கு முன்",
        },
      },
      {
        id: "pq-8",
        subject: "English",
        localizedTitle: {
          en: "Grammar & Reading Comprehension",
          si: "ව්‍යාකරණ සහ කියවීමේ අවබෝධය",
          ta: "இலக்கணம் & வாசிப்பு விளக்கம்",
        },
        scorePct: 84,
        localizedDate: {
          en: "6 days ago",
          si: "දින 6කට පෙර",
          ta: "6 நாட்களுக்கு முன்",
        },
      },
    ],
    examAlerts: [
      {
        id: "ea-4",
        localizedTitle: {
          en: "Grade 6 Term 2 Class Evaluation",
          si: "6 ශ්‍රේණිය 2 වන වාර පන්ති ඇගයීම",
          ta: "தரம் 6 தவணை 2 வகுப்பு மதிப்பீடு",
        },
        localizedDateLabel: {
          en: "In 12 days",
          si: "දින 12කින්",
          ta: "12 நாட்களில்",
        },
        urgency: "normal",
      },
    ],
  },
];
