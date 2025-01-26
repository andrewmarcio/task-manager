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
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@services": path.resolve(__dirname, "./src/application/services"),
    },
  },
})
