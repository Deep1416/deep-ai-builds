import Link from "next/link";
import type { ReactNode } from "react";
import type { PostSummary } from "@/features/blog/listing";

/** Internal link for site articles; new tab for posts hosted on dev.to. */
export function PostLink({
  post,
  className,
  children,
}: {
  post: PostSummary;
  className: string;
  children: ReactNode;
}) {
  if (post.source === "site") {
    return (
      <Link href={post.href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={post.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens dev.to in a new tab)</span>
    </a>
  );
}
