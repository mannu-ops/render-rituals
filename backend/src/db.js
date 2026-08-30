const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const DB_PATH = path.join(__dirname, "data", "db.json");

function hashPasscode(plain) {
  if (!plain) return "";
  if (plain.startsWith("$2a$") || plain.startsWith("$2b$")) return plain;
  return bcrypt.hashSync(plain, 10);
}

function verifyPasscode(input, storedHash) {
  if (!input || !storedHash) return false;
  if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$")) {
    return bcrypt.compareSync(input, storedHash);
  }
  return input === storedHash;
}

let pool = null;
let isPostgresReady = false;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
}

// Fallback Helper to read local db.json
function readLocalDb() {
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return {
      projects: [],
      services: [],
      testimonials: [],
      process: [],
      faqs: [],
      stats: [],
      skills: [],
      inquiries: [],
      settings: {},
    };
  }
}

// Fallback Helper to write local db.json
function writeLocalDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Local DB write error:", err);
  }
}

// Initialize PostgreSQL Tables & Auto-Seed from db.json if empty
async function initDb() {
  if (!pool) {
    console.log("ℹ️ Running in Local JSON Database mode.");
    return;
  }

  try {
    const client = await pool.connect();
    console.log("🐘 Connected to Neon PostgreSQL Database successfully!");

    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        year VARCHAR(20),
        location VARCHAR(255),
        client VARCHAR(255),
        image TEXT,
        cover_image TEXT,
        excerpt TEXT,
        description TEXT,
        scope TEXT,
        services JSONB DEFAULT '[]'::jsonb,
        software JSONB DEFAULT '[]'::jsonb,
        featured BOOLEAN DEFAULT true,
        published BOOLEAN DEFAULT true,
        gallery JSONB DEFAULT '[]'::jsonb,
        renders_3d JSONB DEFAULT '[]'::jsonb,
        plans_2d JSONB DEFAULT '[]'::jsonb,
        atmosphere VARCHAR(255) DEFAULT '2700K Warm Daylight',
        turnaround VARCHAR(255) DEFAULT '3 – 5 Days',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE projects ADD COLUMN IF NOT EXISTS atmosphere VARCHAR(255) DEFAULT '2700K Warm Daylight';
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS turnaround VARCHAR(255) DEFAULT '3 – 5 Days';

      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        short_title VARCHAR(255),
        short_description TEXT,
        description TEXT,
        price VARCHAR(100),
        starting_price VARCHAR(100),
        price_note VARCHAR(255),
        category VARCHAR(100),
        features JSONB DEFAULT '[]'::jsonb,
        deliverables JSONB DEFAULT '[]'::jsonb,
        cover_image TEXT,
        popular BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        location VARCHAR(255),
        quote TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        scope VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        service VARCHAR(255),
        message TEXT NOT NULL,
        date VARCHAR(100),
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS studio_settings (
        id VARCHAR(50) PRIMARY KEY,
        site_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(100),
        whatsapp VARCHAR(100),
        location VARCHAR(255),
        is_available BOOLEAN DEFAULT true,
        status_text VARCHAR(255),
        admin_passcode VARCHAR(100),
        data JSONB DEFAULT '{}'::jsonb
      );

      CREATE TABLE IF NOT EXISTS studio_collections (
        key VARCHAR(100) PRIMARY KEY,
        data JSONB NOT NULL
      );
    `);

    // Auto-Seed Initial Data if Projects table is empty
    const checkCount = await client.query("SELECT COUNT(*) FROM projects");
    if (parseInt(checkCount.rows[0].count) === 0) {
      console.log("🌱 Seeding initial Render Rituals data into Neon PostgreSQL...");
      const localData = readLocalDb();

      // Seed Projects
      for (const p of localData.projects || []) {
        await client.query(
          `INSERT INTO projects (id, slug, title, category, year, location, client, image, cover_image, excerpt, description, scope, services, software, featured, published, gallery, renders_3d, plans_2d)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
           ON CONFLICT (id) DO NOTHING`,
          [
            p.id,
            p.slug,
            p.title,
            p.category,
            p.year,
            p.location,
            p.client,
            p.image,
            p.coverImage,
            p.excerpt,
            p.description,
            typeof p.scope === "string" ? p.scope : JSON.stringify(p.scope),
            JSON.stringify(p.services || []),
            JSON.stringify(p.software || []),
            p.featured ?? true,
            p.published ?? true,
            JSON.stringify(p.gallery || []),
            JSON.stringify(p.renders3D || []),
            JSON.stringify(p.plans2D || []),
          ]
        );
      }

      // Seed Services
      for (const s of localData.services || []) {
        await client.query(
          `INSERT INTO services (id, slug, title, name, short_title, short_description, description, price, starting_price, price_note, category, features, deliverables, cover_image, popular, published)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
           ON CONFLICT (id) DO NOTHING`,
          [
            s.id,
            s.slug,
            s.title,
            s.name,
            s.shortTitle,
            s.shortDescription,
            s.description,
            s.price,
            s.startingPrice,
            s.priceNote,
            s.category,
            JSON.stringify(s.features || []),
            JSON.stringify(s.deliverables || []),
            s.coverImage,
            s.popular ?? false,
            s.published ?? true,
          ]
        );
      }

      // Seed Testimonials
      for (const t of localData.testimonials || []) {
        await client.query(
          `INSERT INTO testimonials (id, name, role, location, quote, rating, scope)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
          [t.id, t.name, t.role, t.location, t.quote, t.rating || 5, t.scope]
        );
      }

      // Seed Inquiries
      for (const i of localData.inquiries || []) {
        await client.query(
          `INSERT INTO inquiries (id, name, email, phone, service, message, date, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (id) DO NOTHING`,
          [i.id, i.name, i.email, i.phone, i.service, i.message, i.date, i.status || "new"]
        );
      }

      // Seed Settings
      const set = localData.settings || {};
      const hashedInitPass = hashPasscode(set.adminPasscode || process.env.ADMIN_PASSCODE || "nikita2026");
      await client.query(
        `INSERT INTO studio_settings (id, site_name, email, phone, whatsapp, location, is_available, status_text, admin_passcode, data)
         VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET admin_passcode = $8`,
        [
          set.siteName || "Render Rituals",
          set.email || "iamnikita2911@gmail.com",
          set.phone || "+91 9305308296",
          set.whatsapp || "919305308296",
          set.location || "Noida, Uttar Pradesh · Worldwide Remote",
          set.isAvailable ?? true,
          set.statusText || "Available for Projects",
          hashedInitPass,
          JSON.stringify(set),
        ]
      );

      // Seed Collections
      await client.query(
        `INSERT INTO studio_collections (key, data) VALUES ('process', $1), ('faqs', $2), ('stats', $3), ('skills', $4)
         ON CONFLICT (key) DO NOTHING`,
        [
          JSON.stringify(localData.process || []),
          JSON.stringify(localData.faqs || []),
          JSON.stringify(localData.stats || []),
          JSON.stringify(localData.skills || []),
        ]
      );

      console.log("✨ Neon PostgreSQL Seed Complete!");
    }

    client.release();
    isPostgresReady = true;
  } catch (err) {
    console.error("⚠️ PostgreSQL Connection Error, falling back to db.json:", err.message);
    isPostgresReady = false;
  }
}

