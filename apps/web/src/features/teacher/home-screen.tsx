import { Link } from "@tanstack/react-router";
import {
  ClipboardList,
  MessageCircleQuestion,
  NotebookPen,
  Users,
  Video,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";

export function TeacherStudioHomeScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state } = usePrototypeState();
  const pendingDoubts = state.doubts.filter((d) => d.status === "pending");

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Teacher / Tutor Studio"
      roleOverride="teacher"
    >
      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Users className="h-4 w-4 text-[var(--sn-primary)]" />
            <span>Active Students</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            418
          </p>
          <p className="mt-1 text-xs text-emerald-700 font-semibold">
            Grades 8–11 across 3 mediums
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <MessageCircleQuestion className="h-4 w-4 text-amber-600" />
            <span>Pending Doubts</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            {pendingDoubts.length}
          </p>
          <Link
            to="/teacher/doubts"
            className="mt-1 inline-block text-xs font-bold text-[var(--sn-primary)] hover:underline"
          >
            Reply to student queue →
          </Link>
        </div>

        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-muted)]">
            <Video className="h-4 w-4 text-[var(--sn-primary)]" />
            <span>Uploaded Lessons</span>
          </div>
          <p className="mt-2 text-3xl font-black text-[var(--sn-text-main)]">
            {state.teacherLessons.length}
          </p>
          <Link
            to="/teacher/courses"
            className="mt-1 inline-block text-xs font-bold text-[var(--sn-primary)] hover:underline"
          >
            Upload lesson &amp; PDF tute →
          </Link>
        </div>
      </section>

      {/* Studio Action Modules */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          to="/teacher/courses"
          className="group rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs transition hover:border-[var(--sn-primary)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
            <NotebookPen className="h-5 w-5" />
          </span>
          <h2 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
            Lessons &amp; PDF Tutes
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
            Create or edit video lessons, attach Sinhala/Tamil/English PDF
            tutes, and publish by Term.
          </p>
        </Link>

        <Link
          to="/teacher/quizzes"
          className="group rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs transition hover:border-[var(--sn-primary)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
            <ClipboardList className="h-5 w-5" />
          </span>
          <h2 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
            MCQ Quiz Builder
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
            Build 4-option Term Test and O/L checkpoint MCQ quizzes with instant
            marking explanations.
          </p>
        </Link>

        <Link
          to="/teacher/doubts"
          className="group rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs transition hover:border-[var(--sn-primary)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <MessageCircleQuestion className="h-5 w-5" />
          </span>
          <h2 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
            Reply to Student Doubts
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
            Review student notebook photos, timestamp tags, and publish verified
            teacher explanations.
          </p>
        </Link>
      </section>
    </SipNenaPortalShell>
  );
}
