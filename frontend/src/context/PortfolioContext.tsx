"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import type { ProjectCategory } from "@/types";

type PortfolioContextValue = {
  activeCategory: ProjectCategory | "All";
  setActiveCategory: (category: ProjectCategory | "All") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const PortfolioContext =
  createContext<PortfolioContextValue | undefined>(undefined);

export function PortfolioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory | "All">("All");

  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(
    () => ({
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
    }),
    [activeCategory, searchQuery],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolioContext must be used inside PortfolioProvider.",
    );
  }

  return context;
}
