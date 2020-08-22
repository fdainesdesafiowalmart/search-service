const { applyDiscount, searchProducts } = require('application/use_cases/searchproducts')

describe('Application:UseCases', () => {
  describe('Apply Discount', () => {
    it('should return same products when search pattern is not a palindrome', () => {
      const searchPattern = 'hello'
      const baseProducts = [
        { foo: 'bar1', price: 100 },
        { foo: 'bar2', price: 200 },
        { foo: 'bar3', price: 300 }
      ]

      const result = applyDiscount(searchPattern, baseProducts)

      expect(result).toStrictEqual(baseProducts)
    })

    it('should apply 50% discount to product prices when search pattern is a palindrome', () => {
      const searchPattern = 'abba'
      const baseProducts = [
        { foo: 'bar1', price: 100 },
        { foo: 'bar2', price: 200 },
        { foo: 'bar3', price: 300 }
      ]
      const expectedResult = [
        { foo: 'bar1', price: 50, discount: 50, originalPrice: 100 },
        { foo: 'bar2', price: 100, discount: 50, originalPrice: 200 },
        { foo: 'bar3', price: 150, discount: 50, originalPrice: 300 }
      ]

      const result = applyDiscount(searchPattern, baseProducts)

      expect(result).toStrictEqual(expectedResult)
    })
  })

  describe('Search Products', () => {
    const mockResponse = {
      total: 1,
      products: [
        { foo: 'bar1', price: 100 }
      ]
    }
    const mockRepository = {
      findProductById: jest.fn(),
      findProducts: jest.fn()
    }

    it('should return original products when search pattern is not a palindrome', async () => {
      mockRepository.findProductById.mockImplementation(() => {
        return { ...mockResponse }
      })
      const searchPattern = '1234'

      const result = await searchProducts(mockRepository, searchPattern)

      expect(result).toStrictEqual(mockResponse)
      expect(mockRepository.findProductById).toHaveBeenCalledWith(searchPattern)
    })

    it('should original products with discoutn applied when search pattern is a palindrome', async () => {
      mockRepository.findProductById.mockImplementation(() => {
        return { ...mockResponse }
      })
      const searchPattern = '121'
      const expectedResult = {
        total: 1,
        products: [
          { foo: 'bar1', price: 50, discount: 50, originalPrice: 100 },
        ]
      }

      const result = await searchProducts(mockRepository, searchPattern)

      expect(result).toStrictEqual(expectedResult)
      expect(mockRepository.findProductById).toHaveBeenCalledWith(searchPattern)
    })

    it('should call findProductById when search pattern is a number', async () => {
      mockRepository.findProductById.mockImplementation(() => {
        return { ...mockResponse }
      })
      const searchPattern = '1234'

      const result = await searchProducts(mockRepository, searchPattern)

      expect(result).toStrictEqual(mockResponse)
      expect(mockRepository.findProductById).toHaveBeenCalledWith(searchPattern)
    })

    it('should call findProducts when search pattern is not a number', async () => {
      mockRepository.findProducts.mockImplementation(() => {
        return { ...mockResponse }
      })
      const searchPattern = 'x1234'

      const result = await searchProducts(mockRepository, searchPattern)

      expect(result).toStrictEqual(mockResponse)
      expect(mockRepository.findProducts).toHaveBeenCalledWith(searchPattern, undefined)
    })

    it('should call findProducts passing sort criteria when search pattern is not a number', async () => {
      mockRepository.findProducts.mockImplementation(() => {
        return { ...mockResponse }
      })
      const searchPattern = 'x1234'
      const orderby = 'brand'

      const result = await searchProducts(mockRepository, searchPattern, orderby)

      expect(result).toStrictEqual(mockResponse)
      expect(mockRepository.findProducts).toHaveBeenCalledWith(searchPattern, orderby)
    })

    it('should return undefined when an error occurred', async () => {
      mockRepository.findProductById.mockImplementation(() => {
        throw new Error('error details')
      })
      const searchPattern = '123'

      const result = await searchProducts(mockRepository, searchPattern)

      expect(mockRepository.findProductById).toHaveBeenCalledWith(searchPattern)
      expect(result).toBe(undefined)
    })

  })
})
