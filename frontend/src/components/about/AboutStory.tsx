export default function AboutStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">The studio</p>

        <div className="max-w-4xl">
          <p className="font-display text-4xl leading-[1.02] md:text-6xl">
            Good interiors are not about filling a room. They are about
            understanding what the room needs to become.
          </p>

          <div className="mt-10 grid gap-7 text-sm leading-7 text-black/50 md:grid-cols-2">
            <p>
              Render Rituals approaches each project through proportion,
              materiality, light and everyday use. The aim is to create spaces
              that feel visually calm while remaining practical and personal.
            </p>

            <p>
              From early concepts and layouts to detailed visualizations and
              drafting, every stage is treated as part of one continuous design
              conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
