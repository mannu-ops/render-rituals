const stats = [
  ["04+", "Years Experience"],
  ["45+", "Interior Projects"],
  ["100+", "Architectural Files"],
  ["2D / 3D", "Design & Visualization"],
];

export default function Stats() {
  return (
    <section className="border-y border-black/10">
      <div className="container-rituals grid grid-cols-2 lg:grid-cols-4">
        {stats.map(([number, label], index) => (
          <div
            key={label}
            className={`px-4 py-10 md:px-8 md:py-14 ${
              index !== 0 ? "border-l border-black/10" : ""
            }`}
          >
            <p className="font-display text-3xl tracking-tight md:text-4xl">
              {number}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-black/45 md:text-[11px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
