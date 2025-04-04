const getAll = require('./get-all.schema');
const getOne = require('./get-one.schema');
const create = require('./create.schema');
const update = require('./update.schema');
const remove = require('./remove.schema');

module.exports = {
  getAll,
  create,
  update,
  getOne,
  remove
}