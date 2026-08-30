import Accordion from "../ui/Accordion";

const items = [
  {
    title: "Can I book just one service?",
    content:
      "Yes. Services can be booked independently when the project scope is clearly defined.",
  },
  {
    title: "Can services be combined?",
    content:
      "Yes. For example, space planning can be combined with visualization or drafting depending on your project's needs.",
  },
  {
    title: "Are the displayed prices final?",
    content:
      "No. They are starting prices. A final quote depends on scope, area, complexity, deliverables, revisions and timeline.",
  },
  {
    title: "Do you offer custom packages?",
    content:
      "Yes. A custom scope can be prepared for projects that do not fit a standard service.",
  },
];

export default function ServicesFAQ() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.5fr_1.5fr]">
        <p className="label-rituals">Service FAQ</p>
        <Accordion items={items} />
      </div>
    </section>
  );
}
