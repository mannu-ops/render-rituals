import type { FAQItem } from "@/types";

const fallbackFAQs: FAQItem[] = [
  {
    id: "faq-01",
    question: "What kind of projects do you take?",
    answer:
      "Residential interiors, modular planning, selected commercial spaces, architectural planning and 3D visualization projects.",
    category: "Projects",
    order: 1,
    published: true,
  },
  {
    id: "faq-02",
    question: "Can I hire you only for 3D visualization?",
    answer:
      "Yes. Visualization can be booked as a standalone service when the required drawings or design information are available.",
    category: "Services",
    order: 2,
    published: true,
  },
  {
    id: "faq-03",
    question: "How does a project usually start?",
    answer:
      "The process starts with your requirements, project information, references and scope. A suitable service and quotation can then be prepared.",
    category: "Process",
    order: 3,
    published: true,
  },
  {
    id: "faq-04",
    question: "Do you work with clients remotely?",
    answer:
      "Yes. Design discussions, references, revisions and presentations can be coordinated online where the project scope allows it.",
    category: "Process",
    order: 4,
    published: true,
  },
  {
    id: "faq-05",
    question: "Can companies contact you for hiring opportunities?",
    answer:
      "Yes. The website includes a dedicated hiring route so studios, companies and recruiters can contact you about suitable opportunities.",
    category: "Hiring",
    order: 5,
    published: true,
  },
];

export async function getFAQs(): Promise<FAQItem[]> {
  return fallbackFAQs.filter((faq) => faq.published !== false);
}

export async function getFAQsByCategory(
  category: string,
): Promise<FAQItem[]> {
  return (await getFAQs()).filter(
    (faq) => faq.category?.toLowerCase() === category.toLowerCase(),
  );
}
