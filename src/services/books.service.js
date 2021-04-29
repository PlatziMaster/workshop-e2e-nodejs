const MongoLib = require('../lib/mongo.lib');

class BooksService {
  constructor() {
    this.collection = 'books';
    this.mongoDB = new MongoLib();
  }

  getBooks(query) {
    return this.mongoDB.getAll(this.collection, query);
  }

  createBook(product) {
    return this.mongoDB.create(this.collection, product);
  }
}

module.exports = BooksService;