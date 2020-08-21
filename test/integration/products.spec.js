jest.mock('infrastructure/repositories/products')
const repositoryMock = require('infrastructure/repositories/products')

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

      const res = await request(app)
        .get('/search')
        .query({ pattern: 'Test1' })

      expect(res.statusCode).toEqual(500)
      expect(res.body).toStrictEqual({ message: 'Error interno' })
    })

  })
})
