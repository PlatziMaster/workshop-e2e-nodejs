const express = require('express');
const passport = require('passport');

const BooksService = require('../services/books.service');
require('../strategies/jwt.strategy');

const BooksRouter = (app) => {
  const router = express.Router();
  app.use('/api/books', router);

  const service = new BooksService();

  router.get('/', async (req, res, next) => {
    passport.authenticate('jwt', async (error, user) => {
      if (error || !user) {
        return res.status(401).json({message: 'User Unauthorized'});
      }
      const books = await service.getBooks()
      res.status(200).json(books);
    })(req, res, next);
  });

  router.post('/', async (req, res) => {
    const { body } = req;
    const newBook = await service.createBook(body)
    res.status(201).json(newBook);
  });
}

module.exports = BooksRouter;