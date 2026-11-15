import { Outlet } from "@tanstack/react-router";
import { SessionBoundary } from "@/features/auth/protected";

export function AppShell() {
  return (
    <SessionBoundary>
      <a
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-background px-3 py-2 text-sm font-medium shadow-md ring-1 ring-border focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <Outlet />
    </SessionBoundary>
  );
}
