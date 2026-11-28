import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  loadCourseStoreState,
  setActiveTeacherId,
  type TeacherAccount,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { usePrototypeState, type DemoRole } from "@/lib/prototype-state";
import {
  applySingleTeacher,
  resolveTeacherActivation,
} from "./activate-teacher-role";
import { isDemoModeEnabled } from "./demo-mode";
import { ROLE_ENTRY_ROUTE, ROLE_LABELS } from "./nav-config";
import { ROLE_VISUAL_CONFIG } from "./role-themes";
import { TeacherPickerDialog } from "./teacher-picker-dialog";

const ROLES: DemoRole[] = ["student", "parent", "teacher", "admin"];

interface PrototypeRoleSwitcherProps {
  lang: AppLanguage;
  activeRoleOverride?: DemoRole;
  compact?: boolean;
}

export function PrototypeRoleSwitcher({
  lang,
  activeRoleOverride,
  compact = false,
}: PrototypeRoleSwitcherProps) {
  const navigate = useNavigate();
  const { state, setRole } = usePrototypeState();
  const [pickerTeachers, setPickerTeachers] = useState<TeacherAccount[] | null>(
    null,
  );
  const [pickedId, setPickedId] = useState<string | null>(null);

  if (!isDemoModeEnabled()) return null;

  const activeRole = activeRoleOverride ?? state.role;

  const goTeacher = () => {
    setRole("teacher");
    void navigate({ to: ROLE_ENTRY_ROUTE.teacher });
  };

  const handleSelect = (role: DemoRole) => {
    if (role !== "teacher") {
      setRole(role);
      void navigate({ to: ROLE_ENTRY_ROUTE[role] });
      return;
    }

    const preferred = loadCourseStoreState().activeTeacherId;
    const result = resolveTeacherActivation(preferred);
    if (result.kind === "none") {
      goTeacher();
      return;
    }
    if (result.kind === "single") {
      applySingleTeacher(result.teacher);
      goTeacher();
      return;
    }
    setPickedId(result.preferredId ?? result.teachers[0]?.id ?? null);
    setPickerTeachers(result.teachers);
  };

  return (
    <>
      <div
        role="group"
        aria-label="Prototype role switcher"
        className={`inline-flex items-center rounded-full border p-0.5 ${ROLE_VISUAL_CONFIG[activeRole].switcherBarCls} ${
          compact ? "w-full justify-between" : ""
        }`}
      >
        {ROLES.map((role) => {
          const isActive = activeRole === role;
          const roleStyle = ROLE_VISUAL_CONFIG[role];
          return (
            <button
              key={role}
              type="button"
              onClick={() => handleSelect(role)}
              aria-pressed={isActive}
              data-testid={`role-switch-${role}`}
              className={`min-h-[44px] rounded-full text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                compact ? "flex-1 px-2 py-1" : "px-3 py-1"
              } ${
                isActive
                  ? roleStyle.activeRoleBtnCls
                  : roleStyle.inactiveRoleBtnCls
              }`}
            >
              {ROLE_LABELS[role][lang]}
            </button>
          );
        })}
      </div>

      {pickerTeachers ? (
        <TeacherPickerDialog
          lang={lang}
          teachers={pickerTeachers}
          selectedId={pickedId}
          onSelect={setPickedId}
          onCancel={() => setPickerTeachers(null)}
          onConfirm={() => {
            if (!pickedId) return;
            setActiveTeacherId(pickedId);
            setPickerTeachers(null);
            goTeacher();
          }}
        />
      ) : null}
    </>
  );
}
