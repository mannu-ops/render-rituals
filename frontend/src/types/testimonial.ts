export interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  role?: string;
  location?: string;
  scope?: string;
  rating?: number;
  company?: string;
  project?: string;
  image?: string;
  published?: boolean;
  createdAt?: string;
}
