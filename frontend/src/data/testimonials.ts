export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  project?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The design direction was clear, thoughtful and easy to understand from the first presentation.",
    name: "Client Name",
    role: "Homeowner",
    project: "Residential Interior",
  },
  {
    quote:
      "A strong balance between visual detail and practical decision-making. The process felt very considered.",
    name: "Client Name",
    role: "Founder",
    company: "Studio / Brand",
    project: "Commercial Concept",
  },
  {
    quote:
      "The visualizations helped us communicate the idea with confidence before moving forward.",
    name: "Client Name",
    role: "Project Lead",
    project: "3D Visualization",
  },
];
