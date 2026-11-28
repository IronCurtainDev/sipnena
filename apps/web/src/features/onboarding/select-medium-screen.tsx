import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Check, Languages } from "lucide-react";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import { formatGrade, type LocalizedText } from "@/lib/i18n-common";
import type { StudyMedium } from "@/lib/language-types";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";

interface MediumCard {
  id: StudyMedium;
  badge: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  desc: LocalizedText;
  sampleSubjects: LocalizedText;
}

const MEDIUMS: MediumCard[] = [
  {
    id: "si",
    badge: "සි",
    title: {
      en: "Sinhala Medium",
      si: "සිංහල මාධ්‍යය",
      ta: "சிங்கள மொழி மூலம்",
    },
    subtitle: {
      en: "සිංහල මාධ්‍යය",
      si: "ජාතික විෂය නිර්දේශය",
      ta: "தேசிய பாடத்திட்டம்",
    },
    desc: {
      en: "Video lessons, NIE tutes, and past papers in Sinhala.",
      si: "වීඩියෝ පාඩම්, NIE ටියුට් සහ පසුගිය විභාග ප්‍රශ්න පත්‍ර සිංහලෙන්.",
      ta: "சிங்களத்தில் வீடியோ பாடங்கள், NIE குறிப்புகள் மற்றும் கடந்த வினாத்தாள்கள்.",
    },
    sampleSubjects: {
      en: "Mathematics • Science • History",
      si: "ගණිතය • විද්‍යාව • ඉතිහාසය",
      ta: "கணிதம் • விஞ்ஞானம் • வரலாறு",
    },
  },
  {
    id: "ta",
    badge: "த",
    title: {
      en: "Tamil Medium",
      si: "දෙමළ මාධ්‍යය",
      ta: "தமிழ் மொழி மூலம்",
    },
    subtitle: {
      en: "தமிழ் மொழி மூலம்",
      si: "ජාතික විෂය නිර්දේශය",
      ta: "தேசிய பாடத்திட்டம்",
    },
    desc: {
      en: "Video lessons, NIE tutes, and past papers in Tamil.",
      si: "වීඩියෝ පාඩම්, NIE ටියුට් සහ පසුගිය විභාග ප්‍රශ්න පත්‍ර දෙමළෙන්.",
      ta: "தமிழில் வீடியோ பாடங்கள், NIE குறிப்புகள் மற்றும் கடந்த வினாத்தாள்கள்.",
    },
    sampleSubjects: {
      en: "Mathematics • Science • History",
      si: "ගණිතය • විද්‍යාව • ඉතිහාසය",
      ta: "கணிதம் • விஞ்ஞானம் • வரலாறு",
    },
  },
  {
    id: "en",
    badge: "En",
    title: {
      en: "English Medium",
      si: "ඉංග්‍රීසි මාධ්‍යය",
      ta: "ஆங்கில மொழி மூலம்",
    },
    subtitle: {
      en: "National / Bilingual",
      si: "ජාතික / ද්විභාෂා",
      ta: "தேசிய / இருமொழி",
    },
    desc: {
      en: "Lessons, bilingual glossary, and past papers in English.",
      si: "ඉංග්‍රීසි මාධ්‍ය පාඩම්, වචන මාලාව සහ පසුගිය ප්‍රශ්න පත්‍ර.",
      ta: "ஆங்கிலத்தில் பாடங்கள், இருமொழி சொற்களஞ்சியம் மற்றும் வினாத்தாள்கள்.",
    },
    sampleSubjects: {
      en: "Mathematics • Science • ICT",
      si: "ගණිතය • විද්‍යාව • ICT",
      ta: "கணிதம் • விஞ்ஞானம் • ICT",
    },
  },
];

