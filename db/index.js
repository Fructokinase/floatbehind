var knexConfig = require('../knexfile');
var env = process.env.NODE_ENV || 'development';

var knex = require('knex')(knexConfig[env]);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('bookshelf-camelcase');

module.exports = bookshelf;
