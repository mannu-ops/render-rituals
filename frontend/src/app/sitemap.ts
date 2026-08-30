import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.com";

  return [
    "",
    "/about",
    "/work",
    "/services",
    "/pricing",
    "/experience",
    "/resume",
    "/faq",
    "/contact",
    "/hire-me",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
