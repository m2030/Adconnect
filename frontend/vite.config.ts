import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// vite.config.ts



export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  test: {
    environment: 'jsdom',
    globals: true,
    environmentOptions: { jsdom: { url: "http://localhost/" } },
    setupFiles: ['./src/test/setup.ts'],
    include: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
    coverage: { reporter: ['text', 'html'] },
   server: {
      deps: { inline: ["whatwg-url"] }  // <- new place in Vitest 3
    }
  }
      
});
