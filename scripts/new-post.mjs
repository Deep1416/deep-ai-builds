// Usage: npm run new-post "My post title"
// Creates content/blog/<slug>.md with today's date and front matter to fill in.
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new-post "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const file = path.join("content", "blog", `${slug}.md`);
if (existsSync(file)) {
  console.error(`${file} already exists. Pick a different title.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: "One or two sentences shown on the blog list and in search results."
date: "${today}"
tags: []
draft: true
---

Write your intro here.

## First section

Normal **Markdown** works: lists, links, \`inline code\`, tables and fenced code blocks.
`,
);
console.log(`Created ${file}\nSet draft: false (or delete the line) when it's ready to publish.`);
