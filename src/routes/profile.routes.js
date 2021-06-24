const express = require('express');
const passport = require('passport');

require('../strategies/jwt.strategy');

const ProfileRouter = (app) => {
  const router = express.Router();
  app.use('/api/profile', router);

  router.get('/', async (req, res, next) => {
    passport.authenticate('jwt', (error, user) => {
      if (error || !user) {
        return res.status(401).json({message: 'User Unauthorized'});
      }
      return res.status(200).json(user);
    })(req, res, next);
  });
}

module.exports = ProfileRouter;