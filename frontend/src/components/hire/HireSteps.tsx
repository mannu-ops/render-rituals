const steps = [
  {
    number: "01",
    title: "Share the brief",
    text: "Tell me about the space, scope, budget and timeline.",
  },
  {
    number: "02",
    title: "Review & scope",
    text: "We clarify deliverables and create a project scope that fits.",
  },
  {
    number: "03",
    title: "Design begins",
    text: "Once approved, the agreed design work moves into production.",
  },
];

export default function HireSteps() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals">
        <div className="mb-10">
          <p className="label-rituals">How it works</p>
          <h2 className="font-display mt-4 text-5xl leading-none md:text-7xl">
            Simple from first message to final delivery.
          </h2>
        </div>

        <div className="grid border-y border-black/10 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="border-b border-black/10 py-7 md:border-b-0 md:border-r md:px-7 md:last:border-r-0"
            >
              <span className="text-[10px] text-black/30">{step.number}</span>
              <h3 className="font-display mt-8 text-3xl">{step.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-black/45">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
