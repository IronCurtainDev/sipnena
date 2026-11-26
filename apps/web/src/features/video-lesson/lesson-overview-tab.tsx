import type { VideoLessonStrings } from "./strings";

interface LessonOverviewTabProps {
  t: VideoLessonStrings;
}

export function LessonOverviewTab({ t }: LessonOverviewTabProps) {
  const rules = [
    { title: t.rule1Title, desc: t.rule1Desc },
    { title: t.rule2Title, desc: t.rule2Desc },
    { title: t.rule3Title, desc: t.rule3Desc },
    { title: t.rule4Title, desc: t.rule4Desc },
  ];

  return (
    <div className="space-y-6">
      <section
        aria-label="Formula summary"
        className="space-y-2 border-t border-[var(--sn-border)] pt-4"
      >
        <h3 className="text-base font-bold text-[var(--sn-text-main)]">
          {t.ruleCardTitle}
        </h3>
        <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
          {t.ruleCardBody}
        </p>
        <p className="rounded-xl bg-[var(--sn-olive)] px-4 py-3 text-sm font-bold leading-snug text-[var(--sn-text-main)]">
          {t.formulaBox}
        </p>
      </section>

      <section aria-labelledby="ray-rules-heading" className="space-y-3">
        <h3
          id="ray-rules-heading"
          className="text-base font-bold text-[var(--sn-text-main)]"
        >
          {t.essentialRulesHeading}
        </h3>
        <ol className="space-y-3">
          {rules.map((rule, index) => (
            <li
              key={rule.title}
              className="border-t border-[var(--sn-border)] pt-3 first:border-t-0 first:pt-0"
            >
              <p className="text-sm font-bold text-[var(--sn-primary)]">
                {index + 1}. {rule.title}
              </p>
              <p className="mt-1 text-base leading-relaxed text-[var(--sn-text-secondary)]">
                {rule.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-label="Teacher note"
        className="space-y-2 rounded-2xl bg-[var(--sn-olive)]/50 p-5"
      >
        <h4 className="text-base font-bold text-[var(--sn-text-main)]">
          {t.educatorHeading}
        </h4>
        <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
          {t.educatorQuote}
        </p>
        <a
          href="https://wa.me/94771234567"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[48px] items-center rounded-2xl bg-[var(--sn-primary)] px-4 text-sm font-bold leading-snug text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)]"
        >
          {t.askTeacherWhatsApp}
        </a>
      </section>
    </div>
  );
}
