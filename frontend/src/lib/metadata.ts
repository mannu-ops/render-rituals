import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Render Rituals — Interior Design & Visualization",
    template: "%s — Render Rituals",
  },
  description:
    "Interior design, visualization and spatial storytelling by Render Rituals.",
  keywords: [
    "interior designer",
    "interior design",
    "3D visualization",
    "space planning",
    "architectural drafting",
    "Render Rituals",
  ],
  authors: [{ name: "Render Rituals" }],
  creator: "Render Rituals",
  metadataBase: new URL("https://renderrituals.com"),
  openGraph: {
    title: "Render Rituals — Interior Design & Visualization",
    description:
      "Interior design, visualization and spatial storytelling by Render Rituals.",
    type: "website",
    siteName: "Render Rituals",
  },
  robots: {
    index: true,
    follow: true,
  },
};
