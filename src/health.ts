import http from 'node:http'
import process from 'node:process'

export function startHealthServer(port = 3000): http.Server {
  const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      }))
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not Found')
    }
  })

  server.listen(port, () => {
    console.log(`[HEALTH] Listening on port ${port} (/health)`)
  })

  return server
}
