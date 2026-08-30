export const adminConfig = {
  route: "/admin",
  sessionCookie: "render-rituals-admin-session",
  dashboardRefreshMs: 30_000,
  pageSize: 20,
  features: {
    projects: true,
    services: true,
    pricing: true,
    testimonials: true,
    faqs: true,
    enquiries: true,
    media: true,
    settings: true,
  },
} as const;
