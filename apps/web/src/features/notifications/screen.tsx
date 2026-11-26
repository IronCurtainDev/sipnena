import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  CalendarClock,
  CheckCheck,
  CheckCircle2,
  MessageSquareReply,
  Radio,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";

type NotifCategory = "all" | "live" | "payment" | "doubt" | "exam";

interface NotificationItem {
  id: string;
  category: Exclude<NotifCategory, "all">;
  title: string;
  body: string;
  time: string;
  to: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    category: "live",
    title: "Live Science Class Starting in 15 mins",
    body: "Ms. Menaka Jayawardena is starting Mirrors & Ray Diagrams Lab on Zoom Live.",
    time: "5 mins ago",
    to: "/live",
  },
  {
    id: "notif-2",
    category: "payment",
    title: "Bank Slip Verification Update",
    body: "Sampath Bank slip SAMP-2026-11904 was approved. Term 2 Mathematics is unlocked.",
    time: "1 hour ago",
    to: "/payment-status",
  },
  {
    id: "notif-3",
    category: "doubt",
    title: "Verified Teacher Replied to Your Doubt",
    body: "Ms. Menaka replied to your question on Concave Mirror focal length image formation.",
    time: "2 hours ago",
    to: "/doubts",
  },
  {
    id: "notif-4",
    category: "exam",
    title: "Term 2 Western Province Test Countdown",
    body: "9 days remaining — try the Visakha & Royal Term 2 Science model packs.",
    time: "Yesterday",
    to: "/term-tests",
  },
  {
    id: "notif-5",
    category: "exam",
    title: "G.C.E. O/L 2024 Past Paper Added",
    body: "Auto-graded MCQ sheet and Part II marking scheme are now available.",
    time: "2 days ago",
    to: "/past-papers",
  },
  {
    id: "notif-6",
    category: "payment",
    title: "Monthly Class Card Renewal Reminder",
    body: "Term 2 Mathematics + Past Paper bundle renews on 02 Dec 2026.",
    time: "3 days ago",
    to: "/billing",
  },
];

export function NotificationsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const [category, setCategory] = useState<NotifCategory>("all");

  const filtered = NOTIFICATIONS.filter((n) =>
    category === "all" ? true : n.category === category,
  );

  const markAllRead = () => {
    update((prev) => ({
      ...prev,
      readNotificationIds: NOTIFICATIONS.map((n) => n.id),
    }));
    showToast("All notifications marked as read");
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Notifications Center"
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "all", label: "All" },
              { id: "live", label: "Live Classes" },
              { id: "payment", label: "Bank Slips" },
              { id: "doubt", label: "Doubt Replies" },
              { id: "exam", label: "Exam Countdowns" },
            ] as const
          ).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
                category === c.id
                  ? "bg-[var(--sn-primary)] text-white"
                  : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-4 py-2 text-xs font-bold text-[var(--sn-primary)]"
        >
          <CheckCheck className="h-4 w-4" />
          <span>Mark all as read</span>
        </button>
      </section>

      <div className="space-y-3">
        {filtered.map((n) => {
          const isRead = state.readNotificationIds.includes(n.id);
          const Icon =
            n.category === "live"
              ? Radio
              : n.category === "payment"
                ? CheckCircle2
                : n.category === "doubt"
                  ? MessageSquareReply
                  : CalendarClock;

          return (
            <Link
              key={n.id}
              to={n.to}
              onClick={() =>
                !isRead &&
                update((prev) => ({
                  ...prev,
                  readNotificationIds: [...prev.readNotificationIds, n.id],
                }))
              }
              className={`flex items-start justify-between gap-3 rounded-3xl border p-4 shadow-xs transition ${
                isRead
                  ? "border-[var(--sn-border)] bg-white"
                  : "border-[var(--sn-primary)] bg-[var(--sn-olive)]/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-surface)] text-[var(--sn-primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-[var(--sn-text-main)]">
                      {n.title}
                    </h3>
                    {!isRead && (
                      <span className="h-2 w-2 rounded-full bg-rose-600" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-secondary)]">
                    {n.body}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[var(--sn-text-muted)]">
                    <Bell className="h-3 w-3" /> {n.time}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SipNenaPortalShell>
  );
}
