const { isPalindrome } = require('application/utils/ispalindrome')

describe('Application:Utils', () => {
  it('should return true for palindrome input', () => {
    const input = '123456654321'

    const result = isPalindrome(input)

    expect(result).toBe(true)
  })

  it('should return false for non palindrome input', () => {
    const input = 'blablabla'

    const result = isPalindrome(input)

    expect(result).toBe(false)
  })

  it('should return false for undefined input', () => {
    const input = undefined

    const result = isPalindrome(input)

    expect(result).toBe(false)
  })

  it('should return false for null input', () => {
    const input = null

    const result = isPalindrome(input)

    expect(result).toBe(false)
  })
})
