import authenticationController from './controllers/authentication';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
const express = require('express');
require('./config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', {session: false});

export default function(app) {
  // Initialize route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  //==============================
  // Auth Routes
  //==============================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', authenticationController.register);

  authRoutes.post('/validateVerificationCode', authenticationController.validateVerificationCode);

  // Login route
  authRoutes.post(
    '/login', function(req, res, next) {
      passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send({message: info.message});

        const userInfo = authenticationController.setUserInfo(user);
        res.status(200).json({
          token: 'JWT ' + authenticationController.generateToken(userInfo),
          user: userInfo
        });
      })(req, res, next)
    });

  // Set url for API group routes
  app.use('/api', apiRoutes);

  app.use('/graphql', requireAuth, graphqlHTTP({
    schema,
    graphiql: true
  }));
}