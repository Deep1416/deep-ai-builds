import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { createAppRouter } from "@/app/router";

/** Renders a route to an HTML string. Used only by scripts/prerender.mjs at build time. */
export async function renderPage(path: string): Promise<string> {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [path] }));
  await router.load();
  return renderToString(<RouterProvider router={router} />);
}
