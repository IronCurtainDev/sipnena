import {
  Link,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Compass, TriangleAlert } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function StatusPage({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Compass;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid min-h-[60svh] place-items-center px-4 py-16 text-center">
      <div className="flex max-w-sm flex-col items-center gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="size-6" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-2 flex gap-2">{children}</div>
      </div>
    </section>
  );
}

export function FullScreen({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="grid min-h-svh place-items-center">
      {children}
    </main>
  );
}

export function NotFoundPage() {
  return (
    <StatusPage
      icon={Compass}
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
    >
      <Button asChild>
        <Link to="/">Return home</Link>
      </Button>
    </StatusPage>
  );
}

function isStaleModuleError(error: unknown): boolean {
  const msg =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  return /dynamically imported module|ChunkLoadError|Failed to fetch|Importing a module script failed|Outdated Optimize Dep|does not provide an export named|Failed to resolve module|Loading chunk/i.test(
    msg,
  );
}

const STALE_RELOAD_COOLDOWN_MS = 30_000;

function getStaleReloadKey(error: unknown): string {
  const msg =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "unknown";
  return `sipnena_stale_reload:${window.location.pathname}:${msg}`;
}

export function RouteErrorPage({ error, reset }: Partial<ErrorComponentProps>) {
  const router = useRouter();
  const staleModule = isStaleModuleError(error);
  if (error) {
    console.error("[RouteErrorPage]", error);
  }
  useEffect(() => {
    if (!staleModule || typeof window === "undefined") return;
    try {
      const key = getStaleReloadKey(error);
      const lastReloadAt = Number(window.sessionStorage.getItem(key) ?? "0");
      if (Date.now() - lastReloadAt < STALE_RELOAD_COOLDOWN_MS) return;
      window.sessionStorage.setItem(key, String(Date.now()));
      window.location.reload();
    } catch {
      // sessionStorage may be blocked; user can still click Try again.
    }
  }, [error, staleModule]);

  const errorMessage =
    import.meta.env.DEV && error instanceof Error ? error.message : null;

  const handleRetry = () => {
    if (staleModule) {
      try {
        window.sessionStorage.removeItem(getStaleReloadKey(error));
      } catch {
        // ignore storage errors
      }
      window.location.reload();
      return;
    }
    reset?.();
    void router.invalidate();
  };

  return (
    <StatusPage
      icon={TriangleAlert}
      title="Something went wrong"
      description="Please try loading this page again."
    >
      <div className="flex flex-col items-center gap-3">
        {errorMessage ? (
          <p className="max-w-sm rounded-lg bg-muted px-3 py-2 font-mono text-xs text-destructive">
            {errorMessage}
          </p>
        ) : null}
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={handleRetry}>Try again</Button>
          <Button variant="outline" asChild>
            <Link to="/" onClick={() => reset?.()}>
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </StatusPage>
  );
}

export function PagePending() {
  return (
    <div role="status" aria-label="Loading" className="grid gap-6 p-1">
      <div className="grid gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}
