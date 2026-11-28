export type AppLanguage = "si" | "ta" | "en";

export interface LanguageOption {
  code: AppLanguage;
  badge: string;
  nativeTitle: string;
  nativeDesktopTitle: string;
}

export const APP_LANGUAGES: LanguageOption[] = [
  {
    code: "si",
    badge: "සි",
    nativeTitle: "සිංහල",
    nativeDesktopTitle: "සිංහල මාධ්‍යය",
  },
  {
    code: "ta",
    badge: "த",
    nativeTitle: "தமிழ்",
    nativeDesktopTitle: "தமிழ் மொழி மூலம்",
  },
  {
    code: "en",
    badge: "En",
    nativeTitle: "English",
    nativeDesktopTitle: "English Medium",
  },
];

const LANGUAGE_STORAGE_KEY = "sipnena_preferred_lang";
const DEFAULT_LANG: AppLanguage = "si";

export function syncDocumentLanguage(lang: AppLanguage): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
}

export function getSavedLanguage(): AppLanguage {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "si" || saved === "ta" || saved === "en") {
      return saved;
    }
  } catch {
    // LocalStorage might be restricted
  }
  return DEFAULT_LANG;
}

export function saveLanguage(lang: AppLanguage): void {
  if (typeof window === "undefined") return;
  syncDocumentLanguage(lang);
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    window.dispatchEvent(
      new CustomEvent("sipnena_language_change", { detail: lang }),
    );
  } catch {
    // LocalStorage might be restricted
  }
}
