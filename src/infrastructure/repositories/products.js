const { getProducts, getProductById } = require('../clients/products')

const findProductById = async (id) => {
  try {
    const response = await getProductById(id)

    if (response.status === 200) {
      return {
        total: response.data.id ? 1 : 0,
        products: response.data.id ? [response.data] : []
      }
    }
  } catch (error) {
    console.log('Error: ' + error)
  }

  return {
    total: 0,
    products: []
  }
}

const findProducts = async (pattern) => {
  try {
    const response = await getProducts(pattern)

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('ErrorX: ' + error)
  }

  return {
    total: 0,
    products: []
  }
}

module.exports = {
  findProductById,
  findProducts
}
