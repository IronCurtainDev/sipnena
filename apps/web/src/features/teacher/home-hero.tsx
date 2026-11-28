import { Link } from "@tanstack/react-router";
import type { TeacherAccount } from "@/data/courses";

interface TeacherHomeHeroProps {
  activeTeacher: TeacherAccount | null | undefined;
  tutorBannerBadge: string;
  tutorTitleLine: string;
  tutorSubLine: string;
  quickUploadBtn: string;
}

export function TeacherHomeNoAccountBanner() {
  return (
    <section
      className="rounded-3xl border border-amber-200 bg-amber-50 p-6"
      data-testid="teacher-home-no-account"
    >
      <h2 className="text-lg font-extrabold text-amber-950">
        Ask admin to create a teacher account
      </h2>
      <p className="mt-1 text-sm text-amber-900/80">
        After an admin adds you under Teachers with an email and password, sign
        in on the login page to create courses.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/login"
          className="inline-flex min-h-11 items-center rounded-xl bg-amber-900 px-4 text-sm font-bold text-amber-50"
        >
          Sign in
        </Link>
        <Link
          to="/admin/teachers"
          className="inline-flex min-h-11 items-center rounded-xl border border-amber-800/40 px-4 text-sm font-bold text-amber-950"
        >
          Open admin teachers
        </Link>
      </div>
    </section>
  );
}

export function TeacherHomeHero({
  activeTeacher,
  tutorBannerBadge,
  tutorTitleLine,
  tutorSubLine,
  quickUploadBtn,
}: TeacherHomeHeroProps) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#0B3B3C] p-6 text-white shadow-sm">
      <div>
        <span className="rounded-full bg-teal-400/20 px-3 py-1 text-xs font-extrabold text-teal-200">
          {tutorBannerBadge}
        </span>
        <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
          {activeTeacher ? activeTeacher.name : tutorTitleLine}
        </h2>
        <p className="mt-0.5 text-xs text-teal-100/85">{tutorSubLine}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/teacher/courses"
          className="rounded-2xl bg-teal-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-teal-300"
        >
          {quickUploadBtn}
        </Link>
        <Link
          to="/teacher/profile"
          className="rounded-2xl border border-teal-300/50 px-4 py-2.5 text-xs font-extrabold text-teal-50 hover:bg-teal-900/40"
        >
          Profile
        </Link>
      </div>
    </section>
  );
}
