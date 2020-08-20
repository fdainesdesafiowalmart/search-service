const { isPalindrome } = require('../utils/ispalindrome')
const { isNumber } = require('../utils/isnumber')

const applyDiscount = (pattern, products) => {
  if (isPalindrome(pattern)) {
    return products.map(product => {
      return {
        ...product,
        price: product.price * 0.5
      }
    })
  } else {
    return products
  }
}

const searchProducts = async ({ findProductById, findProducts }, pattern) => {
  try {
    let resolvedProducts
    if (isNumber(pattern)) {
      resolvedProducts = await findProductById(pattern)
    } else {
      resolvedProducts = await findProducts(pattern)
    }
    resolvedProducts.products = applyDiscount(pattern, resolvedProducts.products)

    return resolvedProducts
  } catch (error) {
    return undefined
  }
}

module.exports = {
  applyDiscount,
  searchProducts
}
