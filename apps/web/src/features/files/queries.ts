import { useInfiniteQuery } from "@tanstack/react-query";
import { filesListResponseSchema } from "@repo/contracts";
import { apiClient } from "../../lib/api/client";
import { authClient } from "../../lib/auth/client";

export function useFiles() {
  const { data: session } = authClient.useSession();
  return useInfiniteQuery({
    queryKey: ["files", session?.user.id],
    enabled: !!session,
    initialPageParam: "",
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.api.v1.files.$get({
        query: { limit: "20", ...(pageParam ? { cursor: pageParam } : {}) },
      });
      return filesListResponseSchema.parse(await response.json());
    },
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
  });
}
