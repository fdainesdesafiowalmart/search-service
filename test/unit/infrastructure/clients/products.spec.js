jest.mock('axios')
const axios = require('axios')

const { getProducts, getProductById } = require('infrastructure/clients/products')

describe('Clients:Products', () => {
  it('should request to getProductById endpoint with provided id', async () => {
    process.env['PRODUCTS_SERVICE_URL'] = 'foobar'
    process.env['PRODUCTS_SERVICE_APIKEY_HEADER'] = 'foo'
    process.env['PRODUCTS_SERVICE_APIKEY_VALUE'] = 'bar'
    axios.get.mockImplementation(() => true)

    const result = await getProductById(1234)

    expect(axios.get).toHaveBeenCalledWith('foobar/products/1234', { headers: {'x-walmart-product-service-key': 'bar'}})
  })

  it('should request to getProducts endpoint with provided search pattern', async () => {
    process.env['PRODUCTS_SERVICE_URL'] = 'foobar'
    process.env['PRODUCTS_SERVICE_APIKEY_HEADER'] = 'foo'
    process.env['PRODUCTS_SERVICE_APIKEY_VALUE'] = 'bar'
    axios.get.mockImplementation(() => true)

    const result = await getProducts('hello+world')

    expect(axios.get).toHaveBeenCalledWith('foobar/products?pattern=hello+world', { headers: {'x-walmart-product-service-key': 'bar'}})
  })
})
