const { isNumber } = require('application/utils/isnumber')

describe('Application:Utils', () => {
  it('should return true for number input', () => {
    const input = '123456654321'

    const result = isNumber(input)

    expect(result).toBe(true)
  })

  it('should return false for string input', () => {
    const input = 'blablabla'

    const result = isNumber(input)

    expect(result).toBe(false)
  })

  it('should return false for undefined input', () => {
    const input = undefined

    const result = isNumber(input)

    expect(result).toBe(false)
  })

  it('should return false for null input', () => {
    const input = null

    const result = isNumber(input)

    expect(result).toBe(false)
  })

  it('should return false for empty string input', () => {
    const input = ''

    const result = isNumber(input)

    expect(result).toBe(false)
  })
})
