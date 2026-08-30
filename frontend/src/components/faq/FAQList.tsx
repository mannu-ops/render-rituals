"use client";

import { Accordion } from "../ui";

export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

const defaultFAQs: FAQItem[] = [
  {
    category: "Projects",
    question: "What kind of projects do you take on?",
    answer:
      "Render Rituals can support residential interiors, commercial concepts, space planning, moodboards, visual direction and 3D visualization. Custom scopes can also be discussed.",
  },
  {
    category: "Projects",
    question: "Can you work remotely?",
    answer:
      "Yes. Remote projects can be handled through digital briefs, online meetings, references and clearly structured deliverables.",
  },
  {
    category: "Pricing",
    question: "Are the prices fixed?",
    answer:
      "The prices shown on the website are starting points. A final quote depends on project size, scope, deliverables, revisions and timeline.",
  },
  {
    category: "Pricing",
    question: "Can I request a custom package?",
    answer:
      "Yes. If none of the listed services fit your project, a custom scope can be prepared after reviewing the brief.",
  },
  {
    category: "Process",
    question: "How does a project start?",
    answer:
      "You submit a project enquiry with the key details. The brief is reviewed, the scope is clarified, and the agreed work begins after approval.",
  },
  {
    category: "Process",
    question: "How many revisions are included?",
    answer:
      "Revision limits depend on the selected service and agreed scope. They will be clearly mentioned in the project quote before work begins.",
  },
  {
    category: "Hiring",
    question: "Can companies contact you for a job?",
    answer:
      "Yes. Companies and recruiters can use the contact or hiring form for freelance, contract or full-time opportunities.",
  },
  {
    category: "Files",
    question: "What files will I receive?",
    answer:
      "Deliverables depend on the selected service and can include presentation files, images, visualizations, moodboards or other agreed design outputs.",
  },
];

export default function FAQList({
  items = defaultFAQs,
}: {
  items?: FAQItem[];
}) {
  const grouped = items.reduce<Record<string, FAQItem[]>>((acc, item) => {
    const category = item.category ?? "General";
    acc[category] ??= [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-rituals space-y-14">
        {Object.entries(grouped).map(([category, categoryItems]) => (
          <div
            key={category}
            className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]"
          >
            <p className="label-rituals">{category}</p>
            <Accordion
              items={categoryItems.map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
