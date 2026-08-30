const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { db, initDb, verifyPasscode } = require("./db");
const { sendLeadNotification } = require("./email");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Configure Multer for in-memory file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max per image for high-res 4K renders
});

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve Static Images directly from backend as fallback
app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));

// Initialize Neon Database & auto-create tables
initDb().catch((err) => console.error("DB Init Error:", err));

// ==========================================
// 1. HEALTH CHECK & MASTER DATA BUNDLE
// ==========================================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Render Rituals API",
    database: db.isPostgres() ? "Neon PostgreSQL (Cloud Active)" : "Local JSON Fallback",
    mediaStorage: process.env.CLOUDINARY_CLOUD_NAME ? "Cloudinary CDN (Active)" : "Local Storage",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/all-data", async (req, res) => {
  try {
    const data = await db.getAllData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. CLOUDINARY DIRECT IMAGE UPLOAD ENDPOINT
// ==========================================
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload directly from memory stream to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "render_rituals/portfolio",
            resource_type: "image",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(fileBuffer);
      });
    };

    const uploadResult = await streamUpload(req.file.buffer);

    return res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({ error: "Image upload failed: " + err.message });
  }
});

// ==========================================
// 3. AUTH ROUTE (BCRYPT HASH VERIFICATION)
// ==========================================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { passcode } = req.body;
    const settings = await db.getSettings();
    const storedHash = settings.adminPasscode || process.env.ADMIN_PASSCODE || "nikita2026";

    const isMatch = verifyPasscode(passcode, storedHash);

    if (isMatch) {
      return res.json({
        success: true,
        token: "rr_auth_" + Date.now(),
        message: "Admin authentication successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid master passcode",
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 4. PROJECTS ENDPOINTS (3D & 2D SUITES)
// ==========================================
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects/:slug", async (req, res) => {
  try {
    const project = await db.getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const newProject = await db.createProject(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const updated = await db.updateProject(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const result = await db.deleteProject(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. SERVICES ENDPOINTS
// ==========================================
app.get("/api/services", async (req, res) => {
  try {
    const services = await db.getServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const updated = await db.updateService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. INQUIRIES / LEADS ENDPOINTS
// ==========================================
app.get("/api/inquiries", async (req, res) => {
  try {
    const inquiries = await db.getInquiries();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const newInquiry = await db.createInquiry(req.body);

    let emailResult = { delivered: false };
    try {
      emailResult = await Promise.race([
        sendLeadNotification(newInquiry),
        new Promise((resolve) => setTimeout(() => resolve({ delivered: false, timeout: true }), 3500)),
      ]);
    } catch (e) {
      console.error("Email dispatch catch:", e);
    }

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry: newInquiry,
      emailDelivered: emailResult?.delivered ?? false,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch("/api/inquiries/:id/status", async (req, res) => {
  try {
    const updated = await db.updateInquiryStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    const result = await db.deleteInquiry(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. TESTIMONIALS & REVIEWS ENDPOINTS
// ==========================================
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await db.getTestimonials();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/testimonials", async (req, res) => {
  try {
    const newTestimonial = await db.createTestimonial(req.body);
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/testimonials/:id", async (req, res) => {
  try {
    const updated = await db.updateTestimonial(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/testimonials/:id", async (req, res) => {
  try {
    const result = await db.deleteTestimonial(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. STUDIO SETTINGS ENDPOINTS
// ==========================================
app.get("/api/settings", async (req, res) => {
  try {
    const settings = await db.getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/settings", async (req, res) => {
  try {
    const settings = await db.updateSettings(req.body);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 9. 404 NOT FOUND & GLOBAL ERROR MIDDLEWARE
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "API Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

app.use((err, req, res, next) => {
  console.error("🔥 Global Server Error Caught:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        error: "File is too large. Maximum allowed size is 25MB.",
      });
    }
    return res.status(400).json({ success: false, error: "File upload error: " + err.message });
  }

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal server error occurred",
    timestamp: new Date().toISOString(),
  });
});

// Process Level Safety Catchers
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("⚠️ Uncaught Exception:", error);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Render Rituals Backend API running on http://localhost:${PORT}`);
  console.log(`📡 Master Data bundle: http://localhost:${PORT}/api/all-data`);
  console.log(`📡 Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`☁️ Cloudinary Image Uploads: Active`);
});
