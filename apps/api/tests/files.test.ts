import { describe, expect, it } from "vitest";
import {
  fileResponseSchema,
  filesListResponseSchema,
  MAX_FILE_BYTES,
  MAX_USER_STORAGE_BYTES,
} from "@repo/contracts";
import { bindings, mockEmail, request, signUp, upload } from "./helpers";

describe("private files on D1 and R2", () => {
  it("persists an upload, lists and downloads it only for its owner, and deletes it", async () => {
    const mailbox = mockEmail();
    const owner = await signUp(mailbox);
    const other = await signUp(mailbox);
    const uploaded = await upload(owner.token);
    expect(uploaded.status, await uploaded.clone().text()).toBe(201);
    const { data: file } = fileResponseSchema.parse(await uploaded.json());
    const stored = await bindings.FILES.head(`users/${owner.id}/${file.id}`);
    expect(stored?.customMetadata).toEqual({
      metadataVersion: "1",
      uploadId: file.id,
      ownerUserId: owner.id,
      uploadedByUserId: owner.id,
    });
    const ownerHeaders = { authorization: `Bearer ${owner.token}` };
    const list = await request("/api/v1/files", { headers: ownerHeaders });
    expect(filesListResponseSchema.parse(await list.json()).data).toEqual([
      file,
    ]);
    const downloaded = await request(`/api/v1/files/${file.id}/content`, {
      headers: ownerHeaders,
    });
    expect(downloaded.status).toBe(200);
    expect(downloaded.headers.get("content-disposition")).toContain(
      "attachment",
    );
    expect(downloaded.headers.get("cache-control")).toContain("no-store");
    expect(await downloaded.text()).toBe("%PDF-1.7\nReport");
    const otherHeaders = { authorization: `Bearer ${other.token}` };
    const otherList = await request("/api/v1/files", { headers: otherHeaders });
    expect(
      filesListResponseSchema.parse(await otherList.json()).data,
    ).toHaveLength(0);
    expect(
      (
        await request(`/api/v1/files/${file.id}/content`, {
          headers: otherHeaders,
        })
      ).status,
    ).toBe(404);
    expect(
      (
        await request(`/api/v1/files/${file.id}`, {
          method: "DELETE",
          headers: otherHeaders,
        })
      ).status,
    ).toBe(404);
    expect(
      (
        await request(`/api/v1/files/${file.id}`, {
          method: "DELETE",
          headers: ownerHeaders,
        })
      ).status,
    ).toBe(204);
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
    expect(
      (await bindings.DB.prepare("SELECT id FROM files").all()).results,
    ).toHaveLength(0);
  });

  it("paginates deterministically without duplicates or exposing storage keys", async () => {
    const user = await signUp(mockEmail());
    await bindings.DB.batch(
      Array.from({ length: 26 }, (_, index) =>
        bindings.DB.prepare(
          "INSERT INTO files (id,user_id,name,content_type,size,object_key,created_at) VALUES (?,?,?,?,?,?,?)",
        ).bind(
          `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`,
          user.id,
          "test.pdf",
          "application/pdf",
          12,
          `test/${index}`,
          "2026-01-01T00:00:00.000Z",
        ),
      ),
    );
    const headers = { authorization: `Bearer ${user.token}` };
    const first = filesListResponseSchema.parse(
      await (await request("/api/v1/files", { headers })).json(),
    );
    expect(first.data).toHaveLength(20);
    expect(first.meta.nextCursor).toBeTruthy();
    expect(first.data[0]).not.toHaveProperty("objectKey");
    const second = filesListResponseSchema.parse(
      await (
        await request(
          `/api/v1/files?cursor=${encodeURIComponent(first.meta.nextCursor!)}`,
          { headers },
        )
      ).json(),
    );
    expect(second.data).toHaveLength(6);
    expect(second.meta.nextCursor).toBeNull();
    expect(
      new Set([...first.data, ...second.data].map((file) => file.id)).size,
    ).toBe(26);
    for (const query of [
      "limit=0",
      "limit=51",
      "limit=oops",
      "cursor=invalid",
    ]) {
      expect(
        (await request(`/api/v1/files?${query}`, { headers })).status,
      ).toBe(400);
    }
  });

  it("rejects invalid and oversized multipart bodies without storing objects", async () => {
    const user = await signUp(mockEmail());
    const headers = { authorization: `Bearer ${user.token}` };
    const body = new FormData();
    body.append(
      "file",
      new File(["<script>unsafe</script>"], "script.html", {
        type: "text/html",
      }),
    );
    expect(
      (await request("/api/v1/files", { method: "POST", headers, body }))
        .status,
    ).toBe(415);
    const huge = new FormData();
    huge.append(
      "file",
      new File([new Uint8Array(MAX_FILE_BYTES + 1)], "huge.pdf", {
        type: "application/pdf",
      }),
    );
    expect(
      (await request("/api/v1/files", { method: "POST", headers, body: huge }))
        .status,
    ).toBe(413);
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(MAX_FILE_BYTES + 128 * 1024));
        controller.close();
      },
    });
    const streamed = await request("/api/v1/files", {
      method: "POST",
      headers: {
        ...headers,
        "content-type": "multipart/form-data; boundary=x",
      },
      body: stream,
    });
    expect(streamed.status).toBe(413);
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
  });

  it("rejects misleading extensions, signatures, and exhausted storage quotas", async () => {
    const user = await signUp(mockEmail());
    const headers = { authorization: `Bearer ${user.token}` };
    for (const file of [
      new File(["%PDF-1.7"], "report.png", { type: "application/pdf" }),
      new File(["not a pdf"], "report.pdf", { type: "application/pdf" }),
    ]) {
      const body = new FormData();
      body.append("file", file);
      const response = await request("/api/v1/files", {
        method: "POST",
        headers,
        body,
      });
      expect(response.status).toBe(415);
      expect(
        ((await response.json()) as { error: { code: string } }).error.code,
      ).toBe("FILE_CONTENT_INVALID");
    }
    await bindings.DB.prepare(
      "INSERT INTO files (id,user_id,name,content_type,size,object_key,created_at) VALUES (?,?,?,?,?,?,?)",
    )
      .bind(
        crypto.randomUUID(),
        user.id,
        "existing.pdf",
        "application/pdf",
        MAX_USER_STORAGE_BYTES,
        `users/${user.id}/existing`,
        new Date().toISOString(),
      )
      .run();
    const quotaBody = new FormData();
    quotaBody.append(
      "file",
      new File(["%PDF-1.7"], "report.pdf", { type: "application/pdf" }),
    );
    const quota = await request("/api/v1/files", {
      method: "POST",
      headers,
      body: quotaBody,
    });
    expect(quota.status).toBe(409);
    expect(
      ((await quota.json()) as { error: { code: string } }).error.code,
    ).toBe("STORAGE_QUOTA_EXCEEDED");
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
  });

  it("throttles before reading upload content", async () => {
    const user = await signUp(mockEmail());
    const response = await request(
      "/api/v1/files",
      {
        method: "POST",
        headers: { authorization: `Bearer ${user.token}` },
        body: "invalid multipart",
      },
      { UPLOAD_RATE_LIMITER: { limit: async () => ({ success: false }) } },
    );
    expect(response.status).toBe(429);
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
  });
});
