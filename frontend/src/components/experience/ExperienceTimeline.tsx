export type ExperienceItem = {
  id?: string;
  period: string;
  role: string;
  company: string;
  description: string;
  location?: string;
};

type ExperienceTimelineProps = {
  items: ExperienceItem[];
};

export default function ExperienceTimeline({
  items,
}: ExperienceTimelineProps) {
  if (!items.length) {
    return (
      <div className="border-y border-black/10 py-12 text-sm text-black/40">
        Experience details will be added soon.
      </div>
    );
  }

  return (
    <div className="border-y border-black/10">
      {items.map((item, index) => (
        <article
          key={item.id ?? `${item.company}-${item.period}-${index}`}
          className="grid gap-6 border-b border-black/10 py-8 last:border-b-0 md:grid-cols-[180px_1fr]"
        >
          <div>
            <p className="text-xs text-black/40">{item.period}</p>
            {item.location && (
              <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-black/30">
                {item.location}
              </p>
            )}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.13em] text-black/35">
              {item.company}
            </p>
            <h2 className="font-display mt-3 text-3xl leading-none md:text-4xl">
              {item.role}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/50">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
