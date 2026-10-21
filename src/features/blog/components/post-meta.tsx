import { formatDate, type BlogPost } from "@/features/blog/data";
import { cn } from "@/lib/utils";

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase",
        className,
      )}
    >
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingTime}</span>
    </div>
  );
}
