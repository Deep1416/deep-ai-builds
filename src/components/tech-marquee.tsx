import { marqueeTech } from "@/data/portfolio";

export function TechMarquee() {
  const row = [...marqueeTech, ...marqueeTech];

  return (
    <div className="relative border-y border-border/70 bg-surface/30 py-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <div className="group overflow-hidden" aria-label="Technologies I work with">
        <div className="marquee-track group-hover:[animation-play-state:paused]">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex shrink-0 items-center gap-3 px-6 font-mono text-xs tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase"
            >
              <span aria-hidden="true" className="size-1 rounded-full bg-primary/60" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
