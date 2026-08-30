const faqs = [
  ["What kind of projects do you take?", "Residential interiors, selected commercial spaces, visualization work, concept development and design collaborations."],
  ["Can I hire you only for 3D renders?", "Yes. Visualization can be booked independently when the project scope and source information are clear."],
  ["How does pricing work?", "The website shows starting prices. Final quotes depend on scope, area, complexity, deliverables and timeline."],
  ["Do you work remotely?", "Yes. Remote collaboration can be arranged for suitable projects."],
  ["How do I start?", "Send a project brief through the contact form with your requirements, timeline and approximate budget."],
];

export const metadata = { title: "FAQ" };

export default function FAQPage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <p className="label-rituals">Frequently asked questions</p>
      <h1 className="font-display mt-5 max-w-4xl text-6xl leading-[0.9] md:text-8xl">
        Before we begin.
      </h1>

      <div className="mt-16 divide-y divide-black/10 border-y border-black/10">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group py-7">
            <summary className="cursor-pointer list-none pr-8 font-display text-2xl marker:hidden">
              {question}
            </summary>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/50">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </main>
  );
}
