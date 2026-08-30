const capabilities = [
  "Residential interiors",
  "Commercial interiors",
  "Space planning",
  "3D visualization",
  "Material studies",
  "Architectural drafting",
  "Presentation design",
  "Design collaboration",
];

export default function Capabilities() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Capabilities</p>

        <div className="flex flex-wrap gap-2">
          {capabilities.map((capability) => (
            <span
              key={capability}
              className="rounded-full border border-black/10 px-4 py-2.5 text-xs text-black/60"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
