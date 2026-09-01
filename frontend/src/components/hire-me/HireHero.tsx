import { ArrowDown } from "lucide-react";

export default function HireHero() {
  return (
    <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <p className="label-rituals">
          Work With Render Rituals
        </p>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="font-display max-w-4xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
            Have a project? Let&apos;s talk about it.
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-[#8E98A5]">
            Whether you need a complete interior design, a refined 3D render,
            or clear architectural drawings, send over the brief and let&apos;s
            figure out the right scope together.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-2.5 font-mono-spec text-[10px] uppercase tracking-wider text-[#D49A6A]">
          <ArrowDown size={14} className="animate-bounce" />
          Project enquiry
        </div>
      </div>
    </section>
  );
}
