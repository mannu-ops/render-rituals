export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  title?: string;
  description: string;
  author: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  instagram: string;
  linkedin?: string;
  url?: string;
  availability: "Available for new projects" | "Limited availability" | "Fully booked";
}

export interface ContactInfo {
  email: string;
  phone?: string;
  instagram: string;
  linkedin?: string;
  location: string;
  hours?: string;
}

