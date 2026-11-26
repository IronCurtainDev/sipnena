import { GraduationCap, Lightbulb } from "lucide-react";
import type { QuizStrings } from "./strings";

interface QuizSidebarProps {
  t: QuizStrings;
}

export function QuizSidebar({ t }: QuizSidebarProps) {
  const topics = [
    { title: t.topic1Title, sub: t.topic1Sub },
    { title: t.topic2Title, sub: t.topic2Sub },
    { title: t.topic3Title, sub: t.topic3Sub },
    { title: t.topic4Title, sub: t.topic4Sub },
  ];

  return (
    <div className="space-y-6">
      {/* Study Desk Advice Card */}
      <div className="rounded-3xl border border-amber-200/90 bg-amber-50/50 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            ✍️
          </span>
          <span>{t.studyAdviceTitle}</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-bold text-amber-950 sm:text-base">
            {t.studyAdviceHeading}
          </h3>
          <p className="text-xs leading-relaxed text-amber-900/90 font-normal">
            {t.studyAdviceBody}
          </p>
        </div>

        {/* Teacher Quote */}
        <div className="rounded-2xl border border-amber-200/80 bg-white/95 p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.teacherRuleTitle}</span>
          </div>
          <p className="text-xs italic leading-relaxed text-slate-700">
            {t.teacherQuote}
          </p>
          <div className="text-[11px] font-bold text-slate-500 text-right">
            {t.teacherAuthor}
          </div>
        </div>
      </div>

      {/* Topics in this Checkpoint */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[var(--sn-primary)]" />
            <h3 className="text-sm font-bold text-slate-900">
              {t.topicsTitle}
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {t.subtopicsCount}
          </span>
        </div>

        <div className="space-y-3">
          {topics.map((topic, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sn-sage)] text-[10px] font-bold text-[var(--sn-primary)]">
                {i + 1}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-bold text-slate-900">
                  {topic.title}
                </div>
                <div className="truncate text-[11px] text-slate-500 font-medium">
                  {topic.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus Sync Footer */}
      <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/40 p-4 space-y-1">
        <div className="text-xs font-bold text-[var(--sn-text-main)]">
          {t.syllabusSyncTitle}
        </div>
        <p className="text-[11px] leading-relaxed text-slate-600">
          {t.syllabusSyncDesc}
        </p>
      </div>
    </div>
  );
}
