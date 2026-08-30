export type InquiryStatus = "new" | "reviewed" | "contacted" | "archived";

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  location?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}
