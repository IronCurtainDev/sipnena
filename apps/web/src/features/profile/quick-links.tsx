import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Bookmark,
  CreditCard,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  HelpCircle,
  Languages,
} from "lucide-react";
import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

const PROFILE_LINKS: Array<{
  to: string;
  label: LocalizedText;
  icon: typeof GraduationCap;
}> = [
  {
    to: "/select-grade",
    label: {
      en: "Change Grade (6–11)",
      si: "ශ්‍රේණිය මාරු කරන්න (6–11)",
      ta: "தரத்தை மாற்று (6–11)",
    },
    icon: GraduationCap,
  },
  {
    to: "/select-medium",
    label: { en: "Study Medium", si: "අධ්‍යයන මාධ්‍යය", ta: "கற்கும் ஊடகம்" },
    icon: Languages,
  },
  {
    to: "/billing",
    label: {
      en: "Class Cards & Billing",
      si: "පන්ති කාඩ්පත් සහ බිල්පත්",
      ta: "வகுப்பு அட்டைகள்",
    },
    icon: CreditCard,
  },
  {
    to: "/payment-status",
    label: {
      en: "Bank Slip Status",
      si: "බැංකු රිසිට් තත්ත්වය",
      ta: "வங்கிச் சீட்டு நிலை",
    },
    icon: FileCheck2,
  },
  {
    to: "/progress",
    label: {
      en: "Progress & Mistake Bank",
      si: "ප්‍රගතිය සහ වැරදි බැංකුව",
      ta: "முன்னேற்றம் & தவறுகள்",
    },
    icon: BarChart3,
  },
  {
    to: "/quiz-history",
    label: {
      en: "Quiz History",
      si: "ප්‍රශ්නාවලි ඉතිහාසය",
      ta: "வினாடி வினா வரலாறு",
    },
    icon: BarChart3,
  },
  {
    to: "/downloads",
    label: {
      en: "Downloads & Data Saver",
      si: "බාගැනීම් සහ දත්ත සුරැකුම",
      ta: "பதிவிறக்கம் & தரவு சேமிப்பு",
    },
    icon: Download,
  },
  {
    to: "/saved",
    label: {
      en: "Saved Courses & Lessons",
      si: "සුරැකි පාඨමාලා සහ පාඩම්",
      ta: "சேமித்த பாடங்கள்",
    },
    icon: Bookmark,
  },
  {
    to: "/notes",
    label: {
      en: "My Study Notes",
      si: "මගේ අධ්‍යයන සටහන්",
      ta: "என் குறிப்புகள்",
    },
    icon: FileText,
  },
  {
    to: "/notifications",
    label: {
      en: "Notifications Center",
      si: "දැනුම්දීම් මධ්‍යස්ථානය",
      ta: "அறிவிப்பு மையம்",
    },
    icon: Bell,
  },
  {
    to: "/help",
    label: {
      en: "Help, FAQ & Legal",
      si: "උදව් සහ නීතිමය තොරතුරු",
      ta: "உதவி & சட்ட விதிமுறைகள்",
    },
    icon: HelpCircle,
  },
];

export function ProfileQuickLinks({ lang }: { lang: AppLanguage }) {
  return (
    <section className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--sn-text-muted)]">
        {lang === "si"
          ? "කෙටිමං සහ මෙවලම්"
          : lang === "ta"
            ? "குறுக்குவழிகள் & கருவிகள்"
            : "Shortcuts & Tools"}
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PROFILE_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-page-bg)]/60 px-3 py-2 text-xs font-bold text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--sn-primary)]" />
              <span className="truncate">{item.label[lang]}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-2.5 text-xs font-semibold text-[var(--sn-text-muted)]">
        <Link
          to="/terms"
          className="hover:text-[var(--sn-primary)] hover:underline"
        >
          {lang === "si"
            ? "සේවා කොන්දේසි"
            : lang === "ta"
              ? "சேவை விதிமுறைகள்"
              : "Terms of Service"}
        </Link>
        <Link
          to="/privacy"
          className="hover:text-[var(--sn-primary)] hover:underline"
        >
          {lang === "si"
            ? "රහස්‍යතා ප්‍රතිපත්තිය"
            : lang === "ta"
              ? "தனியுரிமைக் கொள்கை"
              : "Privacy Policy"}
        </Link>
        <Link
          to="/refund-policy"
          className="hover:text-[var(--sn-primary)] hover:underline"
        >
          {lang === "si"
            ? "මුදල් ආපසු ගෙවීමේ ප්‍රතිපත්තිය"
            : lang === "ta"
              ? "பணம் திரும்பப் பெறும் கொள்கை"
              : "Refund Policy"}
        </Link>
      </div>
    </section>
  );
}
