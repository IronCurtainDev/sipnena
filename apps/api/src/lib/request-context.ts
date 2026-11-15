import { AsyncLocalStorage } from "node:async_hooks";

// Lets isolate-wide singletons (such as the Better Auth instance) attribute
// their logs to the request currently being served.
export const requestContext = new AsyncLocalStorage<{ requestId: string }>();

export function currentRequestId() {
  return requestContext.getStore()?.requestId;
}
