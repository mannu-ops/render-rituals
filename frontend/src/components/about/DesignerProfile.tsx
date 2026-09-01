import { ImagePlaceholder } from "../common";

export default function DesignerProfile() {
  return (
    <section className="pb-16 sm:pb-20 md:pb-24 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
        <div className="aspect-[4/5] max-w-sm rounded-3xl overflow-hidden border border-white/10 bg-[#1E2227]">
          <img
            src="/images/nikita-waving-avatar.jpg"
            alt="Nikita — Interior Designer & 3D Artist"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="max-w-2xl">
          <p className="label-rituals">The designer</p>
          <h2 className="font-display mt-3.5 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            Design with <span className="italic text-[#D49A6A]">intention</span>. Detail with <span className="italic text-[#D49A6A]">discipline</span>.
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#8E98A5]">
            <p>
              Render Rituals is an independent design practice led by Nikita, specializing in photorealistic 4K 3D visualizations, spatial layout planning, and contractor-ready 2D CAD drawings.
            </p>
            <p>
              Every project balances spatial atmosphere with buildable clarity, ensuring your clients, contractors, and carpenters are aligned from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
