var connectionString = 'postgres://localhost:5432/postgres';
var Promise=require('bluebird');
var app = require('../app');


var knex = require('knex')({
  client: 'mysql',
  connection: app.dbConnection,
  debug: false,
  pool: {
      min: 1,
      max: 2 
  }
});

module.exports = knex;