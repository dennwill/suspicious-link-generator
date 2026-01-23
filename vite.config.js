import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    middlewares: [
      {
        enforce: 'pre',
        handle(req, res, next) {
          // Catch any path that looks like a suspicious link
          if (req.url.includes('/download/') || req.url.includes('/verify/') || req.url.includes('/confirm/')) {
            req.url = '/redirect.html';
          }
          next();
        }
      }
    ]
  }
})
