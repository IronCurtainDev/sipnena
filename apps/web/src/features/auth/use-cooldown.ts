import { useEffect, useState } from "react";

// Counts down once per second so repeat sends wait out a short delay.
export function useCooldown(initialSeconds = 0) {
  const [remaining, setRemaining] = useState(initialSeconds);
  useEffect(() => {
    if (remaining <= 0) return;
    const timer = window.setTimeout(() => setRemaining(remaining - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [remaining]);
  return { remaining, start: (seconds: number) => setRemaining(seconds) };
}
