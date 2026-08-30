"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  bestFor: string;
  featured?: boolean;
};

export default function PricingCards({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <motion.article
          key={plan.name}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className={`relative flex flex-col border p-6 md:p-8 ${
            plan.featured
              ? "border-[#171717] bg-[#171717] text-white"
              : "border-black/10"
          }`}
        >
          {plan.featured && (
            <span className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-white/60">
              Recommended
            </span>
          )}

          <p
            className={`text-[10px] uppercase tracking-[0.2em] ${
              plan.featured ? "text-white/40" : "text-black/40"
            }`}
          >
            {plan.name}
          </p>

          <p className="font-display mt-7 text-5xl tracking-tight">
            {plan.price}
          </p>

          <p
            className={`mt-3 min-h-14 text-sm leading-6 ${
              plan.featured ? "text-white/50" : "text-black/50"
            }`}
          >
            {plan.description}
          </p>

          <div
            className={`mt-7 border-y py-4 text-[10px] uppercase tracking-[0.15em] ${
              plan.featured
                ? "border-white/10 text-white/40"
                : "border-black/10 text-black/40"
            }`}
          >
            Best for · {plan.bestFor}
          </div>

          <ul className="mt-6 flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-xs leading-5">
                <Check size={14} className="mt-0.5 shrink-0 opacity-55" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href={`/hire-me?package=${encodeURIComponent(plan.name)}`}
            className={`group mt-8 flex items-center justify-between rounded-full px-5 py-3.5 text-xs ${
              plan.featured
                ? "bg-white text-[#171717]"
                : "bg-[#171717] text-white"
            }`}
          >
            Choose {plan.name}
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
