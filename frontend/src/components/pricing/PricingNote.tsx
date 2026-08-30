export default function PricingNote() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">A note on pricing</p>

        <div className="max-w-4xl">
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Every project is different. These prices are useful starting
            points, not rigid boxes.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-black/50">
            Scope can change with room count, project complexity, drawings,
            visualization requirements, revisions and deadlines. A clear quote
            is shared before work begins.
          </p>
        </div>
      </div>
    </section>
  );
}
