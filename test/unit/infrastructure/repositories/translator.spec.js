const { translateProduct } = require('infrastructure/repositories/translator')

describe('Repositories:Translator', () => {
  it('should translate empty product to expected product structure', () => {
    const baseProduct = {
    }

    const expectedTranslatedProduct = {
      id: undefined,
      brand: undefined,
      description: undefined,
      image: undefined,
      price: undefined
    }

    const result = translateProduct(baseProduct)

    expect(result).toStrictEqual(expectedTranslatedProduct)
  })

  it('should translate input to product structure', () => {
    const baseProduct = {
      _id: 'xxxxxx',
      id: 123,
      brand: 'foobar',
      description: 'blablabla',
      image: 'imageref',
      price: 98765
    }

    const expectedTranslatedProduct = {
      id: 123,
      brand: 'foobar',
      description: 'blablabla',
      image: 'imageref',
      price: 98765
    }

    const result = translateProduct(baseProduct)

    expect(result).toStrictEqual(expectedTranslatedProduct)
  })
})
