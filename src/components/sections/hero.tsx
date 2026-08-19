import { ArrowRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchitectureVisual } from "@/components/architecture-visual";
import { MetricCard } from "@/components/metric-card";
import { Reveal } from "@/components/reveal";
import { heroMetrics, site } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 glow-hero" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent-cyan"
                style={{ animation: "soft-pulse 2.4s ease-in-out infinite" }}
              />
              Available for Software Engineering &amp; AI Opportunities
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl">
              I build <span className="text-gradient">scalable products</span> and production{" "}
              <span className="text-gradient">AI systems</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;m {site.name}, a Full Stack Developer and AI Engineer with 3+ years of
              experience building LLM-powered applications, high-concurrency voice automation
              systems, backend APIs, and modern web products.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" /> {site.location}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#projects">View My Work</a>
              </Button>
              <Button variant="subtle" size="xl" asChild>
                <a href={site.resumeUrl} download>
                  <Download aria-hidden="true" /> Download Resume
                </a>
              </Button>
              <Button variant="quiet" size="xl" asChild>
                <a href="#contact" className="group">
                  Let&apos;s Connect
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroMetrics.map((metric) => (
                <MetricCard key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ArchitectureVisual />
        </Reveal>
      </div>
    </section>
  );
}
