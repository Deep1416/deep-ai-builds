import { useEffect, useRef } from "react";
import { Outlet, createRootRoute, HeadContent, useRouterState } from "@tanstack/react-router";
import { site } from "@/config/site";
import { ErrorState } from "@/components/feedback/error-state";
import { NotFound } from "@/components/feedback/not-found";
import { BackToTop } from "@/components/layout/back-to-top";

function RootLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  // Fade pages in on navigation only; the first load must not delay first paint.
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
      <HeadContent />
      <div
        key={pathname}
        className={
          isFirstRender.current
            ? undefined
            : "animate-in duration-500 fade-in motion-reduce:animate-none"
        }
      >
        <Outlet />
      </div>
      <BackToTop />
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({ meta: [{ title: site.seo.title }] }),
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorState,
});
