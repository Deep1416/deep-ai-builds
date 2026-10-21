import { createFileRoute } from "@tanstack/react-router";
import { homeHead } from "@/features/home/seo";
import { HomePage } from "@/features/home/pages/home-page";

export const Route = createFileRoute("/")({
  head: homeHead,
  component: HomePage,
});
