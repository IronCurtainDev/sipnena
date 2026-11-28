import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpenCheck,
  Calendar,
  CalendarClock,
  Clock,
  CreditCard,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { WEEKLY_TIMETABLE } from "@/features/live-schedule/mock-data";
import { DAY_LABELS } from "@/features/live-schedule/strings";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { ProgressBar } from "@/features/portal-shell/progress-bar";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import {
  formatGrade,
  formatGradeShort,
  formatSubject,
} from "@/lib/i18n-common";
import { usePrototypeState } from "@/lib/prototype-state";
import { PARENT_CHILDREN } from "./mock-data";
import { PARENT_COPY } from "./strings";

export function ParentDashboardScreen() {
  const { studentId } = useParams({ strict: false });
  const navigate = useNavigate();
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const copy = PARENT_COPY[lang];

  const selectedId = studentId ?? state.activeChildId;
  const child =
    PARENT_CHILDREN.find((c) => c.id === selectedId) ?? PARENT_CHILDREN[0]!;

  const handleSelectChild = (childId: string) => {
    update((prev) => ({ ...prev, activeChildId: childId }));
    void navigate({
      to: "/parent/child/$studentId",
      params: { studentId: childId },
    });
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      roleOverride="parent"
    >
      <section className="rounded-3xl bg-[#0F2744] p-5 text-white shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-extrabold text-sky-200">
              {copy.guardianBadge}
            </span>
            <h2 className="mt-2 text-lg font-extrabold sm:text-xl">
              {copy.guardianGreeting}
            </h2>
            <p className="mt-0.5 text-xs text-sky-100/85">{copy.guardianSub}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PARENT_CHILDREN.map((c) => {
              const active = c.id === child.id;
              const firstName = c.localizedName[lang].split(" ")[0] ?? c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectChild(c.id)}
                  className={`rounded-2xl px-4 py-2 text-xs font-extrabold transition ${
                    active
                      ? "bg-sky-400 text-slate-950 shadow-xs"
                      : "border border-sky-300/35 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {firstName} ({formatGradeShort(lang, c.grade)})
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-xs">
          <span className="font-extrabold">
            {child.localizedName[lang]} • {formatGrade(lang, child.grade)}
            {child.grade >= 10 ? copy.olBadge : ""}
          </span>
          <span className="text-sky-100">
            {child.localizedSchool[lang]} • {child.localizedMedium[lang]}
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Clock className="h-4 w-4 text-[#0F2744]" />
            <span>{copy.weeklyWatchTime}</span>
          </div>
          <p className="mt-2 text-2xl font-black text-[var(--sn-text-main)]">
            {child.localizedWatchTime[lang]}
          </p>
          <p className="mt-1 text-xs font-semibold text-sky-700">
            {copy.vsLastWeek}
          </p>
        </div>

        <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <BookOpenCheck className="h-4 w-4 text-[#0F2744]" />
            <span>{copy.lessonsCompleted}</span>
          </div>
          <p className="mt-2 text-2xl font-black text-[var(--sn-text-main)]">
            {child.lessonsCompletedWeek} {copy.lessonsWord}
          </p>
          <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
            {copy.acrossTerm2}
          </p>
        </div>

        <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <UserCheck className="h-4 w-4 text-[#0F2744]" />
            <span>{copy.liveAttendance}</span>
          </div>
          <p className="mt-2 text-2xl font-black text-[var(--sn-text-main)]">
            {child.liveAttendancePct}%
          </p>
          <div className="mt-2">
            <ProgressBar
              value={child.liveAttendancePct}
              label={copy.liveAttendance}
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <section className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xs lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
              <TrendingUp className="h-4 w-4 text-[#0F2744]" />
              <span>{copy.recentQuizScores}</span>
            </h3>
            <Link
              to="/billing"
              className="text-xs font-bold text-[#0F2744] hover:underline"
            >
              {copy.activeClassCardHeading} →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {child.recentQuizzes.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-100 bg-sky-50/40 p-3.5"
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-extrabold text-[var(--sn-text-main)]">
                    {formatSubject(lang, q.subject)}: {q.localizedTitle[lang]}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-extrabold text-emerald-800">
                    {q.scorePct}%
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar
                    value={q.scorePct}
                    label={q.localizedTitle[lang]}
                  />
                </div>
                <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
                  {copy.completedPrefix} {q.localizedDate[lang]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xs">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
              <CalendarClock className="h-4 w-4 text-amber-600" />
              <span>{copy.examAlertsHeading}</span>
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
                      {alert.localizedTitle[lang]}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-amber-900">
                    {alert.localizedDateLabel[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-[var(--sn-text-main)]">
                <Calendar className="h-4 w-4 text-[#0F2744]" />
                <span>{copy.timetableHeading}</span>
              </h3>
              <Link
                to="/schedule"
                className="text-xs font-bold text-[#0F2744] hover:underline"
              >
                {copy.fullTimetableLink}
              </Link>
            </div>
            <div className="mt-2.5 space-y-2 text-xs">
              {WEEKLY_TIMETABLE.slice(0, 2).map((slot) => (
                <div
                  key={slot.id}
                  className="flex justify-between gap-2 rounded-xl bg-sky-50/70 px-3 py-2"
                >
                  <span className="font-bold text-[#0F2744]">
                    {DAY_LABELS[slot.day][lang]} • {slot.time}
                  </span>
                  <span className="truncate text-[var(--sn-text-secondary)]">
                    {formatSubject(lang, slot.subject)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#0F2744] p-5 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
              {copy.activeClassCardHeading}
            </p>
            <h3 className="mt-1 text-base font-extrabold">
              {child.localizedCardTitle[lang]}
            </h3>
            <p className="mt-1 text-xs text-sky-100/85">
              {copy.validUntilPrefix} {child.localizedRenewalDate[lang]} •{" "}
              {copy.supportedPaymentSuffix}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/checkout"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-sky-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-sky-300"
              >
                <CreditCard className="h-4 w-4" />
                <span>{copy.renewCardBtn}</span>
              </Link>
              <Link
                to="/payment-status"
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-3.5 py-2.5 text-xs font-bold text-white"
              >
                {copy.slipStatusBtn}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </SipNenaPortalShell>
  );
}
