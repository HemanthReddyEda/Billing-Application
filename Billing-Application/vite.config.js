import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Your Spring Boot server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust path as needed
      },
    },
  },
});
