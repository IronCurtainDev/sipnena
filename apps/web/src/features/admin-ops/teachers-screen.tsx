import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import {
  createTeacher,
  setTeacherStatus,
  updateTeacher,
  useCoursesStore,
  type TeacherAccount,
  TeacherMutationError,
} from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  parseSubjects,
  TeachersDialog,
  type TeacherFormValues,
} from "./teachers-dialog";
import { ADMIN_TEACHERS_COPY } from "./teachers-strings";

export function AdminTeachersScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const copy = ADMIN_TEACHERS_COPY[lang];
  const [dialog, setDialog] = useState<"create" | TeacherAccount | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = (values: TeacherFormValues) => {
    setError(null);
    try {
      const subjects = parseSubjects(values.subjects);
      if (dialog === "create") {
        createTeacher({
          name: values.name,
          email: values.email,
          password: values.password,
          subjects,
          bio: values.bio,
          phone: values.phone,
          avatarInitials: values.avatarInitials,
        });
        showToast(copy.createdToast);
      } else if (dialog) {
        updateTeacher(dialog.id, {
          name: values.name,
          email: values.email,
          password: values.password || undefined,
          subjects,
          bio: values.bio,
          phone: values.phone,
          avatarInitials: values.avatarInitials,
        });
        showToast(copy.updatedToast);
      }
      setDialog(null);
    } catch (err) {
      setError(
        err instanceof TeacherMutationError ? err.message : copy.errorGeneric,
      );
    }
  };

  const toggleStatus = (teacher: TeacherAccount) => {
    const next = teacher.status === "active" ? "disabled" : "active";
    setTeacherStatus(teacher.id, next);
    showToast(next === "disabled" ? copy.disabledToast : copy.enabledToast);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      roleOverride="admin"
      toastMessage={toast}
    >
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--sn-text-main)]">
            {copy.heading}
          </h2>
          <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
            {copy.sub}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError(null);
            setDialog("create");
          }}
          data-testid="admin-add-teacher"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 text-base font-extrabold text-white"
        >
          <Plus className="h-4 w-4" />
          {copy.createBtn}
        </button>
      </section>

      {store.teachers.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <UserPlus className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-3 text-lg font-extrabold">{copy.emptyTitle}</h3>
          <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
            {copy.emptyDesc}
          </p>
        </section>
      ) : (
        <section className="overflow-x-auto rounded-3xl border border-slate-300 bg-white shadow-xs">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">{copy.colName}</th>
                <th className="px-4 py-3">{copy.colEmail}</th>
                <th className="px-4 py-3">{copy.colSubjects}</th>
                <th className="px-4 py-3">{copy.colStatus}</th>
                <th className="px-4 py-3">{copy.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {store.teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b border-slate-100 last:border-0"
                  data-testid={`admin-teacher-row-${teacher.id}`}
                >
                  <td className="px-4 py-3 font-semibold">
                    <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-amber-300">
                      {teacher.avatarInitials}
                    </span>
                    {teacher.name}
                  </td>
                  <td className="px-4 py-3">{teacher.email}</td>
                  <td className="px-4 py-3">
                    {teacher.subjects.join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        teacher.status === "active"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {teacher.status === "active"
                        ? copy.statusActive
                        : copy.statusDisabled}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setDialog(teacher);
                        }}
                        className="min-h-10 rounded-xl border border-slate-300 px-3 text-xs font-bold"
                      >
                        {copy.editBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(teacher)}
                        className="min-h-10 rounded-xl border border-slate-300 px-3 text-xs font-bold"
                      >
                        {teacher.status === "active"
                          ? copy.disableBtn
                          : copy.enableBtn}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {dialog ? (
        <TeachersDialog
          copy={copy}
          mode={dialog === "create" ? "create" : "edit"}
          initial={dialog === "create" ? null : dialog}
          error={error}
          onClose={() => setDialog(null)}
          onSave={handleSave}
        />
      ) : null}
    </SipNenaPortalShell>
  );
}
