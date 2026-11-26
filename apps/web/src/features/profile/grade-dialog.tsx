import React, { useState } from "react";
import { GraduationCap, Check, X } from "lucide-react";
import { GRADE_OPTIONS } from "./mock-data";
import type { ProfileStrings } from "./strings.types";

interface GradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: string;
  onSelectGrade: (grade: string) => void;
  strings: ProfileStrings;
}

export function GradeDialog({
  isOpen,
  onClose,
  currentGrade,
  onSelectGrade,
  strings,
}: GradeDialogProps) {
  const [selected, setSelected] = useState(currentGrade);

  if (!isOpen) return null;

  const handleSave = () => {
    onSelectGrade(selected);
    onClose();
  };

  return (
    <div className="sipnena-onboarding fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-md flex-col rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--sn-text-muted)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
              {strings.settingGradeTitle}
            </h3>
            <p className="text-xs text-[var(--sn-text-muted)]">
              Sri Lankan National Curriculum (Grades 6–11)
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {GRADE_OPTIONS.map((g) => {
            const isMatch = selected === g.value;
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => setSelected(g.value)}
                className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                  isMatch
                    ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] shadow-xs"
                    : "border-[var(--sn-border)] hover:bg-[var(--sn-surface-muted)]"
                }`}
              >
                <div>
                  <span className="block text-sm font-bold text-[var(--sn-text-main)]">
                    {g.label}
                  </span>
                  <span className="text-xs text-[var(--sn-text-muted)]">
                    {g.sub}
                  </span>
                </div>
                {isMatch && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] py-3 text-sm font-semibold text-[var(--sn-text-main)] hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-2xl bg-[var(--sn-primary)] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
          >
            {strings.changeGradeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
