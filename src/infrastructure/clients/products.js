const axios = require('axios')

const apiKeyHeader = process.env.PRODUCTS_SERVICE_APIKEY_HEADER || 'x-walmart-product-service-key'

const resolveApiKeyHeaders = () => {
  const headers = {}
  headers[apiKeyHeader] = process.env.PRODUCTS_SERVICE_APIKEY_VALUE

  return {
    headers
  }
}

const resolveRequestParams = (pattern, orderby) => {
  return {
    ...resolveApiKeyHeaders(),
    params: {
      pattern: pattern,
      orderby: orderby
    }
  }
}

const getProducts = async (pattern, orderby) => {
  const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL
  const endpoint = `${productsServiceUrl}/products`

  return axios.get(endpoint, resolveRequestParams(pattern, orderby))
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
