import { Brain, Layers, Server } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { aboutCards, aboutParagraphs } from "@/features/home/data";

const icons = { layers: Layers, brain: Brain, server: Server } as const;

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="About" title="About Me" />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {aboutCards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <Reveal key={card.title} delay={i * 80} className="surface-card p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
