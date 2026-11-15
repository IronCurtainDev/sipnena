import { fileResponseSchema, filesListResponseSchema } from "@repo/contracts";
import { describe, expect, it, vi } from "vitest";
import {
  authRequest,
  bindings,
  mockEmail,
  origin,
  request,
  signUp,
  upload,
} from "./helpers";

type Organization = {
  id: string;
  members: { id: string; userId: string; role: string }[];
};

async function createOrganization(token: string, slug = crypto.randomUUID()) {
  const response = await authRequest(
    "/organization/create",
    { name: "Test Team", slug },
    token,
  );
  expect(response.status, await response.clone().text()).toBe(200);
  return (await response.json()) as Organization;
}

function listOrganizations(token: string) {
  return request("/api/auth/organization/list", {
    headers: { authorization: `Bearer ${token}` },
  });
}

describe("optional organizations in the Worker runtime", () => {
  it("creates personal accounts first, then invites members with recipient and role checks", async () => {
    const messages = mockEmail();
    const owner = await signUp(messages);
    const colleague = await signUp(messages);
    expect(await (await listOrganizations(owner.token)).json()).toEqual([]);
    const org = await createOrganization(owner.token);
    expect(org.members[0]).toMatchObject({ userId: owner.id, role: "owner" });
    expect(await (await listOrganizations(owner.token)).json()).toEqual([
      expect.objectContaining({ id: org.id }),
    ]);
    const invitation = await authRequest(
      "/organization/invite-member",
      {
        organizationId: org.id,
        email: colleague.email,
        role: "member",
      },
      owner.token,
    );
    expect(invitation.status, await invitation.clone().text()).toBe(200);
    const { id: invitationId } = (await invitation.json()) as { id: string };
    expect(messages.at(-1)).toMatchObject({
      to: colleague.email,
      text: expect.stringContaining(`/accept-invitation/${invitationId}`),
    });
    const wrongRecipient = await authRequest(
      "/organization/accept-invitation",
      {
        invitationId,
      },
      owner.token,
    );
    expect(wrongRecipient.status).toBe(403);
    const accepted = await authRequest(
      "/organization/accept-invitation",
      { invitationId },
      colleague.token,
    );
    expect(accepted.status, await accepted.clone().text()).toBe(200);
    const { member } = (await accepted.json()) as {
      member: { id: string; role: string };
    };
    expect(member.role).toBe("member");
    expect(
      (
        await authRequest(
          "/organization/accept-invitation",
          { invitationId },
          colleague.token,
        )
      ).status,
    ).toBe(400);
    const forbiddenInvite = await authRequest(
      "/organization/invite-member",
      {
        organizationId: org.id,
        email: "outsider@example.com",
        role: "member",
      },
      colleague.token,
    );
    expect(forbiddenInvite.status).toBe(403);
    const escalation = await authRequest(
      "/organization/update-member-role",
      {
        organizationId: org.id,
        memberId: member.id,
        role: "owner",
      },
      colleague.token,
    );
    expect(escalation.status).toBe(403);
    const promotion = await authRequest(
      "/organization/update-member-role",
      {
        organizationId: org.id,
        memberId: member.id,
        role: "admin",
      },
      owner.token,
    );
    expect(promotion.status, await promotion.clone().text()).toBe(200);
    const adminEscalation = await authRequest(
      "/organization/update-member-role",
      {
        organizationId: org.id,
        memberId: member.id,
        role: "owner",
      },
      colleague.token,
    );
    expect(adminEscalation.status).toBe(403);

    // Even an administrator of the owner's organization cannot read personal files.
    const uploaded = fileResponseSchema.parse(
      await (await upload(owner.token)).json(),
    );
    const headers = { authorization: `Bearer ${colleague.token}` };
    const listed = filesListResponseSchema.parse(
      await (await request("/api/v1/files", { headers })).json(),
    );
    expect(listed.data).toEqual([]);
    expect(
      (await request(`/api/v1/files/${uploaded.data.id}/content`, { headers }))
        .status,
    ).toBe(404);
    expect(
      (
        await request(`/api/v1/files/${uploaded.data.id}`, {
          method: "DELETE",
          headers,
        })
      ).status,
    ).toBe(404);
  });

  it("protects the last owner from demotion, removal, and leaving", async () => {
    const owner = await signUp(mockEmail());
    const org = await createOrganization(owner.token);
    const attempts = [
      [
        "/organization/update-member-role",
        { memberId: org.members[0]!.id, role: "member" },
      ],
      ["/organization/remove-member", { memberIdOrEmail: org.members[0]!.id }],
      ["/organization/leave", {}],
    ] as const;
    for (const [path, body] of attempts) {
      const response = await authRequest(
        path,
        { ...body, organizationId: org.id },
        owner.token,
      );
      expect(response.status, await response.clone().text()).toBe(400);
    }
    const stored = await bindings.DB.prepare(
      "SELECT role FROM member WHERE organization_id = ?",
    )
      .bind(org.id)
      .all();
    expect(stored.results).toEqual([{ role: "owner" }]);
  });

  it("keeps organization membership and management private from unrelated users", async () => {
    const messages = mockEmail();
    const owner = await signUp(messages);
    const outsider = await signUp(messages);
    const org = await createOrganization(owner.token);
    expect(await (await listOrganizations(outsider.token)).json()).toEqual([]);
    const members = await request(
      `/api/auth/organization/list-members?organizationId=${org.id}`,
      {
        headers: { authorization: `Bearer ${outsider.token}` },
      },
    );
    expect(members.status).toBe(403);
    const update = await authRequest(
      "/organization/update",
      {
        organizationId: org.id,
        data: { name: "Changed by outsider" },
      },
      outsider.token,
    );
    expect(update.status).toBe(400);
    expect(await update.json()).toMatchObject({
      code: "USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION",
    });
    const stored = await bindings.DB.prepare(
      "SELECT name FROM organization WHERE id = ?",
    )
      .bind(org.id)
      .first();
    expect(stored).toEqual({ name: "Test Team" });
  });

  it("recovers an interrupted creation only after an operator confirms the memberless row", async () => {
    const owner = await signUp(mockEmail());
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const slug = "interrupted-team";
    const database = new Proxy(bindings.DB, {
      get(target, key) {
        if (key === "prepare")
          return (sql: string) => {
            if (sql.toLowerCase().includes('insert into "member"')) {
              throw new Error(
                "Simulated membership failure containing private-token-example",
              );
            }
            return target.prepare(sql);
          };
        const value = Reflect.get(target, key);
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
    const failed = await request(
      "/api/auth/organization/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin,
          authorization: `Bearer ${owner.token}`,
        },
        body: JSON.stringify({ name: "Test Team", slug }),
      },
      { DB: database },
    );
    expect(failed.status).toBe(500);
    expect(await failed.json()).toEqual({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unexpected authentication error",
    });
    const failure = errorLog.mock.calls
      .map(([line]) => String(line))
      .filter((line) => line.includes('"auth_request_failed"'))
      .map((line) => JSON.parse(line) as Record<string, unknown>)[0];
    expect(failure).toMatchObject({
      requestId: failed.headers.get("x-request-id"),
      errorName: "Error",
    });
    expect(JSON.stringify(errorLog.mock.calls)).not.toContain(
      "private-token-example",
    );
    expect(await (await listOrganizations(owner.token)).json()).toEqual([]);
    expect(
      (
        await authRequest(
          "/organization/create",
          { name: "Test Team", slug },
          owner.token,
        )
      ).status,
    ).toBe(400);
    const orphan = await bindings.DB.prepare(
      "SELECT o.id FROM organization AS o WHERE o.slug = ? " +
        "AND NOT EXISTS (SELECT 1 FROM member AS m WHERE m.organization_id = o.id)",
    )
      .bind(slug)
      .first<{ id: string }>();
    expect(orphan).not.toBeNull();

    // The failed request has finished; use the exact guarded recovery SQL from operations.md.
    const cleanup =
      "DELETE FROM organization WHERE id = ? AND NOT EXISTS " +
      "(SELECT 1 FROM member WHERE organization_id = organization.id)";
    await bindings.DB.prepare(cleanup).bind(orphan!.id).run();
    const recovered = await createOrganization(owner.token, slug);
    expect(recovered.members).toHaveLength(1);
    // The same guard must never delete an organization once membership exists.
    await bindings.DB.prepare(cleanup).bind(recovered.id).run();
    expect(await (await listOrganizations(owner.token)).json()).toEqual([
      expect.objectContaining({ id: recovered.id }),
    ]);
  });
});
