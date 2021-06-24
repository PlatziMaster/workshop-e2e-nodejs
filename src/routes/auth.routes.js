const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('../strategies/local.strategy');

const AuthRouter = (app) => {
  const router = express.Router();
  app.use('/api/auth', router);

  router.post( '/login', async (req, res, next) => {
    passport.authenticate('local', (error, user) => {
      if (error || !user) {
        return res.status(401).json({message: 'User Unauthorized'});
      }
      const payload = { sub: user._id };

      const token = jwt.sign(payload, 'my-cat', {
        expiresIn: '15h'
      });
      return res.status(200).json({token, user});
    })(req, res, next);
  });
}

module.exports = AuthRouter;