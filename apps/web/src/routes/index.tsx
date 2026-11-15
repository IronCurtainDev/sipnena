import { Navigate } from "@tanstack/react-router";
import { Feedback } from "@/components/app/feedback";
import { FullScreen } from "@/components/layout/status-pages";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export function HomePage() {
  const { data, isPending, error, refetch } = authClient.useSession();
  if (isPending)
    return (
      <FullScreen>
        <p role="status" className="text-sm text-muted-foreground">
          Loading…
        </p>
      </FullScreen>
    );
  if (error)
    return (
      <FullScreen>
        <div className="grid max-w-sm justify-items-center gap-4 px-4">
          <Feedback error={error.message} />
          <Button onClick={() => void refetch()}>Try again</Button>
        </div>
      </FullScreen>
    );
  return data ? (
    <Navigate to="/account" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
