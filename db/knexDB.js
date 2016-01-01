var knexConfig = require('../knexfile');
var env = process.env.ENV || 'development';

var knex = require('knex')(knexConfig[env]);

module.exports = knex;
