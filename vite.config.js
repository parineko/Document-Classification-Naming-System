import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Document-Classification-Naming-System/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
