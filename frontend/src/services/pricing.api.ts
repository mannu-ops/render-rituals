import type { PricingPackage } from "@/types";

const pricingPackages: PricingPackage[] = [
  {
    id: "pricing-01",
    name: "3D Visualization",
    title: "3D Visualization",
    description: "Realistic interior visualization for a defined scope.",
    price: 3500,
    currency: "INR",
    priceLabel: "From ₹3,500",
    features: [
      "3D modelling",
      "Material setup",
      "Lighting",
      "Realistic render",
    ],
    delivery: "Scope dependent",
    revisions: 1,
    published: true,
  },
  {
    id: "pricing-02",
    name: "Space Planning",
    title: "Space Planning",
    description: "Practical planning for furniture, circulation and zoning.",
    price: 5000,
    currency: "INR",
    priceLabel: "From ₹5,000",
    features: [
      "Furniture layout",
      "Circulation planning",
      "Room zoning",
      "2D floor plan",
    ],
    delivery: "Scope dependent",
    revisions: 2,
    published: true,
  },
  {
    id: "pricing-03",
    name: "Interior Design",
    title: "Interior Design",
    description: "A broader design direction for a residential or selected commercial space.",
    price: 25000,
    currency: "INR",
    priceLabel: "From ₹25,000",
    features: [
      "Space planning",
      "Furniture & modular planning",
      "Material direction",
      "2D drawings",
      "3D design development",
    ],
    delivery: "Scope dependent",
    revisions: 2,
    popular: true,
    published: true,
  },
];

export async function getPricing(): Promise<PricingPackage[]> {
  return pricingPackages.filter((item) => item.published !== false);
}
