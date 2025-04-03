
const logout =  {
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' }
    },
    required: ['refreshToken']
  }
}

module.exports = logout;