const request = require("supertest");
const bcrypt = require('bcrypt');

const { config } = require("../src/config");
const createApp = require("../src/app");

const { MongoClient, ObjectId } = require("mongodb");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}?retryWrites=true&w=majority`;
const collection = 'books';

describe('Tests for api/books', () => {

  let app = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    app.listen(3001);
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

  describe('GET api/books', () => {

    let token = null;

    beforeAll(async () => {
      const data = {
        username: 'nico',
        password: '123456',
      }
      await database.collection('users').insert({
        username: data.username,
        password: await bcrypt.hash(data.password, 10),
      });
      const loginReq = await request(app)
        .post('/api/auth/login/')
        .send(data)
        .expect(200);

      token = loginReq.body.token;
    });

    it('should return 200 in status code', () => {
      return request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    });

    it('should return a books array', async () => {
      const dataExpect = await database.collection(collection).insertMany([
        {
          name: 'Book 1',
          cover: 'image1.png',
          year: 1993,
        },
        {
          name: 'Book 2',
          cover: 'image1.png',
          year: 1993
        },
        {
          name: 'Book 3',
          cover: 'image1.png',
          year: 1993
        }
      ]);
      return request(app)
      .get('/api/books/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({body}) => {
        expect(body.length).toBe(dataExpect.ops.length);
        expect(body[0].name).toBe(dataExpect.ops[0].name);
      });
    });

  });

  describe('POST api/books', () => {

  });

});