import { Navigate } from "@tanstack/react-router";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { Feedback } from "@/components/app/feedback";
import { PagePending } from "@/components/layout/status-pages";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/api/query-client";
import { authClient } from "@/lib/auth/client";

export function SessionBoundary({ children }: PropsWithChildren) {
  const { data, isPending } = authClient.useSession();
  const previousUser = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (isPending) return;
    const userId = data?.user.id ?? null;
    if (previousUser.current !== undefined && previousUser.current !== userId)
      queryClient.clear();
    previousUser.current = userId;
  }, [data?.user.id, isPending]);
  return children;
}

export function Protected({ children }: PropsWithChildren) {
  const { data, isPending, error, refetch } = authClient.useSession();
  if (isPending) return <PagePending />;
  if (error)
    return (
      <div className="grid justify-items-start gap-4">
        <Feedback error={error.message} />
        <Button onClick={() => void refetch()}>Try again</Button>
      </div>
    );
  if (!data)
    return (
      <Navigate
        to="/login"
        search={{ redirect: window.location.pathname + window.location.search }}
        replace
      />
    );
  return children;
}
