import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // 分包
  build: {
    rollupOptions: {
      output: {
        // dir: resolve(__dirname, "todo"),
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // console.log(id.toString().split("node_modules/")[1].split("/")[1]);
            return id.toString().split("node_modules/")[1].split("/")[1];
          }
        },
      },
    },
  },
});
