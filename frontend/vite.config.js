import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // In dev, React runs on :5173 and the backend on :3001.
    // Any request to /api is forwarded to the backend, so no CORS setup is needed.
    proxy: { "/api": "http://localhost:3001" },
  },
});
