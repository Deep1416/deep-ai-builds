import { Database, Gauge, PhoneCall, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { aiCards, aiStats } from "@/features/home/data";

const icons = { sparkles: Sparkles, phone: PhoneCall, database: Database, gauge: Gauge } as const;

export function AiEngineeringSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-surface/25 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 glow-hero"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="AI Engineering"
          title="Building AI That Works in Production"
          description="Moving beyond demos and prototypes to AI systems that handle real users, latency constraints, reliability requirements, and production traffic."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiCards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <Reveal key={card.title} delay={i * 70} className="surface-card h-full p-6">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <dl className="mt-10 grid gap-6 rounded-2xl border border-border/70 bg-surface/40 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
            {aiStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold md:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
