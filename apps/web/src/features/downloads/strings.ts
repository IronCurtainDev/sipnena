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

export const OFFLINE_CATALOG: OfflineItem[] = [
  {
    id: "tute-light-pdf",
    kindKey: "PDF",
    localizedKind: { en: "PDF", si: "PDF ටියුට්", ta: "PDF" },
    localizedTitle: {
      en: "Unit 7: Light, Mirrors & Ray Diagrams Tute (PDF)",
      si: "7 ඒකකය: ආලෝකය, දර්පණ සහ කිරණ සටහන් ටියුට් (PDF)",
      ta: "அலகு 7: ஒளி, ஆடிகள் & கதிர் வரைபட டியூட் (PDF)",
    },
    sizeMb: 2,
    to: "/notes",
  },
  {
    id: "textbook-sci-g8",
    kindKey: "PDF",
    localizedKind: { en: "PDF", si: "PDF පෙළපොත", ta: "PDF பாடநூல்" },
    localizedTitle: {
      en: "NIE Official Grade 8 Science Part II Textbook",
      si: "NIE නිල 8 ශ්‍රේණිය විද්‍යාව II කොටස පෙළපොත",
      ta: "NIE உத்தியோகபூர்வ தரம் 8 விஞ்ஞானம் பகுதி II பாடநூல்",
    },
    sizeMb: 14,
    to: "/notes",
  },
  {
    id: "video-mirrors-4",
    kindKey: "Video",
    localizedKind: { en: "Video", si: "වීඩියෝව", ta: "வீடியோ" },
    localizedTitle: {
      en: "Lesson 4: Mirrors & Image Formation (480p Offline Pack)",
      si: "4 වන පාඩම: දර්පණ සහ ප්‍රතිබිම්බ සෑදීම (480p නොබැඳි ගොනුව)",
      ta: "பாடம் 4: ஆடிகள் & விம்ப உருவாக்கம் (480p ஆஃப்லைன் தொகுப்பு)",
    },
    sizeMb: 126,
    to: "/lesson",
  },
  {
    id: "note-light-short",
    kindKey: "PDF",
    localizedKind: { en: "PDF", si: "කෙටි සටහන", ta: "PDF குறிப்பு" },
    localizedTitle: {
      en: "O/L Science — Electricity & Ohm's Law One-Page Note",
      si: "සා/පෙළ විද්‍යාව — විදුලිය සහ ඕම්ගේ නියමය කෙටි සටහන",
      ta: "சா/த விஞ்ஞானம் — மின்னியல் & ஓமின் விதி ஒரு பக்கக் குறிப்பு",
    },
    sizeMb: 1,
    to: "/notes",
  },
];

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
