import type { MetadataRoute } from "next";
import { getPosts } from "@/features/blog/data";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Absolute URLs are required; nothing to list until NEXT_PUBLIC_SITE_URL is set.
  if (!site.url) return [];
  const posts = getPosts();
  const latest = posts[0]?.updated ?? posts[0]?.date;

  return [
    { url: site.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
