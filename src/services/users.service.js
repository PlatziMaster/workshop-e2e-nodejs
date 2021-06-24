const MongoLib = require('../lib/mongo.lib');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  createUser(user) {
    return this.mongoDB.create(this.collection, user);
  }

  find(query) {
    return this.mongoDB.getAll(this.collection, query);
  }

  findOne(query) {
    return this.mongoDB.findOne(this.collection, query);
  }

  getUser(id) {
    return this.mongoDB.get(this.collection, id);
  }
}

module.exports = UsersService;