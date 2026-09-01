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
    <main className="px-5 py-12 sm:py-16 md:px-8 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <p className="label-rituals">Frequently asked questions</p>
        <h1 className="font-display mt-3.5 max-w-4xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
          Before we begin.
        </h1>

        <div className="mt-12 sm:mt-14 divide-y divide-white/10 border-y border-white/10 max-w-3xl">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-6">
              <summary className="cursor-pointer list-none pr-8 font-display text-lg sm:text-xl font-semibold text-[#F3F4F6] marker:hidden hover:text-[#D49A6A] transition-colors">
                {question}
              </summary>
              <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-[#8E98A5]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
