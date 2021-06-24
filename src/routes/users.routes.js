const express = require('express');
const bcrypt = require('bcrypt');

const UsersService = require('../services/users.service');

const UsersRouter = (app) => {
  const router = express.Router();
  app.use('/api/users', router);

  const service = new UsersService();

  router.post('/', async (req, res) => {
    const { body } = req;
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
    const newUser = await service.createUser(body)
    res.status(201).json(newUser);
  });
}

module.exports = UsersRouter;