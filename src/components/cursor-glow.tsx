import { useEffect, useRef, useState } from "react";

/**
 * Premium pointer layer: a soft glow that trails the cursor plus a precise
 * ring that snaps in on interactive elements. Disabled on touch devices and
 * when the user prefers reduced motion.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    const interactive = "a, button, [role='button'], input, textarea, select, label, summary";

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        glowX = mouseX;
        glowY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        glowRef.current?.classList.add("is-visible");
        ringRef.current?.classList.add("is-visible");
      }
      const target = e.target as HTMLElement | null;
      const hot = !!target?.closest?.(interactive);
      ringRef.current?.classList.toggle("is-hot", hot);
    };

    const onLeave = () => {
      visible = false;
      glowRef.current?.classList.remove("is-visible");
      ringRef.current?.classList.remove("is-visible");
    };

    const onDown = () => ringRef.current?.classList.add("is-down");
    const onUp = () => ringRef.current?.classList.remove("is-down");

    const tick = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      ringX += (mouseX - ringX) * 0.3;
      ringY += (mouseY - ringY) * 0.3;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
