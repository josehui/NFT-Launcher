import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const _dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./src"),
    },
  },
  plugins: [react()],
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //       compress: {
  //           drop_console: true,
  //           drop_debugger: true,
  //       },
  //   },
  // },
});
