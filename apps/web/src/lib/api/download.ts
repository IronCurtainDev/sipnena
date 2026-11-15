async function parseError(response: Response) {
  const fallback = `Download failed with ${response.status}`;
  const body = (await response.json().catch(() => null)) as {
    error?: { message?: string };
    message?: string;
  } | null;
  return body?.error?.message ?? body?.message ?? fallback;
}

export async function downloadApiFile(path: string, filename: string) {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: "include",
      headers: apiKeyHeaders,
      signal: requestSignal(),
    });
  } catch (error) {
    if (isTimeoutError(error))
      throw new Error("The download timed out. Please try again.", {
        cause: error,
      });
    throw error;
  }
  if (!response.ok) throw new Error(await parseError(response));

  const url = URL.createObjectURL(await response.blob());
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
import { apiKeyHeaders } from "./key";
import { isTimeoutError, requestSignal } from "./request";
