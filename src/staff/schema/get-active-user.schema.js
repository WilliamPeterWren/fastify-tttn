const getActiveUser = { 
  querystring: {
    type: 'object',  
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    },
    additionalProperties: false 
  }
}

module.exports = getActiveUser;