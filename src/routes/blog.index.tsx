import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { blogMeta, sortedPosts } from "@/data/blog";
import { site } from "@/data/portfolio";

const pageTitle = `${blogMeta.title} — ${site.name}`;
const pageUrl = `${site.url}/blog`;

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: pageTitle,
  description: blogMeta.description,
  url: pageUrl,
  author: { "@type": "Person", name: site.name, url: site.url },
  blogPost: sortedPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Person", name: site.name },
  })),
};

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: blogMeta.description },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: blogMeta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: blogMeta.description },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(blogSchema) }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <ScrollProgress />
      <main className="container-page pt-28 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to portfolio
        </Link>

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
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
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
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
