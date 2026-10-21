import { Link } from "@tanstack/react-router";

export function PostNotFound() {
  return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Article not found</h1>
      <p className="mt-3 text-muted-foreground">This post may have been renamed or removed.</p>
      <Link to="/blog" className="mt-6 text-primary underline underline-offset-4">
        Browse all articles
      </Link>
    </div>
  );
}
