const axios = require('axios')

const getProducts = async (pattern) => {
  const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL
  const endpoint = `${productsServiceUrl}/products?pattern=${pattern}`

  return axios.get(endpoint)
}

const getProductById = async (id) => {
  const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL
  const endpoint = `${productsServiceUrl}/products/${id}`

  return axios.get(endpoint)
}

module.exports = {
  getProducts,
  getProductById
}
