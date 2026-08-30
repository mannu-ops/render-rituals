"use client";

import { createContext, useContext, useMemo, useState } from "react";

type SiteContextValue = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
};

const SiteContext = createContext<SiteContextValue | undefined>(undefined);

export function SiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const value = useMemo(
    () => ({
      mobileMenuOpen,
      setMobileMenuOpen,
      toggleMobileMenu: () => setMobileMenuOpen((open) => !open),
      contactModalOpen,
      setContactModalOpen,
    }),
    [mobileMenuOpen, contactModalOpen],
  );

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error("useSiteContext must be used inside SiteProvider.");
  }

  return context;
}
