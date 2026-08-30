const stats = [
  { value: "45+", label: "Residential & office projects" },
  { value: "100+", label: "Architectural files handled" },
  { value: "4+", label: "Years of experience" },
  { value: "2D + 3D", label: "Design & visualization" },
];

export default function PortfolioStats() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid grid-cols-2 gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="bg-[#f5f3ef] p-6 md:p-8">
            <p className="font-display text-4xl md:text-5xl">{stat.value}</p>
            <p className="mt-4 max-w-[13rem] text-[10px] uppercase leading-5 tracking-[0.12em] text-black/40">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
