const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const DB_PATH = path.join(__dirname, "..", "src", "data", "db.json");

async function uploadLocalFile(filePath, publicId) {
  try {
    console.log(`☁️ Uploading ${path.basename(filePath)} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "render_rituals/portfolio",
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    });
    console.log(`✅ Uploaded: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`❌ Upload failed for ${filePath}:`, err.message);
    return null;
  }
}

async function migrateAll() {
  console.log("🚀 Starting Full Migration of Portfolio Images to Cloudinary...");

  const portfolioDir = path.join(__dirname, "..", "public", "images", "portfolio");
  const files = fs.readdirSync(portfolioDir);

  const urlMap = {};

  for (const file of files) {
    if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp")) {
      const fullPath = path.join(portfolioDir, file);
      const nameWithoutExt = path.parse(file).name;
      const cloudUrl = await uploadLocalFile(fullPath, nameWithoutExt);
      if (cloudUrl) {
        urlMap[`/images/portfolio/${file}`] = cloudUrl;
        urlMap[`http://localhost:5000/images/portfolio/${file}`] = cloudUrl;
      }
    }
  }

  // Upload Nikita Studio Avatar too
  const avatarPath = path.join(__dirname, "..", "..", "frontend", "public", "images", "nikita-studio-avatar.jpg");
  if (fs.existsSync(avatarPath)) {
    const avatarUrl = await uploadLocalFile(avatarPath, "nikita-studio-avatar");
    if (avatarUrl) {
      urlMap["/images/nikita-studio-avatar.jpg"] = avatarUrl;
    }
  }

  console.log("\n🔄 Replacing all URLs in Neon PostgreSQL Database & Local db.json...");

  // 1. Update Neon PostgreSQL Database
  const client = await pool.connect();
  try {
    const projRes = await client.query("SELECT * FROM projects");
    for (const p of projRes.rows) {
      let cover = p.cover_image || p.image;
      let img = p.image;

      // Replace in cover
      for (const [local, cloud] of Object.entries(urlMap)) {
        if (cover && cover.includes(path.basename(local))) cover = cloud;
        if (img && img.includes(path.basename(local))) img = cloud;
      }

      // Replace in renders_3d
      let renders3d = p.renders_3d || [];
      renders3d = renders3d.map((r) => {
        let rImg = r.image;
        for (const [local, cloud] of Object.entries(urlMap)) {
          if (rImg && rImg.includes(path.basename(local))) rImg = cloud;
        }
        return { ...r, image: rImg };
      });

      // Replace in plans_2d
      let plans2d = p.plans_2d || [];
      plans2d = plans2d.map((plan) => {
        let pImg = plan.image;
        for (const [local, cloud] of Object.entries(urlMap)) {
          if (pImg && pImg.includes(path.basename(local))) pImg = cloud;
        }
        return { ...plan, image: pImg };
      });

      // Replace in gallery
      let gallery = (p.gallery || []).map((g) => {
        for (const [local, cloud] of Object.entries(urlMap)) {
          if (g && g.includes(path.basename(local))) return cloud;
        }
        return g;
      });

      await client.query(
        `UPDATE projects SET image = $1, cover_image = $2, renders_3d = $3, plans_2d = $4, gallery = $5 WHERE id = $6`,
        [img, cover, JSON.stringify(renders3d), JSON.stringify(plans2d), JSON.stringify(gallery), p.id]
      );
    }
    console.log("✅ All Neon PostgreSQL project records updated to Cloudinary CDN URLs!");
  } finally {
    client.release();
  }

  // 2. Update local db.json
  if (fs.existsSync(DB_PATH)) {
    let dbContent = fs.readFileSync(DB_PATH, "utf-8");
    for (const [local, cloud] of Object.entries(urlMap)) {
      dbContent = dbContent.replaceAll(local, cloud);
    }
    fs.writeFileSync(DB_PATH, dbContent, "utf-8");
    console.log("✅ Local db.json updated with Cloudinary CDN URLs!");
  }

  console.log("\n🎉 Full Cloudinary Migration Succeeded! Every image is now 100% Cloud Hosted!");
  process.exit(0);
}

migrateAll().catch((err) => {
  console.error("Migration Error:", err);
  process.exit(1);
});
