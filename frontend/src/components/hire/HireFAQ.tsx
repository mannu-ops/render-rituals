import Accordion from "../ui/Accordion";

const items = [
  {
    title: "Do I need a complete brief?",
    content:
      "No. Share whatever you know. The purpose of the form is to give enough context to start the conversation.",
  },
  {
    title: "Can you work with an existing design?",
    content:
      "Yes. Depending on the scope, visualization, drafting, planning or refinement can be provided as standalone support.",
  },
  {
    title: "Can companies contact you for hiring?",
    content:
      "Absolutely. Mention the role or opportunity in the brief, or use the general contact form for a direct conversation.",
  },
];

export default function HireFAQ() {
  return (
    <section className="border-t border-black/10 py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Hire FAQ</p>
        <Accordion items={items} />
      </div>
    </section>
  );
}
