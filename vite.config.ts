import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import fs from 'fs'
import path from 'path'

// Custom plugin to serve static html files from public/verify cleanly in dev server
const staticVerifyPlugin: Plugin = {
  name: 'serve-verify-static',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/verify')) {
        const cleanUrl = req.url.split('?')[0]
        let filePath = path.join(process.cwd(), 'public', cleanUrl)
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          filePath = path.join(filePath, 'index.html')
        }
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return fs.createReadStream(filePath).pipe(res)
        }
      }
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticVerifyPlugin],
  base: './',
  server: {
    host: true, // Listen on all network addresses (0.0.0.0)
    port: 8000,
  },
})
