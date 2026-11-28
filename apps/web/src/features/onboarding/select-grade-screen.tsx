import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap, ShieldCheck } from "lucide-react";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import { formatGrade, type LocalizedText } from "@/lib/i18n-common";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";

interface GradeCardInfo {
  grade: number;
  sub: LocalizedText;
  isOL: boolean;
}

const GRADES: GradeCardInfo[] = [
  {
    grade: 6,
    sub: {
      en: "Junior Secondary Start",
      si: "කනිෂ්ඨ ද්විතීයික ආරම්භය",
      ta: "இளநிலை இரண்டாம் நிலை",
    },
    isOL: false,
  },
  {
    grade: 7,
    sub: {
      en: "Core Foundations",
      si: "මූලික විෂය පදනම",
      ta: "அடிப்படைப் பாடங்கள்",
    },
    isOL: false,
  },
  {
    grade: 8,
    sub: {
      en: "Term Test & SBA Prep",
      si: "වාර විභාග සූදානම",
      ta: "தவணைப் பரீட்சை பயிற்சி",
    },
    isOL: false,
  },
  {
    grade: 9,
    sub: {
      en: "Pre-O/L Bridge Year",
      si: "සා/පෙළ පූර්ව වසර",
      ta: "சாதாரண தர முன்னோடி",
    },
    isOL: false,
  },
  {
    grade: 10,
    sub: {
      en: "G.C.E. O/L Part I Syllabus",
      si: "අ.පො.ස. සා/පෙළ (1 කොටස)",
      ta: "க.பொ.த. சாதாரண தரம் I",
    },
    isOL: true,
  },
  {
    grade: 11,
    sub: {
      en: "G.C.E. O/L Exam Year",
      si: "අ.පො.ස. සා/පෙළ විභාග වසර",
      ta: "க.பொ.த. சாதாரண தரம் II",
    },
    isOL: true,
  },
];

const GRADE_COPY = {
  en: {
    brandSubtitle: "School Learning App",
    topBadge: "NIE Curriculum • Grades 6–11",
    footer: "Made for Sri Lankan School Students (Grades 6–11)",
    stepPill: "Step 2 of 4 • School Grade",
    nieAligned: "NIE 2026 Aligned",
    olBadge: "G.C.E. O/L",
    title: "Select your school grade",
    subtitle:
      "We tailor your lessons, tutes, and past papers to the NIE school syllabus.",
    olHint: "Grades 10–11 unlock Core + Basket 1, 2 & 3 O/L subjects.",
    regularHint: "Includes Sinhala, Tamil, and English medium school units.",
    continueBtn: "Continue to Medium",
    langAria: "Change language",
  },
  si: {
    brandSubtitle: "පාසල් ඉගෙනුම් ඇප් එක",
    topBadge: "ජාතික විෂය නිර්දේශය • 6–11 ශ්‍රේණි",
    footer: "ශ්‍රී ලාංකික පාසල් සිසුන් වෙනුවෙන් (6–11 ශ්‍රේණි)",
    stepPill: "පියවර 2 / 4 • ශ්‍රේණිය",
    nieAligned: "NIE 2026 අනුකූලයි",
    olBadge: "අ.පො.ස. සා/පෙළ",
    title: "ඔබ ඉගෙන ගන්නා ශ්‍රේණිය තෝරන්න",
    subtitle:
      "ජාතික අධ්‍යාපන ආයතනයේ (NIE) විෂය නිර්දේශයට අනුව පාඩම්, ටියුට් සහ ප්‍රශ්න පත්‍ර සැකසේ.",
    olHint:
      "10–11 ශ්‍රේණි සඳහා ප්‍රධාන විෂයයන් සහ 1, 2, 3 කාණ්ඩ (Baskets) විවෘත වේ.",
    regularHint:
      "සිංහල, දෙමළ සහ ඉංග්‍රීසි මාධ්‍ය තුනෙන්ම පාසල් පාඩම් ඇතුළත් වේ.",
    continueBtn: "මාධ්‍යය තෝරන්න",
    langAria: "භාෂාව මාරු කරන්න",
  },
  ta: {
    brandSubtitle: "பாடசாலை கற்றல் தளம்",
    topBadge: "NIE பாடத்திட்டம் • தரம் 6–11",
    footer: "இலங்கைப் பாடசாலை மாணவர்களுக்காக (தரம் 6–11)",
    stepPill: "படி 2 / 4 • தரம்",
    nieAligned: "NIE 2026 இணைந்தது",
    olBadge: "க.பொ.த. சா/த",
    title: "நீங்கள் படிக்கும் தரத்தைத் தேர்ந்தெடுக்கவும்",
    subtitle:
      "தேசிய கல்வி நிறுவக (NIE) பாடத்திட்டத்திற்கு ஏற்ப பாடங்கள், குறிப்புகள் மற்றும் வினாத்தாள்கள் தயாராகும்.",
    olHint:
      "தரம் 10–11 க்கு கட்டாயப் பாடங்களுடன் 1, 2, 3 பிரிவுப் பாடங்களும் திறக்கப்படும்.",
    regularHint:
      "சிங்களம், தமிழ் மற்றும் ஆங்கில மொழி மூலப் பாடசாலைப் பாடங்கள் உள்ளடங்கும்.",
    continueBtn: "மொழி மூலத்தைத் தேர்ந்தெடுக்கவும்",
    langAria: "மொழியை மாற்றுக",
  },
};

export function SelectGradeScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setGrade } = usePrototypeState();
  const copy = GRADE_COPY[lang];

  return (
    <SipNenaOnboardingShell
      selectedLang={lang}
      onLanguageChange={setLang}
      langSwitcherAria={copy.langAria}
      brandSubtitle={copy.brandSubtitle}
      topBadge={copy.topBadge}
      footer={copy.footer}
      onBack={() => void navigate({ to: "/welcome-language" })}
    >
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-page-enter">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sn-sage)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            <GraduationCap className="h-4 w-4" />
            <span>{copy.stepPill}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            <span>{copy.nieAligned}</span>
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
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {GRADES.map((item) => {
            const active = state.grade === item.grade;
            return (
              <button
                key={item.grade}
                type="button"
                role="radio"
                aria-checked={active}
                data-testid={`grade-card-${item.grade}`}
                onClick={() => setGrade(item.grade)}
                className={`relative flex min-h-[124px] flex-col justify-between rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-olive)]/70 shadow-xs"
                    : "border-slate-200 bg-white hover:border-[var(--sn-moss)]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-black ${
                      active
                        ? "bg-[var(--sn-primary)] text-white"
                        : "bg-[var(--sn-surface-muted)] text-[var(--sn-primary)]"
                    }`}
                  >
                    {item.grade}
                  </span>
                  {item.isOL ? (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-900">
                      {copy.olBadge}
                    </span>
                  ) : active ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : null}
                </div>

                <div className="mt-3">
                  <p className="text-base font-extrabold text-[var(--sn-text-main)]">
                    {formatGrade(lang, item.grade)}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                    {item.sub[lang]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row">
          <p className="text-xs font-medium text-[var(--sn-text-secondary)]">
            {state.grade >= 10 ? copy.olHint : copy.regularHint}
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/select-medium" })}
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
