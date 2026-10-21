import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import "@/styles.css";

// Tags baked in by scripts/prerender.mjs are for crawlers; the router's
// <HeadContent /> owns them once the app is running.
document.head.querySelectorAll("[data-prerender]").forEach((node) => node.remove());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
