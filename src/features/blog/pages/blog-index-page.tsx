import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BackLink } from "@/features/blog/components/back-link";
import { BlogLayout } from "@/features/blog/components/blog-layout";
import { PostMeta } from "@/features/blog/components/post-meta";
import { TagList } from "@/features/blog/components/tag-list";
import { blogMeta, sortedPosts } from "@/features/blog/data";

export function BlogIndexPage() {
  return (
    <BlogLayout>
      <BackLink to="/">Back to portfolio</BackLink>

      <Reveal className="mt-8 max-w-3xl">
        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Writing
        </p>
        <h1 className="text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl">
          {blogMeta.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {blogMeta.description}
        </p>
      </Reveal>

      <ul className="mt-16 space-y-4">
        {sortedPosts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 70}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="hover-lift spotlight group block rounded-2xl border border-border/70 bg-surface/60 p-6 transition-colors hover:border-primary/40 sm:p-8"
              >
                <PostMeta post={post} className="gap-3" />
                <h2 className="mt-4 flex items-start gap-2 text-xl font-semibold sm:text-2xl">
                  <span className="group-hover:text-primary transition-colors">{post.title}</span>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.description}
                </p>
                <TagList tags={post.tags} className="mt-5" />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </BlogLayout>
  );
}
