function isNumber (value) {
  if (value === undefined) return false
  if (value === null) return false
  if (value.trim() === '') return false

  return !isNaN(value)
}

module.exports = { isNumber }
