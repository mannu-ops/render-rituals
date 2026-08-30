"use client";

import { SiteProvider } from "./SiteContext";
import { PortfolioProvider } from "./PortfolioContext";
import { ThemeProvider } from "./ThemeContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SiteProvider>
        <PortfolioProvider>{children}</PortfolioProvider>
      </SiteProvider>
    </ThemeProvider>
  );
}
