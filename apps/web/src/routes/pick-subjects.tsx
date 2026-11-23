import { lazyRouteComponent } from "@tanstack/react-router";

export const PickSubjectsPage = lazyRouteComponent(
  () => import("../features/pick-subjects/screen"),
  "PickSubjectsScreen",
);
