import type { TeacherAccount } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

const COPY: Record<
  AppLanguage,
  { title: string; sub: string; cancel: string; confirm: string }
> = {
  en: {
    title: "Choose teacher account",
    sub: "Pick which registered teacher you are acting as.",
    cancel: "Cancel",
    confirm: "Continue",
  },
  si: {
    title: "ගුරු ගිණුම තෝරන්න",
    sub: "ඔබ ක්‍රියා කරන ගුරුවරයා තෝරන්න.",
    cancel: "අවලංගු",
    confirm: "ඉදිරියට",
  },
  ta: {
    title: "ஆசிரியர் கணக்கைத் தேர்ந்தெடுக்கவும்",
    sub: "நீங்கள் செயல்படும் ஆசிரியரைத் தேர்ந்தெடுக்கவும்.",
    cancel: "ரத்து",
    confirm: "தொடரவும்",
  },
};

interface TeacherPickerDialogProps {
  lang: AppLanguage;
  teachers: TeacherAccount[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TeacherPickerDialog({
  lang,
  teachers,
  selectedId,
  onSelect,
  onConfirm,
  onCancel,
}: TeacherPickerDialogProps) {
  const copy = COPY[lang];
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-picker-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-lg sm:p-6">
        <h2
          id="teacher-picker-title"
          className="text-lg font-extrabold text-[var(--sn-text-main)]"
        >
          {copy.title}
        </h2>
        <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
          {copy.sub}
        </p>
        <ul className="mt-4 grid gap-2">
          {teachers.map((teacher) => {
            const active = teacher.id === selectedId;
            return (
              <li key={teacher.id}>
                <button
                  type="button"
                  onClick={() => onSelect(teacher.id)}
                  data-testid={`teacher-pick-${teacher.id}`}
                  className={`flex w-full min-h-12 items-center gap-3 rounded-2xl border px-3 text-left ${
                    active
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-teal-200">
                    {teacher.avatarInitials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold">
                      {teacher.name}
                    </span>
                    <span className="block truncate text-xs text-[var(--sn-text-secondary)]">
                      {teacher.email}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm font-bold"
          >
            {copy.cancel}
          </button>
          <button
            type="button"
            disabled={!selectedId}
            onClick={onConfirm}
            data-testid="teacher-pick-confirm"
            className="min-h-11 rounded-xl bg-teal-700 px-4 text-sm font-extrabold text-white disabled:opacity-50"
          >
            {copy.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
