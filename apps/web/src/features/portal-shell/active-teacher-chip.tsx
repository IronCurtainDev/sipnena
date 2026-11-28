import { useState } from "react";
import {
  listActiveTeachers,
  setActiveTeacherId,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { TeacherPickerDialog } from "./teacher-picker-dialog";

const LABELS: Record<
  AppLanguage,
  { none: string; switch: string; askAdmin: string }
> = {
  en: {
    none: "No teacher selected",
    switch: "Switch teacher",
    askAdmin: "Ask admin to create a teacher",
  },
  si: {
    none: "ගුරුවරයෙකු තෝරා නැත",
    switch: "ගුරුවරයා මාරු කරන්න",
    askAdmin: "ගුරුවරයෙකු සෑදීමට පරිපාලකගෙන් ඉල්ලන්න",
  },
  ta: {
    none: "ஆசிரியர் தேர்ந்தெடுக்கப்படவில்லை",
    switch: "ஆசிரியரை மாற்று",
    askAdmin: "ஆசிரியரை உருவாக்க நிர்வாகியிடம் கேளுங்கள்",
  },
};

interface ActiveTeacherChipProps {
  lang: AppLanguage;
}

export function ActiveTeacherChip({ lang }: ActiveTeacherChipProps) {
  const { store } = useCoursesStore();
  const [open, setOpen] = useState(false);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const copy = LABELS[lang];
  const active = store.teachers.find(
    (t) => t.id === store.activeTeacherId && t.status === "active",
  );
  const activeTeachers = store.teachers.filter((t) => t.status === "active");

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className="inline-flex max-w-[11rem] truncate rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-950"
          data-testid="active-teacher-chip"
          title={active?.email ?? copy.none}
        >
          {active ? active.name : copy.none}
        </span>
        {activeTeachers.length >= 2 ? (
          <button
            type="button"
            onClick={() => {
              setPickedId(active?.id ?? activeTeachers[0]?.id ?? null);
              setOpen(true);
            }}
            data-testid="switch-teacher"
            className="min-h-9 rounded-full border border-teal-300 px-2.5 text-[11px] font-bold text-teal-900"
          >
            {copy.switch}
          </button>
        ) : null}
        {activeTeachers.length === 0 ? (
          <span className="text-[11px] font-semibold text-teal-900/80">
            {copy.askAdmin}
          </span>
        ) : null}
      </div>

      {open ? (
        <TeacherPickerDialog
          lang={lang}
          teachers={listActiveTeachers()}
          selectedId={pickedId}
          onSelect={setPickedId}
          onCancel={() => setOpen(false)}
          onConfirm={() => {
            if (!pickedId) return;
            setActiveTeacherId(pickedId);
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
