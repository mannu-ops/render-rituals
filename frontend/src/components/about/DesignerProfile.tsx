import { ImagePlaceholder } from "../common";

export default function DesignerProfile() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
        <ImagePlaceholder
          alt="Designer portrait placeholder"
          className="aspect-[4/5]"
        />

        <div className="max-w-3xl">
          <p className="label-rituals">The designer</p>
          <h2 className="font-display mt-5 text-5xl leading-[0.9] md:text-7xl">
            Design with intention. Detail with discipline.
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-7 text-black/50">
            <p>
              Render Rituals is a personal design identity for an interior
              designer working across spatial concepts, visualizations and
              polished design presentations.
            </p>
            <p>
              This section is intentionally structured so your final biography,
              professional background and design philosophy can be connected to
              the resume data later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
