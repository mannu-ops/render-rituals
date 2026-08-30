export default function AboutStatement() {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr] border-t border-white/10 pt-16">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
        <span className="label-rituals text-[#D49A6A]">The Approach</span>
      </div>

      <div className="max-w-3xl">
        <p className="font-display text-4xl leading-[1.05] tracking-[-0.025em] md:text-6xl text-[#F3F4F6]">
          Good interiors are not only beautiful. They should feel natural to
          live, work, and move through.
        </p>

        <div className="mt-8 grid gap-5 text-sm leading-relaxed text-[#8E98A5] md:grid-cols-2">
          <p>
            Every project begins with understanding the space, the people
            using it, and the practical requirements behind the brief.
          </p>

          <p>
            From planning and materials to 3D visualization, the goal is to
            turn an idea into a space that feels considered rather than
            over-designed.
          </p>
        </div>
      </div>
    </section>
  );
}
