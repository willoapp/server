import authenticationController from './controllers/authentication';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
const express = require('express');
require('./config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

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

  // Login route
  authRoutes.post('/login', requireLogin, authenticationController.login);

  // Set url for API group routes
  app.use('/api', apiRoutes);

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
}