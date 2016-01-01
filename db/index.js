var knexConfig = require('../knexfile');
var env = process.env.ENV || 'development';

var knex = require('knex')(knexConfig[env]);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('bookshelf-camelcase');

module.exports = bookshelf;
