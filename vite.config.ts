import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@presentation": path.resolve(__dirname, "./src/presentation"),
    },
  },
})
