import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/theme/theme-provider";
import { queryClient } from "./lib/api/query-client";
import { getSavedLanguage, syncDocumentLanguage } from "./lib/language";
import { router } from "./router";
import "./styles/global.css";

syncDocumentLanguage(getSavedLanguage());

if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    });
  } else {
    void navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((reg) => void reg.unregister()))
      .catch(() => undefined);
  }
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
