import type { createAuth } from "../auth/auth";
import type { Bindings } from "./bindings";

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth["$Infer"]["Session"];

export type AppEnv = {
  Bindings: Bindings;
  Variables: {
    requestId: string;
    session: Session;
  };
};
