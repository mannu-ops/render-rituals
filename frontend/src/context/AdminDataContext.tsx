"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { projects as initialProjects } from "@/data/projects";
import { services as initialServices } from "@/data/services";
import { testimonials as initialTestimonials } from "@/data/testimonials";
import { processSteps as initialProcess } from "@/data/process";
import { faqs as initialFaqs } from "@/data/faqs";
import { stats as initialStats } from "@/data/stats";
import { skillCategories as initialSkills } from "@/data/skills";
import { CONTACT, siteConfig } from "@/data/site";
import { Project, Service, Testimonial } from "@/types";
import { api } from "@/services/api";
import ToastNotification, { ToastItem } from "@/components/ui/ToastNotification";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  date: string;
  status: "new" | "in_discussion" | "completed" | "archived";
}

export interface StudioSettings {
  siteName: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  isAvailable: boolean;
  statusText: string;
  adminPasscode: string;
}

interface AdminDataContextType {
  // Auth
  isAuthenticated: boolean;
  login: (passcode: string) => Promise<boolean> | boolean;
  authenticateDirectly: (token?: string, updatedPasscode?: string) => void;
  logout: () => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "slug">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Services
  services: Service[];
  updateService: (id: string, service: Partial<Service>) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Dynamic Process, FAQs, Stats & Skills
  processSteps: any[];
  updateProcessSteps: (steps: any[]) => void;
  faqs: any[];
  updateFaqs: (faqs: any[]) => void;
  stats: any[];
  updateStats: (stats: any[]) => void;
  skills: any[];
  updateSkills: (skills: any[]) => void;

  // Inquiries
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  deleteInquiry: (id: string) => void;

  // Settings
  settings: StudioSettings;
  updateSettings: (settings: Partial<StudioSettings>) => void;
  isBackendConnected: boolean;

  // Custom Toast Popup Notification Engine
  showToast: (toast: Omit<ToastItem, "id">) => void;
}

const defaultSettings: StudioSettings = {
  siteName: "Render Rituals",
  email: CONTACT.email || "iamnikita2911@gmail.com",
  phone: CONTACT.phone || "+91 9305308296",
  whatsapp: CONTACT.whatsappNumber || CONTACT.phone || "+91 9305308296",
  location: CONTACT.location || "Noida, Uttar Pradesh, India",
  isAvailable: true,
  statusText: "Available for Projects",
  adminPasscode: "nikita2026",
};

const defaultInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Ar. Rohit Mehta",
    email: "rohit@mehtadesign.in",
    phone: "+91 98112 34567",
    service: "3D Photorealistic Interior CGI",
    message: "We have a 4BHK luxury penthouse in Gurugram requiring 8 photorealistic perspectives with warm 2700K evening lighting.",
    date: "Aug 29, 2026",
    status: "new",
  },
  {
    id: "inq-2",
    name: "Pooja Verma",
    email: "pooja.v@gmail.com",
    phone: "+91 97118 90123",
    service: "2D Space Planning & Layout",
    message: "Looking for an optimized furniture layout and partition plan for our 1,800 sq.ft duplex in Noida.",
    date: "Aug 28, 2026",
    status: "in_discussion",
  },
  {
    id: "inq-3",
    name: "Siddharth Oberoi",
    email: "siddharth@oberoidesign.com",
    phone: "+91 9920112233",
    service: "3D Visualization & Interior Architecture",
    message: "We have an ongoing boutique hospitality villa project in Goa and need consistent visual renders.",
    date: "Aug 26, 2026",
    status: "completed",
  },
];

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [processSteps, setProcessSteps] = useState<any[]>(initialProcess);
  const [faqs, setFaqs] = useState<any[]>(initialFaqs);
  const [stats, setStats] = useState<any[]>(initialStats);
  const [skills, setSkills] = useState<any[]>(initialSkills);
  const [inquiries, setInquiries] = useState<Inquiry[]>(defaultInquiries);
  const [settings, setSettings] = useState<StudioSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Toast notification dispatcher
  const showToast = (toast: Omit<ToastItem, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastItem = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration || 4000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Initial Local Storage & Master Live Backend API Hydration
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("rr_admin_auth");
      if (savedAuth === "true") setIsAuthenticated(true);

      const savedProjects = localStorage.getItem("rr_projects");
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        const healed = parsed.map((p: Project) => ({
          ...p,
          plans2D: (p.plans2D && p.plans2D.length > 0)
            ? p.plans2D.map((plan, idx) => {
                if (plan.image && (plan.image.includes("project-05") || plan.image.includes("project-06") || plan.image.includes("project-01") || plan.image.includes("project-02") || plan.image.includes("project-03") || plan.image.includes("project-04"))) {
                  return { ...plan, image: idx === 0 ? "/images/cad/plan-01.jpg" : "/images/cad/plan-02.jpg" };
                }
                return plan;
              })
            : [
                {
                  id: "p-1",
                  title: "Master Space Planning & Furniture Layout",
                  image: "/images/cad/plan-01.jpg",
                  sheetType: "Primary Architectural Layout",
                  scale: "1:50",
                  description: "Zoning and furniture orientation drafted in AutoCAD.",
                },
              ],
        }));
        setProjects(healed);
      }

      const savedServices = localStorage.getItem("rr_services");
      if (savedServices) setServices(JSON.parse(savedServices));

      const savedTestimonials = localStorage.getItem("rr_testimonials");
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedInquiries = localStorage.getItem("rr_inquiries");
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedSettings = localStorage.getItem("rr_settings");
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.warn("Storage loading error:", e);
    } finally {
      setIsLoaded(true);
    }

    // Connect to Live Backend REST API Master Hydration Endpoint
    api.getAllData().then((allData) => {
      if (allData) {
        setIsBackendConnected(true);

        if (allData.projects && allData.projects.length > 0) {
          const sanitized = allData.projects.map((p: Project) => ({
            ...p,
            plans2D: (p.plans2D && p.plans2D.length > 0)
              ? p.plans2D.map((plan, idx) => {
                  if (plan.image && (plan.image.includes("project-05") || plan.image.includes("project-06") || plan.image.includes("project-01") || plan.image.includes("project-02") || plan.image.includes("project-03") || plan.image.includes("project-04"))) {
                    return { ...plan, image: idx === 0 ? "/images/cad/plan-01.jpg" : "/images/cad/plan-02.jpg" };
                  }
                  return plan;
                })
              : [
                  {
                    id: "p-1",
                    title: "Master Space Planning & Furniture Layout",
                    image: "/images/cad/plan-01.jpg",
                    sheetType: "Primary Architectural Layout",
                    scale: "1:50",
                    description: "Zoning and furniture orientation drafted in AutoCAD.",
                  },
                ],
          }));
          setProjects(sanitized);
        }
        if (allData.services && allData.services.length > 0) {
          setServices(allData.services);
        }
        if (allData.testimonials && allData.testimonials.length > 0) {
          setTestimonials(allData.testimonials);
        }
        if (allData.process && allData.process.length > 0) {
          setProcessSteps(allData.process);
        }
        if (allData.faqs && allData.faqs.length > 0) {
          setFaqs(allData.faqs);
        }
        if (allData.stats && allData.stats.length > 0) {
          setStats(allData.stats);
        }
        if (allData.skills && allData.skills.length > 0) {
          setSkills(allData.skills);
        }
        if (allData.inquiries && allData.inquiries.length > 0) {
          setInquiries(allData.inquiries);
        }
        if (allData.settings && Object.keys(allData.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...allData.settings }));
        }
      }
    });
  }, []);

  // Save changes to localStorage as secondary backup
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("rr_projects", JSON.stringify(projects));
      localStorage.setItem("rr_services", JSON.stringify(services));
      localStorage.setItem("rr_testimonials", JSON.stringify(testimonials));
      localStorage.setItem("rr_inquiries", JSON.stringify(inquiries));
      localStorage.setItem("rr_settings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }, [projects, services, testimonials, inquiries, settings, isLoaded]);

  // Auth methods
  const authenticateDirectly = (token?: string, updatedPasscode?: string) => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("rr_admin_auth", "true");
      if (token) localStorage.setItem("rr_admin_token", token);
    } catch (e) {}
    if (updatedPasscode) {
      setSettings((prev) => {
        const next = { ...prev, adminPasscode: updatedPasscode };
        try {
          localStorage.setItem("rr_settings", JSON.stringify(next));
        } catch (e) {}
        return next;
      });
    }
  };

  const login = async (passcode: string): Promise<boolean> => {
    // 1. Direct match with current state
    if (passcode.trim() === settings.adminPasscode.trim()) {
      authenticateDirectly(undefined, passcode);
      api.login(passcode).catch(() => {});
      return true;
    }

    // 2. Also verify against backend API (handles bcrypt hashed passcode)
    try {
      const res = await api.login(passcode);
      if (res && res.success) {
        authenticateDirectly(res.token, passcode);
        return true;
      }
    } catch (e) {}

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("rr_admin_auth");
      localStorage.removeItem("rr_admin_token");
    } catch (e) {}
  };

  // Projects CRUD - Optimistic UI + Live Backend Sync
  const addProject = (proj: Omit<Project, "id" | "slug">) => {
    const id = `project-${Date.now()}`;
    const slug = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newProj: Project = { ...proj, id, slug } as Project;
    setProjects((prev) => [newProj, ...prev]);

    // Send to Backend API
    api.createProject(newProj);
    showToast({
      type: "success",
      title: "Project Suite Published!",
      message: `"${proj.title}" has been saved to Neon Database and published live.`,
    });
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));

    // Send to Backend API
    api.updateProject(id, updated);
    showToast({
      type: "success",
      title: "Project Changes Saved!",
      message: `Updated project details synced with Neon PostgreSQL cloud.`,
    });
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));

    // Send to Backend API
    api.deleteProject(id);
    showToast({
      type: "info",
      title: "Project Suite Removed",
      message: target ? `"${target.title}" was deleted.` : "Project deleted.",
    });
  };

  // Services CRUD
  const updateService = (id: string, updated: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));

    // Send to Backend API
    api.updateService(id, updated);
    showToast({
      type: "success",
      title: "Service Tier Saved!",
      message: "Rate card pricing and deliverables updated on website.",
    });
  };

  // Testimonials CRUD
  const addTestimonial = (test: Omit<Testimonial, "id">) => {
    const id = `test-${Date.now()}`;
    const newTest: Testimonial = { ...test, id } as Testimonial;
    setTestimonials((prev) => [newTest, ...prev]);

    // Send to Backend API
    api.createTestimonial(newTest);
    showToast({
      type: "success",
      title: "New Review Published!",
      message: `Review from ${test.name} is now live on homepage.`,
    });
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));

    // Send to Backend API
    api.updateTestimonial(id, updated);
    showToast({
      type: "success",
      title: "Review Updated!",
      message: "Endorsement changes saved.",
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

    // Send to Backend API
    api.deleteTestimonial(id);
    showToast({
      type: "info",
      title: "Review Removed",
      message: "Testimonial record deleted.",
    });
  };

  // Inquiries CRUD - Contact Form Submissions
  const addInquiry = (inq: Omit<Inquiry, "id" | "date" | "status">) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const newInq: Inquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      date: formattedDate,
      status: "new",
    };
    setInquiries((prev) => [newInq, ...prev]);

    // Send to Backend API
    api.createInquiry(newInq);
  };

  const updateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));

    // Send to Backend API
    api.updateInquiryStatus(id, status);
    showToast({
      type: "success",
      title: "Lead Status Updated",
      message: `Inquiry status changed to "${status.replace("_", " ")}".`,
    });
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));

    // Send to Backend API
    api.deleteInquiry(id);
    showToast({
      type: "info",
      title: "Lead Record Deleted",
      message: "Inquiry removed from inbox.",
    });
  };

  // Process Steps CRUD
  const updateProcessSteps = (steps: any[]) => {
    setProcessSteps(steps);
    api.updateProcess(steps);
    showToast({
      type: "success",
      title: "Process Workflow Saved",
      message: "Studio process steps updated.",
    });
  };

  // FAQs CRUD
  const updateFaqs = (newFaqs: any[]) => {
    setFaqs(newFaqs);
    api.updateFaqs(newFaqs);
    showToast({
      type: "success",
      title: "FAQs Updated",
      message: "Frequently asked questions saved.",
    });
  };

  // Stats CRUD
  const updateStats = (newStats: any[]) => {
    setStats(newStats);
    api.updateStats(newStats);
    showToast({
      type: "success",
      title: "Statistics Updated",
      message: "Studio numbers and metrics updated.",
    });
  };

  // Skills CRUD
  const updateSkills = (newSkills: any[]) => {
    setSkills(newSkills);
    api.updateSkills(newSkills);
    showToast({
      type: "success",
      title: "Tool Stack Saved",
      message: "Software stack updated.",
    });
  };

  // Settings CRUD
  const updateSettings = (updated: Partial<StudioSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));

    // Send to Backend API
    api.updateSettings(updated);
    showToast({
      type: "success",
      title: "Studio Settings & Beacon Saved!",
      message: "Live availability status and contact info synced across website.",
    });
  };

  return (
    <AdminDataContext.Provider
      value={{
        isAuthenticated,
        login,
        authenticateDirectly,
        logout,
        projects,
        addProject,
        updateProject,
        deleteProject,
        services,
        updateService,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        processSteps,
        updateProcessSteps,
        faqs,
        updateFaqs,
        stats,
        updateStats,
        skills,
        updateSkills,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        settings,
        updateSettings,
        isBackendConnected,
        showToast,
      }}
    >
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
