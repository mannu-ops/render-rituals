import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "3d-visualization",
    slug: "3d-visualization",
    title: "3D Interior & Architectural Visualization",
    name: "3D Visualization",
    shortTitle: "3D Renders",
    shortDescription: "Photorealistic 4K 3D renders with realistic lighting and materials.",
    description:
      "I create high-resolution, photorealistic 3D renders so you, your clients, or contractors can clearly visualize the space, lighting warmth, and materials before spending a single rupee on construction.",
    price: "₹3,500 – ₹6,000 / view",
    startingPrice: "₹3,500",
    priceNote: "Based on room scope and number of camera angles.",
    category: "3D Rendering",
    features: [
      "4K Ultra-HD still renders",
      "Realistic daylight & 2700K evening lighting",
      "Accurate material, wood & fabric textures",
      "Custom furniture & décor modeling",
      "Fast turnaround (3–5 working days)",
    ],
    deliverables: [
      "4K Photorealistic Final Renders",
      "Day / Night Lighting Versions",
      "High-Resolution JPEG / PNG Deliverables",
    ],
    coverImage: "/images/portfolio/project-04.jpg",
    popular: true,
    published: true,
  },
  {
    id: "2d-space-planning",
    slug: "2d-space-planning",
    title: "2D Space Planning & Floor Layouts",
    name: "2D Space Planning",
    shortTitle: "2D Layouts",
    shortDescription: "Dimensioned floor plans, furniture layouts, and movement clearances.",
    description:
      "I create functional 2D floor plans with exact furniture sizing, circulation pathways, and contractor-ready dimension sheets to ensure your space is efficient and easy to navigate.",
    price: "₹5,000 – ₹12,000 / project",
    startingPrice: "₹5,000",
    priceNote: "Based on square footage and total rooms.",
    category: "2D Planning",
    features: [
      "Exact furniture placement with dimensions",
      "Ergonomic circulation & walking clearance",
      "Room zoning & storage optimization",
      "Contractor-ready PDF / CAD drawing sheets",
      "Fast turnaround (2–4 working days)",
    ],
    deliverables: [
      "Dimensioned 2D Floor Plan (PDF)",
      "Furniture & Joinery Layout Guide",
      "Contractor Clearance Measurements",
    ],
    coverImage: "/images/cad/plan-01.jpg",
    popular: true,
    published: true,
  },
];

export const SERVICES = services;
