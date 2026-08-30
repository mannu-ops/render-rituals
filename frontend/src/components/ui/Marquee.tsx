"use client";

import { motion } from "framer-motion";

export default function Marquee({
  items,
  speed = 20,
}: {
  items: string[];
  speed?: number;
}) {
  const content = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-5 inline-flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-black/40"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#a88d64]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
