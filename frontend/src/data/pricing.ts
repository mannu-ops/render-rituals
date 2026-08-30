import { PricingPackage } from "@/types";

export const pricingPackages: PricingPackage[] = [
  {
    id: "consultation",
    name: "Design Consultation",
    title: "Design Consultation",
    subtitle: "Focused spatial guidance.",
    description: "60-minute virtual or on-site consultation to review layouts, materials, or initial concepts.",
    price: 2500,
    priceLabel: "From ₹2,500",
    features: [
      "60-minute consultation session",
      "Layout & space planning feedback",
      "Material & color guidance",
      "Actionable design summary report",
    ],
    delivery: "1 session",
    revisions: 0,
  },
  {
    id: "visualization",
    name: "3D Visualization",
    title: "3D Visualization",
    subtitle: "Realistic visual renders.",
    description: "Photorealistic 3D visualization for presenting interiors, concepts, or client proposals.",
    price: 7500,
    priceLabel: "From ₹7,500",
    popular: true,
    features: [
      "Detailed 3D scene modelling",
      "PBR texturing & material setup",
      "Custom interior lighting direction",
      "2 high-res final renders",
      "2 revision rounds",
    ],
    delivery: "5–7 business days",
    revisions: 2,
  },
  {
    id: "interior",
    name: "Interior Design Package",
    title: "Interior Design Package",
    subtitle: "Full design direction.",
    description: "Complete interior design solution for a single room, residence, or selected studio space.",
    price: 15000,
    priceLabel: "From ₹15,000",
    features: [
      "Complete space planning layout",
      "Moodboard & material selection",
      "3D interior visualization (multiple views)",
      "2D CAD drawings & detailing",
      "Furniture & lighting recommendation sheet",
    ],
    delivery: "10–14 business days",
    revisions: 2,
  },
];

export const pricingPlans = pricingPackages;
export const PRICING_PACKAGES = pricingPackages;
