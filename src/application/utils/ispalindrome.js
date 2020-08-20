const isPalindrome = (pattern) => {
  if (pattern === undefined || pattern === null) return false

  var middleIndex = Math.floor(pattern.length / 2)

  for (let index = 0; index < middleIndex; index++) {
    if (pattern[index] !== pattern[pattern.length - 1 - index]) {
      return false
    }
  }

  return true
}

module.exports = { isPalindrome }
