import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },

  //TestingOnly: mkcert is needed for local https 
  plugins: [ react(),mkcert() ]
})
