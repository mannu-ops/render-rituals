const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const dbPath = path.join(__dirname, "..", "src", "data", "db.json");

async function syncPlans() {
  console.log("🔄 Syncing 2D CAD Plans and 3D Renders to Neon Database...");
  
  if (!fs.existsSync(dbPath)) {
    console.error("❌ db.json not found");
    return;
  }

  const localData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  if (process.env.DATABASE_URL) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    try {
      // 1. Sync Projects plans_2d & renders_3d
      for (const p of localData.projects || []) {
        await pool.query(
          `UPDATE projects 
           SET plans_2d = $1, renders_3d = $2, published = $3, featured = $4
           WHERE id = $5 OR slug = $6`,
          [
            JSON.stringify(p.plans2D || []),
            JSON.stringify(p.renders3D || []),
            p.published !== false,
            p.featured !== false,
            p.id,
            p.slug,
          ]
        );
      }

      // 2. Sync Services cover_image
      for (const s of localData.services || []) {
        await pool.query(
          `UPDATE services 
           SET cover_image = $1, published = $2
           WHERE id = $3 OR slug = $4`,
          [
            s.coverImage || "",
            s.published !== false,
            s.id,
            s.slug,
          ]
        );
      }

      console.log("✅ Neon PostgreSQL is now 100% synced with 2D CAD plans and 3D renders!");
    } catch (err) {
      console.error("Neon DB sync error:", err.message);
    } finally {
      await pool.end();
    }
  } else {
    console.log("ℹ️ No DATABASE_URL found, local db.json is already 100% updated.");
  }
}

syncPlans();
