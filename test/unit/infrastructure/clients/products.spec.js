jest.mock('axios')
const axios = require('axios')

const { getProducts, getProductById } = require('infrastructure/clients/products')

describe('Clients:Products', () => {
  it('should request to getProductById endpoint with provided id', async () => {
    process.env['PRODUCTS_SERVICE_URL'] = 'foobar'
    axios.get.mockImplementation(() => true)

    const result = await getProductById(1234)

    expect(axios.get).toHaveBeenCalledWith('foobar/products/1234')
  })

  it('should request to getProducts endpoint with provided search pattern', async () => {
    process.env['PRODUCTS_SERVICE_URL'] = 'foobar'
    axios.get.mockImplementation(() => true)

    const result = await getProducts('hello+world')

    expect(axios.get).toHaveBeenCalledWith('foobar/products?pattern=hello+world')
  })
})
