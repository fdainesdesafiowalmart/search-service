const API_KEY = 'SEARCH_SERVICE_API_KEY'

const isValidApiKey = (value) => {
    return value === API_KEY
}

module.exports = { isValidApiKey }