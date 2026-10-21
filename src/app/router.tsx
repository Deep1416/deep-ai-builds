import { createRouter, type RouterHistory } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    ...(history && { history }),
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
