export const portfolioConfig = {
  featuredLimit: 3,
  gridPageSize: 12,
  categories: [
    "All",
    "Residential",
    "Commercial",
    "Visualization",
    "Architecture",
  ],
  imageSizes: {
    card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    featured: "100vw",
    detail: "(max-width: 1024px) 100vw, 80vw",
  },
} as const;
