import { Link } from "@tanstack/react-router";
import { BarChart3, FileCheck2, FileSpreadsheet, History } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";

export function ExamPrepHubScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const title =
    lang === "si"
      ? "විභාග සූදානම"
      : lang === "ta"
        ? "பரீட்சை ஆயத்தம்"
        : "Exam Prep";

  const cards = [
    {
      to: "/past-papers",
      icon: FileCheck2,
      title:
        lang === "si"
          ? "පසුගිය ප්‍රශ්න පත්‍ර"
          : lang === "ta"
            ? "கடந்த வினாத்தாள்கள்"
            : "Past Papers & Marking Schemes",
      desc:
        lang === "si"
          ? "O/L සහ ශ්‍රේණි ප්‍රශ්න පත්‍ර ලකුණු පටිපාටි සමඟ"
          : lang === "ta"
            ? "புள்ளித்திட்டத்துடன் கடந்த கால வினாத்தாள்கள்"
            : "Practice O/L and term papers with official marking points.",
    },
    {
      to: "/term-tests",
      icon: FileSpreadsheet,
      title:
        lang === "si"
          ? "පළාත් වාර විභාග"
          : lang === "ta"
            ? "தவணைப் பரீட்சைகள்"
            : "Provincial Term Tests",
      desc:
        lang === "si"
          ? "1, 2, 3 වාර විභාග ප්‍රශ්න පත්‍ර සහ පිළිතුරු"
          : lang === "ta"
            ? "தவணை 1, 2, 3 மாகாண வினாத்தாள்கள்"
            : "Term 1, 2, and 3 zonal and school paper sets.",
    },
    {
      to: "/quiz-history",
      icon: History,
      title:
        lang === "si"
          ? "ප්‍රශ්නාවලි ඉතිහාසය"
          : lang === "ta"
            ? "வினாடி வரலாறு"
            : "Quiz History & Scores",
      desc:
        lang === "si"
          ? "ඔබ කළ සියලු ප්‍රශ්නාවලි සහ ලකුණු ප්‍රවණතා"
          : lang === "ta"
            ? "நீங்கள் செய்த வினாடிகளும் மதிப்பெண்களும்"
            : "Review past attempts, pass scores, and accuracy trends.",
    },
    {
      to: "/progress",
      icon: BarChart3,
      title:
        lang === "si"
          ? "ප්‍රගතිය සහ වැරදි බැංකුව"
          : lang === "ta"
            ? "முன்னேற்றம் & தவறுகள் வங்கி"
            : "Progress & Mistake Bank",
      desc:
        lang === "si"
          ? "වැරදුණු ප්‍රශ්න නැවත පුහුණු වන්න"
          : lang === "ta"
            ? "தவறிய கேள்விகளை மீண்டும் பயிற்சி செய்க"
            : "Retry questions you missed and track subject mastery.",
    },
  ];

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={title}
      roleOverride="student"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.to}
              to={card.to}
              className="flex min-h-28 items-start gap-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs transition hover:border-[var(--sn-primary)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
                  {card.title}
                </h2>
                <p className="text-sm text-[var(--sn-text-secondary)]">
                  {card.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </SipNenaPortalShell>
  );
}
