import { useState } from "react";
import { useAction } from "@/hooks/use-action";

// Tracks which row action is running so only that row's controls disable.
export function useRowAction() {
  const action = useAction();
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  async function run(key: string, task: () => Promise<void>, message: string) {
    setPendingKey(key);
    try {
      return await action.run(task, message);
    } finally {
      setPendingKey(null);
    }
  }
  return {
    run,
    busy: (key: string) => pendingKey === key,
    pending: action.pending,
    error: action.error,
    message: action.message,
  };
}

export type RowAction = ReturnType<typeof useRowAction>;
