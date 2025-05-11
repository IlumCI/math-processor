import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true, // This exposes the server to all network interfaces
    open: true  // This will automatically open the browser
  },
  root: 'src',  // This tells Vite where to find the index.html
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
}) 