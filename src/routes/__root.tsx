import { Outlet, createRootRoute, HeadContent } from "@tanstack/react-router";
import { site } from "@/config/site";
import { ErrorState } from "@/components/feedback/error-state";
import { NotFound } from "@/components/feedback/not-found";

export const Route = createRootRoute({
  head: () => ({ meta: [{ title: site.seo.title }] }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  notFoundComponent: NotFound,
  errorComponent: ErrorState,
});
