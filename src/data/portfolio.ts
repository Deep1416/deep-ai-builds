/**
 * Centralized site content & configuration.
 * Update everything about the portfolio from this single file.
 */

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
  resumeUrl: "/resume.pdf",
  url: "https://deep-ai-builds.lovable.app",
  seo: {
    title: "Deependra Rajput | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer and AI Engineer building scalable web applications, LLM-powered systems, AI voice automation, and production backend platforms using Python, FastAPI, React, Next.js, Node.js, Redis, PostgreSQL, AWS and GCP.",
  },
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroMetrics = [
  { value: "3+", label: "Years Professional Experience" },
  { value: "3,000+", label: "Daily AI Voice Interactions" },
  { value: "40%", label: "LLM Latency Reduction" },
  { value: "300+", label: "DSA Problems Solved" },
] as const;

export const marqueeTech = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "OpenAI",
  "GitHub Actions",
] as const;

export const aboutParagraphs = [
  "I enjoy building products end-to-end—from converting business requirements into scalable backend architectures to crafting polished frontend experiences.",
  "My recent work has focused heavily on Generative AI, LLM integrations, production voice automation, high-concurrency APIs, performance optimisation, and AI-assisted workflows.",
  "I care about more than getting features working. I focus on architecture, performance, reliability, testing, reusable systems, and building software that can survive real production traffic.",
] as const;

export const aboutCards = [
  {
    icon: "layers",
    title: "Product Engineering",
    body: "Building complete applications from frontend to backend and deployment.",
  },
  {
    icon: "brain",
    title: "AI Engineering",
    body: "LLM integrations, RAG, AI voice automation, prompt optimisation, and production AI workflows.",
  },
  {
    icon: "server",
    title: "Scalable Backend Systems",
    body: "FastAPI, Node.js, REST APIs, Redis, PostgreSQL, microservices, caching, and high-concurrency architectures.",
  },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  highlights: { metric?: string; text: string }[];
};

export const experience: Experience[] = [
  {
    company: "Synthlane Pvt. Ltd.",
    role: "Software Development Engineer I",
    period: "Apr 2025 – Present",
    highlights: [
      {
        metric: "3,000+ calls/day",
        text: "Built Python-based LLM backend services for inbound and outbound AI voice calling.",
      },
      {
        metric: "~40% faster",
        text: "Reduced average LLM latency from 1.2s to 0.7s using Redis caching and optimisation.",
      },
      {
        metric: "~25% accuracy",
        text: "Improved production LLM response accuracy through prompt engineering and workflow optimisation.",
      },
      {
        metric: "500+ chats/day",
        text: "Built OpenAI-compatible generative AI messaging adapters handling real-time conversations.",
      },
      {
        metric: "~50% faster releases",
        text: "Automated CI/CD pipelines with GitHub Actions.",
      },
      { metric: "85%+ coverage", text: "Increased backend AI pipeline test coverage using Pytest." },
      { text: "Designed REST APIs and OpenAPI/Swagger contracts across microservices." },
      { text: "Mentored 3 junior developers and contributed to architecture decisions." },
    ],
  },
  {
    company: "Fibonacci Innovative Solutions LLP",
    role: "Associate Software Engineer",
    period: "Apr 2024 – Apr 2025",
    highlights: [
      { text: "Built responsive React and Next.js applications." },
      { metric: "~20% engagement", text: "Improved user engagement across important product flows." },
      {
        metric: "5+ projects",
        text: "Created a reusable Storybook component library adopted across teams.",
      },
      { metric: "~30% faster UI", text: "Reduced UI development time with shared component systems." },
      { metric: "80%+ coverage", text: "Achieved frontend test coverage with Vitest." },
      { metric: "15+ PRs/sprint", text: "Reviewed pull requests and upheld code quality standards." },
      { text: "Worked closely with product designers and backend engineers." },
    ],
  },
  {
    company: "Geekster",
    role: "Software Developer & Technical Assistant — MERN",
    period: "Jul 2023 – Apr 2024",
    highlights: [
      { metric: "10+ apps", text: "Built and supported MERN applications." },
      { metric: "500+ learners", text: "Developed AI-assisted education tools." },
      { metric: "50+ engineers", text: "Mentored developers across full-stack tracks." },
      {
        metric: "200+ queries",
        text: "Resolved technical queries through code reviews and 1:1 sessions.",
      },
      { metric: "5/5 rating", text: "Consistently received top mentorship ratings." },
    ],
  },
];

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

