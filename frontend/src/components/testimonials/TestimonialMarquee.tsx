"use client";

type TestimonialMarqueeProps = {
  items?: string[];
};

const defaultItems = [
  "Thoughtful",
  "Clear communication",
  "Detail driven",
  "Collaborative",
  "Visual storytelling",
];

export default function TestimonialMarquee({
  items = defaultItems,
}: TestimonialMarqueeProps) {
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-black/10 py-4">
      <div className="flex min-w-max animate-[marquee_24s_linear_infinite]">
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="px-5 font-display text-2xl text-black/45 md:text-3xl"
          >
            {item}
            <span className="ml-10 text-black/15">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
