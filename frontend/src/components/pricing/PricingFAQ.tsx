"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    q: "Are these fixed prices?",
    a: "No. They are starting prices for typical scopes. A final quote is shared after understanding your space, deliverables and timeline.",
  },
  {
    q: "Can I request only 3D renders?",
    a: "Yes. Visualization can be scoped as a standalone service when you already have the required plans, dimensions and design direction.",
  },
  {
    q: "Do you provide site visits?",
    a: "Site visits can be discussed depending on project location and scope. Any travel or site-related costs are quoted separately when applicable.",
  },
  {
    q: "How many revisions are included?",
    a: "Each package has an indicative revision allowance. Larger changes or additional rounds can be added to the project scope.",
  },
];

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-black/10">
      {questions.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.q} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl md:text-2xl">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-sm leading-7 text-black/50">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
