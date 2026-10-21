/** Site-wide identity and contact details. */

export const site = {
  name: "Deependra Rajput",
  initials: "DR",
  title: "Full Stack Developer | AI Engineer",
  heroTitle: "Building Scalable Products & Production AI Systems",
  location: "Gwalior, Madhya Pradesh, India",
  summary:
    "Full Stack Developer with 3+ years of experience building and deploying LLM-powered applications, generative AI pipelines, AI voice automation systems, scalable APIs, and modern web applications using Python, FastAPI, React, Next.js, Node.js, PostgreSQL, Redis, and cloud technologies.",
  email: "deependrarajput1416@gmail.com",
  github: "https://github.com/Deep1416",
  linkedin: "https://linkedin.com/in/deependra14",
  /** Canonical origin from VITE_SITE_URL; empty until a production domain is configured. */
  url: (import.meta.env.VITE_SITE_URL ?? "").replace(/\/+$/, ""),
  seo: {
    title: "Deependra Rajput | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer and AI Engineer building scalable web applications, LLM-powered systems, AI voice automation, and production backend platforms using Python, FastAPI, React, Next.js, Node.js, Redis, PostgreSQL, AWS and GCP.",
  },
} as const;
