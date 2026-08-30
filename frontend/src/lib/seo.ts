import type { Metadata } from "next";
import { SITE } from "@/data";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title
    ? `${title} — ${SITE.name}`
    : `${SITE.name} — ${SITE.tagline || SITE.role || "Interior Design"}`;

  return {
    title: fullTitle,
    description: description ?? SITE.description,
    metadataBase: new URL(SITE.url || "https://renderrituals.com"),
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: fullTitle,
      description: description ?? SITE.description,
      siteName: SITE.name,
      type: "website",
      url: path || "/",
    },
  };
}
