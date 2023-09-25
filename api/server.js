const auth = require('json-server-auth')
const jsonServer = require('json-server')
const router = jsonServer.router('./db/db.json')
const server = jsonServer.create()
// const pause = require('connect-pause');
const middlewares = jsonServer.defaults()
const cors = require('cors')

const rules = auth.rewriter({
  // Permission rules
  users: 600,
})
// /!\ Bind the router db to the app
server.db = router.db
server.use(
  cors({
      origin: true,
      credentials: true,
      preflightContinue: false,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
server.options('*', cors())


// server.use(pause(1000))
server.use(middlewares)
server.use(rules) 
server.use(auth)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running in 🔥 http://localhost:3000/')
})

// Export the Server API
module.exports = server