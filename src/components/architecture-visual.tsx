import { architectureStack } from "@/data/portfolio";

/**
 * Simplified production architecture diagram with subtle animated
 * connection lines. Purely decorative, hidden from assistive tech.
 */
export function ArchitectureVisual() {
  return (
    <div className="surface-card relative overflow-hidden p-5 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 glow-hero"
      />
      <div className="relative flex items-center justify-between gap-3 border-b border-border/70 pb-4">
        <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
          production_stack
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.7rem] text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent-cyan"
            style={{ animation: "soft-pulse 2.4s ease-in-out infinite" }}
          />
          live
        </span>
      </div>

      <ol className="relative mt-5 space-y-2.5" aria-label="System architecture layers">
        {architectureStack.map((node, i) => (
          <li key={node.label} className="relative">
            <div className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3 transition-colors hover:border-primary/45">
              <span className="font-mono text-[0.7rem] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium">{node.label}</span>
              <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
                {node.note}
              </span>
            </div>
            {i < architectureStack.length - 1 ? (
              <svg
                aria-hidden="true"
                className="mx-auto block h-2.5 w-6 overflow-visible text-primary/70"
                viewBox="0 0 24 10"
              >
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeDasharray="3 4"
                  style={{ animation: `flow-dash 1.6s linear infinite`, animationDelay: `${i * 120}ms` }}
                />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
