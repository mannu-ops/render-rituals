export type ContactType =
  | "project"
  | "hiring"
  | "general";

export type ContactStatus =
  | "new"
  | "read"
  | "replied"
  | "archived";

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: ContactType;
  subject?: string;
  message: string;
  budget?: string;
  timeline?: string;
  status: ContactStatus;
  createdAt?: string;
}
