import { useCallback, useEffect, useState } from "react";
import {
  getSavedLanguage,
  saveLanguage,
  syncDocumentLanguage,
  type AppLanguage,
} from "@/lib/language";

export function useSipNenaLanguage() {
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);

  useEffect(() => {
    syncDocumentLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) {
        setLang(customEvent.detail);
        syncDocumentLanguage(customEvent.detail);
      }
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () => {
      window.removeEventListener("sipnena_language_change", handleSync);
    };
  }, []);

  const changeLang = useCallback((nextLang: AppLanguage) => {
    setLang(nextLang);
    saveLanguage(nextLang);
  }, []);

  return [lang, changeLang] as const;
}

export function pickText(
  lang: AppLanguage,
  text: { en: string; si: string; ta: string },
): string {
  return text[lang] || text.en;
}
