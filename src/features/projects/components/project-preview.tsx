import { cn } from "@/lib/utils";

/**
 * Stylised in-browser product previews. Decorative placeholders designed to be
 * swapped for real screenshots later.
 */
export function ProjectPreview({ variant }: { variant: "dashboard" | "jobboard" }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background/60">
      <div className="flex items-center gap-2 border-b border-border/70 bg-surface/60 px-4 py-2.5">
        <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
        <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
        <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-3 truncate rounded-md border border-border/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
          {variant === "dashboard" ? "app / dashboard" : "app / jobs"}
        </span>
      </div>
      <div className="p-4">{variant === "dashboard" ? <DashboardMock /> : <JobBoardMock />}</div>
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <div className={cn("h-2 rounded-full bg-muted-foreground/20", className)} />;
}

function DashboardMock() {
  return (
    <div className="grid gap-3" aria-hidden="true">
      <div className="grid grid-cols-3 gap-3">
        {["Orders", "Revenue", "AI Chats"].map((label) => (
          <div key={label} className="rounded-xl border border-border/70 bg-surface/50 p-3">
            <p className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase">
              {label}
            </p>
            <Bar className="mt-3 h-3 w-2/3" />
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-border/70 bg-surface/50 p-3">
          <div className="flex h-24 items-end gap-1.5">
            {[38, 52, 44, 66, 58, 74, 62, 88, 70, 96].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/50"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-xl border border-border/70 bg-surface/50 p-3">
          <div className="ml-auto w-3/4 rounded-lg rounded-br-sm bg-primary/25 p-2">
            <Bar className="w-full" />
          </div>
          <div className="w-4/5 rounded-lg rounded-bl-sm bg-muted/50 p-2">
            <Bar className="w-full" />
            <Bar className="mt-1.5 w-2/3" />
          </div>
          <div className="ml-auto w-2/3 rounded-lg rounded-br-sm bg-primary/25 p-2">
            <Bar className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function JobBoardMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-[0.75fr_1.25fr]" aria-hidden="true">
      <div className="space-y-3 rounded-xl border border-border/70 bg-surface/50 p-3">
        <Bar className="w-2/3" />
        {["Remote", "Full-time", "Senior", "AI / ML"].map((f) => (
          <div key={f} className="flex items-center gap-2">
            <span className="size-3 rounded-[4px] border border-primary/60 bg-primary/25" />
            <span className="text-[0.65rem] text-muted-foreground">{f}</span>
          </div>
        ))}
        <div className="h-1.5 rounded-full bg-muted-foreground/20">
          <div className="h-1.5 w-2/3 rounded-full bg-primary/60" />
        </div>
      </div>
      <div className="space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-surface/50 p-3"
            style={{ opacity: 1 - i * 0.18 }}
          >
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-md bg-primary/30" />
              <div className="flex-1 space-y-1.5">
                <Bar className="w-1/2" />
                <Bar className="w-1/3" />
              </div>
              <span className="rounded-md border border-border/60 px-2 py-0.5 font-mono text-[0.55rem] text-muted-foreground">
                Apply
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
