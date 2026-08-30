import { SiteConfig, ContactInfo, NavigationItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Render Rituals",
  shortName: "Render Rituals",
  tagline: "Spaces with ritual.",
  description:
    "Render Rituals is an interior design & 3D visualization practice creating thoughtful spaces, practical layouts, and photorealistic visual stories.",
  author: "Nikita",
  role: "Interior Designer & 3D Visualization Artist",
  location: "Noida, Uttar Pradesh, India",
  email: "iamnikita2911@gmail.com",
  phone: "+91 9305308296",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
  availability: "Available for new projects",
};

export const SITE = siteConfig;

export const CONTACT: ContactInfo = {
  email: "iamnikita2911@gmail.com",
  phone: "+91 9305308296",
  location: "Noida, Uttar Pradesh, India",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
  hours: "Mon — Sat: 10:00 AM — 7:00 PM IST",
};

export const NAVIGATION: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Hire Me", href: "/hire-me" },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://instagram.com/" },
  { name: "LinkedIn", url: "https://linkedin.com/" },
  { name: "Email", url: "mailto:iamnikita2911@gmail.com" },
];
