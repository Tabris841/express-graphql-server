import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Document } from 'mongoose';

import { User } from '../resources/user';
import config from '../../config';

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user as Document));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, cb) => {
      return User.findOne({ username })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }

          return cb(null, user, { message: 'Logged In Successfully' });
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secrets.JWT_SECRET
    },
    (jwtPayload, cb) => {
      return User.findById(jwtPayload.id)
        .then(user => cb(null, user))
        .catch(err => cb(err));
    }
  )
);
