import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { DataSaverQuality } from "@/lib/prototype-state";

export interface OfflineItem {
  id: string;
  kindKey: "PDF" | "Video";
  localizedKind: LocalizedText;
  localizedTitle: LocalizedText;
  sizeMb: number;
  to: string;
}

export const OFFLINE_CATALOG: OfflineItem[] = [];

export const QUALITY_OPTIONS: Array<{
  id: DataSaverQuality;
  localizedLabel: LocalizedText;
  res: string;
  localizedDataNote: LocalizedText;
}> = [
  {
    id: "low",
    localizedLabel: {
      en: "Low (Data Saver)",
      si: "අඩු (දත්ත සුරැකුම)",
      ta: "குறைந்தது (டேட்டா சேமிப்பு)",
    },
    res: "240p",
    localizedDataNote: {
      en: "~70 MB / hr",
      si: "~70 MB / පැය",
      ta: "~70 MB / மணி",
    },
  },
  {
    id: "medium",
    localizedLabel: {
      en: "Medium (Balanced)",
      si: "මධ්‍යම (සමබර)",
      ta: "நடுத்தரம் (சமநிலை)",
    },
    res: "480p",
    localizedDataNote: {
      en: "~180 MB / hr",
      si: "~180 MB / පැය",
      ta: "~180 MB / மணி",
    },
  },
  {
    id: "high",
    localizedLabel: {
      en: "High (HD Clear)",
      si: "ඉහළ (HD පැහැදිලි)",
      ta: "உயர் (HD தெளிவு)",
    },
    res: "720p",
    localizedDataNote: {
      en: "~420 MB / hr",
      si: "~420 MB / පැය",
      ta: "~420 MB / மணி",
    },
  },
];

export const DOWNLOADS_COPY: Record<
  AppLanguage,
  {
    pageTitle: string;
    heading: string;
    sub: string;
    wifiOnly: string;
    onLabel: string;
    offLabel: string;
    wifiOnToast: string;
    wifiOffToast: string;
    qualityToastPrefix: string;
    estUsagePrefix: string;
    storageHeading: string;
    usedWord: string;
    emptyText: string;
    readyOffline: string;
    openBtn: string;
    removedToastPrefix: string;
  }
> = {
  en: {
    pageTitle: "Downloads & Data Saver",
    heading: "Mobile Data Saver & Video Quality",
    sub: "Optimize video streaming and offline downloads for Dialog, Mobitel, and Hutch mobile data packages.",
    wifiOnly: "Wi-Fi Only Downloads:",
    onLabel: "ON",
    offLabel: "OFF",
    wifiOnToast: "Wi-Fi only downloads enabled",
    wifiOffToast: "Mobile data downloads allowed",
    qualityToastPrefix: "Video quality set to",
    estUsagePrefix: "Est. usage:",
    storageHeading: "Offline Storage",
    usedWord: "used",
    emptyText:
      "No offline files saved. Visit Tutes & Notes to save PDFs for offline revision.",
    readyOffline: "Ready Offline",
    openBtn: "Open",
    removedToastPrefix: "Removed from device:",
  },
  si: {
    pageTitle: "බාගත කිරීම් සහ දත්ත සුරැකුම",
    heading: "ජංගම දත්ත සුරැකුම සහ වීඩියෝ ගුණාත්මකභාවය",
    sub: "Dialog, Mobitel සහ Hutch දත්ත පැකේජ සඳහා අඩු දත්ත වැය වන පරිදි වීඩියෝ සහ බාගත කිරීම් සකසන්න.",
    wifiOnly: "Wi-Fi පමණක් බාගත කිරීම:",
    onLabel: "සක්‍රියයි",
    offLabel: "අක්‍රියයි",
    wifiOnToast: "Wi-Fi පමණක් බාගත කිරීම සක්‍රිය කෙරිණි",
    wifiOffToast: "ජංගම දත්ත මගින් බාගත කිරීමට ඉඩ දෙන ලදී",
    qualityToastPrefix: "වීඩියෝ ගුණාත්මකභාවය සකසන ලදී:",
    estUsagePrefix: "ඇස්තමේන්තුගත වැය:",
    storageHeading: "නොබැඳි ගබඩාව",
    usedWord: "භාවිතයි",
    emptyText:
      "නොබැඳි ගොනු කිසිවක් නොමැත. PDF සුරැකීමට ටියුට් සහ සටහන් පිටුවට පිවිසෙන්න.",
    readyOffline: "නොබැඳිව සූදානම්",
    openBtn: "විවෘත කරන්න",
    removedToastPrefix: "උපාංගයෙන් ඉවත් කරන ලදී:",
  },
  ta: {
    pageTitle: "பதிவிறக்கங்கள் & டேட்டா சேமிப்பு",
    heading: "மொபைல் டேட்டா சேமிப்பு & வீடியோ தரம்",
    sub: "Dialog, Mobitel மற்றும் Hutch மொபைல் டேட்டா பொதிகளுக்கு ஏற்ப வீடியோ ஒளிபரப்பைச் சீரமைக்கவும்.",
    wifiOnly: "Wi-Fi பதிவிறக்கம் மட்டும்:",
    onLabel: "இயங்கும்",
    offLabel: "நிறுத்தம்",
    wifiOnToast: "Wi-Fi மட்டும் பதிவிறக்கம் செயலாக்கப்பட்டது",
    wifiOffToast: "மொபைல் டேட்டா பதிவிறக்கங்கள் அனுமதிக்கப்பட்டன",
    qualityToastPrefix: "வீடியோ தரம் மாற்றப்பட்டது:",
    estUsagePrefix: "மதிப்பீட்டு பயன்பாடு:",
    storageHeading: "ஆஃப்லைன் சேமிப்பகம்",
    usedWord: "பயன்படுத்தப்பட்டது",
    emptyText:
      "ஆஃப்லைன் கோப்புகள் இல்லை. PDF களைச் சேமிக்க டியூட்கள் & குறிப்புகள் பக்கத்திற்குச் செல்லவும்.",
    readyOffline: "ஆஃப்லைனில் தயார்",
    openBtn: "திறக்கவும்",
    removedToastPrefix: "சாதனத்திலிருந்து நீக்கப்பட்டது:",
  },
};
