import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { formatDate, getPost, sortedPosts, type BlogPost } from "@/data/blog";
import { site } from "@/data/portfolio";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const url = `${site.url}/blog/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [{ title: `Article unavailable — ${site.name}` }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} — ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: post.description },
        { name: "keywords", content: post.tags.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: site.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            keywords: post.tags.join(", "),
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Person", name: site.name, url: site.url },
            publisher: { "@type": "Person", name: site.name, url: site.url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
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

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const others = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <ScrollProgress />
      <main className="container-page pt-28 pb-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> All articles
        </Link>

        <article className="mt-8">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/70 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-14 max-w-3xl space-y-6">
            {post.body.map((block, i) => (
              <PostBlock key={i} block={block} />
            ))}
          </div>
        </article>

        {others.length ? (
          <section aria-labelledby="more-reading" className="mt-24 max-w-3xl border-t border-border/70 pt-10">
            <h2 id="more-reading" className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
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
      </main>
      <SiteFooter />
    </div>
  );
}

function PostBlock({ block }: { block: BlogPost["body"][number] }) {
  switch (block.type) {
    case "h2":
      return <h2 className="pt-6 text-xl font-semibold sm:text-2xl">{block.text}</h2>;
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
          <code className="font-mono text-[13px] leading-relaxed text-foreground/90">{block.code}</code>
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
