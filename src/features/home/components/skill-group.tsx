import { Reveal } from "@/components/motion/reveal";

type Props = {
  title: string;
  items: readonly string[];
  delay?: number;
};

export function SkillGroup({ title, items, delay = 0 }: Props) {
  return (
    <Reveal delay={delay} className="surface-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
        <h3 className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {title}
        </h3>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-border/60 bg-background/40 px-2.5 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary/45"
          >
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
