const SESSION_KEY = "sipnena_demo_mode";

export function isDemoModeEnabled(): boolean {
  if (import.meta.env.VITE_DEMO_MODE === "true") return true;
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("demo");
    if (param === "1") {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      return true;
    }
    if (param === "0") {
      window.sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
