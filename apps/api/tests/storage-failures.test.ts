import { expect, it } from "vitest";
import { fileResponseSchema } from "@repo/contracts";
import { bindings, mockEmail, request, signUp, upload } from "./helpers";

function failingDatabase(operation: "insert" | "delete") {
  return new Proxy(bindings.DB, {
    get(target, key) {
      if (key === "prepare")
        return (sql: string) => {
          if (
            sql
              .toLowerCase()
              .includes(
                `${operation} ${operation === "insert" ? "into" : "from"} "files"`,
              )
          ) {
            throw new Error("Simulated D1 failure: private internal details");
          }
          return target.prepare(sql);
        };
      const value = Reflect.get(target, key);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

it("removes an R2 object when metadata insertion fails and redacts the error", async () => {
  const user = await signUp(mockEmail());
  const body = new FormData();
  body.append(
    "file",
    new File(["%PDF-1.7\nReport"], "report.pdf", { type: "application/pdf" }),
  );
  const response = await request(
    "/api/v1/files",
    {
      method: "POST",
      headers: { authorization: `Bearer ${user.token}` },
      body,
    },
    { DB: failingDatabase("insert") },
  );
  expect(response.status).toBe(500);
  expect(await response.text()).not.toContain("private internal details");
  expect((await bindings.FILES.list()).objects).toHaveLength(0);
});

it("allows deletion to be retried after R2 deletion succeeded but D1 deletion failed", async () => {
  const user = await signUp(mockEmail());
  const uploaded = fileResponseSchema.parse(
    await (await upload(user.token)).json(),
  );
  const init = {
    method: "DELETE",
    headers: { authorization: `Bearer ${user.token}` },
  };
  const path = `/api/v1/files/${uploaded.data.id}`;
  expect(
    (await request(path, init, { DB: failingDatabase("delete") })).status,
  ).toBe(500);
  expect((await bindings.FILES.list()).objects).toHaveLength(0);
  expect((await request(path, init)).status).toBe(204);
  expect(
    (await bindings.DB.prepare("SELECT id FROM files").all()).results,
  ).toHaveLength(0);
});

it("does not insert metadata when R2 refuses an upload", async () => {
  const user = await signUp(mockEmail());
  const bucket = new Proxy(bindings.FILES, {
    get(target, key) {
      if (key === "put")
        return async () => {
          throw new Error("Simulated storage failure");
        };
      const value = Reflect.get(target, key);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  const body = new FormData();
  body.append(
    "file",
    new File(["%PDF-1.7\nReport"], "report.pdf", { type: "application/pdf" }),
  );
  const response = await request(
    "/api/v1/files",
    {
      method: "POST",
      headers: { authorization: `Bearer ${user.token}` },
      body,
    },
    { FILES: bucket },
  );
  expect(response.status).toBe(500);
  expect(
    (await bindings.DB.prepare("SELECT id FROM files").all()).results,
  ).toHaveLength(0);
});
