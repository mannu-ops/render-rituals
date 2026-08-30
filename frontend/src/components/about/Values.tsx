const values = [
  ["01", "Intentional", "Every decision should have a reason — from layout to the smallest detail."],
  ["02", "Human", "The best spaces respond to how people actually live, work and move."],
  ["03", "Clear", "Good design should be easy to communicate, understand and execute."],
];

export default function Values() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-rituals">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map(([number, title, description]) => (
            <div key={number} className="border border-black/10 p-6 md:p-8">
              <span className="text-[10px] text-black/35">{number}</span>
              <h3 className="font-display mt-16 text-3xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/50">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
