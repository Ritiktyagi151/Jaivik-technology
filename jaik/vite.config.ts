import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// Note: Agar bundle analyze karna chahte hain toh 'rollup-plugin-visualizer' install kar sakte hain
// npm install --save-dev rollup-plugin-visualizer

export default defineConfig({
  base: "./",
  plugins: [
    react(), 
    tailwindcss()
  ],
  envDir: "./",
  build: {
    // 600kb se badi file par warning dega
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Code Splitting: Badi libraries ko alag-alag chunks mein divide karna
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // UI Libraries
            if (id.includes("antd") || id.includes("@ant-design") || id.includes("rc-")) {
              return "ui-vendor";
            }
            // Heavy PDF & Charts (Inhe alag rakhna zaroori hai)
            if (id.includes("pdfjs-dist") || id.includes("jspdf") || id.includes("html2canvas")) {
              return "heavy-pdf-tools";
            }
            if (id.includes("chart.js") || id.includes("react-chartjs-2")) {
              return "charts-vendor";
            }
            // Animations
            if (id.includes("framer-motion") || id.includes("gsap")) {
              return "animations-vendor";
            }
            // Icons (Aap 4 libraries use kar rahe hain, isliye inhe bundle karna zaroori hai)
            if (id.includes("react-icons") || id.includes("lucide") || id.includes("fontawesome")) {
              return "icons-vendor";
            }
            // Baki sab dependencies
            return "vendor";
          }
        },
      },
    },
  },
});