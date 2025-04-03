// src/user/userSchema.js

const Roles = ['ADMIN', 'SELLER', 'SHIPPER', 'CUSTOMER', 'STAFF', 'ACCOUNTANT', 'MANAGER', 'SUPERVISOR', 'TECHNICIAN', 'MARKETING', 'HR'];

const paginationQuerySchema = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    },
    additionalProperties: false
  }
};

const userIdParamSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  }
};

const updateUserSchema = {
  body: {
    type: 'object',
    properties: {
      password: { type: 'string', minLength: 6 }
    },
    required: ['password']
  }
};

const staffRegisterSchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      roles: { type: 'string', enum: ['STAFF', 'CUSTOMER'], default: 'CUSTOMER' }
    },
    required: ['email', 'password']
  }
};

const updateStaffRoleSchema = {
  body: {
    type: 'object',
    properties: {
      user_id: { type: 'string' },
      roles: { type: 'string', enum: Roles, default: 'CUSTOMER' }
    },
    required: ['user_id', 'roles']
  }
};

const refreshTokenSchema = {
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' }
    },
    required: ['refreshToken']
  }
};

const getStaffByRoleSchema = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
      role: { type: 'string', enum: Roles, default: 'STAFF' },
      status: { type: 'boolean', default: true }
    },
    additionalProperties: false
  }
};

module.exports = {
  registerUserSchema,
  loginUserSchema,
  paginationQuerySchema,
  userIdParamSchema,
  updateUserSchema,
  staffRegisterSchema,
  updateStaffRoleSchema,
  refreshTokenSchema,
  getStaffByRoleSchema
};