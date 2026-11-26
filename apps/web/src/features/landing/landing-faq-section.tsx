import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { LANDING_FAQS } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingFaqSectionProps {
  lang: AppLanguage;
  t: LandingStrings;
}

export function LandingFaqSection({ lang, t }: LandingFaqSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>(["faq-1"]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const getQuestion = (faq: (typeof LANDING_FAQS)[0]) => {
    if (lang === "si") return faq.questionSi;
    if (lang === "ta") return faq.questionTa;
    return faq.questionEn;
  };

  const getAnswer = (faq: (typeof LANDING_FAQS)[0]) => {
    if (lang === "si") return faq.answerSi;
    if (lang === "ta") return faq.answerTa;
    return faq.answerEn;
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
            {t.faqTitle}
          </h2>
          <p className="mt-1 text-xs text-[var(--sn-text-secondary)] sm:text-sm">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {LANDING_FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-2xs transition hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between p-4 text-left font-bold text-[var(--sn-text-main)] sm:p-5"
                >
                  <span className="text-sm sm:text-base">
                    {getQuestion(faq)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--sn-primary)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3.5 sm:px-5 sm:py-4">
                    <p className="text-xs leading-relaxed text-[var(--sn-text-secondary)] sm:text-sm">
                      {getAnswer(faq)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
