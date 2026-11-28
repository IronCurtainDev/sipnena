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

export const SEARCH_CATALOG: SearchResultItem[] = [];
