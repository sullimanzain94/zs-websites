import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: false,
    cors: true
  },
  build: {
    outDir: 'dist',
    target: 'es2020'
  },
  root: '.'
})
