import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    host: true,
    port: 5173,
    hmr: {
      protocol: "wss",
      clientPort: 443,
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      input: {
        "sales-order-header": "src/apps/sales-order-header/index.tsx",
      },
      output: {
        format: "iife",
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
