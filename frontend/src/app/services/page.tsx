import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data";

export const metadata = {
  title: "Services — Interior Design & 3D Visualization",
  description: "Professional interior design, 3D visualization, space planning, concept moodboards, and material direction.",
};

export default function ServicesPage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28 bg-[#14171A] text-[#F3F4F6]">
      <div className="mx-auto max-w-[1440px]">
        <p className="label-rituals">Services & Capabilities</p>
        <h1 className="font-display mt-5 max-w-5xl text-6xl leading-[0.9] md:text-8xl text-[#F3F4F6]">
          From first idea
          <br />
          to <span className="italic text-[#D49A6A]">final image</span>.
        </h1>
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-[#8E98A5] md:text-base">
          Whether you need a complete interior design direction for your home, standalone 3D visual renders for a project presentation, or clear space planning layouts, Render Rituals offers tailored services for every stage.
        </p>

        <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="grid gap-8 py-12 lg:grid-cols-[80px_1fr_1.2fr_auto] lg:items-start"
            >
              <span className="text-xs font-mono text-[#D49A6A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-4xl leading-tight text-[#F3F4F6]">{service.title}</h2>
                <span className="mt-3 inline-block font-mono-spec text-[10px] uppercase tracking-[0.14em] text-[#8E98A5]">
                  {service.category} · <span className="text-[#D49A6A] font-semibold">{service.price}</span>
                </span>
              </div>

              <div>
                <p className="text-sm leading-relaxed text-[#8E98A5]">{service.description}</p>
                {service.features && (
                  <ul className="mt-6 grid grid-cols-2 gap-2 text-xs text-[#D1D5DB]">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-[#D49A6A]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-2">
                <Link
                  href={`/hire-me`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-medium text-[#F3F4F6] transition-all hover:border-[#D49A6A] hover:bg-[#D49A6A] hover:text-[#14171A]"
                >
                  Enquire <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-white/10 pt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="label-rituals">Custom Scope</p>
              <h3 className="font-display mt-3 text-3xl md:text-4xl text-[#F3F4F6]">Need a custom combination of services?</h3>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-[#8E98A5]">
                Project scopes can be combined based on your exact requirements. For architectural teams and developers, standalone 3D rendering and drafting support can be booked on a retainer or per-project basis.
              </p>
              <Link href="/hire-me" className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#D49A6A] hover:text-[#E5A97C]">
                Discuss custom scope <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
