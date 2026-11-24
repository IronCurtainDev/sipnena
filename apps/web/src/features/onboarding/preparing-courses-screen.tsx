import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { PREPARING_STEPS } from "./preparing-data";
import { PreparingCardSidebar } from "./preparing-card-sidebar";

interface Props {
  selectedLang?: AppLanguage;
  targetRoute?: string;
  onComplete?: () => void;
}

function getInitialChosenSubjects(): string[] {
  try {
    const stored = localStorage.getItem("sipnena_chosen_subjects");
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return ["maths", "science", "ict"];
}

export function PreparingCoursesLoadingScreen({
  selectedLang: propLang,
  targetRoute = "/home",
  onComplete,
}: Props) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(propLang || getSavedLanguage);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(12);
  const [isReady, setIsReady] = useState(false);
  const [chosenSubjectIds] = useState<string[]>(getInitialChosenSubjects);

  useEffect(() => {
    // A realistic 9-second pacing across all 4 stages:
    // Step 0: 0s - 2.5s (progress 25%)
    // Step 1: 2.5s - 5.2s (progress 50%)
    // Step 2: 5.2s - 7.6s (progress 75%)
    // Step 3: 7.6s - 9.0s (progress 100% -> ready state)
    const intervals = [2500, 2700, 2400, 1400];
    let totalElapsed = 0;

    const timers = intervals.map((duration, index) => {
      totalElapsed += duration;
      return setTimeout(() => {
        setCurrentStep(index);
        setProgress(Math.min(25 * (index + 1), 100));

        if (index === intervals.length - 1) {
          setIsReady(true);
        }
      }, totalElapsed);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleFinish = () => {
    if (onComplete) {
      onComplete();
    } else {
      void navigate({ to: targetRoute });
    }
  };

  const progressBucket =
    progress >= 100 ? 100 : progress >= 75 ? 75 : progress >= 50 ? 50 : 25;

  return (
    <div className="sipnena-onboarding min-h-screen flex flex-col justify-between bg-[var(--sn-auth-bg)]">
      {/* Header */}
      <header className="w-full bg-white/95 backdrop-blur border-b border-[var(--sn-border)] px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-[var(--sn-primary)] shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight block">
              SipNena
            </span>
            <span className="text-[11px] text-slate-500 font-medium hidden min-[480px]:block">
              {lang === "si"
                ? "පාසල් ඉගෙනුම් ඇප් එක"
                : lang === "ta"
                  ? "பள்ளி கல்விச் செயலி"
                  : "School Learning App"}
            </span>
          </div>
        </div>

        <CompactLanguageSwitcher
          selectedLang={lang}
          onLanguageChange={(newLang) => {
            setLang(newLang);
            saveLanguage(newLang);
          }}
          size="sm"
        />
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8 animate-page-enter">
          <PreparingCardSidebar
            lang={lang}
            chosenSubjectIds={chosenSubjectIds}
          />

          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {isReady
                      ? lang === "si"
                        ? "සියල්ල සූදානම්!"
                        : lang === "ta"
                          ? "எல்லாம் தயார்!"
                          : "Setup Complete!"
                      : lang === "si"
                        ? "ඔබ වෙනුවෙන්ම සූදානම් කෙරේ"
                        : lang === "ta"
                          ? "உங்களுக்காகத் தயாரிக்கப்படுகிறது"
                          : "Preparing your study space"}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {isReady
                    ? lang === "si"
                      ? "ඔබේ පාඩම් සැලැස්ම සූදානම්!"
                      : lang === "ta"
                        ? "உங்கள் கற்றல் திட்டம் தயார்!"
                        : "Your lessons are ready!"
                    : lang === "si"
                      ? "ඔබේ පාඩම් සූදානම් කරමින් පවතී..."
                      : lang === "ta"
                        ? "உங்கள் பாடங்கள் தயாராகின்றன..."
                        : "Getting your lessons ready..."}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isReady
                    ? lang === "si"
                      ? "කෙටි සටහන් සහ ප්‍රශ්න පත්‍ර සාර්ථකව සැකසිණි."
                      : lang === "ta"
                        ? "குறிப்புகள் மற்றும் வினாத்தாள்கள் தயாராக உள்ளன."
                        : "Short notes and practice exercises are ready."
                    : lang === "si"
                      ? "කරුණාකර තත්පර කිහිපයක් රැඳී සිටින්න..."
                      : lang === "ta"
                        ? "தயவுசெய்து சிறிது நேரம் காத்திருக்கவும்..."
                        : "Please wait a few seconds..."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div
                  className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-label="Preparation progress"
                >
                  <div
                    className="sn-progress bg-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                    data-progress={progressBucket}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>SipNena Learning Engine</span>
                  <span className="text-blue-600">{progress}%</span>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3 pt-2">
                {PREPARING_STEPS.map((step, idx) => {
                  const isDone = idx < currentStep || isReady;
                  const isCurrent = idx === currentStep && !isReady;
                  return (
                    <div
                      key={step.en}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                        isDone
                          ? "bg-emerald-50/70 text-emerald-900 border border-emerald-100"
                          : isCurrent
                            ? "bg-blue-50/70 text-blue-900 border border-blue-200"
                            : "text-slate-400 opacity-60"
                      }`}
                    >
                      {isDone ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      ) : isCurrent ? (
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          {idx + 1}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-xs sm:text-sm font-semibold leading-snug block">
                          {step[lang]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              {isReady ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm active:scale-[0.99] cursor-pointer animate-page-enter"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {lang === "si"
                      ? "පාඩම් ආරම්භ කරමු!"
                      : lang === "ta"
                        ? "கற்கத் தொடங்குவோம்!"
                        : "Start Learning Now!"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>
                    {lang === "si"
                      ? "කෙටි සටහන් සහ අභ්‍යාස ගොනු සූදානම් වෙමින් පවතී..."
                      : lang === "ta"
                        ? "சுருக்கக் குறிப்புகள் தயாராகின்றன..."
                        : "Finalizing short notes & exercises..."}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500">
        {lang === "si"
          ? "ශ්‍රී ලාංකික පාසල් සිසුන් වෙනුවෙන්මයි (6–11 ශ්‍රේණි) • සරල සහ නිදහස් ඉගෙනුම"
          : lang === "ta"
            ? "இலங்கை பாடசாலை மாணவர்களுக்காக (தரம் 6–11) • எளிதாகவும் கவனமாகவும் கற்க"
            : "Made for Sri Lankan School Students (Grades 6–11) • Easy & Focused Learning"}
      </footer>
    </div>
  );
}
