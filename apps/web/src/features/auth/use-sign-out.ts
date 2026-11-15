import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";

export function useSignOut() {
  const action = useAction();
  return {
    pending: action.pending,
    error: action.error,
    signOut: () =>
      void action.run(async () => {
        checkAuth(await authClient.signOut());
        queryClient.clear();
        window.location.assign("/login");
      }),
  };
}
