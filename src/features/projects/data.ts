export type Project = {
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  metric: string;
  github?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  preview: "dashboard" | "jobboard" | "website" | "marketplace";
};

export const projects: Project[] = [
  {
    name: "VeganFit",
    subtitle: "Full-Stack Vegan Fitness Platform",
    description:
      "Helps people build strength on a 100% plant-based diet: members are matched with a vegan coach, get personalised nutrition targets and meal plans, and track their progress. A website, Android and iOS app, and admin and coach portal all share one typed REST and real-time API.",
    tech: [
      "Next.js 16",
      "React Native (Expo)",
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "Stripe",
      "Claude API",
    ],
    features: [
      "Six-step onboarding with weekly-adjusted calorie and macro targets",
      "Coach matching, plan reviews and direct messaging",
      "VegaBot AI nutrition coach built on Claude",
      "Workout logging, personal records, streaks and PDF progress reports",
      "Vegan barcode scanner using Open Food Facts",
      "Community feed, challenges, leaderboards and badges",
      "Vegan store with Stripe checkout and order tracking",
      "Real-time messaging over Socket.IO",
      "Email OTP, Google sign-in, JWT sessions and role-based access",
      "Push notifications and scheduled reminders",
    ],
    metric: "Four apps on one typed API of ~30 feature modules, now in beta",
    github: "https://github.com/veganverse2026-netizen/veg-backend",
    liveUrl: "https://veganfit-frontend.vercel.app",
    preview: "dashboard",
  },
  {
    name: "Job Post Portal",
    subtitle: "Modern Job Discovery Platform",
    description:
      "A responsive job discovery product with advanced filtering, REST API integrations, and a reusable component architecture built on Shadcn UI.",
    tech: ["React", "Tailwind CSS", "Shadcn UI", "REST APIs"],
    features: [
      "Fully responsive job search experience",
      "Advanced job filtering",
      "REST API integrations",
      "Reusable UI system",
      "Shadcn UI component architecture",
    ],
    metric: "60% improvement in search efficiency",
    github: "https://github.com/Deep1416",
    preview: "jobboard",
  },
  {
    name: "Shinemed Pharmaceuticals",
    subtitle: "Company Website & Technical SEO",
    description:
      "Built the complete website for a Delhi-based pharmaceutical company and optimised it for search. Product pages are generated from a single JSON catalogue, and an automated linter keeps every page's SEO correct before deployment.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "PHP", "Schema.org / JSON-LD"],
    features: [
      "14 product pages generated from one JSON catalogue",
      "Unique titles, descriptions, canonicals and Open Graph tags per page",
      "Product, Offer, Organization and Breadcrumb structured data",
      "Generated sitemap.xml and robots.txt",
      "SEO linter for titles, canonicals, JSON-LD, links and sitemap",
      "Caching, compression and custom 404 via .htaccess",
      "PHP contact form",
    ],
    metric: "Ranks first in Google search results for the company",
    github: "https://github.com/Deep1416/shimed_static",
    liveUrl: "https://shinemedpharmaceuticals.com/",
    preview: "website",
  },
  {
    name: "OfficeMate",
    subtitle: "Virtual Office Marketplace & Local SEO",
    description:
      "A marketplace for virtual office addresses across India, used for GST registration, company registration and APOB. Businesses compare offices by city, book online and track their booking, while an admin dashboard manages leads and bookings. Every page is prerendered and optimised for city-level search.",
    tech: [
      "React",
      "TanStack Router",
      "Vite",
      "Tailwind CSS",
      "Google Apps Script",
      "Schema.org / JSON-LD",
    ],
    features: [
      "15 office listings in 11 cities across 9 states",
      "Online booking with booking-status tracking",
      "Quote and lead forms with WhatsApp contact",
      "Admin dashboard for leads and bookings",
      "Prerendered static pages for fast, crawlable loads",
      "Unique local content on every city and state page",
      "LocalBusiness, Offer, FAQ, Article and Breadcrumb structured data",
      "Service pages and blog targeting GST and virtual office searches",
    ],
    metric: "56 search-optimised pages targeting 'virtual office in <city>' searches",
    github: "https://github.com/Deep1416/officemate_static",
    liveUrl: "https://www.officemate.co.in/",
    preview: "marketplace",
  },
];
