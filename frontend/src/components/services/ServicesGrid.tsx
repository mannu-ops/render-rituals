"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  startingPrice: string;
  delivery: string;
  features: string[];
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {services.map((service, index) => (
        <motion.article
          key={service.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
          className="group border border-black/10 p-6 transition-colors duration-300 hover:bg-[#171717] hover:text-white md:p-8"
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] text-black/35 transition-colors group-hover:text-white/35">
              {service.number}
            </span>
            <Link
              href={`/services/${service.slug}`}
              aria-label={`View ${service.title}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-all group-hover:border-white/15"
            >
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <h2 className="font-display mt-16 text-4xl tracking-tight md:text-5xl">
            {service.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-black/50 transition-colors group-hover:text-white/50">
            {service.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {service.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-black/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] text-black/45 transition-colors group-hover:border-white/10 group-hover:text-white/45"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-9 flex items-end justify-between border-t border-black/10 pt-5 transition-colors group-hover:border-white/10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-black/35 group-hover:text-white/35">
                Starting from
              </p>
              <p className="mt-1 text-sm">{service.startingPrice}</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.12em] text-black/35 group-hover:text-white/35">
              {service.delivery}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
