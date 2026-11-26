import { Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { brand } from "@/lib/brand";
import { Brand } from "./brand";

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="relative hidden overflow-hidden bg-[oklch(0.22_0.04_155)] p-10 text-[oklch(0.98_0.02_95)] lg:flex lg:flex-col lg:justify-between">
        <div className="relative text-2xl font-black tracking-tight">
          {brand.name}
        </div>
        <div className="relative max-w-md space-y-4">
          <p className="text-3xl font-semibold tracking-tight text-balance">
            {brand.tagline}
          </p>
          <p className="text-zinc-400 text-pretty">{brand.description}</p>
        </div>
        <p className="relative text-xs text-zinc-500">
          © {new Date().getFullYear()} {brand.name}
        </p>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Brand className="lg:invisible" />
          <ThemeToggle />
        </header>
        <main
          id="main-content"
          className="flex flex-1 items-start justify-center px-4 pt-6 pb-16 sm:items-center sm:px-6 sm:pt-0"
        >
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
