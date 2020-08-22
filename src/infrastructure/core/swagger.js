const express = require('express')
const router = express.Router()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Search Service',
      description: 'Exposes search capabilities',
      contact: {
        name: 'Francisco Daines'
      },
      servers: ['http://localhost']
    }
  },
  apis: ['**/routers/*.js']
}

const swaggerDocument = swaggerJsDoc(swaggerOptions)

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

module.exports = router
