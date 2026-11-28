import { useState } from "react";
import { X } from "lucide-react";
import type { TeacherAccount } from "@/data/courses";
import type { AdminTeachersCopy } from "./teachers-strings";

export interface TeacherFormValues {
  name: string;
  email: string;
  password: string;
  subjects: string;
  bio: string;
  phone: string;
  avatarInitials: string;
}

interface TeachersDialogProps {
  copy: AdminTeachersCopy;
  mode: "create" | "edit";
  initial?: TeacherAccount | null;
  onClose: () => void;
  onSave: (values: TeacherFormValues) => void;
  error?: string | null;
}

function toValues(teacher?: TeacherAccount | null): TeacherFormValues {
  return {
    name: teacher?.name ?? "",
    email: teacher?.email ?? "",
    password: "",
    subjects: teacher?.subjects.join(", ") ?? "",
    bio: teacher?.bio ?? "",
    phone: teacher?.phone ?? "",
    avatarInitials: teacher?.avatarInitials ?? "",
  };
}

export function TeachersDialog({
  copy,
  mode,
  initial,
  onClose,
  onSave,
  error,
}: TeachersDialogProps) {
  const [values, setValues] = useState<TeacherFormValues>(() =>
    toValues(initial),
  );

  const title =
    mode === "create" ? copy.dialogCreateTitle : copy.dialogEditTitle;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-teacher-dialog-title"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-lg sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2
            id="admin-teacher-dialog-title"
            className="text-lg font-extrabold text-[var(--sn-text-main)]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label={copy.cancelBtn}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          className="mt-4 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(values);
          }}
        >
          <label className="grid gap-1 text-sm font-semibold">
            {copy.nameLabel}
            <input
              required
              value={values.name}
              onChange={(e) =>
                setValues((v) => ({ ...v, name: e.target.value }))
              }
              data-testid="admin-teacher-name"
              className="min-h-11 rounded-xl border border-slate-300 px-3"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {copy.emailLabel}
            <input
              required
              type="email"
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              data-testid="admin-teacher-email"
              className="min-h-11 rounded-xl border border-slate-300 px-3"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {copy.passwordLabel}
            <input
              required={mode === "create"}
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(e) =>
                setValues((v) => ({ ...v, password: e.target.value }))
              }
              placeholder={
                mode === "edit" ? copy.passwordEditHint : copy.passwordHint
              }
              data-testid="admin-teacher-password"
              minLength={mode === "create" ? 8 : undefined}
              className="min-h-11 rounded-xl border border-slate-300 px-3"
            />
            <span className="text-xs font-normal text-[var(--sn-text-secondary)]">
              {mode === "edit" ? copy.passwordEditHint : copy.passwordHint}
            </span>
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {copy.subjectsLabel}
            <input
              value={values.subjects}
              onChange={(e) =>
                setValues((v) => ({ ...v, subjects: e.target.value }))
              }
              placeholder={copy.subjectsHint}
              data-testid="admin-teacher-subjects"
              className="min-h-11 rounded-xl border border-slate-300 px-3"
            />
            <span className="text-xs font-normal text-[var(--sn-text-secondary)]">
              {copy.subjectsHint}
            </span>
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {copy.phoneLabel}
            <input
              value={values.phone}
              onChange={(e) =>
                setValues((v) => ({ ...v, phone: e.target.value }))
              }
              className="min-h-11 rounded-xl border border-slate-300 px-3"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {copy.bioLabel}
            <textarea
              value={values.bio}
              onChange={(e) =>
                setValues((v) => ({ ...v, bio: e.target.value }))
              }
              rows={3}
              className="rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {copy.initialsLabel}
            <input
              value={values.avatarInitials}
              onChange={(e) =>
                setValues((v) => ({ ...v, avatarInitials: e.target.value }))
              }
              maxLength={3}
              className="min-h-11 rounded-xl border border-slate-300 px-3"
            />
          </label>

          {error ? (
            <p className="text-sm font-semibold text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm font-bold"
            >
              {copy.cancelBtn}
            </button>
            <button
              type="submit"
              data-testid="admin-teacher-save"
              className="min-h-11 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-extrabold text-white"
            >
              {copy.saveBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function parseSubjects(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
