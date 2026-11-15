import { MAX_FILE_BYTES } from "@repo/contracts";
import { describe, expect, it } from "vitest";
import { uploadProblem } from "./validation";

describe("upload checks before sending", () => {
  it.each([
    ["image/jpeg", "photo.jpg"],
    ["image/png", "photo.png"],
    ["image/webp", "photo.webp"],
    ["application/pdf", "report.pdf"],
  ])("accepts %s within the size limit", (type, name) => {
    expect(uploadProblem({ name, type, size: MAX_FILE_BYTES })).toBeNull();
  });

  it("rejects files over the shared size limit", () => {
    expect(
      uploadProblem({
        name: "report.pdf",
        type: "application/pdf",
        size: MAX_FILE_BYTES + 1,
      }),
    ).toBe("Choose a file no larger than 5 MB.");
  });

  it("rejects empty files and unsupported types", () => {
    expect(
      uploadProblem({ name: "image.png", type: "image/png", size: 0 }),
    ).toBe("Choose a file that is not empty.");
    expect(
      uploadProblem({ name: "note.txt", type: "text/plain", size: 10 }),
    ).toBe("Choose a JPEG, PNG, WebP, or PDF file.");
  });

  it("rejects extensions that disagree with the declared type", () => {
    expect(
      uploadProblem({ name: "report.png", type: "application/pdf", size: 10 }),
    ).toBe("The filename extension does not match the selected file type.");
  });
});
