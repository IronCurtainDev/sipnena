import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { PAST_PAPERS_COPY } from "./strings";

export function PastPaperNotFound() {
  const [lang, setLang] = useSipNenaLanguage();
  const copy = PAST_PAPERS_COPY[lang];
  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      roleOverride="student"
    >
      <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
        <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
          {copy.notFoundTitle}
        </h2>
        <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
          {copy.notFoundText}
        </p>
        <Link
          to="/past-papers"
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.backLink}
        </Link>
      </div>
    </SipNenaPortalShell>
  );
}
