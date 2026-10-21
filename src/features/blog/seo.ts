import { site } from "@/config/site";
import { OG_IMAGE_PATH, absoluteUrl, buildHead, type PageHead } from "@/lib/seo";
import { blogMeta, sortedPosts, type BlogPost } from "@/features/blog/data";

const author = (withUrl: boolean) => ({
  "@type": "Person",
  name: site.name,
  ...(withUrl && { url: absoluteUrl("/") }),
});

export const blogIndexHead = () => {
  const title = `${blogMeta.title} — ${site.name}`;
  return buildHead({
    title,
    description: blogMeta.description,
    path: "/blog",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: title,
        description: blogMeta.description,
        url: absoluteUrl("/blog"),
        author: author(true),
        blogPost: sortedPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: absoluteUrl(`/blog/${post.slug}`),
          author: author(false),
        })),
      },
    ],
  });
};

export const blogPostHead = (post: BlogPost) => {
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  return buildHead({
    title: `${post.title} — ${site.name}`,
    socialTitle: post.title,
    description: post.description,
    path,
    ogType: "article",
    extraMeta: [
      { name: "keywords", content: post.tags.join(", ") },
      { property: "article:published_time", content: post.date },
      { property: "article:author", content: site.name },
      ...(post.updated ? [{ property: "article:modified_time", content: post.updated }] : []),
      ...post.tags.map((tag) => ({ property: "article:tag", content: tag })),
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        keywords: post.tags.join(", "),
        image: absoluteUrl(OG_IMAGE_PATH),
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: author(true),
        publisher: author(true),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  });
};

export const postUnavailableHead = (): PageHead => ({
  meta: [{ title: `Article unavailable — ${site.name}` }, { name: "robots", content: "noindex" }],
  links: [],
  scripts: [],
});
