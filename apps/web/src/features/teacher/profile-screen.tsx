import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  logoutTeacher,
  TeacherMutationError,
  updateTeacher,
  useCoursesStore,
} from "@/data/courses";
import { parseSubjects } from "@/features/admin-ops/teachers-dialog";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { updatePrototypeState } from "@/lib/prototype-state";
import { TEACHER_PROFILE_COPY } from "./profile-strings";

export function TeacherProfileScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const copy = TEACHER_PROFILE_COPY[lang];
  const teacher = store.teachers.find((t) => t.id === store.activeTeacherId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subjects, setSubjects] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [initials, setInitials] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacher) return;
    setName(teacher.name);
    setEmail(teacher.email);
    setSubjects(teacher.subjects.join(", "));
    setBio(teacher.bio ?? "");
    setPhone(teacher.phone ?? "");
    setInitials(teacher.avatarInitials);
  }, [teacher]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!teacher || teacher.status !== "active") return;
    setError(null);
    try {
      updateTeacher(teacher.id, {
        name,
        email,
        subjects: parseSubjects(subjects),
        bio,
        phone,
        avatarInitials: initials,
      });
      showToast(copy.savedToast);
    } catch (err) {
      setError(
        err instanceof TeacherMutationError ? err.message : copy.errorGeneric,
      );
    }
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      {!teacher ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-extrabold">{copy.noTeacherTitle}</h2>
          <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
            {copy.noTeacherDesc}
          </p>
          <Link
            to="/admin/teachers"
            className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-teal-700 px-4 text-sm font-bold text-white"
          >
            Admin teachers
          </Link>
        </section>
      ) : teacher.status !== "active" ? (
        <section className="rounded-3xl border border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-extrabold">{copy.disabledTitle}</h2>
          <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
            {copy.disabledDesc}
          </p>
        </section>
      ) : (
        <section className="w-full rounded-3xl border border-slate-300 bg-white p-5 shadow-xs sm:p-6">
          <h2 className="text-xl font-extrabold text-[var(--sn-text-main)]">
            {copy.heading}
          </h2>
          <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
            {copy.sub}
          </p>
          <form className="mt-5 grid max-w-xl gap-3" onSubmit={handleSave}>
            <label className="grid gap-1 text-sm font-semibold">
              {copy.nameLabel}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="teacher-profile-name"
                className="min-h-11 rounded-xl border border-slate-300 px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {copy.emailLabel}
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="teacher-profile-email"
                className="min-h-11 rounded-xl border border-slate-300 px-3"
              />
              <span className="text-xs font-normal text-[var(--sn-text-secondary)]">
                {copy.emailHint}
              </span>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {copy.subjectsLabel}
              <input
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="min-h-11 rounded-xl border border-slate-300 px-3"
              />
              <span className="text-xs font-normal text-[var(--sn-text-secondary)]">
                {copy.subjectsHint}
              </span>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {copy.phoneLabel}
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-h-11 rounded-xl border border-slate-300 px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {copy.bioLabel}
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {copy.initialsLabel}
              <input
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                maxLength={3}
                className="min-h-11 rounded-xl border border-slate-300 px-3"
              />
            </label>
            {error ? (
              <p className="text-sm font-semibold text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="submit"
                data-testid="teacher-profile-save"
                className="min-h-12 w-fit rounded-2xl bg-[var(--sn-primary)] px-5 text-base font-extrabold text-white"
              >
                {copy.saveBtn}
              </button>
              <button
                type="button"
                data-testid="teacher-profile-logout"
                onClick={() => {
                  logoutTeacher();
                  updatePrototypeState((prev) => ({
                    ...prev,
                    role: "student",
                  }));
                  window.location.assign("/login");
                }}
                className="min-h-12 w-fit rounded-2xl border border-slate-300 px-5 text-base font-extrabold text-slate-800"
              >
                {copy.logoutBtn}
              </button>
            </div>
          </form>
        </section>
      )}
    </SipNenaPortalShell>
  );
}
