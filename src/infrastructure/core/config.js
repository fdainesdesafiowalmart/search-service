const configuration = {
  application: {
    id: 'search-service',
    name: 'Search Service',
    prefixURL: '/search-service/v1',
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'debug'
  }
}

module.exports = configuration
