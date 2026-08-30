const principles = [
  {
    number: "01",
    title: "Listen first",
    text: "Every project starts by understanding the people, place and practical requirements behind the brief.",
  },
  {
    number: "02",
    title: "Reduce the noise",
    text: "Materials, forms and details are selected with intention so the space can breathe.",
  },
  {
    number: "03",
    title: "Make it useful",
    text: "Beauty has to work in real life. Planning and circulation remain central to every design decision.",
  },
  {
    number: "04",
    title: "Communicate clearly",
    text: "Strong drawings and visualizations make ideas easier to understand, review and build.",
  },
];

export default function DesignApproach() {
  return (
    <section className="bg-[#d9d2c6] py-20 md:py-28">
      <div className="container-rituals">
        <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
          <p className="label-rituals">Design approach</p>

          <div className="grid border-t border-black/10 md:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="border-b border-black/10 py-7 md:px-7 md:first:pl-0 md:nth-[2n+1]:pl-0 md:nth-[2n]:border-l"
              >
                <span className="text-[10px] text-black/30">
                  {principle.number}
                </span>
                <h2 className="font-display mt-7 text-3xl md:text-4xl">
                  {principle.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-black/50">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
