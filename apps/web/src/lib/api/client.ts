import { createApiClient } from "@repo/api-client";
import { queryClient } from "./query-client";
import { safeRedirect } from "../auth/redirect";
import { apiKeyHeaders } from "./key";

export const apiClient = createApiClient({
  baseUrl: window.location.origin,
  headers: apiKeyHeaders,
  onUnauthorized: () => {
    queryClient.clear();
    window.location.assign(
      `/login?redirect=${encodeURIComponent(safeRedirect(window.location.pathname + window.location.search))}`,
    );
  },
});
