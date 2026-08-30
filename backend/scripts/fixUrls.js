const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const dbPath = path.join(__dirname, "..", "src", "data", "db.json");

async function fixUrls() {
  console.log("🛠️ Fixing any double-prefixed Cloudinary URLs...");

  // 1. Fix in db.json
  if (fs.existsSync(dbPath)) {
    let raw = fs.readFileSync(dbPath, "utf-8");
    raw = raw.replace(/http:\/\/localhost:5000https:\/\/res\.cloudinary\.com/g, "https://res.cloudinary.com");
    raw = raw.replace(/https:\/\/res\.cloudinary\.com\/dg3s2whrf\/image\/upload\/http:\/\/localhost:5000/g, "https://res.cloudinary.com/dg3s2whrf/image/upload/");
    fs.writeFileSync(dbPath, raw, "utf-8");
    console.log("✅ Fixed local db.json URLs!");
  }

  // 2. Fix in Neon PostgreSQL
  if (process.env.DATABASE_URL) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    try {
      // Fix projects table
      await pool.query(`
        UPDATE projects
        SET 
          image = REPLACE(image, 'http://localhost:5000https://res.cloudinary.com', 'https://res.cloudinary.com'),
          cover_image = REPLACE(cover_image, 'http://localhost:5000https://res.cloudinary.com', 'https://res.cloudinary.com'),
          data = CAST(REPLACE(data::text, 'http://localhost:5000https://res.cloudinary.com', 'https://res.cloudinary.com') AS jsonb)
        WHERE data::text LIKE '%http://localhost:5000https://res.cloudinary.com%';
      `);

      // Fix services table
      await pool.query(`
        UPDATE services
        SET 
          cover_image = REPLACE(cover_image, 'http://localhost:5000https://res.cloudinary.com', 'https://res.cloudinary.com'),
          data = CAST(REPLACE(data::text, 'http://localhost:5000https://res.cloudinary.com', 'https://res.cloudinary.com') AS jsonb)
        WHERE data::text LIKE '%http://localhost:5000https://res.cloudinary.com%';
      `);

      console.log("✅ Fixed Neon PostgreSQL database URLs!");
    } catch (e) {
      console.error("Neon DB URL update error:", e.message);
    } finally {
      await pool.end();
    }
  }

  console.log("🎉 All Cloudinary URLs are now 100% clean direct CDN links!");
}

fixUrls();
