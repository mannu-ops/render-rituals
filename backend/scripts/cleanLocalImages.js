const fs = require("fs");
const path = require("path");

const dirsToClean = [
  path.join(__dirname, "..", "public", "images", "portfolio"),
  path.join(__dirname, "..", "..", "frontend", "public", "images", "portfolio"),
];

console.log("🧹 Deleting local portfolio images since they are now 100% hosted on Cloudinary...");

dirsToClean.forEach((dir) => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      fs.unlinkSync(fullPath);
      console.log(`🗑️ Deleted local image: ${file} from ${path.relative(path.join(__dirname, "..", ".."), fullPath)}`);
    });
  }
});

console.log("✨ All local portfolio images successfully cleaned up!");
process.exit(0);
