import { Link } from "@tanstack/react-router";
import { Calendar, MessageCircleQuestion, Radio } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";

export function LiveAndAskHubScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const title =
    lang === "si"
      ? "සජීවී පන්ති සහ ප්‍රශ්න"
      : lang === "ta"
        ? "நேரலை & கேள்விகள்"
        : "Live & Ask";

  const cards = [
    {
      to: "/live",
      icon: Radio,
      title:
        lang === "si"
          ? "සජීවී පන්ති"
          : lang === "ta"
            ? "நேரலை வகுப்புகள்"
            : "Live Classes",
      desc:
        lang === "si"
          ? "දැන් පවතින සහ මීළඟ සජීවී පන්තිවලට එක්වන්න"
          : lang === "ta"
            ? "இப்போது நடைபெறும் நேரலை வகுப்புகளில் சேருங்கள்"
            : "Join active Zoom/YouTube classes and live Q&A.",
    },
    {
      to: "/schedule",
      icon: Calendar,
      title:
        lang === "si"
          ? "සතිපතා කාලසටහන"
          : lang === "ta"
            ? "வாராந்த வகுப்பு அட்டவணை"
            : "Weekly Class Timetable",
      desc:
        lang === "si"
          ? "සියලු ශ්‍රේණිවල පන්ති වේලාවන් බලන්න"
          : lang === "ta"
            ? "அனைத்து தர வகுப்பு நேரங்களையும் பார்க்க"
            : "View this week's Sri Lankan class schedule by subject.",
    },
    {
      to: "/doubts",
      icon: MessageCircleQuestion,
      title:
        lang === "si"
          ? "ගුරුවරයාගෙන් ප්‍රශ්න අහන්න"
          : lang === "ta"
            ? "ஆசிரியரிடம் சந்தேகம் கேள்"
            : "Ask Teacher Doubts",
      desc:
        lang === "si"
          ? "පැහැදිලි නැති කරුණක් හෝ ඡායාරූපයක් යොමු කරන්න"
          : lang === "ta"
            ? "கேள்வி அல்லது புகைப்படத்தை ஆசிரியருக்கு அனுப்பவும்"
            : "Post homework questions or textbook photos to your tutor.",
    },
  ];

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={title}
      roleOverride="student"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
