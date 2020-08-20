const findProductById = async (id) => {
  return [{ id: 1, foo: 'bar1', price: 100 }]
}

const findProducts = async (pattern) => {
  return [
    { id: 1, foo: 'bar1', price: 100 },
    { id: 2, foo: 'bar2', price: 200 },
    { id: 3, foo: 'bar3', price: 300 },
    { id: 4, foo: 'bar4', price: 400 },
    { id: 5, foo: 'bar5', price: 500 }
  ]
}

module.exports = {
  findProductById,
  findProducts
}
