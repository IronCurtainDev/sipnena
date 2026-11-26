import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export type SearchCategory =
  "All" | "Lessons" | "Past Papers" | "Tutes" | "Teachers";

export interface SearchResultItem {
  id: string;
  category: Exclude<SearchCategory, "All">;
  localizedTitle: LocalizedText;
  localizedSubtitle: LocalizedText;
  keywords: string;
  to: string;
}

export const SEARCH_CATEGORY_LABELS: Record<SearchCategory, LocalizedText> = {
  All: { en: "All", si: "සියල්ල", ta: "அனைத்தும்" },
  Lessons: { en: "Lessons", si: "පාඩම්", ta: "பாடங்கள்" },
  "Past Papers": {
    en: "Past Papers",
    si: "පසුගිය ප්‍රශ්න පත්‍ර",
    ta: "கடந்த வினாத்தாள்கள்",
  },
  Tutes: { en: "Tutes", si: "ටියුට්", ta: "டியூட்கள்" },
  Teachers: { en: "Teachers", si: "ගුරුවරුන්", ta: "ஆசிரியர்கள்" },
};

export interface SearchCopy {
  pageTitle: string;
  placeholder: string;
  recentSearches: string;
  clearBtn: string;
  popularTopics: string;
  showingPrefix: string;
  resultsSuffix: string;
  forQueryPrefix: string;
}

export const SEARCH_COPY: Record<AppLanguage, SearchCopy> = {
  en: {
    pageTitle: "Search SipNena",
    placeholder:
      "Search in English, සිංහල, தமிழ், or Singlish (e.g. alokaya, ganithaya, newton)...",
    recentSearches: "Recent Searches",
    clearBtn: "Clear",
    popularTopics: "Popular Grade 6–11 Topics",
    showingPrefix: "Showing",
    resultsSuffix: "results",
    forQueryPrefix: "for",
  },
  si: {
    pageTitle: "සිප්නැණ තුළ සොයන්න",
    placeholder:
      "සිංහල, දෙමළ, ඉංග්‍රීසි හෝ Singlish වලින් සොයන්න (උදා: alokaya, ganithaya, විද්‍යාව)...",
    recentSearches: "මෑත සෙවුම්",
    clearBtn: "මකන්න",
    popularTopics: "ජනප්‍රිය 6–11 ශ්‍රේණි මාතෘකා",
    showingPrefix: "ප්‍රතිඵල",
    resultsSuffix: "ක් පෙන්වයි",
    forQueryPrefix: "සෙවුම:",
  },
  ta: {
    pageTitle: "சிப்நெனவில் தேடுக",
    placeholder:
      "தமிழ், சிங்களம், ஆங்கிலம் அல்லது Singlish இல் தேடுக (உ-ம்: oli, ganithaya, newton)...",
    recentSearches: "சமீபத்திய தேடல்கள்",
    clearBtn: "அழிக்கவும்",
    popularTopics: "பிரபல தரம் 6–11 தலைப்புகள்",
    showingPrefix: "காட்டப்படுபவை:",
    resultsSuffix: "முடிவுகள்",
    forQueryPrefix: "தேடல்:",
  },
};

