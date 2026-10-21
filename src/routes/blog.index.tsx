import { createFileRoute } from "@tanstack/react-router";
import { blogIndexHead } from "@/features/blog/seo";
import { BlogIndexPage } from "@/features/blog/pages/blog-index-page";

export const Route = createFileRoute("/blog/")({
  head: blogIndexHead,
  component: BlogIndexPage,
});
