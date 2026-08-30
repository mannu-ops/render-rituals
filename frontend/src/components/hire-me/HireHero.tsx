import { ArrowDown } from "lucide-react";

export default function HireHero() {
  return (
    <section className="pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="container-rituals">
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
          Work With Render Rituals
        </p>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="font-display max-w-5xl text-6xl leading-[0.86] tracking-tight md:text-8xl">
            Have a project? Let&apos;s talk about it.
          </h1>

          <p className="max-w-md text-sm leading-7 text-black/55">
            Whether you need a complete interior design, a refined 3D render,
            or clear architectural drawings, send over the brief and let&apos;s
            figure out the right scope together.
          </p>
        </div>

        <div className="mt-14 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-black/40">
          <ArrowDown size={14} />
          Project enquiry
        </div>
      </div>
    </section>
  );
}
