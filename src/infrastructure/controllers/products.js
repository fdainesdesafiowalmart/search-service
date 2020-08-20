const { searchProducts } = require('../../application/use_cases/searchproducts')
const { applyDiscount } = require('../../application/use_cases/applydiscount')
const productsRepository = require('../repositories/products')

const getProducts = async (req, res, next) => {
  const { query } = req

  const products = await searchProducts(productsRepository, query.pattern)
  const processedProducts = applyDiscount(query.pattern, products)

  const response = {
    total: processedProducts.length,
    products: processedProducts
  }
  res.status(200).json(response)
  return next()
}

module.exports = { getProducts }
