const defaultServices = [
  "Interior Design",
  "Space Planning",
  "2D Drafting",
  "3D Modelling",
  "Architectural Visualization",
  "Material & Furniture Selection",
];

type ExperienceServicesProps = {
  services?: string[];
};

export default function ExperienceServices({
  services = defaultServices,
}: ExperienceServicesProps) {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">What I can bring</p>

      <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={service}
            className="bg-[#f7f6f2] px-5 py-6"
          >
            <span className="text-[9px] text-black/30">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-8 font-display text-2xl leading-none">
              {service}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
