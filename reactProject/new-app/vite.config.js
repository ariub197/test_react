import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react()
    laravel([
      'resources/css/app.css',
      'resources/js/app.js',
    ]),
  ],
})
