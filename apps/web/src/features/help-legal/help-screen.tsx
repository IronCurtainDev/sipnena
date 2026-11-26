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
import { HELP_COPY } from "./strings";

export function HelpAndSupportScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const copy = HELP_COPY[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      toastMessage={toast}
    >
      <section className="flex flex-col justify-between gap-4 rounded-3xl bg-[var(--sn-primary)] p-6 text-[var(--sn-cream)] sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{copy.deskBadge}</span>
          </span>
          <h2 className="mt-2 text-xl font-extrabold">{copy.heroHeading}</h2>
          <p className="mt-1 text-xs text-[var(--sn-cream)]/85">
            {copy.heroSub}
          </p>
        </div>
        <button
          type="button"
          onClick={() => showToast(copy.whatsappToast)}
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-600"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{copy.whatsappBtn}</span>
        </button>
      </section>

      <section className="space-y-3 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
          <HelpCircle className="h-5 w-5 text-[var(--sn-primary)]" />
          <span>{copy.faqHeading}</span>
        </h3>
        <div className="divide-y divide-slate-100">
          {copy.faqs.map((item, idx) => {
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

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          to="/terms"
          className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          {copy.termsLink}
        </Link>
        <Link
          to="/privacy"
          className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          {copy.privacyLink}
        </Link>
        <Link
          to="/refund-policy"
          className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          {copy.refundLink}
        </Link>
      </section>
    </SipNenaPortalShell>
  );
}
