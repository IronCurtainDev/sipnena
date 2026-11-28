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
import { NOTIF_COPY, NOTIFICATIONS, type NotifCategory } from "./strings";

export function NotificationsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = NOTIF_COPY[lang];
  const [category, setCategory] = useState<NotifCategory>("all");

  const filtered = NOTIFICATIONS.filter((n) =>
    category === "all" ? true : n.category === category,
  );

  const markAllRead = () => {
    update((prev) => ({
      ...prev,
      readNotificationIds: NOTIFICATIONS.map((n) => n.id),
    }));
    showToast(copy.markedToast);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      toastMessage={toast}
    >
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "all", label: copy.catAll },
              { id: "live", label: copy.catLive },
              { id: "payment", label: copy.catPayment },
              { id: "doubt", label: copy.catDoubt },
              { id: "exam", label: copy.catExam },
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
          <span>{copy.markAllBtn}</span>
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
                      {n.localizedTitle[lang]}
                    </h3>
                    {!isRead && (
                      <span className="h-2 w-2 rounded-full bg-rose-600" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-secondary)]">
                    {n.localizedBody[lang]}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[var(--sn-text-muted)]">
                    <Bell className="h-3 w-3" /> {n.localizedTime[lang]}
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
