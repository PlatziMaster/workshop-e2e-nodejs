const express = require('express');
const BooksService = require('../services/books.service');

const BooksRouter = (app) => {
  const router = express.Router();
  app.use('/api/books', router);

  const service = new BooksService();

  router.get('/', async (req, res) => {
    const books = await service.getBooks()
    res.status(200).json(books);
  });

  router.post('/', async (req, res) => {
    const { body } = req;
    const newBook = await service.createBook(body)
    res.status(201).json(newBook);
  });
}

module.exports = BooksRouter;