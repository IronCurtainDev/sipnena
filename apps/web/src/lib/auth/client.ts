import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { apiKeyHeaders } from "../api/key";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  fetchOptions: { headers: apiKeyHeaders, timeout: 15_000 },
  plugins: [adminClient(), organizationClient()],
});

export function checkAuth<T extends { error: { message?: string } | null }>(
  result: T,
): T {
  if (result.error)
    throw new Error(
      result.error.message ?? "The request could not be completed.",
    );
  return result;
}
