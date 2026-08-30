import { Accordion } from "../ui";

const items = [
  {
    title: "What should I include in my enquiry?",
    content:
      "A short project description, location, approximate scope, budget range and preferred timeline are enough to start. References or plans are helpful but not required.",
  },
  {
    title: "Do you work with remote clients?",
    content:
      "Yes. Remote projects can be handled through structured briefs, online meetings, shared references and digital design deliverables.",
  },
  {
    title: "Can I request a custom package?",
    content:
      "Absolutely. The listed services and prices are starting points. A custom scope can be prepared around your exact project needs.",
  },
  {
    title: "Can companies contact you for hiring?",
    content:
      "Yes. Companies and recruiters can use the enquiry form for freelance collaborations, contract work or full-time opportunities.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Before you write</p>
        <Accordion items={items} />
      </div>
    </section>
  );
}
