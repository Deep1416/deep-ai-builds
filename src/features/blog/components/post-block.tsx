import type { BlogBlock } from "@/features/blog/data";
import { headingId } from "@/features/blog/heading-id";

export function PostBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={headingId(block.text)} className="pt-6 text-xl font-semibold sm:text-2xl">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="text-base leading-[1.8] text-muted-foreground">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-3 pl-5">
          {block.items.map((item) => (
            <li key={item} className="list-disc text-base leading-[1.8] text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-border/70 bg-surface/70 p-5">
          <code className="font-mono text-[13px] leading-relaxed text-foreground/90">
            {block.code}
          </code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary/60 pl-5 text-base leading-[1.8] text-foreground/90 italic">
          {block.text}
        </blockquote>
      );
  }
}
