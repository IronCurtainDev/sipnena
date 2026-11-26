import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";

const FAQS = [
  {
    q: "How do I pay by Bank Deposit and upload my bank slip?",
    a: "Go to Checkout (/checkout), open the 'Bank Deposit / Slip Upload' tab, copy our BOC, Commercial Bank, or Sampath Bank account number, make your transfer or CDM deposit, and drop your slip photo. Verification takes 15–30 minutes.",
  },
  {
    q: "How do I switch between Sinhala, Tamil, and English medium?",
    a: "Use the top language toggle (සි / த / En) anywhere in SipNena, or open /select-medium to update your classroom medium for videos, past papers, and NIE tutes.",
  },
  {
    q: "How do G.C.E. O/L Basket 1, 2, and 3 subjects work?",
    a: "When you choose Grade 10 or 11 in /select-grade, /pick-subjects automatically shows the 6 compulsory Core subjects plus 1 subject choice each from O/L Basket 1, Basket 2, and Basket 3.",
  },
  {
    q: "Can I watch lessons on low mobile data or offline?",
    a: "Yes! Open /downloads to select Low (240p) or Medium (480p) Data Saver video quality and save PDF tutes & NIE textbooks for offline study.",
  },
];

export function HelpAndSupportScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Help, Support & FAQ"
      toastMessage={toast}
    >
      {/* Prominent WhatsApp Support Banner */}
      <section className="flex flex-col justify-between gap-4 rounded-3xl bg-[var(--sn-primary)] p-6 text-[var(--sn-cream)] sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SipNena Student &amp; Parent Desk (8 AM – 9 PM)</span>
          </span>
          <h2 className="mt-2 text-xl font-extrabold">
            Need quick help with Bank Slips, Mediums, or Class Cards?
          </h2>
          <p className="mt-1 text-xs text-[var(--sn-cream)]/85">
            Message our trilingual Sri Lankan support desk on WhatsApp anytime.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            showToast("Opening WhatsApp Support (+94 77 123 4567)...")
          }
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-600"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp Support</span>
        </button>
      </section>

      {/* FAQ Accordion */}
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs space-y-3">
        <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
          <HelpCircle className="h-5 w-5 text-[var(--sn-primary)]" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="divide-y divide-slate-100">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="py-3">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-3 text-left text-sm font-extrabold text-[var(--sn-text-main)]"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs leading-relaxed text-[var(--sn-text-secondary)] sm:text-sm">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Legal Links */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          to="/terms"
          className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          Terms of Service →
        </Link>
        <Link
          to="/privacy"
          className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          Child-Safe Privacy Policy →
        </Link>
        <Link
          to="/refund-policy"
          className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          Refund &amp; Class Card Policy →
        </Link>
      </section>
    </SipNenaPortalShell>
  );
}
