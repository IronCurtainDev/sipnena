import { useQuery } from "@tanstack/react-query";
import { authClient, checkAuth } from "../../lib/auth/client";

export function useOrganizations() {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["organizations", session?.user.id],
    queryFn: async () => checkAuth(await authClient.organization.list()).data,
    enabled: !!session,
  });
}

export function useOrganization(id: string) {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["organization", id, session?.user.id],
    enabled: !!session,
    queryFn: async () =>
      checkAuth(
        await authClient.organization.getFullOrganization({
          query: { organizationId: id, membersLimit: 1 },
        }),
      ).data,
  });
}

export function useMembers(organizationId: string, offset: number) {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["members", organizationId, session?.user.id, offset],
    enabled: !!session,
    queryFn: async () =>
      checkAuth(
        await authClient.organization.listMembers({
          query: { organizationId, limit: 20, offset },
        }),
      ).data,
  });
}

export function useOrganizationRole(organizationId: string) {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["organization-role", organizationId, session?.user.id],
    enabled: !!session,
    queryFn: async () =>
      checkAuth(
        await authClient.organization.getActiveMemberRole({
          query: { organizationId },
        }),
      ).data,
  });
}
