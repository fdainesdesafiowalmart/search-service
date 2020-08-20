const { isPalindrome } = require('../utils/ispalindrome')

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

module.exports = { applyDiscount }
