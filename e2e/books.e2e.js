const request = require("supertest");
const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../src/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}?retryWrites=true&w=majority`;

const createApp = require('./../src/app');

let app;
let database;

const upApp = () => {
  return new Promise((resolve, reject) => {
    app = createApp();
    app.listen(3001, err => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  })
}

describe('Test for books endpoint', () => {
  
  beforeAll(async () => {
    await upApp();
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    database.dropDatabase();
  });

  describe('tests for GET api/books', () => {

    it('should return all books', async () => {
      await database.collection('books').insertMany([
        {  name: 'Book 1' },
        {  name: 'Book 2' },
        {  name: 'Book 3' },
      ]);
      const booksDB = await database.collection('books').find({}).toArray();
      return request(app)
      .get('/api/books/')
      .expect(200)
      .then(({body}) => {
        expect(body.length).toBe(booksDB.length);
      });
    });

  })

});
