import { createFileRoute, notFound } from "@tanstack/react-router";
import { PostNotFound } from "@/features/blog/components/post-not-found";
import { getPost } from "@/features/blog/data";
import { routeHead } from "@/lib/seo";
import { BlogPostPage } from "@/features/blog/pages/blog-post-page";
import { blogPostHead, postUnavailableHead } from "@/features/blog/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) =>
    routeHead(loaderData ? blogPostHead(loaderData.post) : postUnavailableHead()),
  component: PostRoute,
  notFoundComponent: PostNotFound,
});

function PostRoute() {
  const { post } = Route.useLoaderData();
  return <BlogPostPage post={post} />;
}
