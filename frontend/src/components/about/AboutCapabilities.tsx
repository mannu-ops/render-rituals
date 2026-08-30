const capabilities = [
  "Interior Design",
  "Space Planning",
  "2D CAD Drafting",
  "3D Photorealistic Modeling",
  "4K Raytraced CGI",
  "Material & Finish Direction",
  "Modular Furniture Planning",
  "Lighting & Atmosphere Studies",
];

export default function AboutCapabilities() {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr] border-t border-white/10 pt-16">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
        <span className="label-rituals text-[#D49A6A]">Capabilities</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {capabilities.map((capability) => (
          <span
            key={capability}
            className="rounded-full border border-white/15 bg-[#1E2227] px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-[#F3F4F6] shadow-sm transition-all hover:border-[#D49A6A]/50 hover:text-[#D49A6A]"
          >
            {capability}
          </span>
        ))}
      </div>
    </section>
  );
}
