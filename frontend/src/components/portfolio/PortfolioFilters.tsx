"use client";

type Filter = {
  label: string;
  value: string;
};

type PortfolioFiltersProps = {
  filters: Filter[];
  activeFilter: string;
  onChange: (value: string) => void;
};

export default function PortfolioFilters({
  filters,
  activeFilter,
  onChange,
}: PortfolioFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = filter.value === activeFilter;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={[
              "rounded-full border px-4 py-2 font-mono-spec text-[10px] uppercase tracking-[0.12em] transition-all",
              active
                ? "border-[#D49A6A] bg-[#D49A6A] text-[#14171A] font-semibold shadow-md"
                : "border-white/10 bg-[#1E2227] text-[#8E98A5] hover:border-white/30 hover:text-[#F3F4F6]",
            ].join(" ")}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
