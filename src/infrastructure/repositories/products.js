const { translateProduct } = require('./translator')

const findProductById = async (id) => {
  try {
    return [{ id: 1, foo: 'bar1', price: 100 }]
  } catch (error) {
    return undefined
  }
}

const findProducts = async (pattern) => {
  try {
    return [
      { id: 1, foo: 'bar1', price: 100 },
      { id: 2, foo: 'bar2', price: 200 },
      { id: 3, foo: 'bar3', price: 300 },
      { id: 4, foo: 'bar4', price: 400 },
      { id: 5, foo: 'bar5', price: 500 }
    ]
  } catch (error) {
    return []
  }
}

module.exports = {
  findProductById,
  findProducts
}
