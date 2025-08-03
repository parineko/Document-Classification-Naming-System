import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Document-Classification-Naming-System/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
