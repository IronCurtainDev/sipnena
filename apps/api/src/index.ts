import { app } from "./app";
import { runMaintenance } from "./maintenance";
import type { Bindings } from "./types/bindings";

export default {
  fetch: app.fetch,
  scheduled(_controller, env, ctx) {
    ctx.waitUntil(runMaintenance(env));
  },
} satisfies ExportedHandler<Bindings>;
