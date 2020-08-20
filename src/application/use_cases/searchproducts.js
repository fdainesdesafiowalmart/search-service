const searchProducts = async ({ findProductById, findProducts }, pattern) => {
  try {
    if (isNaN(pattern)) {
      return await findProducts(pattern)
    } else {
      return await findProductById(pattern)
    }
  } catch (error) {
    return undefined
  }
}

module.exports = { searchProducts }
