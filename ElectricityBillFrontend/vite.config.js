import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev lo requests ni Spring Boot backend (8081) ki proxy chestundi -> CORS problem undadu
const backend = "http://localhost:8081";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/Add": backend,
      "/DisplayAll": backend,
      "/Delete": backend,
    },
  },
});
