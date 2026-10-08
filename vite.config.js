import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // '' = carga también las que no son VITE_

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.LLM_BASE_URL || 'http://127.0.0.1:8080/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: env.LLM_API_KEY
            ? { Authorization: `Bearer ${env.LLM_API_KEY}` }
            : {},
        },
      },
    },
  }
})
