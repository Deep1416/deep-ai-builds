import { formatDate } from "@/features/blog/data";
import { cn } from "@/lib/utils";

type Props = {
  post: { date: string; readingTime: string; source?: "site" | "dev.to" };
  className?: string;
};

export function PostMeta({ post, className }: Props) {
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
      {post.source === "dev.to" ? (
        <>
          <span aria-hidden="true">·</span>
          <span className="text-primary">on DEV</span>
        </>
      ) : null}
    </div>
  );
}
