import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";

export function useAppConfig() {
  return useQuery({
    queryKey: ["config"],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await apiClient.api.config.$get();
      return response.json();
    },
  });
}
