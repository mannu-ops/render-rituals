"use client";

type WorkFiltersProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function WorkFilters({
  categories,
  active,
  onChange,
}: WorkFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const selected = active === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={selected}
            className={`rounded-full border px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] transition-all ${
              selected
                ? "border-[#171717] bg-[#171717] text-white"
                : "border-black/10 text-black/45 hover:border-black/25 hover:text-black"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
