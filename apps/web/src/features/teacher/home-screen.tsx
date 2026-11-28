import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ClipboardList,
  Library,
  MessageCircleQuestion,
  Radio,
  Users,
} from "lucide-react";
import {
  getStudentLastActiveAt,
  getStudentQuizAttempts,
  useCoursesStore,
} from "@/data/courses";
import { DAY_LABELS } from "@/features/live-schedule/strings";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import { localizeDoubt } from "@/lib/prototype-i18n";
import { usePrototypeState } from "@/lib/prototype-state";
import {
  TeacherHomeHero,
  TeacherHomeNoAccountBanner,
} from "./home-hero";
import { TEACHER_EXTRA_COPY } from "./schedule-strings";
import { TEACHER_COPY } from "./strings";

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function TeacherStudioHomeScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state } = usePrototypeState();
  const { store } = useCoursesStore();
  const copy = TEACHER_COPY[lang];
  const extra = TEACHER_EXTRA_COPY[lang];
  const [nowMs] = useState(() => Date.now());
  const pendingDoubts = state.doubts.filter((d) => d.status === "pending");
  const atRiskStudents = store.students.filter((stu) => {
    const attempts = getStudentQuizAttempts(store, stu.id);
    const avg =
      attempts.length > 0
        ? attempts.reduce((a, b) => a + b.score / Math.max(1, b.total), 0) /
          attempts.length
        : 1;
    const latest = getStudentLastActiveAt(store, stu.id);
    const inactiveDays = latest
      ? Math.floor((nowMs - new Date(latest).getTime()) / 86400000)
      : 99;
    return inactiveDays >= 7 || avg < 0.5;
  });
  const tutorSessions = [...state.teacherLiveSessions].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });

  const activeTeacher = store.teachers.find(
    (t) => t.id === store.activeTeacherId && t.status === "active",
  );

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.homeTitle}
      roleOverride="teacher"
    >
      {!activeTeacher ? <TeacherHomeNoAccountBanner /> : null}

      <TeacherHomeHero
        activeTeacher={activeTeacher}
        tutorBannerBadge={extra.tutorBannerBadge}
        tutorTitleLine={extra.tutorTitleLine}
        tutorSubLine={extra.tutorSubLine}
        quickUploadBtn={extra.quickUploadBtn}
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          to="/teacher/students"
          className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs transition hover:border-[#0B3B3C]"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Users className="h-4 w-4 text-[#0B3B3C]" />
            <span>{copy.activeStudentsLabel}</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            {store.students.length}
          </p>
          <p className="mt-1 text-xs font-semibold text-teal-700">
            {copy.activeStudentsSub}
          </p>
        </Link>

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
            {store.courses.length}
          </p>
          <Link
            to="/teacher/courses"
            className="mt-1 inline-block text-xs font-bold text-[#0B3B3C] hover:underline"
          >
            {copy.uploadLessonLink}
          </Link>
        </div>
      </section>

      {atRiskStudents.length > 0 ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-extrabold text-amber-950">
              {lang === "si"
                ? `උදව් අවශ්‍ය සිසුන් (${atRiskStudents.length})`
                : lang === "ta"
                  ? `உதவி தேவைப்படும் மாணவர்கள் (${atRiskStudents.length})`
                  : `Needs help (${atRiskStudents.length})`}
            </h3>
            <Link
              to="/teacher/students"
              className="text-xs font-bold text-[#0B3B3C] hover:underline"
            >
              {lang === "si"
                ? "සියලු සිසුන් බලන්න"
                : lang === "ta"
                  ? "அனைத்து மாணவர்களையும் காண்க"
                  : "View students"}
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {atRiskStudents.map((stu) => (
              <Link
                key={stu.id}
                to="/teacher/students"
                className="rounded-full border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-100"
              >
                {stu.name} (G{stu.grade})
              </Link>
            ))}
          </div>
        </section>
      ) : null}

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
                    {(DAY_LABELS[slot.day]?.[lang] ?? slot.day) || "Mon"} •{" "}
                    {slot.time} • {formatGrade(lang, slot.grade)}
                  </p>
                  <p className="truncate font-semibold text-[var(--sn-text-main)]">
                    {slot.topic}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--sn-surface)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
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
                        className="inline-flex min-h-11 items-center rounded-lg bg-[#0B3B3C] px-3 text-xs font-bold text-white"
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

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          to="/teacher/quizzes"
          className="group rounded-3xl border border-teal-200 bg-white p-5 shadow-xs transition hover:border-[#0B3B3C]"
        >
          <ClipboardList className="h-6 w-6 text-[#0B3B3C]" />
          <h3 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
            {copy.modQuizTitle}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
            {copy.modQuizDesc}
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
