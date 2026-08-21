import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  className?: string;
};

export function MetricCard({ value, label, className }: Props) {
  return (
    <div className={cn("surface-card spotlight hover-lift px-4 py-4", className)}>
      <div className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{value}</div>
      <p className="mt-1 text-xs leading-snug text-muted-foreground md:text-sm">{label}</p>
    </div>
  );
}
