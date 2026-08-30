export type ServiceCategory =
  | "Design"
  | "Visualization"
  | "Planning"
  | "Creative"
  | string;

export interface Service {
  id: string;
  slug: string;
  title: string;
  name: string;
  shortTitle?: string;
  shortDescription?: string;
  description: string;
  price: string;
  startingPrice: string;
  priceNote?: string;
  category: ServiceCategory;
  features: string[];
  deliverables?: string[];
  coverImage?: string;
  popular?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

