export const ROUTES = {
  home: "/",
  work: "/work",
  services: "/services",
  about: "/about",
  resume: "/resume",
  pricing: "/pricing",
  contact: "/contact",
  hire: "/hire-me",
  faq: "/faq",
  admin: "/admin",
} as const;

export const PROJECT_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Visualization",
  "Architecture",
] as const;

export const CONTACT_TYPES = [
  "project",
  "hiring",
  "general",
] as const;

export const CONTACT_STATUSES = [
  "new",
  "read",
  "replied",
  "archived",
] as const;
