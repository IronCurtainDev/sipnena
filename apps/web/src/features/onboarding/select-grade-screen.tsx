import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap, ShieldCheck } from "lucide-react";
import { SipNenaOnboardingShell } from "@/components/layout/sipnena-auth-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";

interface GradeCardInfo {
  grade: number;
  enSub: string;
  siSub: string;
  taSub: string;
  isOL: boolean;
}

const GRADES: GradeCardInfo[] = [
  {
    grade: 6,
    enSub: "Junior Secondary Start",
    siSub: "කනිෂ්ඨ ද්විතීයික ආරම්භය",
    taSub: "இளநிலை இரண்டாம் நிலை",
    isOL: false,
  },
  {
    grade: 7,
    enSub: "Core Foundations",
    siSub: "මූලික විෂය පදනම",
    taSub: "அடிப்படைப் பாடங்கள்",
    isOL: false,
  },
  {
    grade: 8,
    enSub: "Term Test & SBA Prep",
    siSub: "වාර විභාග සූදානම",
    taSub: "தவணைப் பரீட்சை பயிற்சி",
    isOL: false,
  },
  {
    grade: 9,
    enSub: "Pre-O/L Bridge Year",
    siSub: "සා/පෙළ පූර්ව වසර",
    taSub: "சாதாரண தர முன்னோடி",
    isOL: false,
  },
  {
    grade: 10,
    enSub: "G.C.E. O/L Part I Syllabus",
    siSub: "අ.පො.ස. සා/පෙළ (1 කොටස)",
    taSub: "க.பொ.த. சாதாரண தரம் I",
    isOL: true,
  },
  {
    grade: 11,
    enSub: "G.C.E. O/L Exam Year",
    siSub: "අ.පො.ස. සා/පෙළ විභාග වසර",
    taSub: "க.பொ.த. சாதாரண தரம் II",
    isOL: true,
  },
];

export function SelectGradeScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setGrade } = usePrototypeState();

  const title =
    lang === "si"
      ? "ඔබ ඉගෙන ගන්නා ශ්‍රේණිය තෝරන්න"
      : lang === "ta"
        ? "நீங்கள் படிக்கும் தரத்தைத் தேர்ந்தெடுக்கவும்"
        : "Select your school grade";

  const subtitle =
    lang === "si"
      ? "ජාතික අධ්‍යාපන ආයතනයේ (NIE) විෂය නිර්දේශයට අනුව පාඩම් සැකසේ."
      : lang === "ta"
        ? "தேசிய கல்வி நிறுவக (NIE) பாடத்திட்டத்திற்கு ஏற்ப பாடங்கள் தயாராகும்."
        : "We tailor your lessons, tutes, and past papers to the NIE school syllabus.";

  return (
    <SipNenaOnboardingShell
      selectedLang={lang}
      onLanguageChange={setLang}
      langSwitcherAria="Change language"
      brandSubtitle="Sri Lankan School LMS"
      topBadge="NIE Curriculum • Grades 6–11"
      footer="Made for Sri Lankan School Students (Grades 6–11)"
      onBack={() => void navigate({ to: "/welcome-language" })}
    >
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-page-enter">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sn-sage)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            <GraduationCap className="h-4 w-4" />
            <span>
              {lang === "si"
                ? "පියවර 2 / 4 • ශ්‍රේණිය"
                : lang === "ta"
                  ? "படி 2 / 4 • தரம்"
                  : "Step 2 of 4 • School Grade"}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            <span>NIE 2026 Aligned</span>
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
          {subtitle}
        </p>

        <div
          role="radiogroup"
          aria-label="Grade selector"
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
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-900">
                      G.C.E. O/L
                    </span>
                  ) : active ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : null}
                </div>

                <div className="mt-3">
                  <p className="text-base font-extrabold text-[var(--sn-text-main)]">
                    {lang === "si"
                      ? `${item.grade} ශ්‍රේණිය`
                      : lang === "ta"
                        ? `தரம் ${item.grade}`
                        : `Grade ${item.grade}`}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                    {lang === "si"
                      ? item.siSub
                      : lang === "ta"
                        ? item.taSub
                        : item.enSub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row">
          <p className="text-xs font-medium text-[var(--sn-text-secondary)]">
            {state.grade >= 10
              ? "Grades 10–11 unlock Core + Basket 1, 2 & 3 O/L subjects."
              : "Includes Sinhala, Tamil, and English medium school units."}
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/select-medium" })}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)] sm:w-auto"
          >
            <span>
              {lang === "si"
                ? "මාධ්‍යය තෝරන්න"
                : lang === "ta"
                  ? "மொழி மூலத்தைத் தேர்ந்தெடுக்கவும்"
                  : "Continue to Medium"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SipNenaOnboardingShell>
  );
}
