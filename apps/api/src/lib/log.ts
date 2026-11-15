// Logs are JSON lines for Workers Logs. Never pass request bodies, headers,
// cookies, or full URLs: callback paths and email links carry one-use tokens.
type Level = "error" | "warn" | "info";

export function redact(text: string) {
  return text
    .replace(/https?:\/\/\S+/g, "[url]")
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[email]")
    .slice(0, 500);
}

// Pass includeMessage: false where messages may embed values redact() cannot
// recognise, such as database errors raised inside Better Auth.
export function describeError(error: unknown, { includeMessage = true } = {}) {
  if (!(error instanceof Error))
    return {
      errorName: typeof error,
      errorMessage: includeMessage ? redact(String(error)) : undefined,
    };
  return {
    errorName: error.name,
    errorMessage: includeMessage ? redact(error.message) : undefined,
    stack: error.stack
      ? redact(error.stack.split("\n").slice(1, 6).join("\n"))
      : undefined,
  };
}

export function logEvent(
  level: Level,
  event: string,
  fields: Record<string, unknown> = {},
) {
  console[level](JSON.stringify({ event, level, ...fields }));
}
