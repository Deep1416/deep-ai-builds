import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { PostMeta } from "@/features/blog/components/post-meta";
import { sortedPosts } from "@/features/blog/data";

export function BlogSection() {
  const posts = sortedPosts.slice(0, 3);

  return (
    <section
      id="blog"
      aria-labelledby="blog-title"
      className="border-t border-border/60 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Writing"
          title={<span id="blog-title">Engineering notes from production work</span>}
          description="Deep dives on LLM latency, AI voice architecture, FastAPI backends and retrieval systems — written from systems I have actually shipped."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="hover-lift spotlight group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-6 transition-colors hover:border-primary/40"
                >
                  <PostMeta post={post} className="gap-2" />
                  <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] text-foreground uppercase">
                    Read article
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={240} className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-4 py-2.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
          >
            View all articles
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
