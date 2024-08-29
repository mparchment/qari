import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/qari/', // Set the base URL for GitHub Pages deployment
  plugins: [react()],
})