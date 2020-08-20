const { findProductById, findProducts } = require('infrastructure/repositories/products')
jest.mock('infrastructure/clients/products')
const productsMock = require('infrastructure/clients/products')

describe('Repositories:Products', () => {
  describe('findProductById', () => {
    beforeEach(() => {
      productsMock.getProductById.mockClear()
    })

    it('should return products service response', async () => {
      const returnedFromService = {
        status: 200,
        data: {
          id: 999,
          brand: 'pyu endkewc',
          description: 'nror djnomitn',
          image: 'www.lider.cl/catalogo/images/toysIcon.svg',
          price: 805698
        }
      }
      productsMock.getProductById.mockImplementation(() => {
        return returnedFromService
      })

      const expectedResponse = {
        total: 1,
        products: [{
          id: 999,
          brand: 'pyu endkewc',
          description: 'nror djnomitn',
          image: 'www.lider.cl/catalogo/images/toysIcon.svg',
          price: 805698
        }]
      }

      const response = await findProductById(1234)
      console.log(response)

      expect(response).toStrictEqual(expectedResponse)
    })

    it('should return empty response when service response has no product id', async () => {
      const returnedFromService = {
        status: 200,
        data: {}
      }
      productsMock.getProductById.mockImplementation(() => {
        return returnedFromService
      })

      const expectedResponse = {
        total: 0,
        products: []
      }

      const response = await findProductById(1234)
      console.log(response)

      expect(response).toStrictEqual(expectedResponse)
    })

    it('should return empty response when service response has status != 200', async () => {
      const returnedFromService = {
        status: 500,
        data: {
          id: '1234'
        }
      }
      productsMock.getProductById.mockImplementation(() => {
        return returnedFromService
      })

      const expectedResponse = {
        total: 0,
        products: []
      }

      const response = await findProductById(1234)
      console.log(response)

      expect(response).toStrictEqual(expectedResponse)
    })

    it('should return empty response when an error occurred', async () => {
      const expectedResponse = {
        total: 0,
        products: []
      }

      productsMock.getProductById.mockImplementation(() => {
        throw new Error('some error')
      })

      const response = await findProductById(1234)

      expect(response).toStrictEqual(expectedResponse)
    })
  })

  describe('findProducts', () => {
    beforeEach(() => {
      productsMock.getProducts.mockClear()
    })

    it('should return products service response', async () => {
      const expectedResponse = {
        total: 1,
        products: [{
          id: 999,
          brand: 'pyu endkewc',
          description: 'nror djnomitn',
          image: 'www.lider.cl/catalogo/images/toysIcon.svg',
          price: 805698
        }]
      }
      const returnedFromService = {
        status: 200,
        data: {
          total: 1,
          products: [{
            id: 999,
            brand: 'pyu endkewc',
            description: 'nror djnomitn',
            image: 'www.lider.cl/catalogo/images/toysIcon.svg',
            price: 805698
          }]
        }
      }

      productsMock.getProducts.mockReturnValue(returnedFromService)

      const response = await findProducts('foobar')

      expect(response).toStrictEqual(expectedResponse)
    })

    it('should return empty response when service response has status != 200', async () => {
      const returnedFromService = {
        status: 500,
        data: {
          id: '1234'
        }
      }
      productsMock.getProducts.mockImplementation(() => {
        return returnedFromService
      })

      const expectedResponse = {
        total: 0,
        products: []
      }

      const response = await findProducts(1234)
      console.log(response)

      expect(response).toStrictEqual(expectedResponse)
    })

    it('should return empty response when an error occurred', async () => {
      const expectedResponse = {
        total: 0,
        products: []
      }

      productsMock.getProducts.mockImplementation(() => {
        throw new Error('some error')
      })

      const response = await findProducts('barfoo')

      expect(response).toStrictEqual(expectedResponse)
    })
  })
})
