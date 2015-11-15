var connectionString = 'postgres://localhost:5432/postgres';
var Promise=require('bluebird');


var knex = require('knex')({
  client: 'mysql',
  connection: {
      user: 'be088a949f885f',
      database: 'ad_030d6b0be1e3f5e',
      port: 3306,
      host: 'us-cdbr-iron-east-03.cleardb.net',
      password: 'b59f03e2'
  },
  debug: false,
  pool: {
      min: 1,
      max: 2 
  }
});

module.exports = knex;