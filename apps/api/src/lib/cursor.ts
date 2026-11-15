import { z } from "zod";
import { AppError } from "./errors";

const cursorSchema = z.tuple([z.iso.datetime(), z.uuid()]);

export function decodeCursor(cursor: string) {
  try {
    return cursorSchema.parse(
      JSON.parse(atob(cursor.replaceAll("-", "+").replaceAll("_", "/"))),
    );
  } catch {
    throw new AppError("INVALID_CURSOR", "Pagination cursor is invalid");
  }
}

export function encodeCursor(row: { createdAt: string; id: string }) {
  return btoa(JSON.stringify([row.createdAt, row.id]))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}
