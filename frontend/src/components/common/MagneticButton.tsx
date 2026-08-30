"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode } from "react";

export default function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link
        href={href}
        className="inline-flex rounded-full bg-[#171717] px-5 py-3.5 text-xs text-white"
      >
        {children}
      </Link>
    </motion.div>
  );
}
