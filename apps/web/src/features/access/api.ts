import type {
  CreateRoleRequest,
  MyAccess,
  Role,
  UpdateRoleRequest,
} from "@repo/contracts";
import { queryClient } from "@/lib/api/query-client";
import { request } from "@/lib/api/request";

const base = "/api/v1/access";

// Editing a role can change the signed-in user's own permissions.
const refresh = () => queryClient.invalidateQueries({ queryKey: ["access"] });

export async function getMyAccess() {
  return (await request<{ data: MyAccess }>(`${base}/me`)).data;
}

export async function listRoles() {
  return (await request<{ data: Role[] }>(`${base}/roles`)).data;
}

export async function createRole(input: CreateRoleRequest) {
  await request(`${base}/roles`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  await refresh();
}

export async function updateRole(id: string, input: UpdateRoleRequest) {
  await request(`${base}/roles/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  await refresh();
}

export async function deleteRole(id: string) {
  await request(`${base}/roles/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  await refresh();
}
