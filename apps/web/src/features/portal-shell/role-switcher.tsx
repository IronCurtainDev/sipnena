import { useNavigate } from "@tanstack/react-router";
import type { AppLanguage } from "@/lib/language";
import { usePrototypeState, type DemoRole } from "@/lib/prototype-state";
import { ROLE_ENTRY_ROUTE, ROLE_LABELS } from "./nav-config";

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
      className={`inline-flex items-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-0.5 ${
        compact ? "w-full justify-between" : ""
      }`}
    >
      {ROLES.map((role) => {
        const isActive = activeRole === role;
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
                ? "bg-[var(--sn-primary)] text-[var(--sn-cream)] shadow-xs"
                : "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]"
            }`}
          >
            {ROLE_LABELS[role][lang]}
          </button>
        );
      })}
    </div>
  );
}
