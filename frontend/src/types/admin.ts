export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface DashboardStats {
  projects: number;
  services: number;
  testimonials: number;
  enquiries: number;
  unreadEnquiries: number;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone?: string;
  instagramUrl?: string;
  maintenanceMode?: boolean;
}
