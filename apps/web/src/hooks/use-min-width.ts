import { useEffect, useState } from "react";

/** Subscribe to `(min-width: ${px}px)` — for mounting one responsive tree only. */
export function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${px}px)`).matches
      : false,
  );

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${px}px)`);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [px]);

  return matches;
}