const MEDIUM_COPY = {
  en: {
    brandSubtitle: "School Learning App",
    topBadgeSuffix: "Medium Selection",
    footer: "You can switch study medium anytime from Profile settings.",
    stepPill: "Step 3 of 4 • Study Medium",
    olSuffix: "(G.C.E. O/L)",
    title: "Choose your classroom study medium",
    subtitle:
      "All lessons include glossary terms so you can revise clearly before term tests and O/L exams.",
    profileLink: "Or create student profile first",
    continueBtn: "Pick Subjects",
    langAria: "Change language",
  },
  si: {
    brandSubtitle: "පාසල් ඉගෙනුම් ඇප් එක",
    topBadgeSuffix: "මාධ්‍යය තෝරාගැනීම",
    footer: "ඕනෑම වෙලාවක Profile සැකසුම් වලින් අධ්‍යයන මාධ්‍යය මාරු කළ හැක.",
    stepPill: "පියවර 3 / 4 • අධ්‍යයන මාධ්‍යය",
    olSuffix: "(අ.පො.ස. සා/පෙළ)",
    title: "ඔබේ පාසල් අධ්‍යයන මාධ්‍යය තෝරන්න",
    subtitle:
      "වාර විභාග සහ සාමාන්‍ය පෙළට පෙර පැහැදිලිව පුනරීක්ෂණය කිරීමට සියලුම පාඩම්වල පාරිභාෂික වචන ඇතුළත් වේ.",
    profileLink: "නැතහොත් පළමුව ශිෂ්‍ය ගිණුම සාදන්න",
    continueBtn: "විෂයයන් තෝරන්න",
    langAria: "භාෂාව මාරු කරන්න",
  },
  ta: {
    brandSubtitle: "பாடசாலை கற்றல் தளம்",
    topBadgeSuffix: "ஊடகத் தேர்வு",
    footer:
      "சுயவிவர அமைப்புகளில் எப்போது வேண்டுமானாலும் மொழி மூலத்தை மாற்றலாம்.",
    stepPill: "படி 3 / 4 • கற்கும் ஊடகம்",
    olSuffix: "(க.பொ.த. சா/த)",
    title: "உங்கள் பாடசாலை கற்கும் மொழி மூலத்தைத் தேர்ந்தெடுக்கவும்",
    subtitle:
      "தவணைப் பரீட்சை மற்றும் சா/த பரீட்சைக்கு முன் தெளிவாக மீள்பார்வை செய்ய அனைத்துப் பாடங்களிலும் கலைச்சொற்கள் உள்ளன.",
    profileLink: "அல்லது முதலில் மாணவர் கணக்கை உருவாக்குங்கள்",
    continueBtn: "பாடங்களைத் தேர்ந்தெடுக்கவும்",
    langAria: "மொழியை மாற்றுக",
  },
};

export function SelectMediumScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setMedium } = usePrototypeState();
  const copy = MEDIUM_COPY[lang];
  const gradeLabel = formatGrade(lang, state.grade);

  return (
    <SipNenaOnboardingShell
      selectedLang={lang}
      onLanguageChange={setLang}
      langSwitcherAria={copy.langAria}
      brandSubtitle={copy.brandSubtitle}
      topBadge={`${gradeLabel} • ${copy.topBadgeSuffix}`}
      footer={copy.footer}
      onBack={() => void navigate({ to: "/select-grade" })}
    >
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-page-enter">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sn-sage)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            <Languages className="h-4 w-4" />
            <span>{copy.stepPill}</span>
          </span>
          <span className="rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            {gradeLabel} {state.grade >= 10 ? copy.olSuffix : ""}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)] sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
          {copy.subtitle}
        </p>

        <div
          role="radiogroup"
          aria-label={copy.title}
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {MEDIUMS.map((m) => {
            const active = state.medium === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={active}
                data-testid={`medium-card-${m.id}`}
                onClick={() => setMedium(m.id)}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-olive)]/70 shadow-xs"
                    : "border-slate-200 bg-white hover:border-[var(--sn-moss)]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-base font-extrabold ${
                      active
                        ? "bg-[var(--sn-primary)] text-white"
                        : "bg-[var(--sn-surface-muted)] text-[var(--sn-primary)]"
                    }`}
                  >
                    {m.badge}
                  </span>
                  {active && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-base font-extrabold text-[var(--sn-text-main)]">
                    {m.title[lang]}
                  </p>
                  <p className="text-xs font-semibold text-[var(--sn-primary)]">
                    {m.subtitle[lang]}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--sn-text-muted)]">
                    {m.desc[lang]}
                  </p>
                </div>

                <div className="mt-3 rounded-xl bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-[var(--sn-text-secondary)]">
                  {m.sampleSubjects[lang]}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row">
          <Link
            to="/create-account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--sn-primary)] hover:underline"
          >
            <BookOpenCheck className="h-4 w-4" />
            <span>{copy.profileLink}</span>
          </Link>

          <button
            type="button"
            onClick={() => void navigate({ to: "/pick-subjects" })}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)] sm:w-auto"
          >
            <span>{copy.continueBtn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SipNenaOnboardingShell>
  );
}
