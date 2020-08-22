const axios = require('axios')

const apiKeyHeader = process.env.PRODUCTS_SERVICE_APIKEY_HEADER || 'x-walmart-product-service-key'

const resolveApiKeyHeaders = () => {
  const headers = {}

  headers[apiKeyHeader] = process.env.PRODUCTS_SERVICE_APIKEY_VALUE

  return {
    headers
  }
}

const getProducts = async (pattern) => {
  const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL
  const endpoint = `${productsServiceUrl}/products?pattern=${pattern}`

  return axios.get(endpoint, resolveApiKeyHeaders())
}

const getProductById = async (id) => {
  const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL
  const endpoint = `${productsServiceUrl}/products/${id}`

  return axios.get(endpoint, resolveApiKeyHeaders())
}

module.exports = {
  getProducts,
  getProductById
}
