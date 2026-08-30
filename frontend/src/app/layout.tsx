import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteLayoutWrapper from "@/components/layout/SiteLayoutWrapper";
import { AdminDataProvider } from "@/context/AdminDataContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14171A",
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Render Rituals — 3D Visualization & 2D Space Planning",
    template: "%s — Render Rituals",
  },
  description:
    "Render Rituals is an independent practice specializing in photorealistic 3D interior renders and practical 2D space planning floor layouts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased selection:bg-[#D49A6A] selection:text-[#14171A]">
        <SmoothScrollProvider>
          <AdminDataProvider>
            <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
          </AdminDataProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
