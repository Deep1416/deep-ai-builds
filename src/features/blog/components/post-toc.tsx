import { useEffect, useState } from "react";
import { headingId } from "@/features/blog/heading-id";
import type { BlogPost } from "@/features/blog/data";
import { cn } from "@/lib/utils";

/** Sticky "On this page" list for long articles. Hidden below lg. */
export function PostToc({ body }: { body: BlogPost["body"] }) {
  const headings = body.flatMap((block) => (block.type === "h2" ? [block.text] : []));
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((text) => document.getElementById(headingId(text)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    // headings is derived from body, which is stable for a given post
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  if (headings.length < 2) return null;

  return (
    <aside className="sticky top-28 hidden self-start lg:block" aria-label="On this page">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        On this page
      </p>
      <ol className="mt-4 space-y-1 border-l border-border/70">
        {headings.map((text) => {
          const id = headingId(text);
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground",
                  active === id
                    ? "border-primary text-foreground"
                    : "border-transparent hover:border-border",
                )}
              >
                {text.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
