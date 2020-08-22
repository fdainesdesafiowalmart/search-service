const { searchProducts } = require('../../application/use_cases/searchproducts')
const productsRepository = require('../repositories/products')

const getProducts = async (req, res, next) => {
  const { pattern, orderby } = req.query

  const response = await searchProducts(productsRepository, pattern, orderby)
  if (response === undefined) {
    res.status(500).json({ message: 'Error interno' })
    return next(false)
  } else {
    res.status(200).json(response)
    return next()
  }
}

module.exports = { getProducts }