export const aiCards = [
  {
    icon: "sparkles",
    title: "LLM Integration",
    body: "OpenAI-compatible APIs, prompt engineering, conversational workflows, and AI-powered application features.",
  },
  {
    icon: "phone",
    title: "Voice AI",
    body: "Inbound and outbound AI calling workflows handling thousands of daily conversations.",
  },
  {
    icon: "database",
    title: "RAG Systems",
    body: "Retrieval-augmented generation over product, knowledge base, and FAQ information.",
  },
  {
    icon: "gauge",
    title: "AI Performance",
    body: "Redis caching, prompt optimisation, latency reduction, reliability, observability, and testing.",
  },
] as const;

export const aiStats = [
  { value: "3,000+", label: "AI voice interactions / day" },
  { value: "500+", label: "Real-time AI conversations / day" },
  { value: "40%", label: "Lower LLM latency" },
  { value: "25%", label: "Improved response accuracy" },
] as const;

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Microservices",
      "WebSockets",
      "Swagger / OpenAPI",
      "JWT",
      "RBAC",
    ],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI", "Storybook", "Responsive Design"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "Caching", "Query Optimisation"],
  },
  {
    title: "AI",
    items: [
      "Generative AI",
      "LLM APIs",
      "OpenAI API",
      "RAG",
      "Prompt Engineering",
      "Voice AI",
      "AI Workflow Automation",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Git", "GitHub"],
  },
  {
    title: "Testing",
    items: ["Pytest", "Vitest", "Supertest", "TDD", "Unit Testing", "Integration Testing"],
  },
] as const;

export const impactNumbers = [
  { value: 3, suffix: "+", label: "Years Building Products" },
  { value: 3, suffix: "K+", label: "Daily AI Calls" },
  { value: 500, suffix: "+", label: "Daily AI Conversations" },
  { value: 40, suffix: "%", label: "Lower LLM Latency" },
  { value: 85, suffix: "%+", label: "AI Pipeline Test Coverage" },
  { value: 50, suffix: "+", label: "Engineers Mentored" },
  { value: 300, suffix: "+", label: "DSA Problems Solved" },
] as const;

export const achievements = [
  {
    title: "300+ DSA Problems",
    body: "Solved 300+ data structures and algorithms problems on HackerRank and achieved a 5-star rating.",
  },
  {
    title: "State Hackathon 1.0",
    body: "Recognised for technical innovation and delivery under time constraints.",
  },
  {
    title: "Engineering Mentorship",
    body: "Consistently received 5/5 mentorship feedback while guiding developers in full-stack and AI development.",
  },
] as const;

export const education = {
  degree: "B.Tech — Civil Engineering",
  institute: "Institute of Technology and Management, Gwalior",
  period: "2019 – 2023",
  score: "CGPA: 8.10 / 10",
} as const;

export const architectureStack = [
  { label: "User", note: "Web & voice entrypoints" },
  { label: "React / Next.js", note: "App surface" },
  { label: "FastAPI / Node.js", note: "APIs & orchestration" },
  { label: "LLM / OpenAI", note: "Reasoning layer" },
  { label: "Redis", note: "Cache & queues" },
  { label: "PostgreSQL", note: "Source of truth" },
  { label: "AWS / GCP", note: "Infra & delivery" },
] as const;
