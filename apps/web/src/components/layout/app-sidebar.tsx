import { Link } from "@tanstack/react-router";
import { useAccess } from "@/features/access/use-access";
import { useAppConfig } from "@/lib/api/config";
import { authClient } from "@/lib/auth/client";
import { Brand } from "./brand";
import { navGroups, navItems } from "./nav-items";
import { UserMenu } from "./user-menu";

export function AppSidebar({
  onNavigate,
  signingOut,
  onSignOut,
}: {
  onNavigate?: () => void;
  signingOut: boolean;
  onSignOut: () => void;
}) {
  const { data: session } = authClient.useSession();
  const { canAny } = useAccess();
  const config = useAppConfig();
  const context = {
    canAny,
    organizationsEnabled: config.data?.organizationsEnabled ?? false,
  };
  const visible = navItems.filter((item) => item.visible?.(context) ?? true);
  return (
    <div className="flex h-full flex-col gap-4 bg-sidebar p-3 text-sidebar-foreground">
      <div className="px-2 pt-1">
        <Brand />
      </div>
      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-5">
        {navGroups.map((group) => {
          const items = visible.filter((item) => item.group === group.id);
          if (!items.length) return null;
          return (
            <div key={group.id} className="grid gap-1">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                {group.label}
              </p>
              {items.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={onNavigate}
                  activeProps={{ "aria-current": "page" }}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground no-underline outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-sidebar-accent-foreground"
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          );
        })}
      </nav>
      {session && (
        <div className="border-t border-sidebar-border pt-3">
          <UserMenu
            user={session.user}
            signingOut={signingOut}
            onSignOut={onSignOut}
          />
        </div>
      )}
    </div>
  );
}
