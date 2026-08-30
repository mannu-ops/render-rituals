"use client";

import { usePortfolioContext } from "@/context";
import { PROJECT_CATEGORIES } from "@/lib";

export default function ProjectFilters() {
  const { activeCategory, setActiveCategory } = usePortfolioContext();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {PROJECT_CATEGORIES.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category as typeof activeCategory)}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.1em] transition-all duration-300",
              active
                ? "border-black bg-black text-white"
                : "border-black/10 text-black/45 hover:border-black/30 hover:text-black",
            ].join(" ")}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
