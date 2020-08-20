const express = require('express')
const router = express.Router()

const { healthCheck } = require('../controllers/health')
const { getProducts } = require('../controllers/products')

/**
* @swagger
* /health:
*   get:
*     description: Use to check the service status
*     responses:
*       '200':
*         description: A successful response, the service is up and running
*       'other':
*         description: A failed response, the service is down
*/
router.get('/health', healthCheck)

router.get('/search', getProducts)

module.exports = router
