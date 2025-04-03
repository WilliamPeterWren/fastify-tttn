
const refresh = {
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' }
    },
    required: ['refreshToken']
  }
}

module.exports = refresh;