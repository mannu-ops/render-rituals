export const contactConfig = {
  recipientEmail: "iamnikita2911@gmail.com",
  maxMessageLength: 5000,
  minMessageLength: 10,
  budgetOptions: [
    "Under ₹10,000",
    "₹10,000 — ₹25,000",
    "₹25,000 — ₹50,000",
    "₹50,000 — ₹1,00,000",
    "₹1,00,000+",
    "Not decided yet",
  ],
  timelineOptions: [
    "As soon as possible",
    "Within 1 month",
    "1 — 3 months",
    "3+ months",
    "Just exploring",
  ],
} as const;
