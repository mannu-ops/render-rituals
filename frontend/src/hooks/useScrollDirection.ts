"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | null;

export function useScrollDirection() {
  const lastY = useRef(0);
  const [direction, setDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    const update = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastY.current;

      if (Math.abs(delta) < 4) return;

      setDirection(delta > 0 ? "down" : "up");
      lastY.current = currentY;
    };

    lastY.current = window.scrollY;
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  return direction;
}
