const configuration = {
  application: {
    id: 'search-service',
    name: 'Search Service',
    prefixURL: '/search-service/v1',
    port: process.env.NODE_PORT || 8331,
    logLevel: process.env.LOG_LEVEL || 'debug'
  }
}

module.exports = configuration
