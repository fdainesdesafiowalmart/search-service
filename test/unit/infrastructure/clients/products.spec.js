jest.mock('axios')
const axios = require('axios')

const { getProducts, getProductById } = require('infrastructure/clients/products')

describe('Clients:Products', () => {
  it('should request to getProductById endpoint with provided id', async () => {
    process.env['PRODUCTS_SERVICE_URL'] = 'foobar'
    process.env['PRODUCTS_SERVICE_APIKEY_HEADER'] = 'foo'
    process.env['PRODUCTS_SERVICE_APIKEY_VALUE'] = 'bar'
    axios.get.mockImplementation(() => true)

    const expectedParams = {
      headers: {
        'x-walmart-product-service-key': 'bar'
      }
    }

    const result = await getProductById(1234)

    expect(axios.get).toHaveBeenCalledWith('foobar/products/1234', expectedParams)
  })

  it('should request to getProducts endpoint with provided search pattern', async () => {
    process.env['PRODUCTS_SERVICE_URL'] = 'foobar'
    process.env['PRODUCTS_SERVICE_APIKEY_HEADER'] = 'foo'
    process.env['PRODUCTS_SERVICE_APIKEY_VALUE'] = 'bar'
    axios.get.mockImplementation(() => true)

    const expectedParams = {
      headers: {
        'x-walmart-product-service-key': 'bar'
      },
      params: {
        orderby: 'barfoo',
        pattern: 'hello+world'
      }
    }

    const result = await getProducts('hello+world', 'barfoo')

    expect(axios.get).toHaveBeenCalledWith('foobar/products', expectedParams)
  })
})