// Convert row format to frontend camelCase Project structure
function formatProject(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    year: row.year,
    location: row.location,
    client: row.client,
    image: row.image,
    coverImage: row.cover_image || row.image,
    excerpt: row.excerpt,
    description: row.description,
    scope: row.scope,
    services: row.services || [],
    software: row.software || [],
    featured: row.featured,
    published: row.published,
    gallery: row.gallery || [],
    renders3D: row.renders_3d || [],
    plans2D: row.plans_2d || [],
    atmosphere: row.atmosphere || "2700K Warm Daylight",
    turnaround: row.turnaround || "3 – 5 Days",
    createdAt: row.created_at,
  };
}

// Convert row format to frontend camelCase Service structure
function formatService(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    name: row.name,
    shortTitle: row.short_title,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price,
    startingPrice: row.starting_price,
    priceNote: row.price_note,
    category: row.category,
    features: row.features || [],
    deliverables: row.deliverables || [],
    coverImage: row.cover_image,
    popular: row.popular,
    published: row.published,
  };
}

// Database Service Layer
const db = {
  isPostgres() {
    return isPostgresReady;
  },

  // Get Everything for Master Hydration
  async getAllData() {
    if (isPostgresReady && pool) {
      try {
        const [projRes, servRes, testRes, inqRes, setRes, colRes] = await Promise.all([
          pool.query("SELECT * FROM projects ORDER BY created_at DESC"),
          pool.query("SELECT * FROM services"),
          pool.query("SELECT * FROM testimonials ORDER BY created_at DESC"),
          pool.query("SELECT * FROM inquiries ORDER BY created_at DESC"),
          pool.query("SELECT * FROM studio_settings WHERE id = 'default'"),
          pool.query("SELECT * FROM studio_collections"),
        ]);

        const collectionsMap = {};
        colRes.rows.forEach((r) => {
          collectionsMap[r.key] = r.data;
        });

        const setRow = setRes.rows[0] || {};
        const settings = {
          siteName: setRow.site_name || "Render Rituals",
          email: setRow.email || "iamnikita2911@gmail.com",
          phone: setRow.phone || "+91 9305308296",
          whatsapp: setRow.whatsapp || "919305308296",
          location: setRow.location || "Noida, Uttar Pradesh · Worldwide Remote",
          isAvailable: setRow.is_available ?? true,
          statusText: setRow.status_text || "Available for Projects",
          adminPasscode: setRow.admin_passcode || "nikita2026",
          ...(setRow.data || {}),
        };

        return {
          projects: projRes.rows.map(formatProject),
          services: servRes.rows.map(formatService),
          testimonials: testRes.rows,
          inquiries: inqRes.rows,
          settings,
          process: collectionsMap["process"] || [],
          faqs: collectionsMap["faqs"] || [],
          stats: collectionsMap["stats"] || [],
          skills: collectionsMap["skills"] || [],
        };
      } catch (err) {
        console.error("Postgres getAllData error:", err);
      }
    }
    return readLocalDb();
  },

  // Projects CRUD
  async getProjects() {
    if (isPostgresReady && pool) {
      const res = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
      return res.rows.map(formatProject);
    }
    return readLocalDb().projects || [];
  },

  async getProjectBySlug(slug) {
    if (isPostgresReady && pool) {
      const res = await pool.query("SELECT * FROM projects WHERE slug = $1 LIMIT 1", [slug]);
      return formatProject(res.rows[0]);
    }
    return (readLocalDb().projects || []).find((p) => p.slug === slug);
  },

  async createProject(p) {
    const id = p.id || "proj-" + Date.now();
    const slug =
      p.slug ||
      (p.title || "untitled-project")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProj = { ...p, id, slug };

    if (isPostgresReady && pool) {
      await pool.query(
        `INSERT INTO projects (id, slug, title, category, year, location, client, image, cover_image, excerpt, description, scope, services, software, featured, published, gallery, renders_3d, plans_2d, atmosphere, turnaround)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
        [
          id,
          slug,
          newProj.title,
          newProj.category,
          newProj.year,
          newProj.location,
          newProj.client,
          newProj.image,
          newProj.coverImage || newProj.image,
          newProj.excerpt,
          newProj.description,
          typeof newProj.scope === "string" ? newProj.scope : JSON.stringify(newProj.scope),
          JSON.stringify(newProj.services || []),
          JSON.stringify(newProj.software || []),
          newProj.featured ?? true,
          newProj.published ?? true,
          JSON.stringify(newProj.gallery || []),
          JSON.stringify(newProj.renders3D || []),
          JSON.stringify(newProj.plans2D || []),
          newProj.atmosphere || "2700K Warm Daylight",
          newProj.turnaround || "3 – 5 Days",
        ]
      );
    }

    // Always update local backup
    const local = readLocalDb();
    local.projects = [newProj, ...(local.projects || [])];
    writeLocalDb(local);

    return newProj;
  },

  async updateProject(id, updated) {
    if (isPostgresReady && pool) {
      const existingRes = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
      if (existingRes.rows.length > 0) {
        const curr = formatProject(existingRes.rows[0]);
        const merged = { ...curr, ...updated };

        await pool.query(
          `UPDATE projects SET
             title = $1, category = $2, year = $3, location = $4, client = $5,
             image = $6, cover_image = $7, excerpt = $8, description = $9,
             scope = $10, services = $11, software = $12, featured = $13,
             published = $14, gallery = $15, renders_3d = $16, plans_2d = $17,
             atmosphere = $18, turnaround = $19
           WHERE id = $20`,
          [
            merged.title,
            merged.category,
            merged.year,
            merged.location,
            merged.client,
            merged.image,
            merged.coverImage,
            merged.excerpt,
            merged.description,
            typeof merged.scope === "string" ? merged.scope : JSON.stringify(merged.scope),
            JSON.stringify(merged.services || []),
            JSON.stringify(merged.software || []),
            merged.featured,
            merged.published,
            JSON.stringify(merged.gallery || []),
            JSON.stringify(merged.renders3D || []),
            JSON.stringify(merged.plans2D || []),
            merged.atmosphere || "2700K Warm Daylight",
            merged.turnaround || "3 – 5 Days",
            id,
          ]
        );
      }
    }

    const local = readLocalDb();
    const idx = (local.projects || []).findIndex((p) => p.id === id);
    if (idx !== -1) {
      local.projects[idx] = { ...local.projects[idx], ...updated };
      writeLocalDb(local);
      return local.projects[idx];
    }
    return updated;
  },

  async deleteProject(id) {
    if (isPostgresReady && pool) {
      await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    }
    const local = readLocalDb();
    local.projects = (local.projects || []).filter((p) => p.id !== id);
    writeLocalDb(local);
    return { success: true };
  },

  // Inquiries CRUD
  async getInquiries() {
    if (isPostgresReady && pool) {
      const res = await pool.query("SELECT * FROM inquiries ORDER BY created_at DESC");
      return res.rows;
    }
    return readLocalDb().inquiries || [];
  },

  async createInquiry(inquiryData) {
    const id = "inq-" + Date.now();
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const newInq = { id, date, status: "new", ...inquiryData };

    if (isPostgresReady && pool) {
      await pool.query(
        `INSERT INTO inquiries (id, name, email, phone, service, message, date, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [newInq.id, newInq.name, newInq.email, newInq.phone, newInq.service, newInq.message, newInq.date, newInq.status]
      );
    }

    const local = readLocalDb();
    local.inquiries = [newInq, ...(local.inquiries || [])];
    writeLocalDb(local);
    return newInq;
  },

  async updateInquiryStatus(id, status) {
    if (isPostgresReady && pool) {
      await pool.query("UPDATE inquiries SET status = $1 WHERE id = $2", [status, id]);
    }
    const local = readLocalDb();
    const idx = (local.inquiries || []).findIndex((i) => i.id === id);
    if (idx !== -1) {
      local.inquiries[idx].status = status;
      writeLocalDb(local);
      return local.inquiries[idx];
    }
  },

  async deleteInquiry(id) {
    if (isPostgresReady && pool) {
      await pool.query("DELETE FROM inquiries WHERE id = $1", [id]);
    }
    const local = readLocalDb();
    local.inquiries = (local.inquiries || []).filter((i) => i.id !== id);
    writeLocalDb(local);
    return { success: true };
  },

  // Testimonials CRUD
  async getTestimonials() {
    if (isPostgresReady && pool) {
      const res = await pool.query("SELECT * FROM testimonials ORDER BY created_at DESC");
      return res.rows;
    }
    return readLocalDb().testimonials || [];
  },

  async createTestimonial(t) {
    const id = "test-" + Date.now();
    const newTest = { id, ...t };

    if (isPostgresReady && pool) {
      await pool.query(
        `INSERT INTO testimonials (id, name, role, location, quote, rating, scope)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, newTest.name, newTest.role, newTest.location, newTest.quote, newTest.rating || 5, newTest.scope]
      );
    }

    const local = readLocalDb();
    local.testimonials = [newTest, ...(local.testimonials || [])];
    writeLocalDb(local);
    return newTest;
  },

  async updateTestimonial(id, updated) {
    if (isPostgresReady && pool) {
      await pool.query(
        `UPDATE testimonials SET name = $1, role = $2, location = $3, quote = $4, rating = $5, scope = $6 WHERE id = $7`,
        [updated.name, updated.role, updated.location, updated.quote, updated.rating, updated.scope, id]
      );
    }
    const local = readLocalDb();
    const idx = (local.testimonials || []).findIndex((t) => t.id === id);
    if (idx !== -1) {
      local.testimonials[idx] = { ...local.testimonials[idx], ...updated };
      writeLocalDb(local);
      return local.testimonials[idx];
    }
  },

  async deleteTestimonial(id) {
    if (isPostgresReady && pool) {
      await pool.query("DELETE FROM testimonials WHERE id = $1", [id]);
    }
    const local = readLocalDb();
    local.testimonials = (local.testimonials || []).filter((t) => t.id !== id);
    writeLocalDb(local);
    return { success: true };
  },

  // Services
  async getServices() {
    if (isPostgresReady && pool) {
      const res = await pool.query("SELECT * FROM services");
      return res.rows.map(formatService);
    }
    return readLocalDb().services || [];
  },

  async updateService(id, updated) {
    if (isPostgresReady && pool) {
      const existingRes = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
      if (existingRes.rows.length > 0) {
        const curr = formatService(existingRes.rows[0]);
        const merged = { ...curr, ...updated };

        await pool.query(
          `UPDATE services SET
             title = $1, name = $2, short_title = $3, short_description = $4,
             description = $5, price = $6, starting_price = $7, price_note = $8,
             category = $9, features = $10, deliverables = $11, cover_image = $12
           WHERE id = $13`,
          [
            merged.title,
            merged.name,
            merged.shortTitle,
            merged.shortDescription,
            merged.description,
            merged.price,
            merged.startingPrice,
            merged.priceNote,
            merged.category,
            JSON.stringify(merged.features || []),
            JSON.stringify(merged.deliverables || []),
            merged.coverImage,
            id,
          ]
        );
      }
    }
    const local = readLocalDb();
    const idx = (local.services || []).findIndex((s) => s.id === id);
    if (idx !== -1) {
      local.services[idx] = { ...local.services[idx], ...updated };
      writeLocalDb(local);
      return local.services[idx];
    }
  },

  // Settings
  async getSettings() {
    if (isPostgresReady && pool) {
      const res = await pool.query("SELECT * FROM studio_settings WHERE id = 'default'");
      if (res.rows.length > 0) {
        const r = res.rows[0];
        return {
          siteName: r.site_name,
          email: r.email,
          phone: r.phone,
          whatsapp: r.whatsapp,
          location: r.location,
          isAvailable: r.is_available,
          statusText: r.status_text,
          adminPasscode: r.admin_passcode,
          ...(r.data || {}),
        };
      }
    }
    return readLocalDb().settings || {};
  },

  async updateSettings(updated) {
    if (isPostgresReady && pool) {
      const curr = await this.getSettings();
      const merged = { ...curr, ...updated };

      if (updated.adminPasscode) {
        merged.adminPasscode = hashPasscode(updated.adminPasscode);
      }

      await pool.query(
        `INSERT INTO studio_settings (id, site_name, email, phone, whatsapp, location, is_available, status_text, admin_passcode, data)
         VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET
           site_name = EXCLUDED.site_name,
           email = EXCLUDED.email,
           phone = EXCLUDED.phone,
           whatsapp = EXCLUDED.whatsapp,
           location = EXCLUDED.location,
           is_available = EXCLUDED.is_available,
           status_text = EXCLUDED.status_text,
           admin_passcode = EXCLUDED.admin_passcode,
           data = EXCLUDED.data`,
        [
          merged.siteName || "Render Rituals",
          merged.email || "iamnikita2911@gmail.com",
          merged.phone || "+91 9305308296",
          merged.whatsapp || "919305308296",
          merged.location || "Noida, Uttar Pradesh · Worldwide Remote",
          merged.isAvailable ?? true,
          merged.statusText || "Available for Projects",
          merged.adminPasscode ? hashPasscode(merged.adminPasscode) : hashPasscode("nikita2026"),
          JSON.stringify(merged),
        ]
      );
    }
    const local = readLocalDb();
    if (updated.adminPasscode) {
      updated.adminPasscode = hashPasscode(updated.adminPasscode);
    }
    local.settings = { ...local.settings, ...updated };
    writeLocalDb(local);
    return local.settings;
  },
};

module.exports = { db, initDb, verifyPasscode, hashPasscode };
