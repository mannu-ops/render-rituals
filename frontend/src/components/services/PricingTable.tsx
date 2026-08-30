"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Essential",
    price: "₹8,000",
    note: "For a focused single-space concept.",
    features: ["Moodboard", "Space planning", "Basic material palette", "1 revision"],
  },
  {
    name: "Signature",
    price: "₹18,000",
    note: "For a complete room design.",
    features: ["Concept development", "Detailed space planning", "Material & furniture selection", "3D visualization", "2 revisions"],
    featured: true,
  },
  {
    name: "Complete",
    price: "₹35,000+",
    note: "For multi-room or larger projects.",
    features: ["Complete design direction", "Detailed drawings", "3D visualization", "Material schedule", "Multiple revisions"],
  },
];

export default function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <motion.article
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className={`relative border p-6 md:p-8 ${
            plan.featured
              ? "border-[#171717] bg-[#171717] text-white"
              : "border-black/10"
          }`}
        >
          {plan.featured && (
            <span className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-white/65">
              Most Popular
            </span>
          )}

          <p className={`text-[10px] uppercase tracking-[0.2em] ${plan.featured ? "text-white/40" : "text-black/40"}`}>
            {plan.name}
          </p>

          <p className="font-display mt-8 text-4xl tracking-tight md:text-5xl">
            {plan.price}
          </p>

          <p className={`mt-3 min-h-12 text-sm leading-6 ${plan.featured ? "text-white/50" : "text-black/50"}`}>
            {plan.note}
          </p>

          <ul className={`mt-8 space-y-3 border-t pt-7 ${plan.featured ? "border-white/10" : "border-black/10"}`}>
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-xs">
                <Check size={14} className={plan.featured ? "text-white/60" : "text-black/50"} />
                {feature}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
