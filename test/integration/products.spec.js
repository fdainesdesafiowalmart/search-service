jest.mock('infrastructure/repositories/products')
const repositoryMock = require('infrastructure/repositories/products')

const request = require('supertest')
const app = require('index')

describe('Search Endpoint', () => {
  afterEach(async () => await app.close())

  describe('GET /search', () => {
    it('should return status code 200 ', async () => {
      repositoryMock.findProducts.mockImplementation(() => {
        return [{
          id: 9999,
          foo: 'bar'
        }]
      })
      repositoryMock.findProductById.mockImplementation(() => {
        return [{
          id: 9999,
          foo: 'bar'
        }]
      })

      const res = await request(app)
        .get('/search')
        .query({ pattern: 'Test1' })

      expect(res.statusCode).toEqual(200)
    })
  })
})
