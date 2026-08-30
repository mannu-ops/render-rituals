"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string;
};

export default function Accordion({
  items,
}: {
  items: AccordionItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.title} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left group"
            >
              <span className="font-display text-xl text-[#F3F4F6] transition-colors group-hover:text-[#D49A6A] md:text-2xl">
                {item.title}
              </span>

              <Plus
                size={17}
                className={`shrink-0 text-[#D49A6A] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[#8E98A5]">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
