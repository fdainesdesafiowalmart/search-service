const isPalindrome = (pattern) => {
  if (pattern === undefined || pattern === null) return false

  var middleIndex = Math.floor(pattern.length / 2)

  for (let index = 0; index < middleIndex; index++) {
    if (pattern[index] !== pattern[pattern.length - 1 - index]) {
      return false
    }
  }

  return true
}

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
