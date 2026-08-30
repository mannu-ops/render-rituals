"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 35 });
  const springY = useSpring(y, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#171717] md:block"
    />
  );
}
