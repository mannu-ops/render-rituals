const principles = [
  {
    number: "01",
    title: "Function first",
    text: "Layouts should make everyday movement and ergonomics feel intuitive and effortless.",
  },
  {
    number: "02",
    title: "Quiet character",
    text: "Natural materials, directional light, and proportions create personality without visual noise.",
  },
  {
    number: "03",
    title: "Visual clarity",
    text: "Rigorous drawings and 4K photorealistic visuals make every design decision clear before build.",
  },
];

export default function AboutPrinciples() {
  return (
    <div className="grid border-y border-white/10 md:grid-cols-3">
      {principles.map((item, index) => (
        <div
          key={item.number}
          className={[
            "py-10 md:px-8 md:py-12",
            index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : "",
          ].join(" ")}
        >
          <p className="font-mono-spec text-[10px] uppercase tracking-[0.14em] text-[#D49A6A]">
            0{item.number}
          </p>

          <h3 className="font-display mt-6 text-3xl leading-none text-[#F3F4F6]">
            {item.title}
          </h3>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8E98A5]">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
