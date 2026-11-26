import { useNavigate } from "@tanstack/react-router";
import type { AppLanguage } from "@/lib/language";
import { usePrototypeState, type DemoRole } from "@/lib/prototype-state";
import { ROLE_ENTRY_ROUTE, ROLE_LABELS } from "./nav-config";
import { ROLE_VISUAL_CONFIG } from "./role-themes";

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
  const activeRole = activeRoleOverride ?? state.role;

  const handleSelect = (role: DemoRole) => {
    setRole(role);
    void navigate({ to: ROLE_ENTRY_ROUTE[role] });
  };

  return (
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
            className={`min-h-[30px] rounded-full font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
              compact ? "flex-1 px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs"
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
  );
}
