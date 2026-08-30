const categories = [
  {
    title: "Projects",
    description: "Scope, remote work and the types of projects supported.",
  },
  {
    title: "Pricing",
    description: "Starting prices, custom quotes and project budgets.",
  },
  {
    title: "Process",
    description: "Briefs, approvals, revisions and project delivery.",
  },
  {
    title: "Hiring",
    description: "Freelance, studio collaboration and career opportunities.",
  },
];

export default function FAQCategories() {
  return (
    <section className="border-y border-black/10 py-20 md:py-28">
      <div className="container-rituals">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category.title} className="border border-black/10 p-6">
              <p className="label-rituals">{category.title}</p>
              <p className="mt-5 text-sm leading-7 text-black/50">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
