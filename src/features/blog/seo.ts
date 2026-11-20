import { site } from "@/config/site";
import { OG_IMAGE_PATH, absoluteUrl, buildMetadata } from "@/lib/seo";
import { blogMeta, sortedPosts, type BlogPost } from "@/features/blog/data";

const author = (withUrl: boolean) => ({
  "@type": "Person",
  name: site.name,
  ...(withUrl && { url: absoluteUrl("/") }),
});

const blogIndexTitle = `${blogMeta.title} — ${site.name}`;

export const blogIndexMetadata = buildMetadata({
  title: blogIndexTitle,
  description: blogMeta.description,
  path: "/blog",
  ogType: "website",
});

export const blogIndexJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogIndexTitle,
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
];

export const blogPostMetadata = (post: BlogPost) =>
  buildMetadata({
    title: `${post.title} — ${site.name}`,
    socialTitle: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: "article",
    keywords: [...post.tags],
    article: {
      publishedTime: post.date,
      ...(post.updated && { modifiedTime: post.updated }),
      tags: [...post.tags],
    },
  });

export const blogPostJsonLd = (post: BlogPost) => {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return [
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
  ];
};
