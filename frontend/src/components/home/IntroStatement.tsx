"use client";

import { motion } from "framer-motion";

export default function IntroStatement() {
  return (
    <section className="border-y border-white/10 py-16 sm:py-20 md:py-24 bg-[#111315] text-[#F3F4F6]">
      <div className="container-rituals">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display max-w-4xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.14] tracking-tight text-[#F3F4F6]"
        >
          Render Rituals is an independent interior design practice creating
          <span className="text-[#8E98A5]"> calm, tactile and purposeful spaces</span>
          — balancing atmosphere with the details that make a design buildable.
        </motion.p>
      </div>
    </section>
  );
}
