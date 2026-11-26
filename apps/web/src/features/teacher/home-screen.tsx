import { Link } from "@tanstack/react-router";
import {
  Library,
  MessageCircleQuestion,
  Radio,
  Users,
} from "lucide-react";
import { DAY_LABELS } from "@/features/live-schedule/strings";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import { localizeDoubt } from "@/lib/prototype-i18n";
import { usePrototypeState } from "@/lib/prototype-state";
import { TEACHER_EXTRA_COPY } from "./schedule-strings";
import { TEACHER_COPY } from "./strings";

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function TeacherStudioHomeScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state } = usePrototypeState();
  const copy = TEACHER_COPY[lang];
  const extra = TEACHER_EXTRA_COPY[lang];
  const pendingDoubts = state.doubts.filter((d) => d.status === "pending");
  const tutorSessions = [...state.teacherLiveSessions].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.homeTitle}
      roleOverride="teacher"
    >
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#0B3B3C] p-6 text-white shadow-sm">
        <div>
          <span className="rounded-full bg-teal-400/20 px-3 py-1 text-[11px] font-extrabold text-teal-200">
            {extra.tutorBannerBadge}
          </span>
          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
            {extra.tutorTitleLine}
          </h2>
          <p className="mt-0.5 text-xs text-teal-100/85">
            {extra.tutorSubLine}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/teacher/courses"
            className="rounded-2xl bg-teal-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-teal-300"
          >
            {extra.quickUploadBtn}
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Users className="h-4 w-4 text-[#0B3B3C]" />
            <span>{copy.activeStudentsLabel}</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            418
          </p>
          <p className="mt-1 text-xs font-semibold text-teal-700">
            {copy.activeStudentsSub}
          </p>
        </div>

        <div className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <MessageCircleQuestion className="h-4 w-4 text-amber-600" />
            <span>{copy.pendingDoubtsLabel}</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            {pendingDoubts.length}
          </p>
          <Link
            to="/teacher/doubts"
            className="mt-1 inline-block text-xs font-bold text-[#0B3B3C] hover:underline"
          >
            {copy.replyQueueLink}
          </Link>
        </div>

        <div className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Library className="h-4 w-4 text-[#0B3B3C]" />
            <span>{copy.uploadedLessonsLabel}</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            {state.teacherCourses.length}
          </p>
          <Link
            to="/teacher/courses"
            className="mt-1 inline-block text-xs font-bold text-[#0B3B3C] hover:underline"
          >
            {copy.uploadLessonLink}
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
              <Radio className="h-4 w-4 text-[#0B3B3C]" />
              <span>{extra.upcomingClassesTitle}</span>
            </h3>
            <Link
              to="/teacher/schedule"
              className="text-xs font-bold text-[#0B3B3C] hover:underline"
            >
              {extra.manageScheduleLink}
            </Link>
          </div>
          <div className="mt-3 space-y-2.5">
            {tutorSessions.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/40 p-3 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-extrabold text-[var(--sn-primary)]">
                    {DAY_LABELS[slot.day][lang]} • {slot.time} •{" "}
                    {formatGrade(lang, slot.grade)}
                  </p>
                  <p className="truncate font-semibold text-[var(--sn-text-main)]">
                    {slot.topic}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--sn-surface)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                  {slot.channel}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[var(--sn-text-main)]">
              <MessageCircleQuestion className="h-4 w-4 text-amber-600" />
              <span>{extra.pendingInboxTitle}</span>
            </h3>
            <Link
              to="/teacher/doubts"
              className="text-xs font-bold text-[#0B3B3C] hover:underline"
            >
              {extra.viewAllDoubtsLink}
            </Link>
          </div>
          <div className="mt-3 space-y-2.5">
            {pendingDoubts.length === 0 ? (
              <p className="text-xs text-[var(--sn-text-muted)]">
                {extra.noPendingDoubts}
              </p>
            ) : (
              pendingDoubts.slice(0, 2).map((d) => {
                const text = localizeDoubt(d, lang);
                return (
                  <div
                    key={d.id}
                    className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-[var(--sn-text-main)]">
                        {d.studentName} • {formatSubject(lang, d.subject)}
                      </span>
                      <Link
                        to="/teacher/doubts"
                        className="rounded-lg bg-[#0B3B3C] px-2.5 py-1 text-[10px] font-bold text-white"
                      >
                        {extra.answerNowBtn}
                      </Link>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[var(--sn-text-secondary)]">
                      {text.question}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/teacher/courses"
          className="group rounded-3xl border border-teal-200 bg-white p-5 shadow-xs transition hover:border-[#0B3B3C]"
        >
          <Library className="h-6 w-6 text-[#0B3B3C]" />
          <h3 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
            {copy.modLessonsTitle}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
            {copy.modLessonsDesc}
          </p>
        </Link>

        <Link
          to="/teacher/doubts"
          className="group rounded-3xl border border-teal-200 bg-white p-5 shadow-xs transition hover:border-[#0B3B3C]"
        >
          <MessageCircleQuestion className="h-6 w-6 text-amber-700" />
          <h3 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
            {copy.modDoubtsTitle}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
            {copy.modDoubtsDesc}
          </p>
        </Link>
      </section>
    </SipNenaPortalShell>
  );
}
