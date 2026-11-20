/**
 * Blog content lives in `content/blog/<slug>.md` (Markdown with YAML front matter).
 * Run `npm run new-post "My title"` to start a post; see README "Writing a blog post".
 * Files are read from disk, so this module is server-only.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  updated?: string;
  readingTime: string;
  tags: readonly string[];
  /** Markdown body (front matter removed). */
  body: string;
  /** `##` headings in order, for the table of contents. */
  headings: readonly string[];
};

export const blogMeta = {
  title: "Engineering Notes",
  description:
    "Practical notes on production LLM systems, AI voice automation, FastAPI backends, and shipping full stack products that survive real traffic.",
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

/** YAML turns unquoted `2026-11-21` into a Date; normalise both forms to `YYYY-MM-DD`. */
function isoDate(value: unknown, field: string, file: string): string {
  const iso = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error(`${file}: "${field}" must be a date like 2026-11-21`);
  }
  return iso;
}

function requiredText(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${file}: "${field}" is required in the front matter`);
  }
  return value.trim();
}

function loadPost(file: string): BlogPost | null {
  const { data, content } = matter(readFileSync(path.join(CONTENT_DIR, file), "utf8"));
  if (data["draft"] === true) return null;

  const body = content.trim();
  const prose = body.replace(/```[\s\S]*?```/g, "");
  const words = prose.split(/\s+/).filter(Boolean).length;
  const tags: unknown = data["tags"] ?? [];
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    throw new Error(`${file}: "tags" must be a list, e.g. [LLM, FastAPI]`);
  }

  return {
    slug: file.replace(/\.md$/, ""),
    title: requiredText(data["title"], "title", file),
    description: requiredText(data["description"], "description", file),
    date: isoDate(data["date"], "date", file),
    ...(data["updated"] !== undefined && { updated: isoDate(data["updated"], "updated", file) }),
    readingTime:
      typeof data["readingTime"] === "string"
        ? data["readingTime"]
        : `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`,
    tags,
    body,
    headings: [...prose.matchAll(/^##\s+(.+?)\s*$/gm)].map((match) =>
      (match[1] ?? "").replace(/[*_`]/g, ""),
    ),
  };
}

/**
 * All published posts, newest first. Read per request (deduplicated within a render)
 * so `npm run dev` picks up new files on refresh; production pages are static anyway.
 */
export const getPosts = cache((): readonly BlogPost[] =>
  readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(loadPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1)),
);

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
