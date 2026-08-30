const steps = [
  ["01", "Brief", "You share the project details and what you need."],
  ["02", "Discovery", "We discuss scope, references, deliverables and timeline."],
  ["03", "Proposal", "You receive a clear scope, quote and expected schedule."],
  ["04", "Design", "Once approved, the design work begins."],
];

export default function HireSteps() {
  return (
    <section className="border-y border-black/10 py-20 md:py-28">
      <div className="container-rituals">
        <p className="text-[10px] uppercase tracking-[0.22em] text-black/40">
          How it works
        </p>

        <div className="mt-10 grid border-t border-black/10 md:grid-cols-4">
          {steps.map(([number, title, description]) => (
            <div
              key={number}
              className="border-b border-black/10 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
            >
              <span className="text-[10px] text-black/30">{number}</span>
              <h3 className="font-display mt-12 text-3xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/50">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
