import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  CreditCard,
  Download,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  Languages,
} from "lucide-react";

const PROFILE_LINKS = [
  { to: "/select-grade", label: "Change Grade (6–11)", icon: GraduationCap },
  { to: "/select-medium", label: "Study Medium", icon: Languages },
  { to: "/billing", label: "Class Cards & Billing", icon: CreditCard },
  { to: "/payment-status", label: "Bank Slip Status", icon: FileCheck2 },
  { to: "/progress", label: "Progress & Mistake Bank", icon: BarChart3 },
  { to: "/quiz-history", label: "Quiz History", icon: BarChart3 },
  { to: "/downloads", label: "Downloads & Data Saver", icon: Download },
  { to: "/notifications", label: "Notifications Center", icon: Bell },
  { to: "/help", label: "Help, FAQ & Legal", icon: HelpCircle },
];

export function ProfileQuickLinks() {
  return (
    <section className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--sn-text-muted)]">
        Shortcuts &amp; Tools
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PROFILE_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-page-bg)]/60 px-3 py-2 text-xs font-bold text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--sn-primary)]" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-2.5 text-[11px] font-semibold text-[var(--sn-text-muted)]">
        <Link
          to="/terms"
          className="hover:text-[var(--sn-primary)] hover:underline"
        >
          Terms of Service
        </Link>
        <Link
          to="/privacy"
          className="hover:text-[var(--sn-primary)] hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          to="/refund-policy"
          className="hover:text-[var(--sn-primary)] hover:underline"
        >
          Refund Policy
        </Link>
      </div>
    </section>
  );
}
