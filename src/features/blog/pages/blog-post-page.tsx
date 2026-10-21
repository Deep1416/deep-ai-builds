import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/reveal";
import { BackLink } from "@/features/blog/components/back-link";
import { BlogLayout } from "@/features/blog/components/blog-layout";
import { PostBlock } from "@/features/blog/components/post-block";
import { PostMeta } from "@/features/blog/components/post-meta";
import { TagList } from "@/features/blog/components/tag-list";
import { sortedPosts, type BlogPost } from "@/features/blog/data";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const others = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <BlogLayout>
      <BackLink to="/blog">All articles</BackLink>

      <article className="mt-8">
        <Reveal className="max-w-3xl">
          <PostMeta post={post} className="gap-3" />
          <h1 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.description}
          </p>
          <TagList tags={post.tags} className="mt-6" />
        </Reveal>

        <div className="mt-14 max-w-3xl space-y-6">
          {post.body.map((block, i) => (
            <PostBlock key={i} block={block} />
          ))}
        </div>
      </article>

      {others.length ? (
        <section
          aria-labelledby="more-reading"
          className="mt-24 max-w-3xl border-t border-border/70 pt-10"
        >
          <h2
            id="more-reading"
            className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
          >
            More reading
          </h2>
          <ul className="mt-6 space-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="hover-lift block rounded-xl border border-border/70 bg-surface/60 p-5 transition-colors hover:border-primary/40"
                >
                  <span className="text-base font-medium">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </BlogLayout>
  );
}
