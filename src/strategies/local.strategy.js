const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const UsersService = require('../services/users.service');

passport.use(new LocalStrategy(async (username, password, done) => {
  const service = new UsersService();
  const user = await service.findOne({ username });
  if (!user) { return done(null, false); }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) { return done(null, false); }
  return done(null, user);
}));