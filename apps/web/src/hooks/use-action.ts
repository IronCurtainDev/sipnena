import { useRef, useState } from "react";

export function useAction() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const running = useRef(false);

  async function run(action: () => Promise<void>, successMessage = "") {
    if (running.current) return false;
    running.current = true;
    setPending(true);
    setError("");
    setMessage("");
    try {
      await action();
      setMessage(successMessage);
      return true;
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.",
      );
      return false;
    } finally {
      running.current = false;
      setPending(false);
    }
  }

  return { pending, error, message, run };
}
