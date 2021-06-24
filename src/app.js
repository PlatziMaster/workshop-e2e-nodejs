const express = require('express');
const cors = require('cors');

const BooksRouter = require('./routes/books.routes');
const AuthRouter = require('./routes/auth.routes');
const UsersRouter = require('./routes/users.routes');
const ProfileRouter = require('./routes/profile.routes');

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  BooksRouter(app);
  AuthRouter(app);
  UsersRouter(app);
  ProfileRouter(app);
  return app;
}

module.exports = createApp;