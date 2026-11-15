import type { AdminFile } from "@repo/contracts";
import { queryClient } from "@/lib/api/query-client";
import { request } from "@/lib/api/request";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  createdAt: string | Date;
};

export const ADMIN_USER_PAGE_SIZE = 25;

export async function listAdminUsers(offset = 0) {
  const query = new URLSearchParams({
    limit: String(ADMIN_USER_PAGE_SIZE),
    offset: String(offset),
    sortBy: "createdAt",
    sortDirection: "desc",
  });
  return request<{ users: AdminUser[]; total: number }>(
    `/api/auth/admin/list-users?${query}`,
  );
}

export async function createAdminUser(input: {
  name: string;
  email: string;
  password: string;
  role: string[];
}) {
  await request("/api/auth/admin/create-user", {
    method: "POST",
    body: JSON.stringify(input),
  });
  await queryClient.invalidateQueries({ queryKey: ["admin"] });
}

export async function setUserRoles(userId: string, role: string[]) {
  await request("/api/auth/admin/set-role", {
    method: "POST",
    body: JSON.stringify({ userId, role }),
  });
  await queryClient.invalidateQueries({ queryKey: ["admin"] });
}

export async function setAdminPassword(userId: string, newPassword: string) {
  await request("/api/auth/admin/set-user-password", {
    method: "POST",
    body: JSON.stringify({ userId, newPassword }),
  });
}

export async function setAdminBan(userId: string, banned: boolean) {
  await request(`/api/auth/admin/${banned ? "ban-user" : "unban-user"}`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  await queryClient.invalidateQueries({ queryKey: ["admin"] });
}

export async function removeAdminUser(userId: string) {
  await request("/api/auth/admin/remove-user", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  await queryClient.invalidateQueries({ queryKey: ["admin"] });
}

export async function listAdminFiles(cursor: string | null) {
  const query = new URLSearchParams({ limit: "50" });
  if (cursor) query.set("cursor", cursor);
  return request<{ data: AdminFile[]; meta: { nextCursor: string | null } }>(
    `/api/v1/admin/files?${query}`,
  );
}

export async function deleteAdminFile(id: string) {
  await request(`/api/v1/admin/files/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  await queryClient.invalidateQueries({ queryKey: ["admin", "files"] });
}
