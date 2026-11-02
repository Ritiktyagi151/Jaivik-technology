const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up backend environment...\n");

// Create necessary directories
const directories = [
  "uploads",
  "logs",
  "uploads/images",
  "uploads/videos",
  "uploads/documents",
];

directories.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`📁 Directory already exists: ${dir}`);
  }
});

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, "env.example");

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ Created .env file from env.example");
    console.log("⚠️  Please update .env file with your configuration");
  } else {
    console.log("❌ env.example file not found");
  }
} else {
  console.log("📄 .env file already exists");
}

console.log("\n🎉 Backend setup completed!");
console.log("\nNext steps:");
console.log("1. Update .env file with your configuration");
console.log("2. Install dependencies: npm install");
console.log("3. Start development server: npm run dev");
console.log("\nHappy coding! 🚀");
