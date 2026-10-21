import { createFileRoute } from "@tanstack/react-router";
import { routeHead } from "@/lib/seo";
import { blogIndexHead } from "@/features/blog/seo";
import { BlogIndexPage } from "@/features/blog/pages/blog-index-page";

export const Route = createFileRoute("/blog/")({
  head: () => routeHead(blogIndexHead()),
  component: BlogIndexPage,
});
