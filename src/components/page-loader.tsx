import { useEffect, useState } from "react";
import { site } from "@/data/portfolio";

const initials = site.name
  .split(" ")
  .map((part) => part[0])
  .join("");

/**
 * First-paint loader: monogram, animated counter and a shutter that lifts away
 * once assets are ready. Shown once per browser session.
 */
export function PageLoader() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Runs on every page load / reload
    setActive(true);
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1500;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(() => {
          setActive(false);
          document.documentElement.style.overflow = "";
        }, 850);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={`loader-shell ${leaving ? "is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader-aurora" />
      <div className="loader-inner">
        <div className="loader-mark">
          <span className="loader-mark-ring" />
          <span className="loader-mark-text">{initials}</span>
        </div>
        <div className="loader-copy">
          <p className="text-sm tracking-[0.32em] text-muted-foreground uppercase">{site.name}</p>
          <p className="mt-2 text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Full Stack Developer &middot; AI Engineer
          </p>
        </div>
        <div className="loader-bar">
          <span className="loader-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="loader-count tabular-nums">{progress}%</p>
      </div>
    </div>
  );
}
