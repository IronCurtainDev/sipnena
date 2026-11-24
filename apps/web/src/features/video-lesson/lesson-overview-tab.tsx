import { Lightbulb, PenTool, User } from "lucide-react";
import type { VideoLessonStrings } from "./strings";

interface LessonOverviewTabProps {
  t: VideoLessonStrings;
}

export function LessonOverviewTab({ t }: LessonOverviewTabProps) {
  const rules = [
    {
      num: 1,
      title: t.rule1Title,
      desc: t.rule1Desc,
    },
    {
      num: 2,
      title: t.rule2Title,
      desc: t.rule2Desc,
    },
    {
      num: 3,
      title: t.rule3Title,
      desc: t.rule3Desc,
    },
    {
      num: 4,
      title: t.rule4Title,
      desc: t.rule4Desc,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Amber Core Rule Callout Card */}
      <section
        aria-label="Formula summary"
        className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 sm:p-6"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Lightbulb className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="text-sm font-bold text-amber-950 sm:text-base">
              {t.ruleCardTitle}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
              {t.ruleCardBody}
            </p>
            <div className="rounded-xl border border-amber-200 bg-white/90 px-4 py-2.5 font-mono text-xs sm:text-sm font-bold tracking-wide text-amber-950 shadow-xs inline-block">
              {t.formulaBox}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Essential Ray Tracing Rules */}
      <section aria-labelledby="ray-rules-heading" className="space-y-3.5">
        <div className="flex items-center gap-2">
          <PenTool className="h-4 w-4 text-blue-600" aria-hidden="true" />
          <h3
            id="ray-rules-heading"
            className="text-sm font-bold text-slate-900 sm:text-base"
          >
            {t.essentialRulesHeading}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {rules.map((rule) => (
            <div
              key={rule.num}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs space-y-2"
            >
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                <span>{rule.title}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Educator Note Card */}
      <section
        aria-label="Teacher note"
        className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-5"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shadow-xs">
            <User className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-950 sm:text-sm">
              {t.educatorHeading}
            </h4>
            <p className="text-xs leading-relaxed text-blue-900/90 italic">
              {t.educatorQuote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

