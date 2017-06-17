import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user';
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Not an email associated with Willow' });

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: 'Incorrect Password' });

      return done(null, user);
    });
  });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: process.env.SECRET
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('passport.js - payload: ', payload);
  User.findById(payload._id, (err, user) => {
    if (err) return done(err, false);
    if (user) done(null, user);
    else done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);