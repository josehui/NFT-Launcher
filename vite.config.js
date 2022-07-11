import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

const _dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./src"),
    },
  },
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
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
