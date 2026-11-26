import type { AppLanguage } from "@/lib/language";

/** Localized playlist lesson titles keyed by lesson id. */
export const PLAYLIST_LESSON_TITLES: Record<
  AppLanguage,
  Record<string, string>
> = {
  en: {
    les1: "Introduction to light & rays",
    les2: "Laws of reflection on plane mirrors",
    "quiz-sec1": "Section 1 quiz (10 questions)",
    les3: "Spherical mirrors & ray construction",
    les5: "Concave mirrors formula & calculation",
    les6: "Convex mirrors & real-world uses",
    les7: "Virtual lab: ray box experiment",
    "quiz-sec2": "Section 2 quiz (10 questions)",
    les8: "Refraction through a glass slab",
    les9: "Total internal reflection & fibres",
    les10: "Thin lenses: convex & concave",
    les11: "Human eye & vision defects",
    "quiz-sec3": "Section 3 final check",
  },
  si: {
    les1: "ආලෝකය සහ කිරණ හැඳින්වීම",
    les2: "තල දර්පණවල පරාවර්තන නීති",
    "quiz-sec1": "කොටස 1 ප්‍රශ්නාවලිය (ප්‍රශ්න 10)",
    les3: "ගෝලීය දර්පණ හා කිරණ සටහන්",
    les5: "අවතල දර්පණ සූත්‍ර සහ ගණනය",
    les6: "උත්තල දර්පණ සහ භාවිත",
    les7: "අතථ්‍ය රසායනාගාරය: කිරණ පෙට්ටිය",
    "quiz-sec2": "කොටස 2 ප්‍රශ්නාවලිය (ප්‍රශ්න 10)",
    les8: "වීදුරු තලයකින් ආලෝක වර්තනය",
    les9: "සම්පූර්ණ අභ්‍යන්තර පරාවර්තනය",
    les10: "තුනී කාච: උත්තල සහ අවතල",
    les11: "මානව ඇස සහ දෘෂ්ටි දෝෂ",
    "quiz-sec3": "කොටස 3 අවසාන පරීක්ෂණය",
  },
  ta: {
    les1: "ஒளி மற்றும் கதிர்கள் அறிமுகம்",
    les2: "சமதள ஆடிகளில் பிரதிபலிப்பு விதிகள்",
    "quiz-sec1": "பகுதி 1 வினாடி வினா (10 கேள்விகள்)",
    les3: "கோள ஆடிகள் மற்றும் கதிர் படங்கள்",
    les5: "குழிவு ஆடி சூத்திரம் மற்றும் கணக்கீடு",
    les6: "குவிவு ஆடிகள் மற்றும் பயன்பாடுகள்",
    les7: "மெய்நிகர் ஆய்வகம்: கதிர் பெட்டி",
    "quiz-sec2": "பகுதி 2 வினாடி வினா (10 கேள்விகள்)",
    les8: "கண்ணாடித் தகடு வழியாக ஒளிமுறிவு",
    les9: "முழு அக பிரதிபலிப்பு மற்றும் இழைகள்",
    les10: "மெல்லிய வில்லைகள்: குவிவு & குழிவு",
    les11: "மனிதக் கண் மற்றும் பார்வைக் குறைபாடுகள்",
    "quiz-sec3": "பகுதி 3 இறுதி சோதனை",
  },
};

export const PLAYLIST_STATUS: Record<
  AppLanguage,
  {
    done: string;
    locked: string;
    quiz: string;
    nowPlaying: string;
    show: string;
    hide: string;
  }
> = {
  en: {
    done: "Done",
    locked: "Locked",
    quiz: "Quiz",
    nowPlaying: "Now playing",
    show: "Show",
    hide: "Hide",
  },
  si: {
    done: "අවසන්",
    locked: "අගුළු ඇත",
    quiz: "ප්‍රශ්නාවලිය",
    nowPlaying: "දැන් වාදනය වේ",
    show: "පෙන්වන්න",
    hide: "සඟවන්න",
  },
  ta: {
    done: "முடிந்தது",
    locked: "பூட்டியது",
    quiz: "வினாடி வினா",
    nowPlaying: "இப்போது ஓடுகிறது",
    show: "காட்டு",
    hide: "மறை",
  },
};

export function lessonTitle(
  lang: AppLanguage,
  lessonId: string,
  fallback: string,
): string {
  return PLAYLIST_LESSON_TITLES[lang][lessonId] ?? fallback;
}

/** "Lesson 4 of 12" / "පාඩම 4 / 12" / "பாடம் 4 / 12" */
export function lessonCounter(
  lang: AppLanguage,
  lessonNumber: number,
  total = 12,
): string {
  if (lang === "si") return `පාඩම ${lessonNumber} / ${total}`;
  if (lang === "ta") return `பாடம் ${lessonNumber} / ${total}`;
  return `Lesson ${lessonNumber} of ${total}`;
}

/** Localize mock duration labels like "22 mins" or "1 hr 39 mins". */
export function formatDuration(lang: AppLanguage, raw: string): string {
  if (lang === "en") return raw;
  const hr = raw.match(/(\d+)\s*hr/i);
  const mins = raw.match(/(\d+)\s*mins?/i);
  const clock = raw.match(/(\d+:\d+)/);
  const items = raw.match(/(\d+)\s*items?/i);
  const parts: string[] = [];
  if (items) {
    parts.push(lang === "si" ? `අයිතම ${items[1]}` : `உருப்படி ${items[1]}`);
  }
  if (hr && mins) {
    parts.push(
      lang === "si"
        ? `පැය ${hr[1]} මිනි ${mins[1]}`
        : `${hr[1]} மணி ${mins[1]} நிமி`,
    );
  } else if (clock && mins) {
    parts.push(lang === "si" ? `${clock[1]} මිනි` : `${clock[1]} நிமி`);
  } else if (mins) {
    parts.push(lang === "si" ? `මිනි ${mins[1]}` : `${mins[1]} நிமி`);
  } else {
    return raw;
  }
  return parts.join(" · ");
}
