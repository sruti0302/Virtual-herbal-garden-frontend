import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme: {
    extend: {
      colors: {
        "forest-green": "#228B22",
        "sage-green": "#9CAF88",
        "earth-brown": "#8B4513",
        "muted-teal": "#5F9EA0",
        "off-white": "#F5F5F5",
        "charcoal": "#36454F",
      },
    }
  }
})
