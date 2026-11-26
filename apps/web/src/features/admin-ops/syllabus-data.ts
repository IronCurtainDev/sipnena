import type { LocalizedText } from "@/lib/i18n-common";

export interface SyllabusUnitNode {
  id: string;
  localizedTitle: LocalizedText;
  published: boolean;
}

export interface SyllabusGradeNode {
  grade: number;
  subjects: Array<{
    id: string;
    localizedName: LocalizedText;
    terms: Array<{
      term: "Term 1" | "Term 2" | "Term 3";
      units: SyllabusUnitNode[];
    }>;
  }>;
}

export const INITIAL_SYLLABUS_TREE: SyllabusGradeNode[] = [
  {
    grade: 8,
    subjects: [
      {
        id: "g8-sci",
        localizedName: { en: "Science", si: "විද්‍යාව", ta: "விஞ்ஞானம்" },
        terms: [
          {
            term: "Term 1",
            units: [
              {
                id: "u1",
                localizedTitle: {
                  en: "Unit 1: Importance of Microorganisms",
                  si: "1 ඒකකය: ක්ෂුද්‍ර ජීවීන්ගේ වැදගත්කම",
                  ta: "அலகு 1: நுண்ணங்கிகளின் முக்கியத்துவம்",
                },
                published: true,
              },
              {
                id: "u2",
                localizedTitle: {
                  en: "Unit 2: Animal & Plant Classification",
                  si: "2 ඒකකය: සත්ත්ව හා ශාක වර්ගීකරණය",
                  ta: "அலகு 2: விலங்கு & தாவர வகைப்பாடு",
                },
                published: true,
              },
            ],
          },
          {
            term: "Term 2",
            units: [
              {
                id: "u7",
                localizedTitle: {
                  en: "Unit 7: Light, Mirrors & Reflection",
                  si: "7 ඒකකය: ආලෝකය, දර්පණ සහ පරාවර්තනය",
                  ta: "அலகு 7: ஒளி, ஆடிகள் & தெறிப்பு",
                },
                published: true,
              },
              {
                id: "u8",
                localizedTitle: {
                  en: "Unit 8: Changes in Matter",
                  si: "8 ඒකකය: පදාර්ථයේ විපර්යාස",
                  ta: "அலகு 8: சடப்பொருளின் மாற்றங்கள்",
                },
                published: false,
              },
            ],
          },
        ],
      },
      {
        id: "g8-math",
        localizedName: { en: "Mathematics", si: "ගණිතය", ta: "கணிதம்" },
        terms: [
          {
            term: "Term 1",
            units: [
              {
                id: "m1",
                localizedTitle: {
                  en: "Number Patterns & Perimeter",
                  si: "සංඛ්‍යා රටා සහ පරිමිතිය",
                  ta: "எண் கோலங்களும் சுற்றளவும்",
                },
                published: true,
              },
            ],
          },
          {
            term: "Term 2",
            units: [
              {
                id: "m4",
                localizedTitle: {
                  en: "Angles, Triangles & Parallel Lines",
                  si: "කෝණ, ත්‍රිකෝණ සහ සමාන්තර රේඛා",
                  ta: "கோணங்கள், முக்கோணிகள் & சமாந்தரக் கோடுகள்",
                },
                published: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 11,
    subjects: [
      {
        id: "g11-math",
        localizedName: {
          en: "G.C.E. O/L Mathematics",
          si: "අ.පො.ස. සා/පෙළ ගණිතය",
          ta: "க.பொ.த. சா/த கணிதம்",
        },
        terms: [
          {
            term: "Term 1",
            units: [
              {
                id: "ol-m1",
                localizedTitle: {
                  en: "Real Numbers, Percentages & Taxes",
                  si: "තාත්වික සංඛ්‍යා, ප්‍රතිශත සහ බදු",
                  ta: "மெய் எண்கள், சதவீதங்கள் & வரிகள்",
                },
                published: true,
              },
              {
                id: "ol-m2",
                localizedTitle: {
                  en: "Quadratic Equations & Graphs",
                  si: "වර්ගජ සමීකරණ සහ ප්‍රස්තාර",
                  ta: "இருபடிச் சமன்பாடுகள் & வரைபுகள்",
                },
                published: true,
              },
            ],
          },
          {
            term: "Term 2",
            units: [
              {
                id: "ol-m3",
                localizedTitle: {
                  en: "Circle Theorems & Cyclic Quadrilaterals",
                  si: "වෘත්ත ප්‍රමේය සහ වෘත්ත චතුරස්‍ර",
                  ta: "வட்டத் தேற்றங்கள் & வட்ட நாற்பக்கல்கள்",
                },
                published: true,
              },
              {
                id: "ol-m4",
                localizedTitle: {
                  en: "Trigonometry & Bearings",
                  si: "ත්‍රිකෝණමිතිය සහ දිගංශ",
                  ta: "திரிகோணமிதி & திசைக்கோள்கள்",
                },
                published: true,
              },
            ],
          },
        ],
      },
    ],
  },
];
