import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works from any GitHub Pages path
  base: "./",
  server: {
    host: "0.0.0.0",
    // allow the sandbox preview host while developing
    allowedHosts: [".e2b.app", "localhost"],
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
