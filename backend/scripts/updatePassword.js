const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const newPasscode = process.argv[2] || "nikita2026";
const connectionString = process.env.DATABASE_URL;
const DB_PATH = path.join(__dirname, "..", "src", "data", "db.json");

async function main() {
  console.log(`\n🔄 Updating Admin Passcode to: "${newPasscode}"...`);

  // 1. Update Neon PostgreSQL Database
  if (connectionString) {
    console.log("📡 Connecting to Neon PostgreSQL Cloud Database...");
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    try {
      const res = await pool.query(
        `UPDATE studio_settings 
         SET 
           admin_passcode = $1,
           data = jsonb_set(COALESCE(data, '{}'::jsonb), '{adminPasscode}', to_jsonb($2::text))
         WHERE id = 'default' 
         RETURNING id, site_name, admin_passcode;`,
        [newPasscode, newPasscode]
      );

      if (res.rows.length > 0) {
        console.log("✅ Neon PostgreSQL Database updated successfully!");
        console.log("   Row details:", res.rows[0]);
      } else {
        // If row doesn't exist yet, insert it
        await pool.query(
          `INSERT INTO studio_settings (id, site_name, email, is_available, status_text, admin_passcode, data)
           VALUES ('default', 'Render Rituals', 'temp83725@gmail.com', true, 'Available for Projects', $1, jsonb_build_object('adminPasscode', $2::text))
           ON CONFLICT (id) DO UPDATE SET admin_passcode = $1, data = jsonb_set(COALESCE(studio_settings.data, '{}'::jsonb), '{adminPasscode}', to_jsonb($2::text));`,
          [newPasscode, newPasscode]
        );
        console.log("✅ Neon PostgreSQL record inserted/upserted successfully!");
      }
      await pool.end();
    } catch (err) {
      console.error("❌ Postgres update error:", err.message);
    }
  }

  // 2. Update Local Fallback db.json
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      if (!data.settings) data.settings = {};
      data.settings.adminPasscode = newPasscode;
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
      console.log("✅ Local db.json updated successfully!");
    }
  } catch (err) {
    console.error("❌ Local db.json update error:", err.message);
  }

  console.log(`\n🎉 Admin Passcode successfully set to: "${newPasscode}"\n`);
}

main().catch(console.error);
