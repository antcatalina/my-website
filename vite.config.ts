import { createServer } from 'node:net'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_PORT = 5173

// Finds the first free port starting at BASE_PORT. Vite's built-in port
// fallback only retries on EADDRINUSE, but a stale/orphaned dev server on
// Windows can leave the port bindable-but-rejected, which surfaces as
// EACCES instead — so we probe for a free port ourselves up front.
function findFreePort(port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        resolve(findFreePort(port + 1))
      } else {
        reject(err)
      }
    })
    server.once('listening', () => {
      server.close(() => resolve(port))
    })
    server.listen(port, '127.0.0.1')
  })
}

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  server: {
    port: await findFreePort(BASE_PORT),
    strictPort: true,
  },
}))
