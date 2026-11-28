import { Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Protected } from "@/features/auth/protected";
import { useSignOut } from "@/features/auth/use-sign-out";
import { AppSidebar } from "./app-sidebar";
import { Brand } from "./brand";

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const signOut = useSignOut();
  const sidebar = {
    signingOut: signOut.pending,
    onSignOut: signOut.signOut,
  };
  return (
    <div className="flex min-h-svh">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-sidebar-border md:block">
        <AppSidebar {...sidebar} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 gap-0 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Move between pages of the app.
              </SheetDescription>
              <AppSidebar {...sidebar} onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <Brand />
        </header>
        <main
          id="main-content"
          className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8"
        >
          <Feedback error={signOut.error} className="mb-6" />
          <Protected>
            <Outlet />
          </Protected>
        </main>
      </div>
    </div>
  );
}
