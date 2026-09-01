const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper for fetch requests with safety timeout & error recovery
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s safety timeout

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      console.warn(`[API] Endpoint ${endpoint} returned status ${res.status}`, json);
      return json as T;
    }

    return json as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.warn(`[API Timeout] Request to ${endpoint} exceeded 30s timeout.`);
    } else {
      console.warn(`[API Network Error] ${endpoint}:`, error.message || error);
    }
    return null;
  }
}

export const api = {
  // ==========================================
  // 1. HEALTH, AUTH & MASTER BUNDLE
  // ==========================================
  async checkHealth() {
    return fetchApi<{ status: string }>("/health");
  },

  async getAllData() {
    return fetchApi<any>("/all-data");
  },

  async login(passcode: string) {
    return fetchApi<{ success: boolean; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ passcode }),
    });
  },

  async requestPasswordResetOtp(email?: string) {
    return fetchApi<{
      success: boolean;
      message: string;
      maskedEmail: string;
      targetEmail: string;
      otpCode?: string;
      emailDelivered?: boolean;
    }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async resetPasswordWithOtp(params: { email?: string; otp: string; newPasscode: string }) {
    return fetchApi<{ success: boolean; message: string; token: string; newPasscode: string }>(
      "/auth/reset-password",
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );
  },

  // ==========================================
  // CLOUDINARY IMAGE UPLOAD
  // ==========================================
  async uploadImage(file: File): Promise<{ success: boolean; url: string } | null> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error("Upload error:", e);
      return null;
    }
  },

  // ==========================================
  // 2. PROJECTS (3D & 2D SUITES)
  // ==========================================
  async getProjects() {
    return fetchApi<any[]>("/projects");
  },

  async getProjectBySlug(slug: string) {
    return fetchApi<any>(`/projects/${slug}`);
  },

  async createProject(projectData: any) {
    return fetchApi<any>("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },

  async updateProject(id: string, projectData: any) {
    return fetchApi<any>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
  },

  async deleteProject(id: string) {
    return fetchApi<{ success: boolean }>(`/projects/${id}`, {
      method: "DELETE",
    });
  },

  // ==========================================
  // 3. SERVICES, PROCESS, FAQS, STATS, SKILLS
  // ==========================================
  async getServices() {
    return fetchApi<any[]>("/services");
  },

  async updateService(id: string, serviceData: any) {
    return fetchApi<any>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    });
  },

  async getProcess() {
    return fetchApi<any[]>("/process");
  },

  async updateProcess(processData: any) {
    return fetchApi<any>("/process", {
      method: "PUT",
      body: JSON.stringify(processData),
    });
  },

  async getFaqs() {
    return fetchApi<any[]>("/faqs");
  },

  async updateFaqs(faqsData: any) {
    return fetchApi<any>("/faqs", {
      method: "PUT",
      body: JSON.stringify(faqsData),
    });
  },

  async getStats() {
    return fetchApi<any[]>("/stats");
  },

  async updateStats(statsData: any) {
    return fetchApi<any>("/stats", {
      method: "PUT",
      body: JSON.stringify(statsData),
    });
  },

  async getSkills() {
    return fetchApi<any[]>("/skills");
  },

  async updateSkills(skillsData: any) {
    return fetchApi<any>("/skills", {
      method: "PUT",
      body: JSON.stringify(skillsData),
    });
  },

  // ==========================================
  // 4. INQUIRIES / LEADS
  // ==========================================
  async getInquiries() {
    return fetchApi<any[]>("/inquiries");
  },

  async createInquiry(inquiryData: any) {
    return fetchApi<any>("/inquiries", {
      method: "POST",
      body: JSON.stringify(inquiryData),
    });
  },

  async updateInquiryStatus(id: string, status: string) {
    return fetchApi<any>(`/inquiries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  async deleteInquiry(id: string) {
    return fetchApi<{ success: boolean }>(`/inquiries/${id}`, {
      method: "DELETE",
    });
  },

  // ==========================================
  // 5. TESTIMONIALS & SETTINGS
  // ==========================================
  async getTestimonials() {
    return fetchApi<any[]>("/testimonials");
  },

  async createTestimonial(testimonialData: any) {
    return fetchApi<any>("/testimonials", {
      method: "POST",
      body: JSON.stringify(testimonialData),
    });
  },

  async updateTestimonial(id: string, testimonialData: any) {
    return fetchApi<any>(`/testimonials/${id}`, {
      method: "PUT",
      body: JSON.stringify(testimonialData),
    });
  },

  async deleteTestimonial(id: string) {
    return fetchApi<{ success: boolean }>(`/testimonials/${id}`, {
      method: "DELETE",
    });
  },

  async getSettings() {
    return fetchApi<any>("/settings");
  },

  async updateSettings(settingsData: any) {
    return fetchApi<any>("/settings", {
      method: "PUT",
      body: JSON.stringify(settingsData),
    });
  },
};
