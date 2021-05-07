const express = require('express');
const cors = require('cors');

const BooksRouter = require('./routes/books.routes');

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  BooksRouter(app);
  return app;
}

module.exports = createApp;