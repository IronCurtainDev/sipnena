import { Link } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";

export type LegalDocKind = "terms" | "privacy" | "refund";

const LEGAL_DOCS: Record<
  LegalDocKind,
  {
    title: string;
    updated: string;
    sections: Array<{ heading: string; body: string }>;
  }
> = {
  terms: {
    title: "Terms of Service",
    updated: "November 2026",
    sections: [
      {
        heading: "1. Student & Parent Accounts",
        body: "SipNena serves Sri Lankan Grade 6–11 students and their guardians. Free curriculum previews require no payment, while monthly Class Cards grant personal study access for one enrolled student.",
      },
      {
        heading: "2. Academic Integrity & NIE Materials",
        body: "Lesson tutes, short notes, and past paper marking schemes are provided for personal exam revision and classroom support. Redistribution for commercial resale is prohibited.",
      },
      {
        heading: "3. Bank Slip & LankaQR Verification",
        body: "Bank deposit activations are verified manually against bank references. Submitting altered or duplicate slips results in rejection and manual support review.",
      },
    ],
  },
  privacy: {
    title: "Child-Safe Privacy Policy",
    updated: "November 2026",
    sections: [
      {
        heading: "1. Zero Distracting Ads & Student Safety",
        body: "SipNena displays zero third-party ad networks or behavioral trackers to Grade 6–11 students. Student progress and quiz attempts are shared only with linked Parents/Guardians and verified teachers.",
      },
      {
        heading: "2. Minimal Data Collection",
        body: "We store your chosen grade, study medium (Sinhala, Tamil, English), subject baskets, and downloaded tute preferences to personalize your NIE study plan.",
      },
      {
        heading: "3. Parent Controls",
        body: "Parents may review weekly watch time, quiz history, and attendance in the Parent Dashboard or request account removal via WhatsApp support.",
      },
    ],
  },
  refund: {
    title: "Refund & Class Card Policy",
    updated: "November 2026",
    sections: [
      {
        heading: "1. 7-Day Class Card Satisfaction Guarantee",
        body: "If a parent or student purchases the wrong grade or medium Class Card, contact WhatsApp support within 7 days for an instant free switch or full refund.",
      },
      {
        heading: "2. Duplicate Bank Deposit Refunds",
        body: "Accidental double bank deposits or overpayments are refunded to the original BOC, Commercial Bank, or Sampath account within 3 working days upon slip verification.",
      },
      {
        heading: "3. No Surprise Auto-Deductions",
        body: "Monthly Class Cards never auto-charge your bank card without explicit parent confirmation.",
      },
    ],
  },
};

export function LegalDocumentScreen({ kind }: { kind: LegalDocKind }) {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const doc = LEGAL_DOCS[kind];

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
          ← Help &amp; FAQ
        </Link>
        <Link
          to="/terms"
          className={`rounded-xl px-3.5 py-2 text-xs font-bold ${
            kind === "terms"
              ? "bg-[var(--sn-primary)] text-white"
              : "bg-white text-[var(--sn-text-secondary)]"
          }`}
        >
          Terms
        </Link>
        <Link
          to="/privacy"
          className={`rounded-xl px-3.5 py-2 text-xs font-bold ${
            kind === "privacy"
              ? "bg-[var(--sn-primary)] text-white"
              : "bg-white text-[var(--sn-text-secondary)]"
          }`}
        >
          Privacy
        </Link>
        <Link
          to="/refund-policy"
          className={`rounded-xl px-3.5 py-2 text-xs font-bold ${
            kind === "refund"
              ? "bg-[var(--sn-primary)] text-white"
              : "bg-white text-[var(--sn-text-secondary)]"
          }`}
        >
          Refund Policy
        </Link>
      </div>

      <article className="rounded-3xl border border-[var(--sn-border)] bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Sri Lanka General Education Platform</span>
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-[var(--sn-text-main)]">
              {doc.title}
            </h2>
          </div>
          <span className="text-xs font-semibold text-[var(--sn-text-muted)]">
            Last updated: {doc.updated}
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
            onClick={() =>
              showToast("Opening WhatsApp Support (+94 77 123 4567)...")
            }
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Questions? Chat on WhatsApp</span>
          </button>
        </div>
      </article>
    </SipNenaPortalShell>
  );
}
