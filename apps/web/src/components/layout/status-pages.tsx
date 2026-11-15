import { Link, useRouter } from "@tanstack/react-router";
import { Compass, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
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

export function RouteErrorPage() {
  const router = useRouter();
  return (
    <StatusPage
      icon={TriangleAlert}
      title="Something went wrong"
      description="Please try loading this page again."
    >
      <Button onClick={() => void router.invalidate()}>Try again</Button>
      <Button variant="outline" asChild>
        <Link to="/">Go home</Link>
      </Button>
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
