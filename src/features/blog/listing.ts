import { getPosts } from "@/features/blog/data";

/** A post as shown in lists: either an article on this site or one published on dev.to. */
export type PostSummary = {
  key: string;
  title: string;
  description: string;
  date: string; // ISO date
  readingTime: string;
  tags: readonly string[];
  href: string;
  source: "site" | "dev.to";
};

type DevToArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
};

/** How often (seconds) the site re-checks dev.to, so new posts appear without a redeploy. */
const DEVTO_REVALIDATE_SECONDS = 3600;

const isDevToArticle = (value: unknown): value is DevToArticle => {
  const a = value as Partial<DevToArticle> | null;
  return (
    typeof a?.title === "string" &&
    typeof a.url === "string" &&
    typeof a.published_at === "string" &&
    Array.isArray(a.tag_list)
  );
};

/** Published dev.to articles for DEVTO_USERNAME. Never throws: the blog still renders if dev.to is down. */
async function getDevToPosts(): Promise<PostSummary[]> {
  const username = process.env.DEVTO_USERNAME?.trim();
  if (!username) return [];

  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=100`,
      { next: { revalidate: DEVTO_REVALIDATE_SECONDS } },
    );
    if (!response.ok) throw new Error(`dev.to responded ${response.status}`);
    const articles: unknown = await response.json();
    if (!Array.isArray(articles)) throw new Error("unexpected dev.to response");

    return articles.filter(isDevToArticle).map((article) => ({
      key: `devto-${article.id}`,
      title: article.title,
      description: article.description,
      date: article.published_at.slice(0, 10),
      readingTime: `${Math.max(1, article.reading_time_minutes)} min read`,
      tags: article.tag_list,
      href: article.url,
      source: "dev.to" as const,
    }));
  } catch (error) {
    console.error("Could not load dev.to posts:", error);
    return [];
  }
}

/** Site articles and dev.to posts together, newest first. */
export async function getPostListing(): Promise<PostSummary[]> {
  const site = getPosts().map((post): PostSummary => ({
    key: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags,
    href: `/blog/${post.slug}`,
    source: "site",
  }));
  const devTo = await getDevToPosts();
  return [...site, ...devTo].sort((a, b) => (a.date < b.date ? 1 : -1));
}
