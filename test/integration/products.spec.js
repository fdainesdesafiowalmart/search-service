jest.mock('infrastructure/repositories/products')
const repositoryMock = require('infrastructure/repositories/products')

jest.mock('infrastructure/core/apikey')
const apiKeyMock = require('infrastructure/core/apikey')

const request = require('supertest')
const app = require('index')

describe('Search Endpoint', () => {
  afterEach(async () => await app.close())

  describe('GET /search', () => {
    it('should return status code 200 when search for a product code', async () => {
      const baseResponse = {
        total: 1,
        products: [
          { foo: 'bar', price: 1234 }
        ]
      }
      repositoryMock.findProductById.mockImplementation(() => {
        return { ...baseResponse }
      })
      apiKeyMock.isValidApiKey.mockImplementation(() => true)

      const res = await request(app)
        .get('/search')
        .query({ pattern: '123' })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toStrictEqual(baseResponse)
    })

    it('should return status code 200 when search for a product pattern', async () => {
      const baseResponse = {
        total: 1,
        products: [
          { foo: 'bar', price: 1234 }
        ]
      }
      repositoryMock.findProducts.mockImplementation(() => {
        return { ...baseResponse }
      })
      apiKeyMock.isValidApiKey.mockImplementation(() => true)

      const res = await request(app)
        .get('/search')
        .query({ pattern: 'Test1' })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toStrictEqual(baseResponse)
    })

    it('should return status code 200 and discounts applied when search for a palindrome product pattern', async () => {
      repositoryMock.findProducts.mockImplementation(() => {
        return {
          total: 1,
          products: [
            { foo: 'bar', price: 1234 }
          ]
        }
      })
      const expectedResponse = {
        total: 1,
        products: [
          { foo: 'bar', price: 617, discount: 50, originalPrice: 1234 }
        ]
      }
      apiKeyMock.isValidApiKey.mockImplementation(() => true)

      const res = await request(app)
        .get('/search')
        .query({ pattern: 'abba' })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toStrictEqual(expectedResponse)
    })

    it('should return status code 500 when an error occurred ', async () => {
      repositoryMock.findProducts.mockImplementation(() => {
        throw new Error('something bad')
      })
      apiKeyMock.isValidApiKey.mockImplementation(() => true)

      const res = await request(app)
        .get('/search')
        .query({ pattern: 'Test1' })

      expect(res.statusCode).toEqual(500)
      expect(res.body).toStrictEqual({ message: 'Error interno' })
    })

    it('should return status code 401 when api key is not valid', async () => {
      repositoryMock.findProducts.mockImplementation(() => {
        return [{
          id: 9999,
          foo: 'bar'
        }]
      })
      apiKeyMock.isValidApiKey.mockImplementation(() => false)

      const res = await request(app)
        .get('/search')

      expect(res.statusCode).toEqual(401)
    })
  })
})
