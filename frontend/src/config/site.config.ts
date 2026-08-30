import { SITE, CONTACT } from "@/data";

export const siteConfig = {
  name: SITE.name,
  title: SITE.title,
  description: SITE.description,
  url: SITE.url,
  contact: CONTACT,
  creator: "Render Rituals",
  locale: "en_IN",
  themeColor: "#f5f3ef",
} as const;
