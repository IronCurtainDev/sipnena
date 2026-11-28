import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

export type NotifCategory = "all" | "live" | "payment" | "doubt" | "exam";

export interface NotificationItem {
  id: string;
  category: Exclude<NotifCategory, "all">;
  localizedTitle: LocalizedText;
  localizedBody: LocalizedText;
  localizedTime: LocalizedText;
  to: string;
}

export const NOTIF_COPY: Record<
  AppLanguage,
  {
    pageTitle: string;
    catAll: string;
    catLive: string;
    catPayment: string;
    catDoubt: string;
    catExam: string;
    markAllBtn: string;
    markedToast: string;
  }
> = {
  en: {
    pageTitle: "Notifications Center",
    catAll: "All",
    catLive: "Live Classes",
    catPayment: "Bank Slips",
    catDoubt: "Doubt Replies",
    catExam: "Exam Countdowns",
    markAllBtn: "Mark all as read",
    markedToast: "All notifications marked as read",
  },
  si: {
    pageTitle: "දැනුම්දීම් මධ්‍යස්ථානය",
    catAll: "සියල්ල",
    catLive: "සජීවී පන්ති",
    catPayment: "බැංකු රිසිට්පත්",
    catDoubt: "ගැටළු පිළිතුරු",
    catExam: "විභාග දින ගණන්",
    markAllBtn: "සියල්ල කියවූ ලෙස ලකුණු කරන්න",
    markedToast: "සියලු දැනුම්දීම් කියවූ ලෙස ලකුණු කෙරිණි",
  },
  ta: {
    pageTitle: "அறிவிப்புகள் மையம்",
    catAll: "அனைத்தும்",
    catLive: "நேரலை வகுப்புகள்",
    catPayment: "வங்கி ரசீதுகள்",
    catDoubt: "சந்தேகப் பதில்கள்",
    catExam: "பரீட்சை நாட்கள்",
    markAllBtn: "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
    markedToast: "அனைத்து அறிவிப்புகளும் படித்ததாகக் குறிக்கப்பட்டன",
  },
};

export const NOTIFICATIONS: NotificationItem[] = [];
