import { Link } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { LEGAL_DOCS_TRANSLATED, type LegalDocKind } from "./legal-strings";
import { HELP_COPY } from "./strings";

export type { LegalDocKind } from "./legal-strings";

export function LegalDocumentScreen({ kind }: { kind: LegalDocKind }) {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const copy = HELP_COPY[lang];
  const doc = LEGAL_DOCS_TRANSLATED[kind][lang];

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={doc.title}
      toastMessage={toast}
    >
      <div className="flex flex-wrap gap-2">
        <Link
          to="/help"
          className="rounded-xl border border-[var(--sn-border)] bg-white px-3.5 py-2 text-xs font-bold text-[var(--sn-primary)]"
        >
          {copy.backHelpBtn}
        </Link>
        <Link
          to="/terms"
          className={`rounded-xl px-3.5 py-2 text-xs font-bold ${
            kind === "terms"
              ? "bg-[var(--sn-primary)] text-white"
              : "bg-white text-[var(--sn-text-secondary)]"
          }`}
        >
          {copy.tabTerms}
        </Link>
        <Link
          to="/privacy"
          className={`rounded-xl px-3.5 py-2 text-xs font-bold ${
            kind === "privacy"
              ? "bg-[var(--sn-primary)] text-white"
              : "bg-white text-[var(--sn-text-secondary)]"
          }`}
        >
          {copy.tabPrivacy}
        </Link>
        <Link
          to="/refund-policy"
          className={`rounded-xl px-3.5 py-2 text-xs font-bold ${
            kind === "refund"
              ? "bg-[var(--sn-primary)] text-white"
              : "bg-white text-[var(--sn-text-secondary)]"
          }`}
        >
          {copy.tabRefund}
        </Link>
      </div>

      <article className="space-y-5 rounded-3xl border border-[var(--sn-border)] bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{copy.platformBadge}</span>
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-[var(--sn-text-main)]">
              {doc.title}
            </h2>
          </div>
          <span className="text-xs font-semibold text-[var(--sn-text-muted)]">
            {copy.lastUpdatedPrefix} {doc.updated}
          </span>
        </div>

        <div className="space-y-4">
          {doc.sections.map((sec) => (
            <section key={sec.heading} className="space-y-1.5">
              <h3 className="text-sm font-extrabold text-[var(--sn-text-main)]">
                {sec.heading}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--sn-text-secondary)] sm:text-sm">
                {sec.body}
              </p>
            </section>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => showToast(copy.whatsappToast)}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{copy.chatWhatsappBtn}</span>
          </button>
        </div>
      </article>
    </SipNenaPortalShell>
  );
}
