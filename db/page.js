const bookshelf = require('./index');

const Page = bookshelf.Model.extend({
  tableName: 'pages'
});

module.exports = Page;
