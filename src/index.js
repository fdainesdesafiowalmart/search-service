const router = require('./infrastructure/routers')
const app = require('./infrastructure/core/server')
const config = require('./infrastructure/core/config')
const swaggerRouter = require('./infrastructure/core/swagger')

app.use('/', router)
app.use('/api-doc', swaggerRouter)

const server = app.listen(config.application.port, () => {
  console.log(`Example app listening at http://localhost:${config.application.port}`)
})

module.exports = server
