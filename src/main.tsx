import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { createAppRouter } from "@/app/router";
import "@/styles.css";

// Tags baked in by scripts/prerender.mjs are for crawlers; the router's
// <HeadContent /> owns them once the app is running.
document.head.querySelectorAll("[data-prerender]").forEach((node) => node.remove());

// Prerendered pages ship static markup inside #root for crawlers and no-JS
// visitors. The router renders client-side (not hydrated) and replaces it:
// TanStack Router's server and browser trees differ, so hydration would mismatch.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={createAppRouter()} />
  </StrictMode>,
);
