import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './')

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
})
