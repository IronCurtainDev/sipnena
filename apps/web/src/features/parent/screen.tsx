import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpenCheck,
  CalendarClock,
  Clock,
  CreditCard,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { ProgressBar } from "@/features/portal-shell/progress-bar";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";
import { PARENT_CHILDREN } from "./mock-data";

export function ParentDashboardScreen() {
  const { studentId } = useParams({ strict: false });
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();

  const selectedId = studentId ?? state.activeChildId;
  const child =
    PARENT_CHILDREN.find((c) => c.id === selectedId) ?? PARENT_CHILDREN[0]!;

  const handleSelectChild = (studentId: string) => {
    update((prev) => ({ ...prev, activeChildId: studentId }));
    void navigate({ to: "/parent/child/$studentId", params: { studentId } });
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Parent / Guardian Dashboard"
      roleOverride="parent"
    >
      {/* Multi-child Switcher */}
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--sn-text-muted)]">
              Switch Child Profile (Grades 6–11)
            </p>
            <h2 className="mt-0.5 text-lg font-extrabold text-[var(--sn-text-main)]">
              {child.name} • Grade {child.grade}
              {child.grade >= 10 ? " (G.C.E. O/L)" : ""}
            </h2>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {child.school} • {child.medium}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PARENT_CHILDREN.map((c) => {
              const active = c.id === child.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectChild(c.id)}
                  className={`rounded-2xl px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-[var(--sn-primary)] text-white shadow-xs"
                      : "border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
                  }`}
                >
                  {c.name.split(" ")[0]} (G{c.grade})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Study Summary Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Clock className="h-4 w-4 text-[var(--sn-primary)]" />
            <span>Weekly Watch Time</span>
          </div>
          <p className="mt-2 text-2xl font-black text-[var(--sn-text-main)]">
            {child.watchTimeWeek}
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-700">
            +18% vs last week
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <BookOpenCheck className="h-4 w-4 text-[var(--sn-primary)]" />
            <span>Lessons Completed</span>
          </div>
          <p className="mt-2 text-2xl font-black text-[var(--sn-text-main)]">
            {child.lessonsCompletedWeek} lessons
          </p>
          <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
            Across Term 2 school units
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <UserCheck className="h-4 w-4 text-[var(--sn-primary)]" />
            <span>Live Class Attendance</span>
          </div>
          <p className="mt-2 text-2xl font-black text-[var(--sn-text-main)]">
            {child.liveAttendancePct}%
          </p>
          <div className="mt-2">
            <ProgressBar
              value={child.liveAttendancePct}
              label="Live class attendance"
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Recent Quiz Scores */}
        <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
              <TrendingUp className="h-4 w-4 text-[var(--sn-primary)]" />
              <span>Recent Quiz &amp; Past Paper Scores</span>
            </h3>
            <Link
              to="/progress"
              className="text-xs font-bold text-[var(--sn-primary)] hover:underline"
            >
              Full Analytics →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {child.recentQuizzes.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-100 bg-[var(--sn-page-bg)]/50 p-3.5"
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-extrabold text-[var(--sn-text-main)]">
                    {q.subject}: {q.title}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-extrabold text-emerald-800">
                    {q.scorePct}%
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={q.scorePct} label={q.title} />
                </div>
                <p className="mt-1 text-[11px] text-[var(--sn-text-muted)]">
                  Completed {q.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Alerts & Renew Class Card */}
        <aside className="space-y-4 lg:col-span-5">
          <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
              <CalendarClock className="h-4 w-4 text-amber-600" />
              <span>Upcoming Exam &amp; Term Test Alerts</span>
            </h3>
            <div className="mt-3 space-y-2.5">
              {child.examAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start justify-between gap-2 rounded-2xl border p-3 text-xs ${
                    alert.urgency === "high"
                      ? "border-amber-200 bg-amber-50/80"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    <span className="font-bold text-[var(--sn-text-main)]">
                      {alert.title}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[11px] font-extrabold text-amber-900">
                    {alert.dateLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--sn-primary)] p-5 text-[var(--sn-cream)] shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Active Class Card
            </p>
            <h3 className="mt-1 text-base font-extrabold">
              {child.activeCardTitle}
            </h3>
            <p className="mt-1 text-xs text-[var(--sn-cream)]/85">
              Valid until {child.cardRenewalDate} • Bank Slip &amp; LankaQR
              supported
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/checkout"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[var(--sn-cream)] px-4 py-2.5 text-xs font-extrabold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
              >
                <CreditCard className="h-4 w-4" />
                <span>Renew Class Card</span>
              </Link>
              <Link
                to="/payment-status"
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-3.5 py-2.5 text-xs font-bold text-white"
              >
                Slip Status
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </SipNenaPortalShell>
  );
}
