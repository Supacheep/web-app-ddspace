const express = require('express')
const next = require('next')
const url = require('url')
const { join } = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = parseInt(process.env.NODE_PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { Router } = require('./routes')
const routes = require('./backend/routes')

app.prepare().then(() => {
  const server = express()

  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  server.use(bodyParser.json())

  server.use(cookieParser())

  server.use(express.static('public'))

  routes(server, app)

  server.get('/_next/*', (req, res) => handle(req, res))

  Router.forEachPrettyPattern((page, pattern, defaultParams) => server.get(pattern, (req, res) => app.render(req, res, `/${page}`, { ...defaultParams, ...req.query, ...req.params })))

  server.use((req, res, nextProcess) => {
    const parsedUrl = url.parse(req.url, true)
    const rootStaticFiles = [
      '/favicon.ico',
    ]
    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, 'public', parsedUrl.pathname)
      app.serveStatic(req, res, path)
    } else {
      nextProcess()
    }
  })


  server.all('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
