"use client";

import { motion } from "framer-motion";

export default function Marquee({
  items = ["Interior Design", "Visualization", "Space Planning", "Drafting"],
}: {
  items?: string[];
}) {
  const content = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-black/10 py-4">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-[10px] uppercase tracking-[0.22em] text-black/45"
          >
            {item} <span className="mx-2 text-black/20">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
