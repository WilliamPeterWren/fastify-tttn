const Roles = require('../roles/index');

const getStaff = { 
  querystring: {
    type: 'object',  
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
      roles: { type:'string', enum: Object.values(Roles), default: 'STAFF' },
      status: {type: 'boolean', default: true},
    },
    additionalProperties: false,
  }
}

module.exports = getStaff;