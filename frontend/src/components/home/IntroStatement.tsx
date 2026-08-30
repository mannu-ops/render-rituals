"use client";

import { motion } from "framer-motion";

export default function IntroStatement() {
  return (
    <section className="border-y border-black/10 py-24 md:py-36">
      <div className="container-rituals">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display max-w-6xl text-4xl leading-[1.02] tracking-tight text-black/85 md:text-6xl lg:text-7xl"
        >
          Render Rituals is an independent interior design practice creating
          <span className="text-black/25"> calm, tactile and purposeful spaces</span>
          — balancing atmosphere with the details that make a design buildable.
        </motion.p>
      </div>
    </section>
  );
}
