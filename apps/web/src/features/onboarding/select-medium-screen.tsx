import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Check, Languages } from "lucide-react";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import type { StudyMedium } from "@/lib/language-types";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";

interface MediumCard {
  id: StudyMedium;
  badge: string;
  nativeName: string;
  englishName: string;
  desc: string;
  sampleSubjects: string;
}

const MEDIUMS: MediumCard[] = [
  {
    id: "si",
    badge: "සි",
    nativeName: "සිංහල මාධ්‍යය",
    englishName: "Sinhala Medium",
    desc: "Video lessons, NIE tutes, and past papers in Sinhala.",
    sampleSubjects: "ගණිතය • විද්‍යාව • ඉතිහාසය",
  },
  {
    id: "ta",
    badge: "த",
    nativeName: "தமிழ் மொழி மூலம்",
    englishName: "Tamil Medium",
    desc: "Video lessons, NIE tutes, and past papers in Tamil.",
    sampleSubjects: "கணிதம் • விஞ்ஞானம் • வரலாறு",
  },
  {
    id: "en",
    badge: "En",
    nativeName: "English Medium",
    desc: "Lessons, bilingual glossary, and past papers in English.",
    englishName: "National / Bilingual",
    sampleSubjects: "Mathematics • Science • ICT",
  },
];

export function SelectMediumScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setMedium } = usePrototypeState();

  return (
    <SipNenaOnboardingShell
      selectedLang={lang}
      onLanguageChange={setLang}
      langSwitcherAria="Change language"
      brandSubtitle="Sri Lankan School LMS"
      topBadge={`Grade ${state.grade} • Medium Selection`}
      footer="You can switch study medium anytime from Profile settings."
      onBack={() => void navigate({ to: "/select-grade" })}
    >
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-page-enter">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sn-sage)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            <Languages className="h-4 w-4" />
            <span>
              {lang === "si"
                ? "පියවර 3 / 4 • අධ්‍යයන මාධ්‍යය"
                : lang === "ta"
                  ? "படி 3 / 4 • கற்கும் ஊடகம்"
                  : "Step 3 of 4 • Study Medium"}
            </span>
          </span>
          <span className="rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            Grade {state.grade}
            {state.grade >= 10 ? " (G.C.E. O/L)" : ""}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)] sm:text-3xl">
          {lang === "si"
            ? "ඔබේ පාසල් අධ්‍යයන මාධ්‍යය තෝරන්න"
            : lang === "ta"
              ? "உங்கள் பாடசாலை கற்கும் மொழி மூலத்தைத் தேர்ந்தெடுக்கவும்"
              : "Choose your classroom study medium"}
        </h1>
        <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
          All lessons include glossary terms so you can revise clearly before
          term tests and O/L exams.
        </p>

        <div
          role="radiogroup"
          aria-label="Study medium selector"
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
                    {m.nativeName}
                  </p>
                  <p className="text-xs font-semibold text-[var(--sn-primary)]">
                    {m.englishName}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--sn-text-muted)]">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-3 rounded-xl bg-white/80 px-2.5 py-1.5 text-[11px] font-semibold text-[var(--sn-text-secondary)]">
                  {m.sampleSubjects}
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
            <span>Or create student profile first</span>
          </Link>

          <button
            type="button"
            onClick={() => void navigate({ to: "/pick-subjects" })}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)] sm:w-auto"
          >
            <span>
              {lang === "si"
                ? "විෂයයන් තෝරන්න"
                : lang === "ta"
                  ? "பாடங்களைத் தேர்ந்தெடுக்கவும்"
                  : "Pick Subjects"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SipNenaOnboardingShell>
  );
}