export const SEARCH_CATALOG: SearchResultItem[] = [
  {
    id: "sr-1",
    category: "Lessons",
    localizedTitle: {
      en: "Lesson 4: Mirrors & Image Formation",
      si: "4 වන පාඩම: දර්පණ සහ ප්‍රතිබිම්බ සෑදීම",
      ta: "பாடம் 4: ஆடிகள் & விம்ப உருவாக்கம்",
    },
    localizedSubtitle: {
      en: "Grade 8 Science • Ms. Menaka Jayawardena • 18 mins",
      si: "8 ශ්‍රේණිය විද්‍යාව • මේනකා ජයවර්ධන මිය • මිනි. 18",
      ta: "தரம் 8 விஞ்ஞானம் • திருமதி மேனகா ஜயவர்தன • 18 நிமி.",
    },
    keywords:
      "light reflection alokaya paravarthanaya mirrors oli science vidyawa ආලෝකය",
    to: "/lesson",
  },
  {
    id: "sr-2",
    category: "Past Papers",
    localizedTitle: {
      en: "G.C.E. O/L Science — 2024 Part I & Official Marking Scheme",
      si: "අ.පො.ස. සා/පෙළ විද්‍යාව — 2024 I කොටස සහ ලකුණු දීමේ පටිපාටිය",
      ta: "க.பொ.த. சா/த விஞ்ஞானம் — 2024 பகுதி I & புள்ளித்திட்டம்",
    },
    localizedSubtitle: {
      en: "Grade 11 • English Medium • 40 MCQs + Part II",
      si: "11 ශ්‍රේණිය • ඉංග්‍රීසි මාධ්‍යය • MCQ 40 + II කොටස",
      ta: "தரம் 11 • ஆங்கில மூலம் • 40 MCQ + பகுதி II",
    },
    keywords: "past paper 2024 science mcq vidyawa විද්‍යාව விஞ்ஞானம்",
    to: "/past-papers",
  },
  {
    id: "sr-3",
    category: "Past Papers",
    localizedTitle: {
      en: "G.C.E. O/L Mathematics — 2023 Part II",
      si: "අ.පො.ස. සා/පෙළ ගණිතය — 2023 II කොටස",
      ta: "க.பொ.த. சா/த கணிதம் — 2023 பகுதி II",
    },
    localizedSubtitle: {
      en: "Grade 11 • Sinhala Medium • Quadratic & Geometry",
      si: "11 ශ්‍රේණිය • සිංහල මාධ්‍යය • වර්ගජ සහ ජ්‍යාමිතිය",
      ta: "தரம் 11 • சிங்கள மூலம் • இருபடி & கேத்திரகணிதம்",
    },
    keywords: "ganithaya maths quadratic geometry ගණිතය கணிதம் 2023",
    to: "/past-papers",
  },
  {
    id: "sr-4",
    category: "Tutes",
    localizedTitle: {
      en: "O/L Mathematics Master Formula Sheet (All 3 Terms)",
      si: "සා/පෙළ ගණිතය ප්‍රධාන සූත්‍ර පත්‍රය (වාර 3ම)",
      ta: "சா/த கணிதம் முதன்மை சூத்திரத் தாள் (3 தவணைகளும்)",
    },
    localizedSubtitle: {
      en: "PDF Formula Sheet • 4 Pages • 920 KB",
      si: "PDF සූත්‍ර පත්‍රය • පිටු 4 • 920 KB",
      ta: "PDF சூத்திரத் தாள் • 4 பக்கங்கள் • 920 KB",
    },
    keywords: "formula tute ganithaya area volume circle theorem ගණිතය",
    to: "/notes",
  },
  {
    id: "sr-5",
    category: "Tutes",
    localizedTitle: {
      en: "Unit 7: Light, Mirrors & Ray Diagrams Tute (PDF)",
      si: "7 ඒකකය: ආලෝකය, දර්පණ සහ කිරණ සටහන් ටියුට් (PDF)",
      ta: "அலகு 7: ஒளி, ஆடிகள் & கதிர் வரைபட டியூட் (PDF)",
    },
    localizedSubtitle: {
      en: "Lesson Tute • Grade 8 Science • 14 Pages",
      si: "පාඩම් ටියුට් • 8 ශ්‍රේණිය විද්‍යාව • පිටු 14",
      ta: "பாட டியூட் • தரம் 8 விஞ்ஞானம் • 14 பக்கங்கள்",
    },
    keywords: "alokaya ray diagram mirror tute pdf ආලෝකය",
    to: "/notes",
  },
  {
    id: "sr-6",
    category: "Lessons",
    localizedTitle: {
      en: "Photosynthesis & Gas Exchange",
      si: "ප්‍රභාසංශ්ලේෂණය සහ වායු හුවමාරුව",
      ta: "ஒளித்தொகுப்பு & வாயுப் பரிமாற்றம்",
    },
    localizedSubtitle: {
      en: "Grade 10–11 Science • Term 1 Biology",
      si: "10–11 ශ්‍රේණි විද්‍යාව • 1 වන වාර ජීව විද්‍යාව",
      ta: "தரம் 10–11 விஞ்ஞானம் • தவணை 1 உயிரியல்",
    },
    keywords:
      "photosynthesis prabhasansleshanaya ප්‍රභාසංශ්ලේෂණය ஒளித்தொகுப்பு plant leaf starch",
    to: "/courses",
  },
  {
    id: "sr-7",
    category: "Teachers",
    localizedTitle: {
      en: "Ms. Menaka Jayawardena — Senior Science Specialist",
      si: "මේනකා ජයවර්ධන මිය — ජ්‍යෙෂ්ඨ විද්‍යා ආචාරිනී",
      ta: "திருமதி மேனகா ஜயவர்தன — சிரேஷ்ட விஞ்ஞான ஆசிரியர்",
    },
    localizedSubtitle: {
      en: "BSc, PGDE • Grades 6–11 Sinhala & English Medium",
      si: "BSc, PGDE • 6–11 ශ්‍රේණි සිංහල සහ ඉංග්‍රීසි මාධ්‍ය",
      ta: "BSc, PGDE • தரம் 6–11 சிங்களம் & ஆங்கில மூலம்",
    },
    keywords: "menaka science teacher vidyawa newton",
    to: "/courses",
  },
  {
    id: "sr-8",
    category: "Teachers",
    localizedTitle: {
      en: "Mr. Anura Perera — O/L Mathematics & Geometry Mentor",
      si: "අනුර පෙරේරා මයා — සා/පෙළ ගණිතය සහ ජ්‍යාමිතිය ආචාර්ය",
      ta: "திரு அனுர பெரேரா — சா/த கணிதம் & கேத்திரகணித வழிகாட்டி",
    },
    localizedSubtitle: {
      en: "20+ Years Experience • Western Province Marking Panel",
      si: "වසර 20+ පළපුරුද්ද • බස්නාහිර පළාත් පරීක්ෂක මණ්ඩලය",
      ta: "20+ வருட அனுபவம் • மேல் மாகாணப் பரீட்சகர் குழு",
    },
    keywords: "anura maths ganithaya geometry quadratic ගණිතය",
    to: "/courses",
  },
  {
    id: "sr-9",
    category: "Lessons",
    localizedTitle: {
      en: "Newton's Laws of Motion & Force Calculations",
      si: "නිව්ටන්ගේ චලිත නියම සහ බල ගණනය කිරීම්",
      ta: "நியூட்டனின் இயக்க விதிகள் & விசைக் கணிப்புகள்",
    },
    localizedSubtitle: {
      en: "Grade 10 Science • Physics Unit 4",
      si: "10 ශ්‍රේණිය විද්‍යාව • භෞතික විද්‍යාව 4 ඒකකය",
      ta: "தரம் 10 விஞ்ஞானம் • பௌதிகவியல் அலகு 4",
    },
    keywords: "newton laws force physics motion vidyawa නිව්ටන්",
    to: "/lesson",
  },
];
