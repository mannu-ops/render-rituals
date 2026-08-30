export interface PricingPackage {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  description?: string;
  price: number;
  currency?: string;
  priceLabel: string;
  features: string[];
  delivery?: string;
  revisions?: number;
  popular?: boolean;
  published?: boolean;
  order?: number;
}

