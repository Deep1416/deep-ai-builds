import { ArrowUpRight } from "lucide-react";
import { Counter } from "@/features/home/components/counter";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { impactNumbers } from "@/features/home/data";

export function ImpactSection() {
  return (
    <section className="border-t border-border/60 bg-surface/25 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Impact" title="Engineering in Numbers" />
        <Reveal delay={60} className="mt-14">
          <dl className="surface-card grid grid-cols-2 overflow-hidden lg:grid-cols-4">
            {impactNumbers.map((item) => (
              <div
                key={item.label}
                className="border-r border-b border-border/60 p-5 sm:p-8 [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                <dt className="font-display text-gradient text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  <Counter value={item.value} suffix={item.suffix} />
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">{item.label}</dd>
              </div>
            ))}
            <div className="flex items-center border-b border-border/60 bg-primary/10 p-5 sm:p-8">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                See the work behind the numbers
                <ArrowUpRight
                  className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
