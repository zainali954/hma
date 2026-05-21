"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Clear any previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Reset
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.opacity = "1";

    // Animate to ~85% fast
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = "width 0.35s cubic-bezier(0.4,0,0.2,1)";
        bar.style.width = "85%";

        // Then complete to 100% and fade out
        timerRef.current = setTimeout(() => {
          bar.style.transition = "width 0.15s ease, opacity 0.25s ease 0.1s";
          bar.style.width = "100%";
          timerRef.current = setTimeout(() => {
            bar.style.opacity = "0";
          }, 150);
        }, 350);
      });
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] bg-gold-400 z-[9999] opacity-0 pointer-events-none"
      style={{ width: "0%" }}
    />
  );
}
