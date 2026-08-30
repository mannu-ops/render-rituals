type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  project?: string;
};

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="flex h-full flex-col border border-black/10 p-6 md:p-8">
      <span className="font-display text-5xl leading-none text-black/15">“</span>

      <blockquote className="mt-5 font-display text-2xl leading-tight md:text-3xl">
        {testimonial.quote}
      </blockquote>

      <div className="mt-auto border-t border-black/10 pt-6">
        <p className="text-sm">{testimonial.name}</p>

        {(testimonial.role || testimonial.company) && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-black/35">
            {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
          </p>
        )}

        {testimonial.project && (
          <p className="mt-3 text-xs text-black/40">{testimonial.project}</p>
        )}
      </div>
    </article>
  );
}
