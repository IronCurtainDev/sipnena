import { lazyRouteComponent } from "@tanstack/react-router";

export const PreparingCoursesPage = lazyRouteComponent(
  () => import("../features/onboarding/preparing-courses-screen"),
  "PreparingCoursesLoadingScreen",
);
