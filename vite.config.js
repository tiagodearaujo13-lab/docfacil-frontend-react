import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // <--- ADICIONE ISTO (Garante que os caminhos são absolutos)
  build: {
    outDir: 'dist',
  }
})