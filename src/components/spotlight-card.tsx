import { useCallback, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Card wrapper with a cursor-following glow. */
export function SpotlightCard({ children, className, as: Tag = "div" }: Props) {
  const onMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag onMouseMove={onMove} className={cn("spotlight hover-lift", className)}>
      {children}
    </Tag>
  );
}
