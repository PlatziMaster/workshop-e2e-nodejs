const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UsersService = require('../services/users.service');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'my-cat';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  const service = new UsersService();
  const user = await service.getUser(jwt_payload.sub);
  if (user) { return done(null, user); }
  return done(null, false);
}));