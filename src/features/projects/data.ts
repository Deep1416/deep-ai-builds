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
  preview: "dashboard" | "jobboard";
};

export const projects: Project[] = [
  {
    name: "VeganFit",
    subtitle: "AI-Powered Full Stack Platform",
    description:
      "Production-grade platform built across three repositories including a REST API backend, customer-facing Next.js application, and administration dashboard.",
    tech: ["Node.js", "TypeScript", "Next.js 14", "PostgreSQL", "Prisma", "Stripe", "OpenAI API"],
    features: [
      "OTP authentication",
      "JWT sessions",
      "RBAC for three user roles",
      "Stripe webhook-based order processing",
      "Community feed",
      "Real-time notifications",
      "Admin dashboard",
      "AI chatbot",
      "RAG over product and FAQ information",
    ],
    metric: "~40% reduction in repetitive support queries through the AI assistant",
    github: "https://github.com/Deep1416",
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
];
