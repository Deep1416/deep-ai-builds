import { createFileRoute } from "@tanstack/react-router";
import { routeHead } from "@/lib/seo";
import { homeHead } from "@/features/home/seo";
import { HomePage } from "@/features/home/pages/home-page";

export const Route = createFileRoute("/")({
  head: () => routeHead(homeHead()),
  component: HomePage,
});
